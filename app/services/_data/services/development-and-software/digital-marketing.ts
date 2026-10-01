

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

const DigitalMarketing: ServicePageData = {
  themeColor: "#F38540",
  meta_data: {
    title: "Digital Marketing",
    description:
      "Data-driven marketing to grow visibility, leads, and conversions. Third Vizion combines strategy, creative, and analytics so campaigns map to business outcomes.",
  },
  hero: {
    bg_color: "#661BCB",
    maintitle: "Digital Marketing",
    title:
      "Accelerate brand growth with data-driven digital marketing strategies that maximize visibility, engagement, and customer acquisition.",
    video: "/video/devolopement.mp4",
  },
  statscards: [
    { count: "90", sysmbol: "%", heading: "Clientele" },
    { count: "99", sysmbol: "%", heading: "Satisfaction" },
    { count: "99", sysmbol: "%", heading: "Retention" },
  ],
  // about: {
  //   video: "/about_dummy_video.mp4",
  //   description:
  //     "Our digital marketing solutions combine data-driven strategies, creative content, and the latest marketing tools to deliver real business results. From SEO and social media to paid ads and performance analytics, we focus on visibility, engagement, and ROI at every stage.",
  // },

  // ─── Industries ───────────────────────────────────────────────
  industries: [
    {
      id: "Education",
      name: "Education",
      heading: "Learning Growth in the Digital Era",
      description:
        "Strategic digital marketing solutions that help educational institutions attract students, strengthen brand visibility and enhance engagement across every digital platform.",
      buttonText: "Request solutions for Education",
      cards: [
        {
          title: "Inspiring Learners, Expanding Reach",
          description: "Empower educational institutions with strategic digital marketing campaigns that increase visibility, boost enrollments and strengthen brand presence.",
          variant: "default",
          span: "half",
        },
        {
          title: "Attracting Tomorrow's Achievers",
          variant: "dark",
          span: "half",
        },
        {
          title: "Amplifying Educational Impact",
          description: "Leverage innovative digital marketing solutions to showcase academic excellence, engage audiences and expand institutional influence.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Insurance",
      name: "Insurance",
      heading: "Connecting Coverage with Customers",
      description:
        "Performance-driven insurance marketing that enhances brand reach, improves engagement and simplifies the journey from awareness to policy purchase.",
      buttonText: "Request solutions for Insurance",
      cards: [
        {
          title: "Building Trust, Driving Growth",
          description: "Empower insurance providers with strategic digital marketing solutions that enhance brand credibility, generate quality leads and strengthen customer relationships.",
          variant: "default",
          span: "half",
        },
        {
          title: "Insurance Growth Accelerator",
          variant: "dark",
          span: "half",
        },
        {
          title: "Smarter Insurance Marketing",
          description: "Leverage intelligent digital campaigns to attract, engage, and retain customers across every stage of the insurance journey.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "healthcare",
      name: "Healthcare",
      heading: "Connecting Care with Patients Online",
      description:
        "Performance-driven healthcare marketing that strengthens visibility, improves communication, and delivers meaningful patient engagement experiences.",
      buttonText: "Request solutions for Healthcare",
      cards: [
        {
          title: "Digital Health Visibility",
          description: "Connect patients with trusted healthcare services through targeted digital marketing strategies that enhance awareness and engagement.",
          variant: "default",
          span: "half",
        },
        {
          title: "Patient Engagement Amplified",
          variant: "dark",
          span: "half",
        },
        {
          title: "Growing Healthcare Connections",
          description: "Leverage innovative digital marketing solutions to expand your reach, attract new patients and enhance community engagement.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Travel",
      name: "Travel",
      heading: "Smarter Traveller Acquisition",
      description:
        "Data-driven digital marketing strategies designed to reach the right audience, boost conversions and grow consistent travel bookings across markets.",
      buttonText: "Request solutions for Travel",
      cards: [
        {
          title: "Digital Journeys That Inspire Travel",
          description: "Transform your travel business with data-driven marketing that captures attention, builds trust, and drives higher conversions.",
          variant: "default",
          span: "half",
        },
        {
          title: "Elevating Global Travel Reach",
          variant: "dark",
          span: "half",
        },
        {
          title: "Beyond Borders Marketing Excellence",
          description: "Elevate travel businesses with intelligent digital strategies that expand global reach and drive consistent customer acquisition.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "Public Sector",
      name: "Public Sector",
      heading: "Public Engagement in the Digital Era",
      description:
        "Strategic digital marketing solutions that help government organizations increase awareness, improve communication and strengthen citizen participation across digital channels.",
      buttonText: "Request solutions for Public Sector",
      cards: [
        {
          title: "Digital Governance Growth Engine",
          description: "Empower public sector organizations with strategic digital marketing that enhances visibility, builds citizen trust, and improves service awareness.",
          variant: "default",
          span: "half",
        },
        {
          title: "Public Sector Visibility Booster",
          variant: "dark",
          span: "half",
        },
        {
          title: "Connected Citizen Engagement Marketing",
          description: "Strengthen government communication with targeted digital strategies that inform, engage and empower communities.",
          variant: "accent",
          span: "full",
        },
      ],
    },
    {
      id: "retail",
      name: "Retail",
      heading: "Where Shoppers Become Customers",
      description:
        "Performance-driven retail marketing that strengthens brand visibility, builds emotional connection and drives seamless conversion across the buyer journey.",
      buttonText: "Request solutions for Retail",
      cards: [
        {
          title: "Retail Growth Acceleration Engine",
          description: "Empower retail businesses with powerful digital marketing strategies that enhance visibility, attract high-intent customers and drive consistent sales growth.",
          variant: "default",
          span: "half",
        },
        {
          title: "Digital Retail Transformation Hub",
          variant: "dark",
          span: "half",
        },
        {
          title: "Omnichannel Retail Growth Catalyst",
          description: "Unify digital touchpoints with strategic marketing that enhances customer engagement and drives consistent business expansion.",
          variant: "accent",
          span: "full",
        },
      ],
    },
  ],

  tools: {
    heading: "Tools We Use",
    sub_heading: "Next-Generation Digital Growth Engine",
    description: "Transform your brand presence with powerful digital marketing tools that combine creativity, automation, and data intelligence to deliver unmatched performance. We help businesses attract, engage, and convert the right audience through precision targeting, real-time analytics and impactful multi-channel campaigns.",
    tool_logos: [
      { name: "GoogleAnalytics", src: "https://cdn.worldvectorlogo.com/logos/google-analytics-4.svg" },
      { name: "Meta", src: "https://cdn.worldvectorlogo.com/logos/facebook-icon.svg" },
      { name: "Semrush", src: "https://cdn.worldvectorlogo.com/logos/semrush-1.svg" },
      { name: "Mailchimp", src: "https://cdn.worldvectorlogo.com/logos/mailchimp-freddie.svg" },
      { name: "Hotjar", src: "https://cdn.worldvectorlogo.com/logos/hotjar.svg" },
      { name: "GTM", src: "https://cdn.worldvectorlogo.com/logos/google-tag-manager.svg" }
    ]
  },

  our_process: {
    main_icon: group,
    steps: [
      {
        id: "01",
        title: "Strategic Discovery & Brand Insight",
        icon: mask1,
      },
      {
        id: "02",
        title: "Campaign Strategy & Planning",
        icon: mask2,
      },
      {
        id: "03",
        title: "Creative Development & Execution",
        icon: mask3,
      },
      {
        id: "04",
        title: "Performance Tracking & Optimization",
        icon: mask4,
      },
      {
        id: "05",
        title: "Growth Acceleration & Continuous Innovation",
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
      title: "Data-Driven Strategies",
      desc: "We use real data to plan and execute campaigns. Ensuring better targeting and measurable results.",
      icon: "layers",
    },
    {
      num: "02",
      title: "Result-Oriented Approach",
      desc: "We focus on conversions, not just clicks. Driving real business growth and ROI.",
      icon: "activity",
    },
    {
      num: "03",
      title: "Multi-Channel Expertise",
      desc: "We manage campaigns across SEO, social media, and ads. Maximizing your brand visibility everywhere.",
      icon: "settings",
    },
    {
      num: "04",
      title: "Creative Content Execution",
      desc: "We create engaging and impactful content. Helping your brand stand out in a crowded market.",
      icon: "trending",
    },
    {
      num: "05",
      title: "Continuous Optimization",
      desc: "We monitor and improve campaigns in real time. Ensuring consistent performance and better outcomes.",
      icon: "grid",
    },
    {
      num: "06",
      title: "Scalable Growth Solutions",
      desc: "We refine and scale strategies based on insights. Supporting long-term business growth and success.",
      icon: "shield",
    },
  ],

  faqs: [
    {
      question: "What is the delivery timeline for Digital Marketing?",
      answer: "Timeline varies based on specific project requirements, typically ranging from 4 to 8 weeks for core phases."
    },
    {
      question: "How do you ensure quality and performance for Digital Marketing?",
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
      question: "How do we get started with Digital Marketing?",
      answer: "Contact us to arrange an initial consulting session where we'll discuss your requirements and build a detailed project roadmap."
    }
  ]
};

export default DigitalMarketing;