import icon_1 from "@assets/svg/apple-vision-pro.svg";
import icon_2 from "@assets/svg/tools-AR-kit.svg";
import icon_3 from "@assets/svg/reality.svg";
import icon_4 from "@assets/svg/terminal-browser.svg";
import icon_5 from "@assets/svg/mobile-programming.svg";
import icon_6 from "@assets/svg/tools-AR-kit (1).svg";
import icon_7 from "@assets/svg/announcement-01.svg";
import icon_8 from "@assets/svg/profile-2user.svg";
import icon_9 from "@assets/svg/shield-security.svg";
import icon_10 from "@assets/svg/box-search.svg";
import icon_11 from "@assets/svg/server-01.svg";
import avathar_1 from "@assets/images/TeamImages/c2.png";
import avathar_2 from "@assets/images/TeamImages/c4.png";
import avathar_3 from "@assets/images/TeamImages/c5.png";
// import avathar_4 from "@assets/svg/avathar_4.svg";
// Process Component in Home Page
import one from "../../src/assets/images/processImage/one.png";
import two from "../../src/assets/images/processImage/two.png";
import three from "../../src/assets/images/processImage/three.png";
import four from "../../src/assets/images/processImage/four.png";
import five from "../../src/assets/images/processImage/five.png";

export const serviceIcons = [
  { icon: icon_1, color: "icon-violet", hex: "#661BCB" },
  { icon: icon_2, color: "icon-pink", hex: "#CB1A8C" },
  { icon: icon_3, color: "icon-skyBlue", hex: "#1AA8CB" },
  { icon: icon_4, color: "icon-iceBlue", hex: "#00C7E5" },
  { icon: icon_5, color: "icon-orange", hex: "#E57A00" },
  { icon: icon_6, color: "icon-lightPink", hex: "#E500CB" },
  { icon: icon_7, color: "icon-darkBlue", hex: "#1316D2" },
  { icon: icon_8, color: "icon-red", hex: "#CB1A1A" },
  { icon: icon_9, color: "icon-yellow", hex: "#FDCC26" },
  { icon: icon_10, color: "icon-blue", hex: "#2600E5" },
  { icon: icon_11, color: "icon-green", hex: "#05DF72" },
];

export const avatharIcons = [avathar_1, avathar_2, avathar_3];

export type MetricItem =
  | {
      type: "simple";
      description: string;
      value: string;
      suffix: string;
      suffixSize?: string;
    }
  | {
      type: "clients";
      value: string;
      suffix: string;
      label: string;
    }
  | {
      type: "satisfaction";
      description: string;
      value: string;
      suffix: string;
      stars: number[];
      subtitle: string;
    };

export const metricsData: MetricItem[] = [
  {
    type: "simple",
    description:
      "A proven track record with 50+ successfully delivered projects, providing reliable and high-quality digital solutions.",
    value: "50",
    suffix: "+",
    suffixSize: "text-4xl",
  },
  {
    type: "simple",
    description:
      "Trusted partnerships built. Partnering with businesses to deliver scalable solutions that support real growth.",
    value: "12",
    suffix: "+",
    suffixSize: "text-3xl",
  },
  {
    type: "clients",
    value: "20",
    suffix: "+",
    label: "Clients",
  },
  {
    type: "satisfaction",
    description:
      "Customer satisfaction score. Recognized for quality, performance, and long-term client satisfaction.",
    value: "4.5",
    suffix: "/5",
    stars: [1, 1, 1, 1, 0.5],
    subtitle: "Our client Satisfaction",
  },
];

export const offerItems = [
  {
    title: "Create an MVP to attract investors and test your business idea",
    description:
      "We create investor-ready MVPs to test your business ideas quickly and effectively. By focusing on core features and usability from day one, we help reduce risk. Our MVPs are built for scalability and faster entry into the market.",
  },
  {
    title: "Automate the internal processes of your business",
    description:
      "We develop powerful web and mobile applications tailored to your business needs. Our solutions improve customer engagement and service accessibility. Seamlessly integrated with CRM systems for better performance and growth.",
  },
  {
    title:
      "Create a web or mobile app to attract new customers and make your service more convenient for them",
    description:
      "Create immersive AR and VR experiences for gaming, training, skill development, product demonstrations, and safety applications across education, real estate, manufacturing, healthcare, construction, and enterprises.",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const homeFaq = [
  {
    question: "What is the focus of health and wellness programs?",
    answer:
      "They aim to improve physical, mental, and emotional well-being through preventive care, lifestyle changes, and personalized treatments.",
  },
  {
    question: "Are these programs customized?",
    answer:
      "Yes, most programs are tailored to individual health needs, goals, and lifestyles for maximum effectiveness.",
  },
  {
    question: "How do I manage stress effectively?",
    answer:
      "Stress can be managed through mindfulness, deep breathing exercises, physical activity, and prioritizing self-care.",
  },
  {
    question: "Is professional guidance available?",
    answer:
      "Yes, certified professionals like doctors, nutritionists, and wellness coaches provide expert guidance.",
  },
  {
    question: "What is a health and wellness program?",
    answer:
      "A structured plan designed to improve physical, mental, and emotional well-being through lifestyle changes and preventive care.",
  },
];

// ------------------------------- Process Component Data's -----------------------------

export const svgWidth = 6500;
const leftShift = 400;
const circleSpacing = svgWidth / (5 + 1);

// PRECISE COLOR TRANSITION CONTROL
// export const colorTransitions = {
//   transitions: [
//     {
//       startProgress: 0.0,
//       endProgress: 0.25,
//       color: "#fb923c",
//       label: "DISCOVER Phase",
//     },
//     {
//       startProgress: 0.25,
//       endProgress: 0.5,
//       color: "#f472b6",
//       label: "ARCHITECT Phase",
//     },
//     {
//       startProgress: 0.45,
//       endProgress: 0.75,
//       color: "#4ade80",
//       label: "BUILD Phase",
//     },
//     {
//       startProgress: 0.65,
//       endProgress: 0.85,
//       color: "#f87171",
//       label: "ELEVATE Phase",
//     },
//     {
//       startProgress: 0.85,
//       endProgress: 1.0,
//       color: "#FFC016",
//       label: "SUCCESS Phase",
//     },
//   ],

//   useSingleColor: false,
//   singleColor: "#FFC016",
//   pulseEffect: true,
//   pulseIntensity: 0.2,
//   glowEffect: true,
//   glowIntensity: 0.3,
//   strokeWidth: 5,
//   strokeOpacity: 1,
// };

// Path-relative positions — the path starts at circle 1 and ends at circle 5
// Color should change when the drawn line reaches each circle along the path
const cx1 = circleSpacing * 0.9 - leftShift;
const cx2 = circleSpacing * 2 - leftShift;
const cx3 = circleSpacing * 3.1 - leftShift;
const cx4 = circleSpacing * 4.2 - leftShift;
const cx5 = circleSpacing * 5.35 - leftShift;
const pathRange = cx5 - cx1;

// Fraction of path progress when the drawn line reaches each circle
const p2 = (cx2 - cx1) / pathRange;  // ~0.247
const p3 = (cx3 - cx1) / pathRange;  // ~0.494
const p4 = (cx4 - cx1) / pathRange;  // ~0.742

export const colorTransitions = {
  transitions: [
    {
      startProgress: 0.0,
      endProgress: p2,
      color: "#fb923c",
      label: "DISCOVER Phase",
    },
    {
      startProgress: p2,
      endProgress: p3,
      color: "#f472b6",
      label: "ARCHITECT Phase",
    },
    {
      startProgress: p3,
      endProgress: p4,
      color: "#4ade80",
      label: "BUILD Phase",
    },
    {
      startProgress: p4,
      endProgress: 0.9,
      color: "#f87171",
      label: "ELEVATE Phase",
    },
    {
      startProgress: 0.9,
      endProgress: 1.0,
      color: "#FFC016",
      label: "SUCCESS Phase",
    },
  ],

  useSingleColor: false,
  singleColor: "#FFC016",
  pulseEffect: true,
  pulseIntensity: 0.2,
  glowEffect: true,
  glowIntensity: 0.3,
  strokeWidth: 5,
  strokeOpacity: 1,
};

export const circles = [
  {
    id: 1,
    label: "DISCOVER",
    description:
      "We begin by understanding your business goals, vision, and challenges. Our team studies every detail to find the right digital strategy for your brand.",
    img: one,
    cx: circleSpacing * 0.9 - leftShift,
    cy: 200,
    color: colorTransitions.transitions[0].color,
    progressStart: colorTransitions.transitions[0].startProgress,
    progressEnd: colorTransitions.transitions[0].endProgress,
  },
  {
    id: 2,
    label: "ARCHITECT",
    description:
      "We design robust and scalable system architectures using the latest technologies and best industry practices.",
    img: two,
    cx: circleSpacing * 2 - leftShift,
    cy: 300,
    color: colorTransitions.transitions[1].color,
    progressStart: colorTransitions.transitions[1].startProgress,
    progressEnd: colorTransitions.transitions[1].endProgress,
  },
  {
    id: 3,
    label: "BUILD",
    description:
      "We build your solution with cutting-edge technologies and agile methodologies, ensuring code quality and maintainability.",
    img: three,
    cx: circleSpacing * 3.1 - leftShift,
    cy: 200,
    color: colorTransitions.transitions[2].color,
    progressStart: colorTransitions.transitions[2].startProgress,
    progressEnd: colorTransitions.transitions[2].endProgress,
  },
  {
    id: 4,
    label: "ELEVATE",
    description:
      "We conduct comprehensive testing to ensure your solution is bug-free, performs optimally, and delivers exceptional user experience.",
    img: four,
    cx: circleSpacing * 4.2 - leftShift,
    cy: 300,
    color: colorTransitions.transitions[3].color,
    progressStart: colorTransitions.transitions[3].startProgress,
    progressEnd: colorTransitions.transitions[3].endProgress,
  },
  {
    id: 5,
    label: "SUCCESS",
    description:
      "Success isn't a destination—it's a journey of constant growth. We empower your business to achieve measurable results through strategic execution, data-driven insights, and relentless improvement—ensuring your goals aren't just met, but exceeded.",
    img: five,
    cx: circleSpacing * 5.35 - leftShift,
    cy: 200,
    color: colorTransitions.transitions[4].color,
    progressStart: colorTransitions.transitions[4].startProgress,
    progressEnd: colorTransitions.transitions[4].endProgress,
  },
];

// In your data file or parent component
export const faqData = [
  {
    id: "1",
    question: "How much does Coda AI cost?",
    answer: "Unlike other tools where AI is a paid add-on, Coda AI is free for Doc Makers. Editors also receive a free trial of Coda AI. If you'd like to learn more about pricing and usage, visit...",
  },
  {
    id: "2",
    question: "What models does Coda AI leverage?",
    answer: "Your answer here...",
  },
  {
    id: "3",
    question: "How does Coda AI use my data?",
    answer: "Your answer here...",
  },
  {
    id: "4",
    question: "How can I learn more about using Coda AI for work?",
    answer: "kjdgshkvvvvvvvvvvvvvvvvvva",
  },
  {
    id: "5",
    question: "Was there a Coda AI Beta?",
    answer: "hkjj,hbvdjl sbasdhfadfh",
  },
];