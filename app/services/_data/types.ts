import { StaticImageData } from "next/image";

export interface MetaData {
  title: string;
  description: string;
}

export interface ServiceHero {
  bg_color: string;
  maintitle: string;
  title: string;
  video?: string;
}


export interface ServiceProcessItem {
  id: string;
  title: string;
  icon: string | any;
}

export interface ServiceProcessData {
  main_icon: string | any;
  steps: ServiceProcessItem[];
}

export interface ServiceProject {
  id: string;
  title: string;
  banner_image: StaticImageData | string;
  alt?: string;
  service?: {
    id: string;
    title: string;
    slug: string;
  };
}

export interface WhyChooseItem {
  num: string;
  title: string;
  desc: string;
  icon: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  icon: string | any;
}

export interface OurProcessData {
  main_icon: string | any;
  steps: ProcessStep[];
}

// ─── Industry types ───────────────────────────────────────────
export interface IndustryCard {
  title: string;
  description?: string;
  variant: "default" | "dark" | "accent";
  span?: "full" | "half";
}

export interface IndustryData {
  id: string;
  name: string;
  heading: string;
  description: string;
  buttonText: string;
  cards: IndustryCard[];
}
// ──────────────────────────────────────────────────────────────

export interface ToolLogo {
  name: string;
  src: string;
}

export interface ToolsData {
  heading: string;
  sub_heading: string;
  description: string;
  tool_logos: ToolLogo[];
}

export interface StatCard {
  visual_type: "chart" | "design_mockup" | "curve";
  value: string;
  label: string;
}

export interface StatsCard {
  count: string;
  sysmbol: string;
  heading: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServiceQuestionOption {
  label: string;
  value?: string;
}

export interface ServiceQuestion {
  id?: string;
  question: string;
  subtitle?: string;
  type?: "text" | "textarea" | "select" | "radio" | "checkbox";
  options?: Array<ServiceQuestionOption | string>;
  placeholder?: string;
  required?: boolean;
}

export interface ServicePageData {
  themeColor?: string;
  meta_data: MetaData;
  hero: ServiceHero;
  stats?: StatCard[];
  statscards?: StatsCard[];
  industries?: IndustryData[];      // ← optional so older pages still work
  tools?: ToolsData;
  our_process: ServiceProcessData;
  projects: ServiceProject[];
  why_choose: WhyChooseItem[];
  faqs?: FaqItem[];
  questions?: ServiceQuestion[];
  layoutOrder?: Array<'hero' | 'about' | 'industry' | 'tools' | 'process' | 'projects' | 'faq' | 'reviews'>;
}