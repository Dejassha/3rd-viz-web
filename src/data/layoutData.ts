export const headerData = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "About",
        href: "/about",
    },
    {
        label: "Services",
        href: "/services",
    },
    {
        label: "Career",
        href: "/career",
    },
    {
        label: "Blog",
        href: "/blog",
    },
    {
        label: "Contact",
        href: "/contact",
    },
]

export const linksData = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label:"Policy", href:"/policy"}
];

/** Shown in the white footer band next to enquiry (e.g. social). */
export const footerTopSocialLinks = [
    { label: "Instagram", href: "https://www.instagram.com/" },
] as const;



export const servicesData = [
    {
        category: "Immersive Technology",
        slug: "immersive-tech",
        items: [
            {
                title: "Virtual Reality",
                serviceSlug: "virtual-reality",
                description: "Create fully immersive 3D experiences for training, marketing, or entertainment.",
                iconColor: "icon-violet",
            },
            {
                title: "Augmented Reality",
                serviceSlug: "augmented-reality",
                description: "Blend the digital and real world with interactive AR applications.",
                iconColor: "icon-lightPink",
            },
            {
                title: "3D Services",
                serviceSlug: "3d-services",
                description: "High-quality 3D modeling, rendering, and visualization for any industry.",
                iconColor: "icon-skyBlue",
            },
        ],
    },
    {
        category: "Data & Cloud",
        slug: "data-and-cloud",
        items: [
            {
                title: "CRM Solutions",
                serviceSlug: "customer-relationship-management",
                description: "Manage customer data, boost sales, and streamline communication.",
                iconColor: "accent-orange",
            },
            {
                title: "IAM Solutions",
                serviceSlug: "identity-and-access-management",
                description: "Securely control user access and identity management across systems.",
                iconColor: "icon-yellow",
            },
            {
                title: "ERP Solutions",
                serviceSlug: "enterprise-resource-planning",
                description: "Unify business operations with powerful, scalable ERP software.",
                iconColor: "icon-violet",
            },
            {
                title: "Server Management",
                serviceSlug: "server-management",
                description: "Reliable server setup, monitoring, and optimization for your infrastructure.",
                iconColor: "icon-green",
            },
        ],
    },
    {
        category: "Development & Software",
        slug: "development-and-software",
        items: [
            {
                title: "Web Development",
                serviceSlug: "web-development",
                description: "Modern, responsive, and fast websites built to engage users.",
                iconColor: "icon-skyBlue",
            },
            {
                title: "Mobile Apps",
                serviceSlug: "app-development",
                description: "Custom iOS & Android apps designed for performance and scalability.",
                iconColor: "icon-orange",
            },
            {
                title: "Game Development",
                serviceSlug: "game-development",
                description: "Interactive and visually stunning games for multiple platforms.",
                iconColor: "icon-lightPink",
            },
            {
                title: "Digital Marketing",
                serviceSlug: "digital-marketing",
                description: "Powerful digital marketing strategies tailored to grow your business.",
                iconColor: "icon-violet",
            },
        ],
    },
] as const;