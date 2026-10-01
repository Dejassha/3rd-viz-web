import { ServicePageData } from "./types";
import {
    getAllProjects,
    getProjectsByService,
    getServiceBySlug,
    getServiceVideos,
    getServiceQuestionnaires,
    getServiceMetrics,
    normalizeServiceSlug,
    FetchedProject,
} from "@/src/lib/payload";
import defaultWebDevelopment from "./services/development-and-software/web-development";

export type ServiceCategory =
    | "immersive-tech"
    | "data-and-cloud"
    | "development-and-software";

type ServiceLoader = () => Promise<{ default: ServicePageData }>;
type OtherServiceProjects = {
    id: string;
    title: string;
    projects: FetchedProject[];
};
type LoadedServiceData = ServicePageData & {
    otherServices?: OtherServiceProjects[];
};
type ServiceRegistry = {
    [category: string]: {
        [service: string]: ServiceLoader;
    };
};

const SERVICE_MAP: ServiceRegistry = {
    "development-and-software": {
        "web-development": () =>
        import("./services/development-and-software/web-development"),
        "app-development": () =>
        import("./services/development-and-software/app-development"),
        "digital-marketing": () =>
        import("./services/development-and-software/digital-marketing"),
        "game-development": () =>
        import("./services/development-and-software/game-development"),
    },

    "data-and-cloud": {
        "customer-relationship-management": () =>
        import("./services/data-and-cloud/customer-relationship-management"),
        "enterprise-resource-planning": () =>
        import("./services/data-and-cloud/enterprise-resource-planning"),
        "identity-and-access-management": () =>
        import("./services/data-and-cloud/identity-and-access-management"),
        "server-management": () =>
        import("./services/data-and-cloud/server-management"),
    },

    "immersive-tech": {
        "3d-services": () => import("./services/immersive-tech/3d-services"),
        "augmented-reality": () =>
        import("./services/immersive-tech/augmented-reality"),
        "virtual-reality": () =>
        import("./services/immersive-tech/virtual-reality"),
    },
};

const SERVICE_THEME_COLORS: Record<string, string> = {
    "web-development": "#CB1A1A",
    "app-development": "#3B82F6",
    "digital-marketing": "#F38540",
    "game-development": "#1AA8CB",
    "customer-relationship-management": "#FDB928",
    "enterprise-resource-planning": "#EE3A5C",
    "identity-and-access-management": "#5EBC58",
    "server-management": "#C71186",
    "3d-services": "#E57A00",
    "augmented-reality": "#E500CB",
    "virtual-reality": "#2600E5",
};

export async function loadServiceData(
    category: string,
    service: string,
): Promise<LoadedServiceData | null> {
    try {
        const decodedCategory = decodeURIComponent(category);
        const decodedService = decodeURIComponent(service);
        const normalizedService = normalizeServiceSlug(decodedService);

        const loader = SERVICE_MAP?.[decodedCategory]?.[decodedService] || SERVICE_MAP?.[decodedCategory]?.[normalizedService];
        const localModule = loader ? await loader() : null;
        const localData = localModule?.default || null;

        const [cmsService, allProjects, serviceVideos, questionnairesMap, metricsMap] = await Promise.all([
            getServiceBySlug(decodedCategory, decodedService),
            getAllProjects(),
            getServiceVideos(),
            getServiceQuestionnaires(),
            getServiceMetrics(),
        ]);

        const videoFromVideosCollection =
            serviceVideos[decodedService] ||
            serviceVideos[decodedService.toLowerCase()] ||
            serviceVideos[normalizedService] ||
            (cmsService?.id ? serviceVideos[String(cmsService.id)] : undefined);

        const dedicatedQuestions =
            questionnairesMap[decodedService] ||
            questionnairesMap[decodedService.toLowerCase()] ||
            questionnairesMap[normalizedService] ||
            (cmsService?.id ? questionnairesMap[String(cmsService.id)] : undefined);

        const dedicatedMetrics =
            metricsMap[decodedService] ||
            metricsMap[decodedService.toLowerCase()] ||
            metricsMap[normalizedService] ||
            (cmsService?.id ? metricsMap[String(cmsService.id)] : undefined);

        // Match projects for the current service (by service id or slug)
        const currentServiceId = cmsService?.id ? String(cmsService.id) : null;
        const matchedProjects = allProjects.filter((p) => {
            const pSlug = p.service?.slug ? normalizeServiceSlug(p.service.slug) : '';
            if (pSlug && (pSlug === normalizedService || pSlug === decodedService.toLowerCase())) {
                return true;
            }
            if (currentServiceId && p.service?.id) {
                return String(p.service.id) === currentServiceId;
            }
            return false;
        });

        // Other service projects grouped by service
        const otherServices = allProjects.reduce<
            Record<string, OtherServiceProjects>
        >((groups, project) => {
            const svc = project.service;
            if (!svc) return groups;
            const pSlug = svc.slug ? normalizeServiceSlug(svc.slug) : '';
            if (pSlug && (pSlug === normalizedService || pSlug === decodedService.toLowerCase())) return groups;
            if (currentServiceId && String(svc.id) === currentServiceId) return groups;

            const key = String(pSlug || svc.slug || svc.id);
            groups[key] ??= {
                id: key,
                title: svc.title || svc.slug || key,
                projects: [],
            };
            groups[key].projects.push(project);
            return groups;
        }, {});

        const projects = matchedProjects.length > 0
            ? matchedProjects
            : (cmsService?.projects && cmsService.projects.length > 0 ? cmsService.projects : []);

        const heroVideo =
            videoFromVideosCollection ||
            cmsService?.hero?.video;

        if (cmsService) {
            const resolvedThemeColor =
                SERVICE_THEME_COLORS[decodedService] ||
                localData?.themeColor ||
                (cmsService.themeColor && cmsService.themeColor.toLowerCase() !== '#a461ff' ? cmsService.themeColor : '#3B82F6');

            return {
                ...localData,
                ...cmsService,
                themeColor: resolvedThemeColor,
                hero: {
                    ...(localData?.hero || {}),
                    ...(cmsService.hero || {}),
                    video: heroVideo,
                },
                meta_data: cmsService.meta_data?.title ? cmsService.meta_data : (localData?.meta_data || cmsService.meta_data),
                statscards: dedicatedMetrics?.length ? dedicatedMetrics : (cmsService.statscards || localData?.statscards),
                our_process: cmsService.our_process?.steps?.length
                    ? cmsService.our_process
                    : (localData?.our_process?.steps?.length ? localData.our_process : defaultWebDevelopment.our_process),
                industries: cmsService.industries?.length
                    ? cmsService.industries
                    : (localData?.industries?.length ? localData.industries : defaultWebDevelopment.industries),
                tools: cmsService.tools?.tool_logos?.length
                    ? cmsService.tools
                    : (localData?.tools?.tool_logos?.length ? localData.tools : defaultWebDevelopment.tools),
                why_choose: cmsService.why_choose?.length
                    ? cmsService.why_choose
                    : (localData?.why_choose?.length ? localData.why_choose : defaultWebDevelopment.why_choose),
                faqs: cmsService.faqs?.length
                    ? cmsService.faqs
                    : (localData?.faqs?.length ? localData.faqs : defaultWebDevelopment.faqs),
                questions: dedicatedQuestions?.length ? dedicatedQuestions : (cmsService.questions || []),
                projects,
                layoutOrder: (
                    cmsService.layoutOrder?.length &&
                    ['industry', 'tools', 'process'].every((section) =>
                        cmsService.layoutOrder?.includes(section as typeof cmsService.layoutOrder[number])
                    )
                )
                    ? cmsService.layoutOrder
                    : (localData?.layoutOrder || [
                        'hero', 'about', 'industry', 'tools', 'process', 'projects', 'faq', 'reviews',
                    ]),
                otherServices: Object.values(otherServices),
            };
        }

        if (!localData) {
            console.error(`Service "${decodedService}" not found in category "${decodedCategory}"`);
            return null;
        }

        localData.themeColor = SERVICE_THEME_COLORS[decodedService] || localData.themeColor || '#3B82F6';
        localData.projects = projects;
        localData.questions = dedicatedQuestions?.length ? dedicatedQuestions : (localData.questions || []);
        if (dedicatedMetrics?.length) {
            localData.statscards = dedicatedMetrics;
        }
        if (localData.hero) {
            localData.hero = {
                ...localData.hero,
                video: heroVideo,
            };
        }

        if (!localData.layoutOrder || localData.layoutOrder.length === 0) {
            localData.layoutOrder = [
                'hero', 'about', 'industry', 'tools', 'process', 'projects', 'faq', 'reviews',
            ];
        }

        return {
            ...localData,
            otherServices: Object.values(otherServices),
        };
    } catch (error) {
        console.error(
            `Failed loading service "${service}" in category "${category}"`,
            error,
        );
        return null;
    }
}


