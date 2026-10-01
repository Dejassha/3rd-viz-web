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

const ServerManagement: ServicePageData = {
  themeColor: "#C71186",
  meta_data: {
    title: "Server Management",
    description:
      "Server setup, monitoring, and optimization for stability and performance. Third Vizion supports infrastructure that stays reliable as your traffic grows.",
  },
  hero: {
    bg_color: "#661BCB",
    maintitle: "Server Management",
    title:
      "Ensure maximum uptime, security and performance with proactive server management solutions that optimize infrastructure, prevent disruptions, and support seamless business operations.",
    video: "/video/server_video.mp4",
  },
  statscards: [
    { count: "90", sysmbol: "%", heading: "Clientele" },
    { count: "99", sysmbol: "%", heading: "Satisfaction" },
    { count: "99", sysmbol: "%", heading: "Retention" },
  ],
  // about: {
  //   video: "/about_dummy_video.mp4",
  //   description:
  //     "Our server management services monitor, maintain, and optimize your infrastructure to deliver maximum uptime, security, and performance across on-premise and cloud environments.",
  // },

  // ─── Industries ───────────────────────────────────────────────
  industries: [
    {
      id: "Education",
      name: "Education",
      heading: "Learning Without Interruption",
      description:
        "Reliable server management solutions that keep learning platforms available, secure and high-performing, ensuring seamless educational experiences for students and educators.",
      buttonText: "Request solutions for Education",
      cards: [
        {
          title: "Building the Backbone of Modern Education",
          description: "Secure and high-performance server environments that maximize system availability, enhance collaboration, and keep educational institutions connected and productive.",
          variant: "default",
          span: "half",
        },
        {
          title: "Education Empowered",
          variant: "dark",
          span: "half",
        },
        {
          title: "Infrastructure That Inspires Learning",
          description: "Intelligent server management solutions designed to deliver exceptional reliability, enhanced security, and seamless digital experiences across modern educational environments.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Insurance",
      name: "Insurance",
      heading: "Powering Insurance Confidence",
      description:
        "Advanced infrastructure management that safeguards sensitive data, ensures business continuity, and delivers seamless experiences across every insurance touchpoint.",
      buttonText: "Request solutions for Insurance",
      cards: [
        {
          title: "Uninterrupted Protection",
          description: "Intelligent server management that keeps insurance platforms secure, available and high-performing, ensuring seamless service delivery and customer trust.",
          variant: "default",
          span: "half",
        },
        {
          title: "Assured Uptime",
          variant: "dark",
          span: "half",
        },
        {
          title: "Claims Always-On",
          description: "Reliable server management that ensures uninterrupted access to policy, claims and customer systems while maintaining the highest levels of security and performance.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "healthcare",
      name: "Healthcare",
      heading: "Care Without Downtime",
      description:
        "Proactive server management designed to deliver exceptional reliability, robust security, and continuous access to healthcare applications and patient services.",
      buttonText: "Request solutions for Healthcare",
      cards: [
        {
          title: "Powering Reliable Digital Healthcare",
          description: "Advanced server management solutions that maximize system uptime, strengthen security, and enable seamless access to healthcare applications and services.",
          variant: "default",
          span: "half",
        },
        {
          title: "Empowering Continuous Patient Care",
          variant: "dark",
          span: "half",
        },
        {
          title: "The Foundation of Connected Healthcare",
          description: "Intelligent server management that keeps healthcare platforms running smoothly, strengthens cybersecurity and enables dependable digital care delivery anytime, anywhere.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Travel",
      name: "Travel",
      heading: "The Engine Behind Every Journey",
      description:
        "Intelligent infrastructure solutions that maximize availability, safeguard critical travel data and power uninterrupted digital experiences across the travel lifecycle.",
      buttonText: "Request solutions for Travel",
      cards: [
        {
          title: "Journeys Without Downtime",
          description: "Reliable server management solutions that keep booking platforms, travel applications and customer services running seamlessly across every destination and time zone.",
          variant: "default",
          span: "half",
        },
        {
          title: "Seamless Journeys",
          variant: "dark",
          span: "half",
        },
        {
          title: "Powering Global Travel",
          description: "Intelligent server management that maximizes uptime, enhances security and supports exceptional digital experiences for travelers and travel businesses alike.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Public Sector",
      name: "Public Sector",
      heading: "Civic Systems Without Interruption",
      description:
        "Reliable server management that ensures public sector platforms remain secure, always available and capable of delivering essential government services without disruption.",
      buttonText: "Request solutions for Public Sector",
      cards: [
        {
          title: "Powering Public Services",
          description: "Proactive server management that maximizes uptime, strengthens resilience and enables reliable delivery of essential government services.",
          variant: "default",
          span: "half",
        },
        {
          title: "Digital Sovereignty",
          variant: "dark",
          span: "half",
        },
        {
          title: "Nationwide Reliability",
          description: "Advanced server management solutions that ensure uninterrupted public services, secure critical government systems and deliver seamless citizen experiences.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "retail",
      name: "Retail",
      heading: "Retail Momentum Engine",
      description:
        "Premium server management that powers uninterrupted commerce, ensuring ultra-fast performance, secure transactions and seamless shopping experiences across every digital touchpoint.",
      buttonText: "Request solutions for Retail",
      cards: [
        {
          title: "The Power Behind Every Purchase",
          description: "Enterprise-grade server management that drives exceptional reliability, peak operational performance and uninterrupted commerce in a digital-first world.",
          variant: "default",
          span: "half",
        },
        {
          title: "Retail Sovereignty",
          variant: "dark",
          span: "half",
        },
        {
          title: "Always-On Retail Excellence",
          description: "Mission-critical server infrastructure engineered to deliver seamless shopping experiences, protect valuable business data and sustain continuous growth.",
          variant: "accent",
          span: "full",
        },
      ],
    },
  ],

  tools: {
    heading: "Tools We Integrate",
    sub_heading: "Intelligent Infrastructure Excellence",
    description: "We help organizations achieve superior performance, strengthen security and maintain business continuity in a rapidly evolving digital landscape.",
    tool_logos: [
      { name: "AWS", src: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },
      { name: "Docker", src: "https://cdn.worldvectorlogo.com/logos/docker.svg" },
      { name: "Kubernetes", src: "https://cdn.worldvectorlogo.com/logos/kubernetes.svg" },
      { name: "Nginx", src: "https://cdn.worldvectorlogo.com/logos/nginx-1.svg" },
      { name: "Prometheus", src: "https://cdn.worldvectorlogo.com/logos/prometheus.svg" },
      { name: "Grafana", src: "https://cdn.worldvectorlogo.com/logos/grafana.svg" }
    ]
  },

  our_process: {
    main_icon: group,
    steps: [
      {
        id: "01",
        title: "Infrastructure Strategy & Discovery",
        icon: mask1,
      },
      {
        id: "02",
        title: "Architecture Design & Secure Deployment",
        icon: mask2,
      },
      {
        id: "03",
        title: "Performance Intelligence & Optimization",
        icon: mask3,
      },
      {
        id: "04",
        title: "Proactive Monitoring & Rapid Response",
        icon: mask4,
      },
      {
        id: "05",
        title: "Continuous Innovation & Infrastructure Growth",
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
      title: "Proactive Monitoring",
      desc: "We continuously monitor your servers 24/7. Ensuring quick issue detection and minimal downtime.",
      icon: "layers",
    },
    {
      num: "02",
      title: "High Performance Optimization",
      desc: "We fine-tune servers for speed and efficiency. Delivering smooth and reliable system performance.",
      icon: "activity",
    },
    {
      num: "03",
      title: "Strong Security Management",
      desc: "We implement advanced security measures and updates. Protecting your infrastructure from threats and vulnerabilities.",
      icon: "settings",
    },
    {
      num: "04",
      title: "Reliable Backup & Maintenance",
      desc: "We perform regular backups and system maintenance. Ensuring data safety and quick recovery when needed.",
      icon: "trending",
    },
    {
      num: "05",
      title: "Scalable Infrastructure Support",
      desc: "Our solutions adapt as your business grows. Supporting both cloud and on-premise environments.",
      icon: "grid",
    },
    {
      num: "06",
      title: "Expert Support Team",
      desc: "Our team provides continuous technical support. Keeping your servers stable, secure, and up-to-date.",
      icon: "shield",
    },
  ],

  faqs: [
    {
      question: "What is the delivery timeline for Server Management?",
      answer: "Timeline varies based on specific project requirements, typically ranging from 4 to 8 weeks for core phases."
    },
    {
      question: "How do you ensure quality and performance for Server Management?",
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
      question: "How do we get started with Server Management?",
      answer: "Contact us to arrange an initial consulting session where we'll discuss your requirements and build a detailed project roadmap."
    }
  ]
};

export default ServerManagement;