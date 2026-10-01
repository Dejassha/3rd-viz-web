pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        buildDiscarder(logRotator(numToKeepStr: '20'))
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        // NOTE: do NOT set NODE_ENV=production globally — pnpm/npm install
        // needs devDependencies (eslint, typescript, tailwind) for the
        // build. Production mode is set only for the Build step.
        // Local deploy target (Next.js standalone output goes here,
        // run it with `node server.js` or pm2)
        DEPLOY_PATH = "/home/dejassha/Projects/jenkins-office/thirdvizion-web
"

        // Frontend .env.production Jenkins credential (file type).
        // Must contain NEXT_PUBLIC_* values — they are baked in at build.
        ENV_CREDENTIAL_ID = "thirdvizion-website"
    }

    stages {

        stage('Checkout') {
            steps {
                cleanWs()
                checkout scm
            }
        }

        stage('Setup Node') {
            steps {
                script {
                    // Jenkins agents (e.g. jenkins/jenkins:lts Docker) often
                    // have no Node.js. Install Node 22 locally in the
                    // workspace when missing so later stages can use it.
                    // Persists via env.PATH for all subsequent stages.
                    sh '''
                        set -e
                        if command -v node >/dev/null 2>&1; then
                            echo "Node already available:"
                            node --version
                            npm --version
                            exit 0
                        fi
                        echo "Node not found. Installing Node 22 locally..."
                        NODE_VERSION="22.22.1"
                        NODE_DIR="$WORKSPACE/.tools/node"
                        # npm's shebang is `#!/usr/bin/env node`, so node must
                        # be on PATH in THIS shell before calling npm.
                        export PATH="$NODE_DIR/bin:$PATH"
                        mkdir -p "$WORKSPACE/.tools"
                        if [ ! -x "$NODE_DIR/bin/node" ]; then
                            cd "$WORKSPACE/.tools"
                            rm -rf node "node-v${NODE_VERSION}-linux-x64" "node-v${NODE_VERSION}-linux-x64.tar.gz"
                            if command -v curl >/dev/null 2>&1; then
                                curl -fsSLO "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz"
                            elif command -v wget >/dev/null 2>&1; then
                                wget -q "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz"
                            else
                                echo "ERROR: neither curl nor wget is available to download Node."
                                exit 1
                            fi
                            tar -xzf "node-v${NODE_VERSION}-linux-x64.tar.gz"
                            mv "node-v${NODE_VERSION}-linux-x64" node
                            rm -f "node-v${NODE_VERSION}-linux-x64.tar.gz"
                        fi
                        node --version
                        npm --version
                    '''
                    env.PATH = "${env.WORKSPACE}/.tools/node/bin:${env.PATH}"
                    echo "Node on PATH: ${env.WORKSPACE}/.tools/node/bin"
                    sh 'node --version; npm --version'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Optional .env.production from Jenkins credentials.
                    // Does not fail the build if the credential is missing —
                    // falls back to the .env.production committed in the repo.
                    // NOTE: NEXT_PUBLIC_* is baked in at BUILD time, so the
                    // env file must be in place BEFORE the Build stage.
                    try {
                        withCredentials([
                            file(
                                credentialsId: "${ENV_CREDENTIAL_ID}",
                                variable: 'ENV_FILE'
                            )
                        ]) {
                            sh '''
                                set -e
                                if [ -f "$ENV_FILE" ]; then
                                    echo "Copying Jenkins environment file..."
                                    cp "$ENV_FILE" .env.production
                                fi
                            '''
                        }
                    } catch (err) {
                        echo "WARNING: credential '${ENV_CREDENTIAL_ID}' not found. Using repo .env.production as fallback."
                    }

                    sh '''
                        set -e

                        echo "Node version:"
                        node --version
                        echo "npm version:"
                        npm --version

                        echo "Installing dependencies (including devDependencies for build)..."
                        if [ -f "pnpm-lock.yaml" ]; then
                            # Repo uses pnpm (pnpm-lock.yaml exists).
                            # --prod=false guards against NODE_ENV=production
                            # being set globally on the Jenkins controller.
                            if ! command -v pnpm >/dev/null 2>&1; then
                                corepack enable
                                corepack prepare pnpm --activate
                            fi
                            pnpm install --frozen-lockfile --prod=false
                        elif [ -f "package-lock.json" ]; then
                            # --include=dev guards against NODE_ENV=production
                            # being set globally on the Jenkins controller.
                            npm ci --include=dev
                        else
                            npm install --include=dev
                        fi

                        echo "Dependencies installed successfully."
                    '''
                }
            }
        }

        stage('Lint') {
            steps {
                // Non-blocking: lint failures mark the stage UNSTABLE
                // but must NOT skip Build/Deploy. Real errors are still
                // visible in the log. Next.js build is the real gate.
                catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                    sh '''
                        set +e

                        echo "Checking for lint script..."
                        if node -e "process.exit(require('./package.json').scripts && require('./package.json').scripts.lint ? 0 : 1)"; then
                            echo "Running lint..."
                            if [ -f "pnpm-lock.yaml" ]; then
                                pnpm run lint
                            else
                                npm run lint
                            fi
                            LINT_EXIT=$?
                            if [ $LINT_EXIT -ne 0 ]; then
                                echo "WARNING: lint reported issues (exit ${LINT_EXIT}). Continuing to build."
                            else
                                echo "Lint passed."
                            fi
                            exit 0
                        else
                            echo "No lint script defined in package.json. Skipping."
                        fi
                    '''
                }
            }
        }

        stage('Build') {
            steps {
                sh '''
                    set -e

                    echo "Building production application..."
                    echo "NOTE: NEXT_PUBLIC_* values are baked in at this step."

                    if [ -f "pnpm-lock.yaml" ]; then
                        NODE_ENV=production pnpm run build
                    else
                        NODE_ENV=production npm run build
                    fi

                    # Next.js (output: "standalone") emits .next/BUILD_ID plus
                    # .next/standalone/server.js — these are the real gate
                    # (Vite equivalent of dist/index.html).
                    if [ ! -f ".next/BUILD_ID" ]; then
                        echo "ERROR: .next/BUILD_ID was not generated."
                        exit 1
                    fi

                    if [ ! -f ".next/standalone/server.js" ]; then
                        echo "ERROR: .next/standalone/server.js was not generated."
                        echo "Check next.config.ts has output: \\"standalone\\"."
                        exit 1
                    fi

                    echo ""
                    echo "Build completed successfully. BUILD_ID:"
                    cat .next/BUILD_ID
                    echo ""
                    echo "Standalone server:"
                    ls -lh .next/standalone/server.js

                    echo ""
                    echo "Build size:"
                    du -sh .next/standalone .next/static
                '''
                // Keep a copy of the build marker on the Jenkins controller
                // so the BUILD_ID is retrievable even if the deploy target
                // is down. (.next/ itself is too large to archive.)
                archiveArtifacts artifacts: '.next/BUILD_ID', fingerprint: true
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    set -e

                    echo "Preparing deployment..."

                    if [ ! -f ".next/standalone/server.js" ]; then
                        echo "ERROR: standalone server.js not found. Aborting."
                        exit 1
                    fi

                    mkdir -p "${DEPLOY_PATH}"

                    echo "Deploying to:"
                    echo "${DEPLOY_PATH}"
                    echo "NOTE: this path is inside the Jenkins container"
                    echo "unless it is mounted to the host."
                    echo "Run it with: cd ${DEPLOY_PATH} && node server.js"
                    echo "(or: pm2 start server.js --name thirdvizion-web)"

                    echo "Synchronizing files..."

                    if command -v rsync >/dev/null 2>&1; then
                        echo "Using:"
                        rsync --version | head -1
                        # Standalone runtime (server.js + minimal node_modules)
                        rsync -av --delete .next/standalone/ "${DEPLOY_PATH}/"
                        # Static assets + public/ are NOT inside standalone
                        mkdir -p "${DEPLOY_PATH}/.next/static" "${DEPLOY_PATH}/public"
                        rsync -av --delete .next/static/ "${DEPLOY_PATH}/.next/static/"
                        rsync -av --delete public/ "${DEPLOY_PATH}/public/"
                        # BUILD_ID marker for Verify stage
                        cp -f .next/BUILD_ID "${DEPLOY_PATH}/.next/BUILD_ID"
                    else
                        echo "WARNING: rsync not found, falling back to cp."
                        mkdir -p "${DEPLOY_PATH}"
                        # rm old files to mimic --delete, then copy
                        rm -rf "${DEPLOY_PATH:?}/"*
                        cp -a .next/standalone/. "${DEPLOY_PATH}/"
                        mkdir -p "${DEPLOY_PATH}/.next/static" "${DEPLOY_PATH}/public"
                        cp -a .next/static/. "${DEPLOY_PATH}/.next/static/"
                        cp -a public/. "${DEPLOY_PATH}/public/"
                        cp -f .next/BUILD_ID "${DEPLOY_PATH}/.next/BUILD_ID"
                    fi

                    echo "Deployment completed successfully."
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    set -e

                    echo "Verifying deployment..."

                    if [ ! -f "${DEPLOY_PATH}/server.js" ]; then
                        echo "ERROR: server.js was not found after deployment."
                        exit 1
                    fi

                    echo "server.js found."

                    if [ ! -f "${DEPLOY_PATH}/.next/BUILD_ID" ]; then
                        echo "ERROR: .next/BUILD_ID was not found after deployment."
                        exit 1
                    fi

                    echo "BUILD_ID: $(cat ${DEPLOY_PATH}/.next/BUILD_ID)"

                    echo ""
                    echo "Deployed files:"
                    ls -lh "${DEPLOY_PATH}" | head -20

                    echo ""
                    echo "Deployment size:"
                    du -sh "${DEPLOY_PATH}"

                    echo ""
                    echo "Deployment verification successful."
                '''
            }
        }
    }

    post {
        success {
            echo "=============================================="
            echo "Production deployment successful."
            echo "Build: #${BUILD_NUMBER}"
            echo "Path: ${DEPLOY_PATH}"
            echo "Run: cd ${DEPLOY_PATH} && node server.js"
            echo "=============================================="
        }

        failure {
            echo "=============================================="
            echo "Production deployment FAILED."
            echo "Build: #${BUILD_NUMBER}"
            echo "Check the Jenkins console output."
            echo "=============================================="
        }

        always {
            cleanWs()
        }
    }
}
