"use client";
import React, { useEffect, useRef, useMemo } from "react";
import { ToolsData } from "../_data/types";
import BlurredEllipses from "@/src/components/BlurredEllipses";
import { Icon } from "@iconify/react";

const TOOL_ICON_MAP: Record<string, string> = {
  // Cloud & Infrastructure
  aws: "logos:aws",
  "aws iam": "logos:aws",
  azure: "logos:azure-icon",
  "azure ad": "logos:azure-icon",
  gcp: "logos:google-cloud",
  docker: "logos:docker-icon",
  kubernetes: "logos:kubernetes",
  linux: "logos:linux-tux",
  nginx: "logos:nginx",
  terraform: "logos:terraform-icon",
  ansible: "logos:ansible",
  jenkins: "logos:jenkins",

  // Development & Frameworks
  react: "logos:react",
  "react native": "logos:react",
  reactnative: "logos:react",
  nextjs: "logos:nextjs-icon",
  "next.js": "logos:nextjs-icon",
  typescript: "logos:typescript-icon",
  javascript: "logos:javascript",
  tailwindcss: "logos:tailwindcss-icon",
  "tailwind css": "logos:tailwindcss-icon",
  vercel: "logos:vercel-icon",
  nodejs: "logos:nodejs-icon",
  "node.js": "logos:nodejs-icon",
  flutter: "logos:flutter",
  kotlin: "logos:kotlin-icon",
  swift: "logos:swift",
  csharp: "logos:c-sharp",
  "c#": "logos:c-sharp",
  python: "logos:python",
  graphql: "logos:graphql",
  android: "logos:android-icon",
  ios: "logos:apple",
  apple: "logos:apple",
  "c++": "logos:c-plusplus",
  cpp: "logos:c-plusplus",

  // Databases & Backend
  postgresql: "logos:postgresql",
  mysql: "logos:mysql",
  mongodb: "logos:mongodb-icon",
  redis: "logos:redis",
  firebase: "logos:firebase",

  // AR / VR / 3D & Gaming
  arkit: "logos:apple",
  arcore: "logos:google-icon",
  unity: "logos:unity",
  unreal: "logos:unrealengine-icon",
  "unreal engine": "logos:unrealengine-icon",
  lightship: "simple-icons:niantic",
  sparkar: "logos:meta-icon",
  "spark ar": "logos:meta-icon",
  threejs: "skill-icons:threejs-light",
  "three.js": "skill-icons:threejs-light",
  oculus: "simple-icons:oculus",
  webxr: "simple-icons:w3c",
  steamvr: "logos:steam",
  steam: "logos:steam",
  blender: "logos:blender",
  zbrush: "file-icons:zbrush",
  substance: "thesvg-color:substance-3d-painter",
  maya: "devicon:maya",
  webgl: "simple-icons:webgl",

  // CRM & ERP
  salesforce: "logos:salesforce",
  hubspot: "logos:hubspot",
  zendesk: "logos:zendesk",
  zoho: "logos:zoho",
  pipedrive: "logos:pipedrive",
  freshsales: "lucide:store",
  dynamics: "logos:microsoft-icon",
  "microsoft dynamics": "logos:microsoft-icon",
  "microsoft dynamics 365": "logos:microsoft-icon",
  sap: "logos:sap",
  oracle: "logos:oracle",
  netsuite: "simple-icons:oracle",
  odoo: "simple-icons:odoo",
  quickbooks: "simple-icons:quickbooks",

  // Identity & Security
  okta: "logos:okta-icon",
  auth0: "logos:auth0-icon",
  cyberark: "mdi:shield-key",
  "ping identity": "thesvg-color:ping-identity",

  // Marketing & Analytics
  googleanalytics: "logos:google-analytics",
  "google analytics": "logos:google-analytics",
  meta: "logos:meta-icon",
  "meta ads": "logos:meta-icon",
  metaads: "logos:meta-icon",
  facebook: "logos:facebook",
  semrush: "simple-icons:semrush",
  mailchimp: "logos:mailchimp-freddie",
  hotjar: "logos:hotjar-icon",
  gtm: "logos:google-tag-manager",
  "google tag manager": "logos:google-tag-manager",
  google: "logos:google-icon",

  // Collaboration & Design
  figma: "logos:figma",
  adobe: "logos:adobe-icon",
  photoshop: "logos:adobe-photoshop",
  illustrator: "logos:adobe-illustrator",
  jira: "logos:jira",
  slack: "logos:slack-icon",
  asana: "logos:asana-icon",
  trello: "logos:trello",
  notion: "logos:notion-icon",
  github: "logos:github-icon",
  gitlab: "logos:gitlab",
};

interface PhysicsItem {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isDragging: boolean;
  dragOffsetX: number;
  dragOffsetY: number;
}

interface ServiceToolsProps {
  data?: ToolsData;
  themeColor?: string;
}

const hexToRgba = (hex: string, alpha: number) => {
  try {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } catch (e) {
    return `rgba(164, 97, 255, ${alpha})`;
  }
};

export default function ServiceTools({ data, themeColor = "#A461FF" }: ServiceToolsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const requestRef = useRef<number | null>(null);
  const stateRef = useRef<PhysicsItem[]>([]);
  const boxDimRef = useRef({ width: 600, height: 350 });

  const iconSize = 68;
  const maxSpeed = 3;

  const toolsList = useMemo(() => {
    if (!data?.tool_logos || data.tool_logos.length === 0) {
      return [];
    }

    // 1. Resolve each tool to a verified icon or image
    const validItems: { name: string; src: string | null; icon: string | null }[] = [];

    data.tool_logos.forEach((logo) => {
      const name = logo?.name || "";
      const src = logo?.src || "";
      const rawKey = name.toLowerCase().trim();
      const cleanKey = name.toLowerCase().replace(/[^a-z0-9]/g, "").trim();

      // Check verified TOOL_ICON_MAP first
      let matchedIcon = TOOL_ICON_MAP[rawKey] || TOOL_ICON_MAP[cleanKey] || null;

      // Fallback: If not found by name, check if src itself is an icon identifier
      if (!matchedIcon && src && src.includes(":") && !src.startsWith("http") && !src.startsWith("/")) {
        const srcKey = src.split(":").pop()?.toLowerCase().trim() || "";
        matchedIcon = TOOL_ICON_MAP[srcKey] || src;
      }

      const isImage = Boolean(src && (src.startsWith("http") || src.startsWith("/") || src.startsWith("data:")));

      if (matchedIcon || isImage) {
        validItems.push({
          name,
          src: isImage ? src : null,
          icon: matchedIcon,
        });
      }
    });

    if (validItems.length === 0) return [];

    // 2. If any dummy/unresolved balls were present, fill the count by duplicating valid balls
    const targetCount = Math.max(validItems.length, data.tool_logos.length);
    const result = [...validItems];

    while (result.length < targetCount) {
      const duplicateItem = validItems[result.length % validItems.length];
      result.push({ ...duplicateItem });
    }

    return result;
  }, [data?.tool_logos]);

  const numIcons = toolsList.length;
  const containerMaxWidth = Math.min(600, Math.max(160, numIcons * 90 + 60));

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        boxDimRef.current = {
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        };
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const initialState: PhysicsItem[] = [];
    const currentWidth = boxDimRef.current.width || containerMaxWidth;
    const currentHeight = boxDimRef.current.height || 350;

    for (let i = 0; i < numIcons; i++) {
      const maxX = Math.max(0, currentWidth - iconSize);
      const maxY = Math.max(0, currentHeight - iconSize);
      initialState.push({
        id: i,
        x: Math.random() * maxX,
        y: Math.random() * maxY,
        vx: (Math.random() - 0.5) * 2.5,
        vy: (Math.random() - 0.5) * 2.5,
        isDragging: false,
        dragOffsetX: 0,
        dragOffsetY: 0,
      });
    }
    stateRef.current = initialState;

    const updatePhysics = () => {
      const items = stateRef.current;
      const w = boxDimRef.current.width || containerMaxWidth;
      const h = boxDimRef.current.height || 350;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (!item.isDragging) {
          item.x += item.vx;
          item.y += item.vy;

          const speed = Math.sqrt(item.vx * item.vx + item.vy * item.vy);
          if (speed > maxSpeed) {
            item.vx = (item.vx / speed) * maxSpeed;
            item.vy = (item.vy / speed) * maxSpeed;
          } else if (speed < 0.5 && speed > 0) {
            item.vx *= 1.05;
            item.vy *= 1.05;
          }
        }

        // Boundary collision detection
        if (item.x <= 0) {
          item.x = 0;
          item.vx = Math.abs(item.vx);
        } else if (item.x >= w - iconSize) {
          item.x = w - iconSize;
          item.vx = -Math.abs(item.vx);
        }

        if (item.y <= 0) {
          item.y = 0;
          item.vy = Math.abs(item.vy);
        } else if (item.y >= h - iconSize) {
          item.y = h - iconSize;
          item.vy = -Math.abs(item.vy);
        }
      }

      // Circle to circle collisions
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const item1 = items[i];
          const item2 = items[j];

          const dx = item1.x + iconSize / 2 - (item2.x + iconSize / 2);
          const dy = item1.y + iconSize / 2 - (item2.y + iconSize / 2);
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < iconSize) {
            const overlap = iconSize - distance;
            const nx = dx / distance;
            const ny = dy / distance;

            if (!item1.isDragging) {
              item1.x += (nx * overlap) / 2;
              item1.y += (ny * overlap) / 2;
            }
            if (!item2.isDragging) {
              item2.x -= (nx * overlap) / 2;
              item2.y -= (ny * overlap) / 2;
            }

            if (!item1.isDragging && !item2.isDragging) {
              const tempVx = item1.vx;
              const tempVy = item1.vy;
              item1.vx = item2.vx;
              item1.vy = item2.vy;
              item2.vx = tempVx;
              item2.vy = tempVy;
            }
          }
        }
      }

      items.forEach((item, index) => {
        const el = elementsRef.current[index];
        if (el) {
          el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
        }
      });

      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    requestRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [numIcons, containerMaxWidth]);

  const handlePointerDown = (e: React.PointerEvent, index: number) => {
    const item = stateRef.current[index];
    if (!item || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    item.isDragging = true;
    item.dragOffsetX = mouseX - item.x;
    item.dragOffsetY = mouseY - item.y;
    item.vx = 0;
    item.vy = 0;

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent, index: number) => {
    const item = stateRef.current[index];
    if (!item || !item.isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const w = boxDimRef.current.width || containerMaxWidth;
    const h = boxDimRef.current.height || 350;

    let newX = mouseX - item.dragOffsetX;
    let newY = mouseY - item.dragOffsetY;

    newX = Math.max(0, Math.min(w - iconSize, newX));
    newY = Math.max(0, Math.min(h - iconSize, newY));

    item.vx = newX - item.x;
    item.vy = newY - item.y;

    item.x = newX;
    item.y = newY;
  };

  const handlePointerUp = (e: React.PointerEvent, index: number) => {
    const item = stateRef.current[index];
    if (!item) return;

    item.isDragging = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const headingText = data?.heading || "Tools we Use";
  const words = headingText.split(" ");
  const firstWord = words[0];
  const remainingWords = words.slice(1).join(" ");

  if (toolsList.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full flex items-center overflow-hidden bg-[#000000] py-12 lg:py-16">
      {/* Background UI Glows */}
      <BlurredEllipses
        ellipse1={{
          left: "-12.5rem",
          top: "6.25rem",
          width: "37.5rem",
          height: "25rem",
          background: `linear-gradient(90deg, ${hexToRgba(themeColor, 0.4)} 0%, ${hexToRgba(themeColor, 0.1)} 100%)`,
          blur: "9.375rem",
          className: "opacity-40",
        }}
        ellipse2={{
          right: "-12.5rem",
          top: "0rem",
          width: "37.5rem",
          height: "25rem",
          background: `linear-gradient(90deg, ${hexToRgba(themeColor, 0.4)} 0%, ${hexToRgba(themeColor, 0.1)} 100%)`,
          blur: "9.375rem",
          className: "opacity-40",
        }}
      />

      <div className="w-full px-6 md:px-12 lg:px-[80px] relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Side: Text */}
        <div className="w-full lg:flex-1 min-w-0 text-center lg:text-left">
          <h2 className="text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem] leading-tight font-bold mb-6 font-anta tracking-wide text-white">
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${themeColor} 0%, ${hexToRgba(themeColor, 0.4)} 100%)` }}>
              {firstWord}
            </span>{" "}
            {remainingWords}
          </h2>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] lg:text-[2rem] font-normal text-[#E0E2E8] mb-4 leading-[150%] font-outfit">
            {data?.sub_heading || "Secure healthcare apps and data"}
          </h3>
          <p className="text-[#959595] text-base sm:text-[1.125rem] lg:text-[1.25rem] font-normal leading-[150%] max-w-full lg:max-w-[32.875rem] font-poppins mx-auto lg:mx-0">
            {data?.description || "AI is transforming healthcare, but rapidly and expanding applications and APIs are increasing security risk."}
          </p>
        </div>

        {/* Right Side: Physics Playground */}
        <div className="w-full lg:flex-1 min-w-0 flex justify-center lg:justify-end">
          <div
            ref={containerRef}
            className="relative w-full h-[280px] sm:h-[350px] rounded-[10px] overflow-hidden bg-transparent border shadow-none touch-none"
            style={{ borderColor: hexToRgba(themeColor, 0.3), maxWidth: `${containerMaxWidth}px` }}
          >
            {toolsList.map((tool, index) => {
              return (
                <div
                  key={`${tool.name}-${index}`}
                  ref={(el) => { elementsRef.current[index] = el; }}
                  onPointerDown={(e) => handlePointerDown(e, index)}
                  onPointerMove={(e) => handlePointerMove(e, index)}
                  onPointerUp={(e) => handlePointerUp(e, index)}
                  onPointerCancel={(e) => handlePointerUp(e, index)}
                  className="absolute top-0 left-0 cursor-grab active:cursor-grabbing select-none shadow-lg w-[68px] h-[68px] rounded-full bg-white text-zinc-900 flex items-center justify-center overflow-hidden will-change-transform p-3"
                  style={{ color: "#18181b" }}
                  title={tool.name}
                >
                  {tool.icon ? (
                    <Icon
                      icon={tool.icon}
                      className="w-full h-full object-contain pointer-events-none text-3xl text-zinc-900"
                    />
                  ) : tool.src ? (
                    <img
                      src={tool.src}
                      alt={tool.name}
                      className="w-full h-full object-contain pointer-events-none"
                    />
                  ) : (
                    <span className="text-xs font-bold text-zinc-800 uppercase tracking-tight">
                      {tool.name.slice(0, 3)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}