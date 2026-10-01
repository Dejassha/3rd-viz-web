import { homeFaq } from "./_components/data"

import Hero from "./_components/Hero"
import Metrics from "./_components/Metrics"
//import Industry from "./_components/Industry"

import OurServices from "./_components/ourServices"
import FAQ from "../src/components/Faq"
import Process from "./_components/process/ProcessWrapper"
import OurClients from "@/src/components/OurClients"
import Reviews from "@/src/components/Reviews"
import { Metadata } from "next"
import FlowArt, { FlowSection } from "@/src/components/FlowArt"
import TimedContactModal from "./_components/TimedContactModal"

// 1. FIXED: Capitalized 'Des' and 'San' to comply with React element naming standards
import Des from "./services/_components/Design"
import San from "./services/_components/ServiceProcessSections/ServiceProcess"
import { Flow } from "three/examples/jsm/Addons.js"
import ToolsWeUse from "./services/_components/ServiceTools"
import Industry from "./services/_components/ServiceIndustrySections/ServiceIndustry"

export const metadata: Metadata = {
  title: {
    absolute: "Third Vizion — Immersive Technology, Cloud & Software Solutions",
  },
  description:
    "Explore VR, AR, 3D, CRM, ERP, web and app development, and more. Third Vizion partners with businesses to design, build, and scale digital products—see our work, process, and client stories.",
};

// ==========================================
// 2. TEMPORARY MOCK DATA PLACEHOLDERS
// Pass your actual data sources here or create dummy arrays so the props aren't empty!
// ==========================================
const mockTestimonialsData: any[] = [];
const mockProcessData: any = { main_icon: "/assets/images/gamepad.png", steps: [] };


function page() {
  return (
    <>
      <FlowArt>

        {/* 1. HERO - Now wrapped so the page starts here! */}
        <FlowSection innerClassName="!p-0 !gap-0">
          <Hero />
        </FlowSection>

        {/* 2. METRICS */}
        <FlowSection style={{ backgroundColor: '#0A0A0A', color: '#000' }} innerClassName="!p-0">
          <Metrics />
        </FlowSection>
        {/* <Offer /> */}
        <OurServices />
        <Process />

        {/* 3. FIXED: Passed required 'data' attributes into both structural modules */}
        {/* <Des data={mockTestimonialsData} /> */}
        <San data={mockProcessData} />

        <OurClients />
        <Reviews />
        <FAQ faqData={homeFaq} />
      </FlowArt>

      {/* Automatic Timed Contact Modal Popup (triggers after 10 seconds) */}
      <TimedContactModal delaySeconds={10} />
    </>
  )
}

export default page;
