import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadServiceData } from "@/app/services/_data/loadService";
import { homeFaq } from "@/app/_components/data";


import ServiceHero from "@/app/services/_components/ServiceHero";
import ServiceAbout from "@/app/services/_components/ServiceAboutSections/ServiceAbout";
import ServiceIndustry from "@/app/services/_components/ServiceIndustrySections/ServiceIndustry";
import ServiceTools from "@/app/services/_components/ServiceTools";
import ServiceProcess from "@/app/services/_components/ServiceProcessSections/ServiceProcess";
import ServiceProjects from "@/app/services/_components/ServiceProjectSections/ServiceProjects";

import Reviews from "@/src/components/Reviews";
import FAQ from "@/src/components/Faq";
import ServiceQuestionnaireModal from "@/app/services/_components/ServiceQuestionnaireModal";

interface Props {
  params: Promise<{
    category: string;
    service: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, service } = await params;
  const serviceData = await loadServiceData(category, service);
  if (!serviceData) return { title: "Service" };
  const { title, description } = serviceData.meta_data;
  return { title, description };
}

export default async function ServicePage({ params }: Props) {
  const { category, service } = await params;
  const serviceData = await loadServiceData(category, service);

  if (!serviceData) notFound();

  const { hero, projects, industries, layoutOrder } = serviceData;
  const themeColor = serviceData.themeColor || "#3B82F6";

  const renderSection = (sectionName: string, index: number) => {
    switch (sectionName) {
      case 'hero':
        return (
          <ServiceHero
            key={index}
            data={hero}
            videoUrl={hero.video}
            themeColor={themeColor}
          />
        );
      case 'about':
        return (
          <ServiceAbout
            key={index}
            statscards={serviceData.statscards}
            themeColor={themeColor}
          />
        );
      case 'industry':
        return (
          <ServiceIndustry
            key={index}
            data={industries}
            themeColor={themeColor}
          />
        );
      case 'tools':
        return (
          <ServiceTools
            key={index}
            data={serviceData.tools}
            themeColor={themeColor}
          />
        );
      case 'process':
        return (
          <ServiceProcess
            key={index}
            data={serviceData.our_process}
            themeColor={themeColor}
            serviceSlug={service}
          />
        );
      case "projects":
        return (
          <ServiceProjects
            key={index}
            data={projects}
            otherServices={"otherServices" in serviceData ? serviceData.otherServices : []}
            themeColor={themeColor}
            currentService={service}
          />
        );
      case 'faq':
        return (
          <FAQ
            key={index}
            faqData={serviceData.faqs || homeFaq}
            themeColor={themeColor}
          />
        );
      case 'reviews':
        return (
          <Reviews
            key={index}
            themeColor={themeColor}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {layoutOrder?.map((sectionName, index) => renderSection(sectionName, index))}

      {/* Interactive Service Questionnaire Modal (CMS-driven dynamic questions) */}
      <ServiceQuestionnaireModal
        serviceTitle={hero?.maintitle || service}
        serviceSlug={service}
        category={category}
        questions={serviceData.questions}
        themeColor={themeColor}
        autoOpenDelaySeconds={10}
      />
    </>
  );
}
