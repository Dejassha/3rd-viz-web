// import { ServicePageData } from "../../types";

// import etthicksBanner from "@assets/images/serviceBanner/etthicksBanner.jpg";

// import geekayBanner from "@assets/images/serviceBanner/geekayBanner.jpg";

// import madrasBanner from "@assets/images/serviceBanner/madrasBanner.jpg";
// import group from "@assets/images/icons/Group 1000006186.png"
// import mask1 from "@assets/images/icons/Mask Group (1).png"
// import mask2 from "@assets/images/icons/Mask Group (2).png"
// import mask3 from "@assets/images/icons/Mask Group (3).png"
// import mask5 from "@assets/images/icons/Mask Group (5).png"
// import mask4 from "@assets/images/icons/Mask Group (4).png"
// const IdentityAndAccessManagement: ServicePageData = {
//   themeColor: "#10B981",
//   meta_data: {
//     title: "IAM Solutions",
//     description:
//       "Secure identity and access across applications and systems. Third Vizion implements IAM that reduces risk while keeping employees and customers productive.",
//   },
//   hero: {
//     bg_color: "#661BCB",
//     maintitle: "Identity and Access Management",
//     title: "Secures digital environments with intelligent identity governance, seamless authentication, and controlled access to critical resources, empowering organization with enhanced security, compliance, and user access management across systems and applications. ",
//   },
//   statscards: [
//     {
//       count: "90",
//       sysmbol: "%",
//       heading: "Clientele",
//     },
//     {
//       count: "99",
//       sysmbol: "%",
//       heading: "Satisfaction",
//     },
//     {
//       count: "99",
//       sysmbol: "%",
//       heading: "Retention",
//     },
//   ],
//    about: {
//     video: "/about_dummy_video.mp4",
//     description: "Our IAM solutions help businesses manage user identities, control access, and protect critical systems through secure authentication, authorization, and compliance-driven workflows.",

//   },
//    // ─── Industries ───────────────────────────────────────────────
//   industries: [
//         {
//       id: "Manufacturing",
//       name: "Manufacturing",
//       heading: "Protecting Every Digital Touchpoint",
//       description:
//         "Leverage advanced IAM solutions to secure factory systems, manage user identities, and reduce security risks across your manufacturing ecosystem.",
//       buttonText: "Request solutions for Manufacturing",
//       cards: [
//         {
//           title: "Trusted Access Uninterrupted Production",
//           description: "Deliver secure, frictionless access across your manufacturing network while protecting critical systems from evolving cyber threats.",
//           variant: "default",
//           span: "half",
//         },
//         {
//           title: "Control Access. Reduce Risk. Drive Growth.",
//           variant: "dark",
//           span: "half",
//         },
//         {
//           title: "Empowering Secure Manufacturing",
//           description: "Harness intelligent Identity and Access Management to protect critical operations, enable trusted access and keep your manufacturing ecosystem secure and connected.",
//           variant: "accent",
//           span: "full",
//         },
//       ],
//     },
//     {
//       id: "retail",
//       name: "Retail",
//       heading: "The Engine Behind Modern Retail",
//       description:
//        "Intelligent ERP platforms that streamline operations, enhance stock accuracy and empower faster, data-driven decision-making across retail networks.",
//       buttonText: "Request solutions for Retail",
//       cards: [
//         {
//           title: "Retail Intelligence Unleashed",
//           description: "Transforming retail operations with a powerful ERP platform that unifies inventory, sales, procurement, and customer insights.",
//           variant: "default",
//           span: "half",
//         },
//         {
//           title: "Powering the Next Retail Revolution",
//           variant: "dark",
//           span: "half",
//         },
//         {
//           title: "Retail Powerhouse Transformation ",
//           description: "Turns real-time insights into profitable actions, creating seamless shopping experiences and accelerating business growth across every channel.",
//           variant: "accent",
//           span: "full",
//         },
//       ],
//     },
//     {
//       id: "Education",
//       name: "Education",
//       heading: "Unified Learning Ecosystem",
//       description:
//         "Enterprise-grade education ERP solution that connect departments, simplify workflows and enhance overall institutional performance and visibility.",
//       buttonText: "Request solutions for Education",
//       cards: [
//         {
//           title: "Connected Campus Operations",
//           description: "Unifying students, faculty and resources  through intelligent ERP systems that improves collaboration, visibility and institutional performance.",
//           variant: "default",
//           span: "half",
//         },
//         {
//           title: " Academic Success Through ERP ",
//           variant: "dark",
//           span: "half",
//         },
//         {
//           title: "Future-Ready Education ERP",
//           description: "Empowering educational institutions with centralized management tools that optimize workflows, simplify processes and drive informed decision-making.",
//           variant: "accent",
//           span: "full",
//         },
//       ],
//     },
//     {
//       id: "healthcare",
//       name: "Healthcare",
//       heading: "Healthcare Identity Shield",
//       description:
//         "Enterprise-grade identity and access management that protects sensitive patient data, strengthens security governance and ensures trusted access across healthcare systems.",
//       buttonText: "Request solutions for Healthcare",
//       cards: [
//         {
//           title: "Secure Healthcare Access",
//           description: "Protecting patient data and healthcare systems through intelligent identity management, secure authentication and controlled access to critical medical resources.",
//           variant: "default",
//           span: "half",
//         },
//         {
//           title: "Trusted Health Identity",
//           variant: "dark",
//           span: "half",
//         },
//         {
//           title: "Connected & Secure Care",
//           description: "Strengthening healthcare security with advanced identity and access management that protects patient information while enabling seamless collaboration.",
//           variant: "accent",
//           span: "full",
//         },
//       ],
//     },
//     {
//       id: "Insurance",
//       name: "Insurance",
//       heading: "Insurance Without Friction",
//       description:
//         "Advanced ERP solutions that unify underwriting, claims and policy operations to deliver seamless workflows, improved accuracy and faster decision-making across the enterprise.",
//       buttonText: "Request solutions for Real Estate",
//       cards: [
//         {
//           title: "Future-Ready Insurance ERP",
//           description: "Transforming insurance operations through intelligent resource planning that drives operational agility, compliance and superior customer experiences.",
//           variant: "default",
//           span: "half",
//         },
//         {
//           title: "Connected Insurance Operations  ",
//           variant: "dark",
//           span: "half",
//         },
//         {
//           title: "Insurance Management Excellence",
//           description: "Empowering insurers with centralized ERP platforms that optimize operations, simplify workflows and support sustainable business growth.",
//           variant: "accent",
//           span: "full",
//         },
//       ],
//     },
//     {
//       id: "Travel",
//       name: "Travel",
//       heading: "Travel Intelligence Engine",
//       description:
//         "Powerful ERP solutions that integrate travel operations, streamline bookings and logistics and enable data-driven decisions for seamless global travel experiences.",
//       buttonText: "Request solutions for Travel",
//       cards: [
//         {
//           title: "Travel Enterprise Transformation",
//           description: "Modernizing travel operations with integrated ERP solutions that enhance agility, collaboration, and service excellence.",
//           variant: "default",
//           span: "half",
//         },
//         {
//           title: "Future-Ready Travel Operations  ",
//           variant: "dark",
//           span: "half",
//         },
//         {
//           title: "Connected Journey Management",
//           description: "Empowering travel enterprises with unified ERP systems that streamline operations, optimize resources, and support sustainable growth.",
//           variant: "accent",
//           span: "full",
//         },
//       ],
//     },
//     {
//       id: "Public Sector",
//       name: "Public Sector",
//       heading: "Connected Government Ecosystem",
//       description:
//         "Enterprise-grade ERP solutions that unifies agencies, simplify processes and ensure seamless coordination across citizen services and administrative functions.",
//       buttonText: "Request solutions for Public Sector",
//       cards: [
//         {
//           title: "Smart Governance Operations",
//           description: "Streamlining public sector processes through integrated ERP solutions that enhance transparency, resource management and operational efficiency.",
//           variant: "default",
//           span: "half",
//         },
//         {
//           title: "Driving Excellence in Governance",
//           variant: "dark",
//           span: "half",
//         },
//         {
//           title: "Future-Ready Public Administration",
//           description: "Transforming government operations with intelligent ERP solutions that unify departments, optimize resources and drive seamless service delivery.",
//           variant: "accent",
//           span: "full",
//         },
//       ],
//     },
//   ],

//   tools: {
//     heading: "Tools We Integrate",
//     sub_heading: "Industry-standard identity & authentication protocols",
//     description: "Deploy resilient authorization systems, single sign-on (SSO), and secure multi-factor authentication across your enterprise assets.",
//     tool_logos: [
//       { name: "Okta", src: "https://cdn.worldvectorlogo.com/logos/okta.svg" },
//       { name: "Auth0", src: "https://cdn.worldvectorlogo.com/logos/auth0.svg" },
//       { name: "Firebase", src: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg" },
//       { name: "Keycloak", src: "https://cdn.worldvectorlogo.com/logos/keycloak.svg" },
//       { name: "Azure", src: "https://cdn.worldvectorlogo.com/logos/azure-1.svg" },
//       { name: "PingIdentity", src: "https://cdn.worldvectorlogo.com/logos/ping-identity-logo.svg" }
//     ]
//   },

//   our_process: {
//     main_icon: group,
//     steps: [
//       {
//       id: "01",
//       title: "Identity & Security Assessment",
//       icon: mask1,
//     },
//     {
//       id: "02",
//       title: "IAM Architecture Design",
//       icon: mask2,
//     },
//     {
//       id: "03",
//       title: "Access & Authentication Setup",
//       icon: mask3,
//     },
//     {
//       id: "04",
//       title: "Validation & Testing",
//       icon: mask4,
//     },
//     {
//       id: "05",
//       title: "Monitoring & Ongoing Support",
//       icon: mask5
//     },
//     ]
//   },
//   projects: [
//   { id: "02", title: "Et-Thicks", banner_image: etthicksBanner },

//     { id: "01", title: "Geekay", banner_image: geekayBanner },
//     { id: "03", title: "Madras Kitchen", banner_image: madrasBanner },
//   ],
//   why_choose: [
//   {
//     num: "01",
//     title: "Strong Security Framework",
//     desc: "We implement advanced identity and access controls.Ensuring your systems and data stay fully protected.",
//     icon: "layers",
//   },
//   {
//     num: "02",
//     title: " Customized IAM Solutions",
//     desc: "Our IAM systems are tailored to your business structure.Aligning perfectly with your users, roles, and workflows.",
//     icon: "activity",
//   },
//   {
//     num: "03",
//     title: "Seamless Integration",
//     desc: " We integrate IAM with your existing systems smoothly. Ensuring secure access without disrupting operations.",
//     icon: "settings",
//   },
//   {
//     num: "04",
//     title: "Advanced Authentication",
//     desc: "We use modern authentication methods for secure access.Enhancing protection while keeping user experience simple.",
//     icon: "trending",
//   },
//   {
//     num: "05",
//     title: "Compliance & Risk Management",
//     desc: "We design solutions aligned with security standards.Helping you reduce risks and meet compliance requirements.",
//     icon: "grid",
//   },
//   {
//     num: "06",
//     title: "Continuous Monitoring & Support",
//     desc: "We provide ongoing monitoring and system updates.Keeping your security strong as your business grows",
//     icon: "shield",
//   },
// ],
//   faqs: [
//     {
//       question: "What is the delivery timeline for IAM Solutions?",
//       answer: "Timeline varies based on specific project requirements, typically ranging from 4 to 8 weeks for core phases."
//     },
//     {
//       question: "How do you ensure quality and performance for IAM Solutions?",
//       answer: "We perform comprehensive quality assurance, unit testing, performance benchmarking, and security audits before launch."
//     },
//     {
//       question: "Can we request custom features during the project?",
//       answer: "Yes, we use agile methodologies which allow for flexibility and iteration based on feedback throughout development."
//     },
//     {
//       question: "Is there ongoing technical support available?",
//       answer: "Yes, we provide SLA-backed support and maintenance contracts to ensure long-term stability and security."
//     },
//     {
//       question: "How do we get started with IAM Solutions?",
//       answer: "Contact us to arrange an initial consulting session where we'll discuss your requirements and build a detailed project roadmap."
//     }
//   ]
// };

// export default IdentityAndAccessManagement;


import { ServicePageData } from "../../types";

import etthicksBanner from "@assets/images/serviceBanner/etthicksBanner.jpg";
import geekayBanner from "@assets/images/serviceBanner/geekayBanner.jpg";
import madrasBanner from "@assets/images/serviceBanner/madrasBanner.jpg";
import group from "@assets/images/icons/Group 1000006186.png"
import mask1 from "@assets/images/icons/Mask Group (1).png"
import mask2 from "@assets/images/icons/Mask Group (2).png"
import mask3 from "@assets/images/icons/Mask Group (3).png"
import mask5 from "@assets/images/icons/Mask Group (5).png"
import mask4 from "@assets/images/icons/Mask Group (4).png"

const IdentityAndAccessManagement: ServicePageData = {
  themeColor: "#5EBC58",
  meta_data: {
    title: "IAM Solutions",
    description:
      "Secure identity and access across applications and systems. Third Vizion implements IAM that reduces risk while keeping employees and customers productive.",
  },
  hero: {
    bg_color: "#661BCB",
    maintitle: "Identity and Access Management",
    title: "Secures digital environments with intelligent identity governance, seamless authentication, and controlled access to critical resources, empowering organization with enhanced security, compliance, and user access management across systems and applications.",
    video: "/video/IAM_video.mp4",
  },
  statscards: [
    { count: "90", sysmbol: "%", heading: "Clientele" },
    { count: "99", sysmbol: "%", heading: "Satisfaction" },
    { count: "99", sysmbol: "%", heading: "Retention" },
  ],

  // ─── Industries ───────────────────────────────────────────────
  industries: [
    {
      id: "Manufacturing",
      name: "Manufacturing",
      heading: "Protecting Every Digital Touchpoint",
      description:
        "Leverage advanced IAM solutions to secure factory systems, manage user identities, and reduce security risks across your manufacturing ecosystem.",
      buttonText: "Request solutions for Manufacturing",
      cards: [
        {
          title: "Trusted Access Uninterrupted Production",
          description: "Deliver secure, frictionless access across your manufacturing network while protecting critical systems from evolving cyber threats.",
          variant: "default",
          span: "half",
        },
        {
          title: "Control Access. Reduce Risk. Drive Growth.",
          variant: "dark",
          span: "half",
        },
        {
          title: "Empowering Secure Manufacturing",
          description: "Harness intelligent Identity and Access Management to protect critical operations, enable trusted access and keep your manufacturing ecosystem secure and connected.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "retail",
      name: "Retail",
      heading: "Secure Identity for Retail Ecosystems",
      description:
        "Advanced identity and access management solutions that protect customer data, secure transactions and ensure trusted access across all retail platforms.",
      buttonText: "Request solutions for Retail",
      cards: [
        {
          title: "Seamless Shopper Access",
          description: "Delivering secure authentication and intelligent access control, ensuring convenient, personalized, and protected retail interactions.",
          variant: "default",
          span: "half",
        },
        {
          title: "Retail Identity Hub",
          variant: "dark",
          span: "half",
        },
        {
          title: "Smart Commerce Security",
          description: "Protecting every customer journey with advanced identity management, creating secure, frictionless, and engaging shopping experiences.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Education",
      name: "Education",
      heading: "Protecting Digital Classrooms",
      description:
        "Robust identity management systems designed to enforce access policies, reduce security risks and maintain compliance across modern learning environments.",
      buttonText: "Request solutions for Education",
      cards: [
        {
          title: "Identity-Driven Education",
          description: "Strengthening digital learning ecosystems with secure authentication and access management that protects users and academic data.",
          variant: "default",
          span: "half",
        },
        {
          title: "Secure Learning Access",
          variant: "dark",
          span: "half",
        },
        {
          title: "Smart Campus Security",
          description: "Safeguarding educational environments through secure identity and access controls that enhance protection, compliance and user convenience.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "healthcare",
      name: "Healthcare",
      heading: "Healthcare Identity Shield",
      description:
        "Enterprise-grade identity and access management that protects sensitive patient data, strengthens security governance and ensures trusted access across healthcare systems.",
      buttonText: "Request solutions for Healthcare",
      cards: [
        {
          title: "Secure Healthcare Access",
          description: "Protecting patient data and healthcare systems through intelligent identity management, secure authentication and controlled access to critical medical resources.",
          variant: "default",
          span: "half",
        },
        {
          title: "Trusted Health Identity",
          variant: "dark",
          span: "half",
        },
        {
          title: "Connected & Secure Care",
          description: "Strengthening healthcare security with advanced identity and access management that protects patient information while enabling seamless collaboration.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Insurance",
      name: "Insurance",
      heading: "Protecting Digital Insurance Trust",
      description:
        "Robust identity management systems designed to reduce fraud risk, enforce access policies and maintain compliance across insurance workflows.",
      buttonText: "Request solutions for Insurance",
      cards: [
        {
          title: "Trusted Digital Identity Solutions",
          description: "Strengthening insurance experiences through secure authentication and intelligent access control, helping customers manage policies safely and confidently.",
          variant: "default",
          span: "half",
        },
        {
          title: "Seamless Policyholder Access",
          variant: "dark",
          span: "half",
        },
        {
          title: "Secure Policy Access Hub",
          description: "Empowering policyholders with seamless identity management and secure access, ensuring protected interactions while enhancing trust across every insurance touchpoint.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Travel",
      name: "Travel",
      heading: "Borderless Identity Protection",
      description:
        "Advanced IAM solutions that secure traveller identities across global platforms, ensuring safe bookings, trusted logins and uninterrupted digital travel experiences.",
      buttonText: "Request solutions for Travel",
      cards: [
        {
          title: "Secure Travel Identity",
          description: "Enabling travellers to access bookings, itineraries, and services securely through seamless identity verification and intelligent access management.",
          variant: "default",
          span: "half",
        },
        {
          title: "Trusted Access for Every Journey",
          variant: "dark",
          span: "half",
        },
        {
          title: "Connected Travel Security",
          description: "Safeguarding traveler identities through advanced access management, enabling smooth journeys while enhancing trust and convenience.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Public Sector",
      name: "Public Sector",
      heading: "Protecting Digital Government Identity",
      description:
        "Robust identity management systems designed to reduce fraud, enforce strict access controls and maintain compliance across public sector operations.",
      buttonText: "Request solutions for Public Sector",
      cards: [
        {
          title: "Empowering Secure Governance",
          description: "Delivering trusted identity verification and controlled access, helping governments provide secure and efficient digital services.",
          variant: "default",
          span: "half",
        },
        {
          title: "Secure Governance Gateway",
          variant: "dark",
          span: "half",
        },
        {
          title: "Citizen Identity Excellence",
          description: "Protecting public service access through advanced authentication and identity governance, fostering transparency, security and trust.",
          variant: "accent",
          span: "full",
        },
      ],
    },
  ],

  tools: {
    heading: "Tools We Use",
    sub_heading: "Powering Secure Access for the Digital Enterprise",
    description: "Our IAM solutions enable organizations to verify identities, manage user access, and safeguard sensitive information with confidence. Through advanced authentication, centralized identity management, and automated access governance, we help businesses strengthen security, improve operational efficiency, and build trust across every digital interaction.",
    tool_logos: [
      { name: "Okta", src: "https://cdn.worldvectorlogo.com/logos/okta.svg" },
      { name: "Auth0", src: "https://cdn.worldvectorlogo.com/logos/auth0.svg" },
      { name: "Firebase", src: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg" },
      { name: "Keycloak", src: "https://cdn.worldvectorlogo.com/logos/keycloak.svg" },
      { name: "Azure", src: "https://cdn.worldvectorlogo.com/logos/azure-1.svg" },
      { name: "PingIdentity", src: "https://cdn.worldvectorlogo.com/logos/ping-identity-logo.svg" }
    ]
  },

  our_process: {
    main_icon: group,
    steps: [
      {
        id: "01",
        title: "Identity Discovery & Risk Analysis",
        icon: mask1,
      },
      {
        id: "02",
        title: "Access Control Framework Design",
        icon: mask2,
      },
      {
        id: "03",
        title: "Secure Identity Deployment & Integration",
        icon: mask3,
      },
      {
        id: "04",
        title: "Security Testing & Governance Review",
        icon: mask4,
      },
      {
        id: "05",
        title: "Monitoring, Optimization & Continuous Compliance",
        icon: mask5,
      },
    ]
  },

  projects: [
    { id: "02", title: "Et-Thicks", banner_image: etthicksBanner },
    { id: "01", title: "Geekay", banner_image: geekayBanner },
    { id: "03", title: "Madras Kitchen", banner_image: madrasBanner },
  ],

  why_choose: [
    {
      num: "01",
      title: "Strong Security Framework",
      desc: "We implement advanced identity and access controls. Ensuring your systems and data stay fully protected.",
      icon: "layers",
    },
    {
      num: "02",
      title: "Customized IAM Solutions",
      desc: "Our IAM systems are tailored to your business structure. Aligning perfectly with your users, roles, and workflows.",
      icon: "activity",
    },
    {
      num: "03",
      title: "Seamless Integration",
      desc: "We integrate IAM with your existing systems smoothly. Ensuring secure access without disrupting operations.",
      icon: "settings",
    },
    {
      num: "04",
      title: "Advanced Authentication",
      desc: "We use modern authentication methods for secure access. Enhancing protection while keeping user experience simple.",
      icon: "trending",
    },
    {
      num: "05",
      title: "Compliance & Risk Management",
      desc: "We design solutions aligned with security standards. Helping you reduce risks and meet compliance requirements.",
      icon: "grid",
    },
    {
      num: "06",
      title: "Continuous Monitoring & Support",
      desc: "We provide ongoing monitoring and system updates. Keeping your security strong as your business grows.",
      icon: "shield",
    },
  ],

  faqs: [
    {
      question: "What is the delivery timeline for IAM Solutions?",
      answer: "Timeline varies based on specific project requirements, typically ranging from 4 to 8 weeks for core phases."
    },
    {
      question: "How do you ensure quality and performance for IAM Solutions?",
      answer: "We perform comprehensive quality assurance, unit testing, performance benchmarking, and security audits before launch."
    },
    {
      question: "Can we request custom features during the project?",
      answer: "Yes, we use agile methodologies which allow for flexibility and iteration based on feedback throughout development."
    },
    {
      question: "Is there ongoing technical support available?",
      answer: "Yes, we provide SLA-backed support and maintenance contracts to ensure long-term stability and security."
    },
    {
      question: "How do we get started with IAM Solutions?",
      answer: "Contact us to arrange an initial consulting session where we'll discuss your requirements and build a detailed project roadmap."
    }
  ]
};

export default IdentityAndAccessManagement;