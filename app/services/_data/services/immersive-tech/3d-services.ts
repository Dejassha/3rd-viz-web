import { ServicePageData } from "../../types";

import Drone from "@assets/images/serviceBanner/Drone.png";
import Emergency from "@assets/images/serviceBanner/Emergency.png";
import crew from "@assets/images/serviceBanner/crew.png";
import Jacket from "@assets/images/serviceBanner/Jacket.png";
import Home_showcase from "@assets/images/serviceBanner/Home_showcase.png";
import Life_Raft from "@assets/images/serviceBanner/Life_Raft.png";
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


const ThreeDServices: ServicePageData = {
  themeColor: "#E57A00",
  meta_data: {
    title: "3D Services",
    description:
      "3D modeling, rendering, and visualization for products, architecture, and industries. Third Vizion delivers assets you can use across web, print, and experiences.",
  },
  hero: {
    bg_color: "#661BCB",
    title: "Delivering immersive 3D solutions that transform concepts into realistic visuals,driving innovation, engagement, and confident decision-making. ",
    maintitle: "3D Services",
    video: "/video/3D_Service.mp4",
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
  //   video: "/3d_Service.mp4",
  //   description: "High performance mobile apps for Android & iOS.",
  // },
  // ─── Industries ───────────────────────────────────────────────
  industries: [
    {
      id: "Manufacturing",
      name: "Manufacturing",
      heading: "Engineering the Future in 3D",
      description:
        "Leverage immersive 3D experiences to streamline design validation, improve collaboration and reduce costly manufacturing errors before production begins.",
      buttonText: "Request solutions for Manufacturing",
      cards: [
        {
          title: "Precision Beyond the Blueprint",
          description: "Unlock the power of 3D visualization to refine designs, enhance product accuracy and bring manufacturing concepts to market with confidence.",
          variant: "default",
          span: "half",
        },
        {
          title: "Design Smarter. Manufacture Better.",
          variant: "dark",
          span: "half",
        },
        {
          title: "Visualize Innovation Deliver Excellence ",
          description: "Create detailed 3D representations of products and processes that empower faster decision-making, improved quality, and seamless manufacturing workflows.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "retail",
      name: "Retail",
      heading: "See Before You Shop",
      description:
        "Interactive 3D retail solutions that transform product discovery into an engaging experience, improving confidence and boosting conversion rates.",
      buttonText: "Request solutions for Retail",
      cards: [
        {
          title: "The Future of Product Discovery",
          description: "Delivering immersive 3D interactions that elevates engagement and transforms  the buying journey. ",
          variant: "default",
          span: "half",
        },
        {
          title: "Visual Shopping Excellence ",
          variant: "dark",
          span: "half",
        },
        {
          title: "3D-Powered Retail Engagement",
          description: "Enhancing customer experiences with dynamic product visualization that inspires trust and drive conversions. ",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Education",
      name: "Education",
      heading: "3D Learning Experience",
      description:
        "Transforming education through immersive 3D visualization that enhances understanding, increases engagement, and makes complex concepts easier to learn and retain.",
      buttonText: "Request solutions for Education",
      cards: [
        {
          title: "Learning Beyond Boundaries",
          description: "Creating immersive 3D learning environments that transform abstract concepts into engaging visual experiences for deeper understanding.",
          variant: "default",
          span: "half",
        },
        {
          title: "Visual Learning Revolution ",
          variant: "dark",
          span: "half",
        },
        {
          title: "Knowledge Brought to Life",
          description: "Turning complex lessons into captivating 3D experiences that spark curiosity and enhance learning outcomes.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "healthcare",
      name: "Healthcare",
      heading: "Next-Generation Clinical Visualization",
      description:
        "Cutting-edge 3D technologies that help healthcare providers deliver clearer insights, strengthen patient trust, and elevate overall care experience through immersive visuals.",
      buttonText: "Request solutions for Healthcare",
      cards: [
        {
          title: "Interactive Healthcare Innovation",
          description: "Bringing medical data and proceduresto life through immersive 3D experiences that enhances learning, collaboration, and treatment planning.",
          variant: "default",
          span: "half",
        },
        {
          title: "Bringing Medicine to Life  ",
          variant: "dark",
          span: "half",
        },
        {
          title: "Advanced Medical 3D Experiences",
          description: "Transforming healthcare with interactive 3D visualizations that simplify complex medical concepts and support better patient outcomes.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Insurance",
      name: "Insurance",
      heading: "Insurance in Living 3D",
      description:
        "Immersive 3D experiences that simplify policy structures, visualize claim journeys and make complex insurance concepts easy to understand and trust.",
      buttonText: "Request solutions for Real Estate",
      cards: [
        {
          title: "Insurance Visualized in 3D",
          description: "Transforming complex policies into interactive 3D experiences that improve understanding and support confident decision-making.",
          variant: "default",
          span: "half",
        },
        {
          title: " Policy Insights in 3D",
          variant: "dark",
          span: "half",
        },
        {
          title: "Smarter Insurance Experiences",
          description: "Enabling customers to explore insurance concepts through engaging 3D environments that simplify choices and build trust.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Travel",
      name: "Travel",
      heading: "See the World Before You Go",
      description:
        "Interactive 3D travel solutions that transform trip planning into an immersive experience, making destination discovery more engagingand inspiring.",
      buttonText: "Request solutions for Travel",
      cards: [
        {
          title: "Virtual Journeys, Real Adventures ",
          description: "Transforming travel exploration with engaging 3D visualizations that inspire travelers and enhance decision-making before every trip.",
          variant: "default",
          span: "half",
        },
        {
          title: " Explore Beyond Reality",
          variant: "dark",
          span: "half",
        },
        {
          title: "Travel Experiences Reimagined",
          description: "Enabling travelers to discover locations, attractions, and accommodations through immersive 3D environments that create excitement and trust.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Public Sector",
      name: "Public Sector",
      heading: "Civic Immersion",
      description:
        "Transforming public sector communication through immersive 3D experiences that enhance transparency, simplify services and strengthen citizen understanding.",
      buttonText: "Request solutions for Public Sector",
      cards: [
        {
          title: "Digital Governance Visualization",
          description: "Transforming complex public  information into intuitive 3D experiences that improve accessibility and understanding. ",
          variant: "default",
          span: "half",
        },
        {
          title: "Connected Communities in 3D",
          variant: "dark",
          span: "half",
        },
        {
          title: "Immersive Public Sector Innovation",
          description: "Empowering governments with interactive 3D solutions that strengthen communication and citizen trust. ",
          variant: "accent",
          span: "full",
        },
      ],
    },
  ],
  tools: {
    heading: "Tools We Use",
    sub_heading: "Powering Next-Generation 3D Visualization",
    description: "Our advanced 3D solutions combine realistic design, interactive experiences, and innovative visualization technologies to help organizations present ideas with greater precision. We enablebusinesses to improve collaboration, enhance customer experiences, and unlock new opportunities through immersive digital storytelling. ",
    tool_logos: [
      { name: "Blender", src: "https://cdn.worldvectorlogo.com/logos/blender-2.svg" },
      { name: "ZBrush", src: "https://cdn.worldvectorlogo.com/logos/pixologic-zbrush.svg" },
      { name: "Substance", src: "https://cdn.worldvectorlogo.com/logos/substance-painter.svg" },
      { name: "ThreeJS", src: "https://cdn.worldvectorlogo.com/logos/three-js-1.svg" },
      { name: "Maya", src: "https://cdn.worldvectorlogo.com/logos/autodesk-maya.svg" },
      { name: "WebGL", src: "https://cdn.worldvectorlogo.com/logos/webgl-1.svg" }
    ]
  },

  our_process: {
    main_icon: group,
    steps: [
      {
        id: "01",
        title: "Input Analysis",
        icon: mask1,
      },
      {
        id: "02",
        title: "3D Modeling",
        icon: mask2,
      },
      {
        id: "03",
        title: "Materials & Texturing",
        icon: mask3,
      },
      {
        id: "04",
        title: "Rendering & Enhancement",
        icon: mask4,
      },
      {
        id: "05",
        title: "Optimization & Delivery",
        icon: mask5,
      },
    ]
  },
  projects: [
    { id: "01", title: "Drone", banner_image: Drone },
    { id: "02", title: "Fire Station", banner_image: Emergency },
    { id: "03", title: "Muster Station", banner_image: crew },
    { id: "04", title: "Jacket", banner_image: Jacket },
    { id: "05", title: "Interior Walk Through", banner_image: Home_showcase },
    { id: "06", title: "Life Raft", banner_image: Life_Raft },
    { id: "07", title: "Et-Thicks", banner_image: etthicksBanner },
    { id: "08", title: "Geekay", banner_image: geekayBanner },
    { id: "09", title: "Madras Kitchen", banner_image: madrasBanner },
    { id: "10", title: "Mahavilvam", banner_image: Mahavilvam },
    { id: "11", title: "PetsWorld", banner_image: PetsWorld },
    { id: "12", title: "Furnicho", banner_image: Furnicho },
    { id: "13", title: "KT", banner_image: KT },
    { id: "14", title: "Lms", banner_image: SET_Lms },
    { id: "15", title: "FootHarmony", banner_image: FootHarmony },
    { id: "16", title: "Mojo", banner_image: mojo },
    { id: "17", title: "Plotvizion", banner_image: Plotvizion },
    { id: "18", title: "SooriyaHospital", banner_image: SooriyaHospital },
    { id: "19", title: "Waystation", banner_image: Waystation },
    { id: "20", title: "Modern Curtains", banner_image: ModernCurtains },
    { id: "21", title: "Memory", banner_image: Memory },
    { id: "22", title: "Follow Path", banner_image: FollowPath },
    { id: "23", title: "The Old Maid", banner_image: The_Old_Maid },
    { id: "24", title: "Sakthi Laser Tech", banner_image: SakthiLaserTech },
    { id: "25", title: "Tarini", banner_image: Tarini },
    { id: "26", title: "Zoho CRM", banner_image: Zoho_CRM },
    { id: "27", title: "Patient Management", banner_image: Zoho_CuReMa },
    { id: "28", title: "Zoho Books", banner_image: Books }
  ],
  why_choose: [
    {
      num: "01",
      title: "High-Quality Visuals",
      desc: "We deliver photorealistic 3D models and renders that enhance brand perception and customer engagement.",
      icon: "sparkles",
    },
    {
      num: "02",
      title: "Industry-Specific Expertise",
      desc: "From real estate to e-commerce and gaming, we create tailored 3D solutions for different industries.",
      icon: "layers",
    },
    {
      num: "03",
      title: "End-to-End Solutions",
      desc: "From concept to final rendering and animation, we handle the complete 3D production pipeline.",
      icon: "grid",
    },
    {
      num: "04",
      title: "Optimized Performance",
      desc: "Our 3D assets are optimized for web, mobile, AR/VR, and real-time applications without compromising quality.",
      icon: "activity",
    },
    {
      num: "05",
      title: "Fast Turnaround",
      desc: "Efficient workflows ensure timely delivery while maintaining high-quality output.",
      icon: "trending",
    },
    {
      num: "06",
      title: "Scalable & Flexible",
      desc: "Whether it’s a single model or large-scale 3D production, our solutions scale with your needs.",
      icon: "settings",
    },
  ],
  faqs: [
    {
      question: "What is the delivery timeline for 3D Services?",
      answer: "Timeline varies based on specific project requirements, typically ranging from 4 to 8 weeks for core phases."
    },
    {
      question: "How do you ensure quality and performance for 3D Services?",
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
      question: "How do we get started with 3D Services?",
      answer: "Contact us to arrange an initial consulting session where we'll discuss your requirements and build a detailed project roadmap."
    }
  ]
};

export default ThreeDServices;
