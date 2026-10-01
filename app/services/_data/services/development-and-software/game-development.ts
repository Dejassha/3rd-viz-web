import { ServicePageData } from "../../types";

import Memory from "@assets/images/serviceBanner/Memory.png";
import FollowPath from "@assets/images/serviceBanner/FollowPath.png";
import The_Old_Maid from "@assets/images/serviceBanner/The_Old_Maid.png";
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

const GameDevelopment: ServicePageData = {
  themeColor: "#1AA8CB",
  meta_data: {
    title: "Game Development",
    description:
      "Games for mobile, web, and multiple platforms—from concept to polish. Third Vizion creates interactive, visually engaging titles for your audience.",
  },
  hero: {
    bg_color: "#661BCB",
    maintitle: "Game Development",
    title:
      "Creates immersive and engaging gaming experiences, bringing ideas to life through interactive storytelling, high-performance graphics, and seamless gameplay mechanics.",
    video: "/video/Game_Development.mp4",
  },
  statscards: [
    { count: "90", sysmbol: "%", heading: "Clientele" },
    { count: "99", sysmbol: "%", heading: "Satisfaction" },
    { count: "99", sysmbol: "%", heading: "Retention" },
  ],
  // about: {
  //   video: "/about_dummy_video.mp4",
  //   description:
  //     "We specialize in end-to-end game development for mobile, PC, and multi-platform experiences. From concept to launch, we blend creative storytelling, stunning visuals, and smooth gameplay.",
  // },

  // ─── Industries ───────────────────────────────────────────────
  industries: [
    {
      id: "Manufacturing",
      name: "Manufacturing",
      heading: "Building Skills Through Simulation",
      description:
        "Harness the power of game development to create realistic manufacturing scenarios that accelerate learning, improve decision-making, and enhance operational excellence.",
      buttonText: "Request solutions for Manufacturing",
      cards: [
        {
          title: "Manufacturing Meets Immersive Learning",
          description: "Reimagine workforce training with engaging game-based experiences that turn complex operations into interactive challenges, boosting skills, safety and productivity.",
          variant: "default",
          span: "half",
        },
        {
          title: "Train. Engage. Excel.",
          variant: "dark",
          span: "half",
        },
        {
          title: "Where Innovation Becomes Interaction",
          description: "Transform manufacturing training with engaging simulations and gamified experiences that enhance workforce readiness and maximize productivity.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Education",
      name: "Education",
      heading: "Gamifying the Future of Education",
      description:
        "Empowering learners with engaging game-driven experiences that make education more interactive, collaborative and effective while fostering creativity and critical thinking.",
      buttonText: "Request solutions for Education",
      cards: [
        {
          title: "Interactive Learning Game Experiences",
          description: "Transforming education through engaging game-based environments that inspire curiosity, strengthen knowledge retention and make learning enjoyable.",
          variant: "default",
          span: "half",
        },
        {
          title: "Digital Learning Quest",
          variant: "dark",
          span: "half",
        },
        {
          title: "Learning Through Play Excellence",
          description: "Creating dynamic game-based experiences that enhance critical thinking, skill development and long-term knowledge retention.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Insurance",
      name: "Insurance",
      heading: "Game-Powered Customer Engagement",
      description:
        "Transforming insurance experiences with gamified solutions that promote financial awareness, enhance policyholder interaction and build lasting customer loyalty.",
      buttonText: "Request solutions for Insurance",
      cards: [
        {
          title: "Insurance Game Innovation",
          description: "Turning complex insurance concepts into engaging interactive experiences that boost customer understanding, trust and informed decision-making.",
          variant: "default",
          span: "half",
        },
        {
          title: "Protection Powered by Play",
          variant: "dark",
          span: "half",
        },
        {
          title: "Policy Play Innovation",
          description: "Blending strategic gameplay with insurance knowledge to enhance customer engagement and strengthen financial protection awareness.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "healthcare",
      name: "Healthcare",
      heading: "Wellness Powered by Game Innovation",
      description:
        "Transforming patient care through immersive gaming solutions that encourage healthy behaviors, improve therapy adherence and enhance overall patient outcomes.",
      buttonText: "Request solutions for Healthcare",
      cards: [
        {
          title: "Immersive Healthcare Game Development",
          description: "Transforming patient care and medical training through interactive, gamified experiences that improve learning and engagement.",
          variant: "default",
          span: "half",
        },
        {
          title: "Gamified Medical Innovation",
          variant: "dark",
          span: "half",
        },
        {
          title: "Healthcare Game Innovation",
          description: "Blending interactive gameplay with medical science to make learning, treatment awareness and patient care more engaging and effective.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Travel",
      name: "Travel",
      heading: "Adventure Meets Interactive Gaming",
      description:
        "Gamified travel experiences inspire travelers to explore destinations, discover attractions, and plan journeys in a more engaging and immersive way. Interactive digital environments make travel planning exciting, personalized and memorable.",
      buttonText: "Request solutions for Travel",
      cards: [
        {
          title: "Interactive Travel Adventures",
          description: "Bringing destinations to life through immersive gameplay that inspires exploration and unforgettable travel experiences.",
          variant: "default",
          span: "half",
        },
        {
          title: "Travel Through Play",
          variant: "dark",
          span: "half",
        },
        {
          title: "Explore & Play",
          description: "Inspiring travelers with interactive experiences that make discovering new places fun, easy and memorable.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Public Sector",
      name: "Public Sector",
      heading: "Transforming Civic Engagement Through Gamification",
      description:
        "Empowering governments to connect with citizens through immersive digital experiences that drive participation, increase public awareness and foster stronger community engagement.",
      buttonText: "Request solutions for Public Sector",
      cards: [
        {
          title: "Community Play",
          description: "Creating fun and meaningful game experiences that connect citizens with public services and community initiatives.",
          variant: "default",
          span: "half",
        },
        {
          title: "Connect Through Play",
          variant: "dark",
          span: "half",
        },
        {
          title: "Citizen Connect",
          description: "Creating interactive experiences that help people discover, understand, and engage with public services effortlessly.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "retail",
      name: "Retail",
      heading: "Next-Generation Retail Engagement",
      description:
        "Blending gaming innovation with retail strategies to deliver immersive customer experiences that increase participation, enhance satisfaction and drive sustainable growth.",
      buttonText: "Request solutions for Retail",
      cards: [
        {
          title: "Retail Quest",
          description: "Turning shopping journeys into exciting adventures that increase customer interaction and strengthen brand loyalty.",
          variant: "default",
          span: "half",
        },
        {
          title: "Interactive Shopping",
          variant: "dark",
          span: "half",
        },
        {
          title: "Play to Shop",
          description: "Connecting customers with brands through interactive experiences that inspire discovery and drive engagement.",
          variant: "accent",
          span: "full",
        },
      ],
    },
  ],

  tools: {
    heading: "Tools We Use",
    sub_heading: "Crafting Immersive Gaming Experiences",
    description: "We leverage cutting-edge game engines and innovative design techniques to create engaging, high-performance gaming experiences across platforms and industries.",
    tool_logos: [
      { name: "Unity", src: "https://cdn.worldvectorlogo.com/logos/unity-technologies.svg" },
      { name: "Unreal", src: "https://cdn.worldvectorlogo.com/logos/unreal-engine-1.svg" },
      { name: "Blender", src: "https://cdn.worldvectorlogo.com/logos/blender-2.svg" },
      { name: "Maya", src: "https://cdn.worldvectorlogo.com/logos/autodesk-maya.svg" },
      { name: "CSharp", src: "https://cdn.worldvectorlogo.com/logos/c--4.svg" },
      { name: "WebGL", src: "https://cdn.worldvectorlogo.com/logos/webgl-1.svg" }
    ]
  },

  our_process: {
    main_icon: group,
    steps: [
      {
        id: "01",
        title: "Game Concept & Strategy",
        icon: mask1,
      },
      {
        id: "02",
        title: "Creative Design & World Building",
        icon: mask2,
      },
      {
        id: "03",
        title: "Game Development & Mechanics Integration",
        icon: mask3,
      },
      {
        id: "04",
        title: "Performance Optimization & Cross-Platform Testing",
        icon: mask4,
      },
      {
        id: "05",
        title: "Launch & Continuous Enhancement",
        icon: mask5,
      },
    ]
  },

  projects: [
    { id: "01", title: "Memory", banner_image: Memory },
    { id: "02", title: "Follow Path", banner_image: FollowPath },
    { id: "03", title: "The Old Maid", banner_image: The_Old_Maid },
    { id: "04", title: "Et-Thicks", banner_image: etthicksBanner },
    { id: "05", title: "Geekay", banner_image: geekayBanner },
    { id: "06", title: "Madras Kitchen", banner_image: madrasBanner },
    { id: "07", title: "Mahavilvam", banner_image: Mahavilvam },
    { id: "08", title: "Pets World", banner_image: PetsWorld },
    { id: "09", title: "Furnicho", banner_image: Furnicho },
    { id: "10", title: "KT", banner_image: KT },
    { id: "11", title: "SET Lms", banner_image: SET_Lms },
    { id: "12", title: "Foot Harmony", banner_image: FootHarmony },
    { id: "13", title: "Mojo", banner_image: mojo },
    { id: "14", title: "Plotvizion", banner_image: Plotvizion },
    { id: "15", title: "Sooriya Hospital", banner_image: SooriyaHospital },
    { id: "16", title: "Waystation", banner_image: Waystation },
    { id: "17", title: "Modern Curtains", banner_image: ModernCurtains },
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
    { id: "28", title: "Zoho Books", banner_image: Books },

  ],

  why_choose: [
    {
      num: "01",
      title: "Creative Game Design",
      desc: "We turn ideas into engaging and immersive game experiences. Blending storytelling with interactive gameplay.",
      icon: "layers",
    },
    {
      num: "02",
      title: "End-to-End Development",
      desc: "From concept to launch, we handle the complete process. Ensuring smooth execution at every stage.",
      icon: "activity",
    },
    {
      num: "03",
      title: "High-Quality Visuals",
      desc: "We create stunning graphics and rich game environments. Enhancing player engagement and realism.",
      icon: "settings",
    },
    {
      num: "04",
      title: "Smooth Performance",
      desc: "Our games are optimized for speed and stability. Delivering seamless gameplay across platforms.",
      icon: "trending",
    },
    {
      num: "05",
      title: "Multi-Platform Expertise",
      desc: "We develop games for mobile, PC, and multiple platforms. Expanding your reach to a wider audience.",
      icon: "grid",
    },
    {
      num: "06",
      title: "Ongoing Support & Updates",
      desc: "We provide continuous updates and improvements. Keeping your game fresh and competitive.",
      icon: "shield",
    },
  ],

  faqs: [
    {
      question: "What is the delivery timeline for Game Development?",
      answer: "Timeline varies based on specific project requirements, typically ranging from 4 to 8 weeks for core phases."
    },
    {
      question: "How do you ensure quality and performance for Game Development?",
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
      question: "How do we get started with Game Development?",
      answer: "Contact us to arrange an initial consulting session where we'll discuss your requirements and build a detailed project roadmap."
    }
  ]
};

export default GameDevelopment; 