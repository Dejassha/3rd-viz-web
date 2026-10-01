pipeline {
    agent any

    environment {
        SERVER_IP = "213.210.21.150"
        USER = "root"
        APP_DIR = "/home/thirdvizion-web/thirdvizion-website"
        APP_NAME = "nextjs-app"
    }

    stages {

        stage('Deploy') {
            steps {
                sshagent(['server-ssh']) { // <-- FIXED
                    sh """
                    ssh -o StrictHostKeyChecking=no ${USER}@${SERVER_IP} '
                        set -e
                        cd ${APP_DIR}

                        echo "📦 Sync code (clean)..."
                        git fetch origin
                        git reset --hard origin/main

                        echo "📦 Install deps..."
                        pnpm install --frozen-lockfile

                        echo "🏗️ Build..."
                        pnpm build

                        echo "🚀 Restart app..."
                        pm2 reload ${APP_NAME} || pm2 start "pnpm start" --name "${APP_NAME}"

                        pm2 save
                    '
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful. System stable."
        }
        failure {
            echo "❌ Deployment failed. Investigate logs."
        }
    }
}
