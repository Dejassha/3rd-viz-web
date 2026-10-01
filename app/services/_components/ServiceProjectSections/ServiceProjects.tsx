"use client";

import React from "react";
import { ServiceProject } from "../../_data/types";
import ProjectCard from "./ProjectCard";
import BlurredEllipses from "@/src/components/BlurredEllipses";

interface Props {
  data?: ServiceProject[];
  themeColor?: string;
  currentService: string;
  otherServices?: Array<{
    id: string;
    title: string;
    projects: ServiceProject[];
  }>;
}



const hexToRgba = (hex: string, alpha: number) => {
  if (!hex || typeof hex !== "string") return `rgba(0, 0, 0, 0)`;
  const clean = hex.replace("#", "").trim();
  if (clean.length !== 6 && clean.length !== 3) return `rgba(0, 0, 0, 0)`;
  const fullHex = clean.length === 3 ? clean.split("").map(c => c + c).join("") : clean;
  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return `rgba(0, 0, 0, 0)`;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const serviceTitles: Record<string, string> = {
  "web-development": "Web Development",

  "app-development": "Mobile Apps",

  "game-development": "Game Development",

  "digital-marketing": "Digital Marketing",

  "customer-relationship-management":
    "CRM Solutions",

  "enterprise-resource-planning":
    "ERP Solutions",

  "identity-and-access-management":
    "IAM Solutions",

  "server-management":
    "Server Management",

  "3d-services": "3D Services",

  "augmented-reality":
    "Augmented Reality",

  "virtual-reality":
    "Virtual Reality",
};

const ServiceProjects = ({
  data = [],
  themeColor = "#3B82F6",
  currentService,
  otherServices = [],
}: Props) => {
  const normalizedService = currentService
    ?.toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  const currentServiceTitle =
    serviceTitles[normalizedService] ||
    currentService;

  const validOtherServices = otherServices.filter(
    (s) => s.projects && s.projects.length > 0
  );

  const renderProjectGallery = (
    projects: ServiceProject[]
  ) => {
    if (!projects || projects.length === 0) {
      return null;
    }

    return (
      <div className="w-full flex flex-col gap-6 md:gap-8">
        {Array.from({
          length: Math.ceil(projects.length / 3),
        }).map((_, rowIndex) => {
          const startIndex = rowIndex * 3;

          const firstProject =
            projects[startIndex];

          const secondProject =
            projects[startIndex + 1];

          const thirdProject =
            projects[startIndex + 2];

          return (
            <div
              key={rowIndex}
              className="w-full flex flex-col gap-6 md:gap-8"
            >
              {firstProject && (
                <div className="w-full">
                  <ProjectCard
                    project={firstProject}
                    index={startIndex}
                    themeColor={themeColor}
                  />
                </div>
              )}

              {(secondProject || thirdProject) && (
                <div
                  className="
                    w-full
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-6
                    md:gap-8
                  "
                >
                  {secondProject && (
                    <div className="w-full">
                      <ProjectCard
                        project={secondProject}
                        index={startIndex + 1}
                        themeColor={themeColor}
                      />
                    </div>
                  )}

                  {thirdProject && (
                    <div className="w-full">
                      <ProjectCard
                        project={thirdProject}
                        index={startIndex + 2}
                        themeColor={themeColor}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section
      className="
        w-full
        text-white
        relative
        overflow-hidden
        py-16
        lg:py-24
      "
    >
      <BlurredEllipses
        ellipse1={{
          left: "-12.5rem",
          top: "6.25rem",
          width: "37.5rem",
          height: "25rem",
          background: `linear-gradient(
            90deg,
            ${hexToRgba(themeColor, 0.4)} 0%,
            ${hexToRgba(themeColor, 0.1)} 100%
          )`,
          blur: "9.375rem",
          className:
            "opacity-40 pointer-events-none",
        }}
        ellipse2={{
          right: "-12.5rem",
          top: "12.5rem",
          width: "37.5rem",
          height: "25rem",
          background: `linear-gradient(
            90deg,
            ${hexToRgba(themeColor, 0.4)} 0%,
            ${hexToRgba(themeColor, 0.1)} 100%
          )`,
          blur: "9.375rem",
          className:
            "opacity-40 pointer-events-none",
        }}
      />

      <div
        className="
          w-full
          px-6
          md:px-12
          lg:px-[80px]
          relative
          z-10
        "
      >
        <h2 className="heading text-start mb-10 lg:mb-16">
          Our{" "}
          <span style={{ color: themeColor }}>
            Projects
          </span>
        </h2>

        <div className="w-full">
          <h3
            className="
              font-anta
              text-xl
              sm:text-2xl
              md:text-3xl
              lg:text-4xl
              font-medium
              mb-8
              md:mb-12
            "
          >
            {currentServiceTitle}{" "}
            <span
              style={{
                color: themeColor,
              }}
            >
              Services
            </span>
          </h3>

          {data && data.length > 0 ? (
            renderProjectGallery(data)
          ) : (
            <div
              className="
                w-full
                py-16
                px-6
                rounded-2xl
                border
                border-dashed
                border-zinc-800
                bg-zinc-950/40
                backdrop-blur-sm
                text-center
                flex
                flex-col
                items-center
                justify-center
                gap-3
              "
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-1"
                style={{
                  backgroundColor: hexToRgba(themeColor, 0.12),
                  border: `1px solid ${hexToRgba(themeColor, 0.25)}`,
                }}
              >
                <svg
                  className="w-7 h-7"
                  style={{ color: themeColor }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-zinc-200 text-lg md:text-xl font-medium tracking-wide">
                No images are uploaded
              </p>
              <p className="text-zinc-500 text-sm max-w-sm">
                Project images for this service will appear here once uploaded via CMS.
              </p>
            </div>
          )}
        </div>

        {validOtherServices.length > 0 && (
          <div
            className="
              font-anta
              w-full
              mt-20
              md:mt-28
              lg:mt-32
            "
          >
            <h3
              className="
                font-anta
                text-xl
                sm:text-2xl
                md:text-3xl
                lg:text-4xl
                font-medium
                mb-8
                md:mb-12
              "
            >
              Other{" "}
              <span style={{ color: themeColor }}>
                Services
              </span>
            </h3>

            {validOtherServices.map((service) => (
              <div
                key={service.id}
                className="w-full mb-16 last:mb-0"
              >
              
                {renderProjectGallery(service.projects)}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceProjects;