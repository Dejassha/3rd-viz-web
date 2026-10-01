import { ServicePageData } from "../../types";


import Drone from "@assets/images/serviceBanner/Drone.png";
import Emergency from "@assets/images/serviceBanner/Emergency.png";
import Home_showcase from "@assets/images/serviceBanner/Home_showcase.png";
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

const VirtualReality: ServicePageData = {
  themeColor: "#2600E5",
  meta_data: {
    title: "Virtual Reality",
    description:
      "Immersive VR for training, marketing, safety, and learning. Third Vizion designs 3D environments and simulations tailored to your goals in Chennai and beyond.",
  },
  hero: {
    bg_color: "#661BCB",
    title:
      "Creates immersive digital experiences.Transforms learning, training, and entertainment. ",
    maintitle: "Virtual Reality",
    video: "/video/immersivetech.mp4",
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
  //   description: "High performance mobile apps for Android & iOS.",
  // },
   // ─── Industries ───────────────────────────────────────────────
  industries: [
        {
      id: "Manufacturing",
      name: "Manufacturing",
      heading: "Build Smarter. Train Faster. Manufacture Better.",
      description:
        "Leverage Virtual Reality to optimize production workflows, enhance employee training and visualize complex manufacturing environments before implementation.",
      buttonText: "Request solutions for Manufacturing",
      cards: [
        {
          title: "The Future of Manufacturing Starts in Virtual Reality",
          description: "Transform production with immersive training, digital factory simulations and risk-free process optimization.Empower teams to work smarter,safer, and more efficiently than ever before",
          variant: "default",
          span: "half",
        },
        {
          title: "Where Innovation Meets Production ",
          variant: "dark",
          span: "half",
        },
        {
          title: "Redefining Manufacturing Excellence with VR ",
          description: "From shop-floor training to virtual production planning, VR helps manufacturers reduce errors, improve safety, and accelerate operational performance. ",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "retail",
      name: "Retail",
      heading: "Step Into the Store of Tomorrow",
      description:
        "Leverage Virtual Reality to bridge the gap between digital and physical retail, offering immersive product discovery and personalized shopping journeys.",
      buttonText: "Request solutions for Retail",
      cards: [
        {
          title: "Immersive Shopping Experiences",
          description: "Interactive virtual experiences that help customers explore products, visualize purchases, and make confident buying decisions.",
          variant: "default",
          span: "half",
        },
        {
          title: " Retail Experience Revolution ",
          variant: "dark",
          span: "half",
        },
        {
          title: "Virtual Retail Discovery",
          description: "Immersive VR experiences that allow shoppers to browse collections, compare products, and enjoy personalized shopping journeys",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Education",
      name: "Education",
      heading: "Immersive Education,Limitless Possibilities",
      description:
        "Transforming learning with realistic virtual experiences that boost student engagement, enhance knowledge retention and bring subjects to life like never before",
      buttonText: "Request solutions for Education",
      cards: [
        {
          title: "Redefining Learning with Virtual Reality",
          description: "Immersive experiences that make learning more engaging, interactive, and memorable.",
          variant: "default",
          span: "half",
        },
        {
          title: "Interactive Learning Experiences",
          variant: "dark",
          span: "half",
        },
        {
          title: "Transforming Education",
          description: "Immersive virtual experiences that inspire students, enhance learning,and create engaging educational outcomes.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "healthcare",
      name: "Healthcare",
      heading: "The Future of Patient-Centred Care",
      description:
        "Harnessing Virtual Reality to create interactive therapeutic experiences, realistic medical simulations and innovative healthcare solutions that improve outcomes and satisfaction.",
      buttonText: "Request solutions for Healthcare",
      cards: [
        {
          title: "Advancing Healthcare Excellence Through Virtual Reality ",
          description: "It brings healthcare experiences to life through interactive simulations. It helps doctors learn better and patients recover with engaging virtual treatments. ",
          variant: "default",
          span: "half",
        },
        {
          title: "Interactive Healthcare Learning",
          variant: "dark",
          span: "half",
        },
        {
          title: "Transforming Patient Care ",
          description: "Immersive virtual experiences that empower patients, enhance engagement and elevate healthcare outcomes. ",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Insurance",
      name: "Insurance",
      heading: "Transforming Insurance Through Immersion",
      description:
        "Creating realistic virtual environments that enhance claims education, support risk assessment and deliver next-generation customer experiences.",
      buttonText: "Request solutions for Real Estate",
      cards: [
        {
          title: "Reimagining Insurance with Virtual Reality",
          description: "Immersive experiences that make insurance more engaging, interactive, and easy to understand.",
          variant: "default",
          span: "half",
        },
        {
          title: "Interactive Policies",
          variant: "dark",
          span: "half",
        },
        {
          title: "Smart Insurance Solutions",
          description: "Immersive VR experiences that simplify insurance processes,improve customer understanding,and enhance decision-making.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Travel",
      name: "Travel",
      heading: "Immersive Journeys,Endless Possibilities",
      description:
        "Transforming travel experiences through VR-powered destination previews that inspire confidence, enhance decision-making and create excitement before the journey begins.",
      buttonText: "Request solutions for Travel",
      cards: [
        {
          title: "Interactive Travel Planning ",
          description: "Immersive virtual experiences that help travelers explore destinations, compare options, and plan memorable journeys with confidence. ",
          variant: "default",
          span: "half",
        },
        {
          title: "Virtual Exploration",
          variant: "dark",
          span: "half",
        },
        {
          title: "Destination Discovery",
          description: "Immersive VR experiences that let travelers explore locations, visualize journeys, and choose their perfect travel adventure.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Public Sector",
      name: "Public Sector",
      heading: "Bringing Public Services to Life",
      description:
        "Leverage VR technology to create realistic and engaging experiences that help citizens explore government programs,infrastructure projects and community initiatives.",
      buttonText: "Request solutions for Public Sector",
      cards: [
        {
          title: "Citizen Engagement",
          description: "Immersive virtual experiences that help citizens understand public services, explore community initiatives, and engage with government programs.",
          variant: "default",
          span: "half",
        },
        {
          title: "Connected Communities in VR ",
          variant: "dark",
          span: "half",
        },
        {
          title: "Digital Governance Reimagined",
          description: "Transformative VR experiences that simplify public processes, improve citizen engagement, and strengthen trust in government services. ",
          variant: "accent",
          span: "full",
        },
      ],
    },
  ],
  tools: {
    heading: "Tools We Use",
    sub_heading: "Building Next-Generation Virtual Reality Solutions ",
    description: "Building Next-Generation Virtual Reality Solutions ",
    tool_logos: [
      { name: "Oculus", src: "https://cdn.worldvectorlogo.com/logos/oculus.svg" },
      { name: "Unity", src: "https://cdn.worldvectorlogo.com/logos/unity-technologies.svg" },
      { name: "Unreal", src: "https://cdn.worldvectorlogo.com/logos/unreal-engine-1.svg" },
      { name: "WebXR", src: "https://cdn.worldvectorlogo.com/logos/webxr.svg" },
      { name: "SteamVR", src: "https://cdn.worldvectorlogo.com/logos/steam-1.svg" },
      { name: "Blender", src: "https://cdn.worldvectorlogo.com/logos/blender-2.svg" }
    ]
  },

  our_process: {
    main_icon: group,
    steps: [
      {
      id: "01",
      title: "Discovery",
      icon: mask1,
    },
    {
      id: "02",
      title: "Experience Design",
      icon: mask2,
    },
    {
      id: "03",
      title: "Development",
      icon: mask3,
    },
    {
      id: "04",
      title: "Integration & Testing",
      icon: mask4,
    },
    {
      id: "05",
      title: "Launch & Support",
      icon: mask5,
    },
    ]
  },
  projects: [
    {id: "01", title: "Drone", banner_image: Drone },
    {id: "02", title: "Interior Walk Through", banner_image: Home_showcase },
    {id: "03", title: "Fire Station", banner_image: Emergency },
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
    { id: "24",  title: "Sakthi Laser Tech", banner_image: SakthiLaserTech },
    { id: "25",  title: "Tarini", banner_image: Tarini },
    { id: "26",  title: "Zoho CRM", banner_image: Zoho_CRM },
    { id: "27",  title: "Patient Management", banner_image: Zoho_CuReMa },
    { id: "28",  title: "Zoho Books", banner_image: Books },
  
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
      question: "What is the delivery timeline for Virtual Reality?",
      answer: "Timeline varies based on specific project requirements, typically ranging from 4 to 8 weeks for core phases."
    },
    {
      question: "How do you ensure quality and performance for Virtual Reality?",
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
      question: "How do we get started with Virtual Reality?",
      answer: "Contact us to arrange an initial consulting session where we'll discuss your requirements and build a detailed project roadmap."
    }
  ]
};

export default VirtualReality;
