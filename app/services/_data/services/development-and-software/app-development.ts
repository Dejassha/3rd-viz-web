

import { ServicePageData } from "../../types";

import ModernCurtains from "@assets/images/serviceBanner/ModernCurtains.png";
import etthicksBanner from "@assets/images/serviceBanner/etthicksBanner.jpg";
import geekayBanner from "@assets/images/serviceBanner/geekayBanner.jpg";
import madrasBanner from "@assets/images/serviceBanner/madrasBanner.jpg";
import Mahavilvam from "@assets/images/serviceBanner/Mahavilvam.png";
import PetsWorld from "@assets/images/serviceBanner/PetsWorld.png";
import Furnicho from "@assets/images/serviceBanner/Furnicho.png";
import KT from "@assets/images/serviceBanner/KT.png";
import SET_Lms from "@assets/images/serviceBanner/SET_Lms.png";
import FootHarmony from "@assets/images/serviceBanner/FootHarmony.png";
import mojo from "@assets/images/serviceBanner/Mojo.png";
import Plotvizion from "@assets/images/serviceBanner/Plotvizion.png";
import SooriyaHospital from "@assets/images/serviceBanner/SooriyaHospital.png";
import Waystation from "@assets/images/serviceBanner/Waystation.png";
import Memory from "@assets/images/serviceBanner/Memory.png";
import FollowPath from "@assets/images/serviceBanner/FollowPath.png";
import The_Old_Maid from "@assets/images/serviceBanner/The_Old_Maid.png";
import crew from "@assets/images/serviceBanner/crew.png";
import Jacket from "@assets/images/serviceBanner/Jacket.png";
import Life_Raft from "@assets/images/serviceBanner/Life_Raft.png";
import Home_showcase from "@assets/images/serviceBanner/Home_showcase.png";
import Emergency from "@assets/images/serviceBanner/Emergency.png";
import Drone from "@assets/images/serviceBanner/Drone.png";
import SakthiLaserTech from "@assets/images/serviceBanner/SakthiLaserTech.png";
import Tarini from "@assets/images/serviceBanner/Tarini.png";
import Zoho_CRM from "@assets/images/serviceBanner/Zoho_CRM.png";
import Zoho_CuReMa from "@assets/images/serviceBanner/Zoho_CuReMa.png";
import Books from "@assets/images/serviceBanner/Books.png";
import group from "@assets/images/icons/Group 1000006186.png"
import mask1 from "@assets/images/icons/Mask Group (1).png"
import mask2 from "@assets/images/icons/Mask Group (2).png"
import mask3 from "@assets/images/icons/Mask Group (3).png"
import mask5 from "@assets/images/icons/Mask Group (5).png"
import mask4 from "@assets/images/icons/Mask Group (4).png"

const appDevelopment: ServicePageData = {
  themeColor: "#3B82F6",
  meta_data: {
    title: "Mobile App Development",
    description:
      "Custom iOS and Android apps for performance, usability, and scale. Third Vizion ships mobile products aligned with your business and user needs.",
  },
  hero: {
    bg_color: "#661BCB",
    maintitle: "Mobile Application Development",
    title:
      "Designs intuitive and high-performance mobile applications that deliver seamless user experiences, powerful functionality, and exceptional engagement across Android and iOS platforms.",
    video: "/video/App_Development.mp4",
  },
  statscards: [
    { count: "90", sysmbol: "%", heading: "Clientele" },
    { count: "99", sysmbol: "%", heading: "Satisfaction" },
    { count: "99", sysmbol: "%", heading: "Retention" },
  ],
  // about: {
  //   video: "/about_dummy_video.mp4",
  //   description:
  //     "We design and develop custom mobile applications that provide seamless user experiences. Fast, intuitive, and feature-rich, our apps are built to engage users, drive growth, and scale as your business expands.",
  // },

  // ─── Industries ───────────────────────────────────────────────
  industries: [
    {
      id: "Manufacturing",
      name: "Manufacturing",
      heading: "Manufacturing at Your Fingertips",
      description:
        "Empower teams with smart mobile applications that deliver real-time production insights, streamline workflows and enhance operational efficiency from anywhere.",
      buttonText: "Request solutions for Manufacturing",
      cards: [
        {
          title: "Connected Manufacturing Anywhere",
          description: "Transform factory operations with powerful mobile solutions that enable instant monitoring, faster decision-making and seamless workforce collaboration.",
          variant: "default",
          span: "half",
        },
        {
          title: "Driving Manufacturing Mobility",
          variant: "dark",
          span: "half",
        },
        {
          title: "Revolutionizing Manufacturing Through Mobility",
          description: "Build intelligent mobile experiences that connect teams, streamline production processes and unlock real-time visibility across your manufacturing ecosystem.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Education",
      name: "Education",
      heading: "Smart Learning Companion",
      description:
        "Next-generation education mobile applications that empower students and educators with real-time access, seamless communication and personalized learning experiences.",
      buttonText: "Request solutions for Education",
      cards: [
        {
          title: "Connected Learning Experiences",
          description: "Bringing students, teachers, and educational resources together through powerful mobile solutions that inspire continuous learning.",
          variant: "default",
          span: "half",
        },
        {
          title: "Mobile Education Hub",
          variant: "dark",
          span: "half",
        },
        {
          title: "Learning Without Limits",
          description: "Empowering students and educators through mobile applications that make learning accessible, interactive and engaging anytime, anywhere.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Insurance",
      name: "Insurance",
      heading: "Connected Policy Experience",
      description:
        "Modern insurance applications designed to simplify claims, improve communication and deliver personalized policy management experiences across all devices.",
      buttonText: "Request solutions for Insurance",
      cards: [
        {
          title: "Digital Insurance Companion",
          description: "Creating user-friendly mobile experiences that simplify insurance management and keep customers informed and connected.",
          variant: "default",
          span: "half",
        },
        {
          title: "Instant Insurance Access",
          variant: "dark",
          span: "half",
        },
        {
          title: "Protection on the Go",
          description: "Making insurance more accessible with mobile applications that provide instant access to policies, claims and support services.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "healthcare",
      name: "Healthcare",
      heading: "Care in Your Pocket",
      description:
        "Intuitive healthcare mobile applications that connect patients and providers, enabling seamless access to appointments, records and personalized care anytime, anywhere.",
      buttonText: "Request solutions for Healthcare",
      cards: [
        {
          title: "Digital Health Companion",
          description: "Delivering user-friendly mobile experiences that help patients manage their health while improving care coordination and engagement.",
          variant: "default",
          span: "half",
        },
        {
          title: "HealthTech Mobility",
          variant: "dark",
          span: "half",
        },
        {
          title: "Healthcare Beyond Boundaries",
          description: "Enabling seamless healthcare access through mobile applications that connect, inform and empower patients anytime and anywhere.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Travel",
      name: "Travel",
      heading: "Your Personal Travel Universe",
      description:
        "Intelligent travel apps designed to bring flights, hotels and experiences together in one place for smooth, stress-free journey management.",
      buttonText: "Request solutions for Travel",
      cards: [
        {
          title: "Journey Without Limits",
          description: "Bringing travel planning and exploration together through intuitive mobile apps designed for convenience and adventure.",
          variant: "default",
          span: "half",
        },
        {
          title: "Connected Travel Experiences",
          variant: "dark",
          span: "half",
        },
        {
          title: "Travel at Your Fingertips",
          description: "Empowering travelers with mobile applications that simplify trip planning, bookings and destination discovery anytime, anywhere.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Public Sector",
      name: "Public Sector",
      heading: "Digital Governance on Demand",
      description:
        "Next-generation public sector applications that simplify service delivery, enhance transparency and enable citizens to engage with the government anytime and anywhere.",
      buttonText: "Request solutions for Public Sector",
      cards: [
        {
          title: "Connected Communities",
          description: "Bringing citizens and public services together through innovative mobile solutions that enhance engagement and accessibility.",
          variant: "default",
          span: "half",
        },
        {
          title: "Public Services Simplified",
          variant: "dark",
          span: "half",
        },
        {
          title: "Digital Civic Access",
          description: "Connecting citizens to government programs and services through powerful mobile experiences designed for convenience and efficiency.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "retail",
      name: "Retail",
      heading: "Where Shopping Comes Alive",
      description:
        "Next-generation retail apps that blend personalization, instant access and engaging experiences to turn every interaction into a purchase opportunity.",
      buttonText: "Request solutions for Retail",
      cards: [
        {
          title: "Connected Shopping Experience",
          description: "Bringing customers and brands closer through mobile solutions designed for effortless browsing, buying, and engagement.",
          variant: "default",
          span: "half",
        },
        {
          title: "Mobile Commerce Excellence",
          variant: "dark",
          span: "half",
        },
        {
          title: "Retail Without Limits",
          description: "Transforming shopping through mobile applications that deliver convenience, engagement and seamless purchasing experiences.",
          variant: "accent",
          span: "full",
        },
      ],
    },
  ],

  tools: {
    heading: "Tools We Use",
    sub_heading: "Building Mobile Applications That Inspire",
    description: "Our solutions enhance customer engagement through intuitive interfaces, streamline business operations with seamless functionality and automation, and accelerate digital growth by enabling businesses to connect with users more effectively, improve productivity and unlock new opportunities in an increasingly mobile-driven world.",
    tool_logos: [
      { name: "ReactNative", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Flutter", src: "https://cdn.worldvectorlogo.com/logos/flutter.svg" },
      { name: "Swift", src: "https://cdn.worldvectorlogo.com/logos/swift-15.svg" },
      { name: "Kotlin", src: "https://cdn.worldvectorlogo.com/logos/kotlin-1.svg" },
      { name: "Xcode", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg" },
      { name: "Firebase", src: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg" }
    ]
  },

  our_process: {
    main_icon: group,
    steps: [
      {
        id: "01",
        title: "Discovery & Product Planning",
        icon: mask1,
      },
      {
        id: "02",
        title: "Design & User Journey Mapping",
        icon: mask2,
      },
      {
        id: "03",
        title: "Development & Functionality Integration",
        icon: mask3,
      },
      {
        id: "04",
        title: "Testing & Experience Refinement",
        icon: mask4,
      },
      {
        id: "05",
        title: "Launch & Growth Optimization",
        icon: mask5,
      },
    ]
  },

  projects: [

    { id: "01", title: "ModernCurtains", banner_image: ModernCurtains },
    { id: "02", title: "Et-Thicks", banner_image: etthicksBanner },
    { id: "03", title: "Geekay", banner_image: geekayBanner },
    { id: "04", title: "Madras Kitchen", banner_image: madrasBanner },
    { id: "05", title: "Mahavilvam", banner_image: Mahavilvam },
    { id: "06", title: "PetsWorld", banner_image: PetsWorld },
    { id: "07", title: "Furnicho", banner_image: Furnicho },
    { id: "08", title: "KT", banner_image: KT },
    { id: "09", title: "Lms", banner_image: SET_Lms },
    { id: "10", title: "FootHarmony", banner_image: FootHarmony },
    { id: "11", title: "Mojo", banner_image: mojo },
    { id: "12", title: "Plotvizion", banner_image: Plotvizion },
    { id: "13", title: "SooriyaHospital", banner_image: SooriyaHospital },
    { id: "14", title: "Waystation", banner_image: Waystation },
    { id: "15", title: "Memory", banner_image: Memory },
    { id: "16", title: "Follow Path", banner_image: FollowPath },
    { id: "17", title: "The Old Maid", banner_image: The_Old_Maid },
    { id: "18", title: "Muster Station", banner_image: crew },
    { id: "19", title: "Jacket", banner_image: Jacket },
    { id: "20", title: "Life Raft", banner_image: Life_Raft },
    { id: "21", title: "Interior Walk Through", banner_image: Home_showcase },
    { id: "22", title: "Fire Station", banner_image: Emergency },
    { id: "23", title: "Drone", banner_image: Drone },
    { id: "24", title: "Sakthi Laser Tech", banner_image: SakthiLaserTech },
    { id: "25", title: "Tarini", banner_image: Tarini },
    { id: "26", title: "Zoho CRM", banner_image: Zoho_CRM },
    { id: "27", title: "Patient Management", banner_image: Zoho_CuReMa },
    { id: "28", title: "Zoho Books", banner_image: Books }

  ],

  why_choose: [
    {
      num: "01",
      title: "User-Centric App Design",
      desc: "We create apps focused on user experience and engagement. Ensuring smooth navigation and higher user retention.",
      icon: "layers",
    },
    {
      num: "02",
      title: "Custom App Solutions",
      desc: "Every app is built based on your business goals. Delivering unique features tailored to your needs.",
      icon: "activity",
    },
    {
      num: "03",
      title: "High Performance & Speed",
      desc: "We develop fast, responsive, and reliable applications. Providing a seamless experience across devices.",
      icon: "settings",
    },
    {
      num: "04",
      title: "Cross-Platform Development",
      desc: "Apps are built for both iOS and Android platforms. Ensuring wider reach and consistent performance.",
      icon: "trending",
    },
    {
      num: "05",
      title: "Scalable & Secure Apps",
      desc: "Our apps are designed to grow with your business. Maintaining strong security and future readiness.",
      icon: "grid",
    },
    {
      num: "06",
      title: "Continuous Support & Updates",
      desc: "We provide ongoing maintenance and improvements. Keeping your app optimized and up to date.",
      icon: "shield",
    },
  ],

  faqs: [
    {
      question: "What is the delivery timeline for Mobile App Development?",
      answer: "Timeline varies based on specific project requirements, typically ranging from 4 to 8 weeks for core phases."
    },
    {
      question: "How do you ensure quality and performance for Mobile App Development?",
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
      question: "How do we get started with Mobile App Development?",
      answer: "Contact us to arrange an initial consulting session where we'll discuss your requirements and build a detailed project roadmap."
    }
  ]
};

export default appDevelopment;