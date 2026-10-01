import { ServicePageData } from "../../types";

import Zoho_CRM from "@assets/images/serviceBanner/Zoho_CRM.png";
import Zoho_CuReMa from "@assets/images/serviceBanner/Zoho_CuReMa.png";
import Books from "@assets/images/serviceBanner/Books.png";
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
import ModernCurtains from "@assets/images/serviceBanner/ModernCurtains.png";
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
import group from "@assets/images/icons/Group 1000006186.png"
import mask1 from "@assets/images/icons/Mask Group (1).png"
import mask2 from "@assets/images/icons/Mask Group (2).png"
import mask3 from "@assets/images/icons/Mask Group (3).png"
import mask5 from "@assets/images/icons/Mask Group (5).png"
import mask4 from "@assets/images/icons/Mask Group (4).png"

const CustomerRelationshipManagement: ServicePageData = {
  themeColor: "#FDB928",
  meta_data: {
    title: "CRM Solutions",
    description:
      "Manage customer data, streamline sales, and strengthen relationships. Third Vizion implements CRM systems tailored to your teams and reporting needs.",
  },

  hero: {
    bg_color: "#661BCB",
    maintitle: "Customer Relationship Management",
    title: "Streamline sales, support, and growth with powerful CRM solutions",
    video: "/video/CRM.mp4",
  },
  
  statscards: [
    {
      count: "90",
      sysmbol: "%",
      heading: "Clientele",
    },
    {
      count: "99",
      sysmbol: "%",
      heading: "Satisfaction",
    },
    {
      count: "99",
      sysmbol: "%",
      heading: "Retention",
    },
  ],
  
  // about: {
  //   video: "/about_dummy_video.mp4",
  //   description:
  //     "Our CRM solutions centralize customer data, automate workflows, and provide actionable insights that help teams improve engagement, sales efficiency, and long-term customer value.",
  // },

  // ─── Industries ───────────────────────────────────────────────
 industries: [
        {
      id: "Manufacturing",
      name: "Manufacturing",
      heading: "From Production to Customer Satisfaction",
      description:
        "Connect every customer touchpoint with intelligent CRM solutions that boost efficiency, improve communication and maximize customer loyalty.",
      buttonText: "Request solutions for Manufacturing",
      cards: [
        {
          title: "The Future of Customer-Centric Manufacturing",
          description: "Leverage CRM solutions to build stronger customer relationships, optimize sales processes and deliver seamless experiences that fuel business success.",
          variant: "default",
          span: "half",
        },
        {
          title: "Smarter Customer Connections",
          variant: "dark",
          span: "half",
        },
        {
          title: "Turning Customers into Long-Term Partners",
          description: "Harness the power of CRM  to unify customer data, accelerate decision-making and deliver personalized experiences that strengthen loyalty and boost revenue.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "retail",
      name: "Retail",
      heading: "Elevating Retail Experiences ",
      description:
       "Streamline retail operations through effective management of customers, sales activities, and shopping experiences.       ",
      buttonText: "Request solutions for Retail",
      cards: [
        {
          title: "Transform retail operations with intelligent CRM solutions ",
          description: "CRM empowers retail businesses to personalize customer experiences, boost sales performance, strengthen customer loyalty and drive sustainable business growth. ",
          variant: "default",
          span: "half",
        },
        {
          title: "Shopper Engagement and Brand Loyalty",
          variant: "dark",
          span: "half",
        },
        {
          title: "Customer Delight and Retail Excellence",
          description: "Deliver unforgettable shopping experiences through tailored recommendations, proactive support, and consistent engagement across every customer touchpoint.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Education",
      name: "Education",
      heading: "Empower educational institutions with powerful CRM solutions",
      description:
        "Modern educational institutions require seamless student management, effective communication, and streamlines operations. CRM solutions help strengthen student relationships, simplify admissions, improve engagement and support institutional growth through a unified platform.",
      buttonText: "Request solutions for Education",
      cards: [
        {
          title: "Student Management ",
          description: "Centralized platform for managing student records,admissions, attendance,and academic progress.",
          variant: "default",
          span: "half",
        },
        {
          title: "Seamless Admissions",
          variant: "dark",
          span: "half",
        },
        {
          title: "Engagement and Communication",
          description: "Build stronger connections through personalized communication with students, parents, and staff.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "healthcare",
      name: "Healthcare",
      heading: "Enhance patient engagement and care",
      description:
        "CRM helps healthcare providers manage patient relationships, streamline communication and deliver personalized care. ",
      buttonText: "Request solutions for Healthcare",
      cards: [
        {
          title: "Patient Management",
          description: "Centralized platform for managing patient records, appointments, and interactions. ",
          variant: "default",
          span: "half",
        },
        {
          title: "Automated Follow-Ups",
          variant: "dark",
          span: "half",
        },
        {
          title: "Patient Engagement",
          description: "Personalized communication to strengthen patient trust and satisfaction.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Insurance",
      name: "Insurance",
      heading: "Transform insurance operations with intelligent CRM solutions",
      description:
        "Insurance is growing fast, but increasing customer data and digital use also raises security risks. Companies must go beyond compliance to protect data, ensure privacy, maintain trust and support growth. ",
      buttonText: "Request solutions for Real Estate",
      cards: [
        {
          title: "Policy Management Seamless Renewals ",
          description: "Centralized platform for Automate policy renewals,managing customer records, premium reminders, and policies,claims, and customer follow-ups interactions.",
          variant: "default",
          span: "half",
        },
        {
          title: " Customer Engagement ",
          variant: "dark",
          span: "half",
        },
        {
          title: "Customer Retention and Loyalty ",
          description: "Build stronger connections with policy holders, agents, and partners through personalized and timely communication.  ",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Travel",
      name: "Travel",
      heading: "Elevate travel experiences with intelligent CRM solutions.",
      description:
        "CRM is transforming the travel industry by helping businesses manage customer journeys, bookings, and interactions from a single platform. As traveler expectations continue to evolve, travel companies must deliver personalized experiences, strengthen customer relationships, improve service efficiency and drive sustainable business growth.",
      buttonText: "Request solutions for Travel",
      cards: [
        {
          title: "Booking Management Seamless Travel Planning",
          description: "Centralized platform for automated booking updates,managing traveler records, itinerary management, and reservations, inquiries, and customer travel notifications.travel interactions.",
          variant: "default",
          span: "half",
        },
        {
          title: "Traveler Engagement and Loyalty",
          variant: "dark",
          span: "half",
        },
        {
          title: "Memorable Travel Experiences and Customer Loyalty",
          description: "Create lasting connections through personalized travel recommendations, proactive support and seamless communication across every journey.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Public Sector",
      name: "Public Sector",
      heading: "Connected Citizen Services",
      description:
        "Enhance citizen services through efficient management of public requests, communications, and service delivery. ",
      buttonText: "Request solutions for Public Sector",
      cards: [
        {
          title: "Transform public services with intelligent CRM solution",
          description: "CRM empowers public sector organizations to streamline citizen interactions, improve service delivery, enhance transparency, and build stronger community trust",
          variant: "default",
          span: "half",
        },
        {
          title: "Public Engagement and Service Excellence",
          variant: "dark",
          span: "half",
        },
        {
          title: "Exceptional Citizen Experiences and Community Confidence",
          description: "Foster public trust through personalized engagement.efficient service delivery, and proactive communication at every stage of the citizen journey.",
          variant: "accent",
          span: "full",
        },
      ],
    },
  ],

  tools: {
    heading: "Tools We Integrate",
    sub_heading: "Deliver secure, high - performance CRM solutions across all industries",
    description: "Secure, high-performance CRM solutions across all industries transform fragmented data into a cohesive strategy for sustained growth. By providing a unified view of every interaction, these systems empower teams to harness real-time insights and drive smarter, faster decision-making. ",
    tool_logos: [
      { name: "Salesforce", src: "logos:salesforce" },
      { name: "HubSpot", src: "logos:hubspot" },
      { name: "Zendesk", src: "logos:zendesk" },
      { name: "Zoho", src: "logos:zoho" },
      { name: "Pipedrive", src: "logos:pipedrive" },
      { name: "Dynamics", src: "logos:microsoft-icon" }
    ]
  },

  our_process: {
    main_icon: group,
    steps: [
      {
      id: "01",
      title: "Business & Sales Analysis",
      icon: mask1,
    },
    {
      id: "02",
      title: "CRM Planning & Design",
      icon: mask2,
    },
    {
      id: "03",
      title: "Custom Development",
      icon: mask3,
    },
    {
      id: "04",
      title: "Testing & Deployment",
      icon: mask4,
    },
    {
      id: "05",
      title: "Ongoing Optimization & Support",
      icon: mask5,
    },
    ]
  },

  projects: [
    {id: "01" , title: "Zoho CRM", banner_image: Zoho_CRM},
    {id: "02" , title: "Patient Management", banner_image: Zoho_CuReMa},
    {id: "03" , title: "Zoho Books", banner_image: Books},
    { id: "04", title: "Et-Thicks", banner_image: etthicksBanner },
    { id: "05", title: "Geekay", banner_image: geekayBanner },
    { id: "06", title: "Madras Kitchen", banner_image: madrasBanner },
    { id: "07", title: "Mahavilvam", banner_image: Mahavilvam },
    { id: "08", title: "PetsWorld", banner_image: PetsWorld },
    { id: "09", title: "Furnicho", banner_image: Furnicho },
    { id: "10", title: "KT", banner_image: KT },
    { id: "11", title: "Lms", banner_image: SET_Lms },
    { id: "12", title: "FootHarmony", banner_image: FootHarmony },
    { id: "13", title: "Mojo", banner_image: mojo },
    { id: "14", title: "Plotvizion", banner_image: Plotvizion },
    { id: "15", title: "SooriyaHospital", banner_image: SooriyaHospital },
    { id: "16", title: "Waystation", banner_image: Waystation },
    { id: "17", title: "Modern Curtains", banner_image: ModernCurtains },
    { id: "18", title: "Memory", banner_image: Memory },
    { id: "19", title: "Follow Path", banner_image: FollowPath },
    { id: "20", title: "The Old Maid", banner_image: The_Old_Maid },
    { id: "21",  title: "Muster Station", banner_image: crew },
    { id: "22",  title: "Jacket", banner_image: Jacket },
    { id: "23",  title: "Life Raft", banner_image: Life_Raft },
    { id: "24",  title: "Interior Walk Through", banner_image: Home_showcase },
    { id: "25",  title: "Fire Station", banner_image: Emergency },
    { id: "26",  title: "Drone", banner_image: Drone }, 
    { id: "27",  title: "Sakthi Laser Tech", banner_image: SakthiLaserTech },
    { id: "28",  title: "Tarini", banner_image: Tarini },
  ],

  why_choose: [
    {
      num: "01",
      title: "Smart & Scalable Solutions",
      desc: "We build cloud and CRM systems that grow with your business. Ensuring flexibility, scalability, and long-term efficiency.",
      icon: "user",
    },
    {
      num: "02",
      title: "Data-Driven Approach",
      desc: "We turn your data into meaningful insights. Helping you make smarter business decisions faster.",
      icon: "activity",
    },
    {
      num: "03",
      title: "Customized CRM Development",
      desc: "Every CRM is tailored to your sales process and workflow. Improving team productivity and customer management.",
      icon: "dashboard",
    },
    {
      num: "04",
      title: "Automation & Efficiency",
      desc: "We automate repetitive tasks and streamline operations. Saving time and increasing overall performance.",
      icon: "file",
    },
    {
      num: "05",
      title: "Secure & Reliable Systems",
      desc: "We ensure high-level data security and system stability. Keeping your business data safe and accessible anytime.",
      icon: "chat",
    },
    {
      num: "06",
      title: "Continuous Support & Growth",
      desc: "We provide ongoing updates and optimization. Helping your system evolve with your business needs.",
      icon: "shield",
    },
  ],
  faqs: [
    {
      question: "What is a CRM and why does my business need it?",
      answer: "A Customer Relationship Management (CRM) system unifies customer information, automates sales pipelines, and provides insights to help your business build stronger customer relationships."
    },
    {
      question: "Can you integrate the CRM with our existing website and third-party systems?",
      answer: "Yes, we integrate CRMs with websites, marketing automation platforms, payment gateways, and other legacy systems using custom REST/GraphQL APIs."
    },
    {
      question: "How secure is customer data within the CRM?",
      answer: "We enforce strict security measures including end-to-end encryption, multi-factor authentication (MFA), role-based access control (RBAC), and regular compliance audits."
    },
    {
      question: "Is a custom CRM better than off-the-shelf platforms?",
      answer: "A custom CRM is designed around your specific business processes, avoiding bloat and licensing fees while delivering maximum efficiency."
    },
    {
      question: "Do you provide training and post-launch support?",
      answer: "Yes, we provide full onboarding sessions for your staff and ongoing maintenance plans to keep your CRM optimized."
    }
  ]
};

export default CustomerRelationshipManagement;