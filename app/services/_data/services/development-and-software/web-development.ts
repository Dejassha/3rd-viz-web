

import { ServicePageData } from "../../types";

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
import Zoho_CRM from "@assets/images/serviceBanner/Zoho_CRM.png";
import Zoho_CuReMa from "@assets/images/serviceBanner/Zoho_CuReMa.png";
import Books from "@assets/images/serviceBanner/Books.png";
import group from "@assets/images/icons/Group 1000006186.png"
import mask1 from "@assets/images/icons/Mask Group (1).png"
import mask2 from "@assets/images/icons/Mask Group (2).png"
import mask3 from "@assets/images/icons/Mask Group (3).png"
import mask5 from "@assets/images/icons/Mask Group (5).png"
import mask4 from "@assets/images/icons/Mask Group (4).png"

const webDevelopment: ServicePageData = {
  themeColor: "#CB1A1A",
  meta_data: {
    title: "Web Development",
    description:
      "Modern, responsive websites built for speed and engagement. Third Vizion takes projects from discovery and UX through development, launch, and ongoing improvements.",
  },
  hero: {
    bg_color: "#000000",
    maintitle: "Website Development",
    title:
      "Create engaging, high-performance websites that combine stunning design, seamless functionality, and exceptional user experiences. Our website development solutions help businesses strengthen their digital presence, enhance customer engagement, and drive measurable growth.",
    video: "/video/Web.mp4",
  },
  statscards: [
    { count: "90", sysmbol: "%", heading: "Clientele" },
    { count: "99", sysmbol: "%", heading: "Satisfaction" },
    { count: "99", sysmbol: "%", heading: "Retention" },
  ],
  // about: {
  //   video: "/about_dummy_video.mp4",
  //   description:
  //     "At ThirdVizion Labs, we create custom websites designed to convert visitors into loyal customers. Fast, responsive, and optimized for SEO, our websites work 24/7 for your business.",
  // },

  // ─── Industries ───────────────────────────────────────────────
  industries: [
    {
      id: "Education",
      name: "Education",
      heading: "Inspiring Digital Learning",
      description:
        "Engaging educational websites that connect students, educators and institutions through seamless experiences that enhance learning and academic engagement.",
      buttonText: "Request solutions for Education",
      cards: [
        {
          title: "Empowering Education Online",
          description: "Modern website solutions that enhance academic visibility, streamline communication and deliver seamless learning experiences across every digital touchpoint.",
          variant: "default",
          span: "half",
        },
        {
          title: "Academic Distinction",
          variant: "dark",
          span: "half",
        },
        {
          title: "Academic Excellence, Digitally Delivered",
          description: "Elegant and high-performance websites that attract, engage and inspire learners while reflecting the credibility, vision and excellence of modern educational institutions.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Insurance",
      name: "Insurance",
      heading: "Confidence in Every Click",
      description:
        "Purpose-built insurance websites designed to enhance customer engagement, strengthen brand credibility, and deliver effortless digital journeys.",
      buttonText: "Request solutions for Insurance",
      cards: [
        {
          title: "Trust Built Digitally",
          description: "Premium insurance websites crafted to inspire confidence, simplify policy management and deliver seamless customer experiences that strengthen long-term relationships.",
          variant: "default",
          span: "half",
        },
        {
          title: "Coverage Connected",
          variant: "dark",
          span: "half",
        },
        {
          title: "The Future of Insurance Experience",
          description: "Intelligent website solutions that transform complex insurance processes into intuitive digital journeys, enhancing engagement, trust and customer satisfaction.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "healthcare",
      name: "Healthcare",
      heading: "Healthcare, Beautifully Connected",
      description:
        "Modern website solutions that enhance patient engagement, streamline access to care, and deliver seamless digital experiences across every touchpoint.",
      buttonText: "Request solutions for Healthcare",
      cards: [
        {
          title: "Digital Front Door to Better Care",
          description: "Engaging healthcare websites designed to connect patients with providers, enhance accessibility, and deliver seamless digital experiences across every touchpoint.",
          variant: "default",
          span: "half",
        },
        {
          title: "Health Gateway",
          variant: "dark",
          span: "half",
        },
        {
          title: "Healthcare Without Barriers",
          description: "Intuitive and responsive website solutions that improve patient engagement, strengthen digital presence, and support exceptional healthcare experiences.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Travel",
      name: "Travel",
      heading: "Explore. Discover. Book.",
      description:
        "Purpose-built travel websites designed to inspire exploration, enhance customer engagement, and deliver frictionless travel experiences from search to booking.",
      buttonText: "Request solutions for Travel",
      cards: [
        {
          title: "Inspiring Every Journey",
          description: "Premium travel website solutions that showcase destinations beautifully, enhance customer engagement and deliver seamless booking experiences across every device.",
          variant: "default",
          span: "half",
        },
        {
          title: "Boundless Journeys",
          variant: "dark",
          span: "half",
        },
        {
          title: "The Gateway to Extraordinary Travel",
          description: "High-performance travel websites that combine stunning visuals, intuitive navigation and personalized experiences to drive bookings and build traveller loyalty.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Public Sector",
      name: "Public Sector",
      heading: "Digital Democracy",
      description:
        "Transform citizen engagement with intuitive digital experiences that make public services more accessible, transparent, and responsive to community needs.",
      buttonText: "Request solutions for Public Sector",
      cards: [
        {
          title: "Connecting Citizens Digitally",
          description: "Intuitive government website solutions that improve accessibility, simplify service delivery and foster stronger connections between institutions and communities.",
          variant: "default",
          span: "half",
        },
        {
          title: "Citizen-Centric Excellence",
          variant: "dark",
          span: "half",
        },
        {
          title: "The Future of Citizen Services",
          description: "Purpose-built public sector websites that combine innovation, accessibility and trust to create meaningful digital experiences for every citizen.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "retail",
      name: "Retail",
      heading: "Elevating Every Shopping Journey",
      description:
        "Modern retail websites that blend stunning design, seamless navigation and personalized experiences to drive customer loyalty and increase conversions.",
      buttonText: "Request solutions for Retail",
      cards: [
        {
          title: "The Future of Retail Online",
          description: "High-performance retail websites that empower brands to attract, engage and convert customers through immersive and frictionless digital experiences.",
          variant: "default",
          span: "half",
        },
        {
          title: "Retail Without Limits",
          variant: "dark",
          span: "half",
        },
        {
          title: "The Art of Digital Retail",
          description: "Premium eCommerce platforms crafted to showcase your brand with elegance, engage modern shoppers and transform every visit into a meaningful customer relationship.",
          variant: "accent",
          span: "full",
        },
      ],
    },
  ],

  tools: {
    heading: "Tools We Use",
    sub_heading: "Crafting Exceptional Digital Experiences",
    description: "We build sophisticated web experiences that unite elegant design, seamless functionality and modern technology to create lasting impressions, strengthen brand value and drive meaningful customer engagement.",
    tool_logos: [
      { name: "NextJS", src: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
      { name: "React", src: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
      { name: "TypeScript", src: "https://cdn.worldvectorlogo.com/logos/typescript.svg" },
      { name: "TailwindCSS", src: "https://cdn.worldvectorlogo.com/logos/tailwindcss-3.svg" },
      { name: "Vercel", src: "https://cdn.worldvectorlogo.com/logos/vercel.svg" },
      { name: "NodeJS", src: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" }
    ]
  },

  our_process: {
    main_icon: group,
    steps: [
      {
        id: "01",
        title: "Digital Discovery & Strategy",
        icon: mask1,
      },
      {
        id: "02",
        title: "Experience Design & Architecture",
        icon: mask2,
      },
      {
        id: "03",
        title: "Custom Development & Integration",
        icon: mask3,
      },
      {
        id: "04",
        title: "Testing, Optimization & Launch",
        icon: mask4,
      },
      {
        id: "05",
        title: "Continuous Innovation & Growth",
        icon: mask5,
      },
    ]
  },

  projects: [
    { id: "02", title: "Et-Thicks", banner_image: etthicksBanner, },
    { id: "01", title: "Geekay", banner_image: geekayBanner, },
    {
      id: "03", title: "Madras Kitchen", banner_image: madrasBanner,

    },
    { id: "04", title: "Mahavilvam", banner_image: Mahavilvam },
    { id: "05", title: "PetsWorld", banner_image: PetsWorld },
    { id: "06", title: "Furnicho", banner_image: Furnicho },
    { id: "07", title: "KT", banner_image: KT },
    { id: "08", title: "Lms", banner_image: SET_Lms },
    { id: "09", title: "FootHarmony", banner_image: FootHarmony },
    { id: "10", title: "Mojo", banner_image: mojo },
    { id: "11", title: "Plotvizion", banner_image: Plotvizion },
    { id: "12", title: "SooriyaHospital", banner_image: SooriyaHospital },
    { id: "13", title: "Waystation", banner_image: Waystation },
    { id: "14", title: "Modern Curtains", banner_image: ModernCurtains },
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
      title: "Conversion-Focused Design",
      desc: "We build websites designed to turn visitors into customers. Helping your business generate real results online.",
      icon: "layers",
    },
    {
      num: "02",
      title: "Custom-Built Solutions",
      desc: "Every website is tailored to your brand and goals. Ensuring a unique and impactful digital presence.",
      icon: "activity",
    },
    {
      num: "03",
      title: "Ongoing Support & Optimization",
      desc: "We continuously improve performance after launch. Keeping your website effective and up to date.",
      icon: "settings",
    },
    {
      num: "04",
      title: "Fast & Responsive Performance",
      desc: "We develop websites that load quickly and work on all devices. Providing a smooth user experience across platforms.",
      icon: "trending",
    },
    {
      num: "05",
      title: "SEO-Optimized Structure",
      desc: "Our websites are built with search engine best practices. Helping you rank better and attract more traffic.",
      icon: "grid",
    },
    {
      num: "06",
      title: "Scalable & Secure Development",
      desc: "We ensure your website is secure and ready to grow. Supporting future updates and business expansion.",
      icon: "shield",
    },
  ],

  faqs: [
    {
      question: "What technologies do you use for web development?",
      answer: "We build fast, secure, and modern websites using React, Next.js, TypeScript, Tailwind CSS, Node.js, and modern CMS platforms."
    },
    {
      question: "Will my website be mobile-responsive?",
      answer: "Absolutely. All our websites are designed first for responsiveness, ensuring optimal layout and performance across mobile, tablet, and desktop viewports."
    },
    {
      question: "Do you optimize websites for SEO?",
      answer: "Yes, we implement structural SEO best practices including semantic HTML, meta tags, schema markup, and speed optimizations."
    },
    {
      question: "Can you integrate custom payment gateways?",
      answer: "Yes, we integrate secure payment platforms like Stripe, PayPal, and regional gateways to support transactions."
    },
    {
      question: "How do you handle website maintenance after launch?",
      answer: "We offer ongoing support packages covering security patches, backups, hosting management, and content updates."
    }
  ]
};

export default webDevelopment;
