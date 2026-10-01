"use client";

import { useState } from "react";
import SearchBar from "./searchbar";
import FilterButtons from "./filterbuttons";
import JobCard from "./jobcard";
import {
  DeveloperIcon,
  DesignIcon,
  SalesIcon,
  TestingIcon,
  OperationsIcon,
} from "./jobicons";

const iconMap = {
  developer: <DeveloperIcon />,
  design: <DesignIcon />,
  sales: <SalesIcon />,
  testing: <TestingIcon />,
  operations: <OperationsIcon />,
};

const colorMap: Record<
  string,
  {
    iconBg: string;
    badge: string;
    btnGradient: string;
  }
> = {
  developer: {
    iconBg: "bg-blue-900/40",
    badge: "bg-blue-900/30 text-blue-400",
    btnGradient: "linear-gradient(to right, #6EE7F7, #3B82F6)",
  },
  design: {
    iconBg: "bg-purple-900/40",
    badge: "bg-purple-900/30 text-purple-400",
    btnGradient: "linear-gradient(to right, #D8B4FE, #9333EA)",
  },
  sales: {
    iconBg: "bg-red-900/40",
    badge: "bg-red-900/30 text-red-400",
    btnGradient: "linear-gradient(to right, #FCA5A5, #EF4444)",
  },
  testing: {
    iconBg: "bg-green-900/40",
    badge: "bg-green-900/30 text-green-400",
    btnGradient: "linear-gradient(to right, #6EE7B7, #10B981)",
  },
  operations: {
    iconBg: "bg-orange-900/40",
    badge: "bg-orange-900/30 text-orange-400",
    btnGradient: "linear-gradient(to right, #FCD34D, #F97316)",
  },
};

export default function CareerClient({ jobs = [] }: { jobs: any[] }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = (jobs || []).filter((job) => {
    const matchesFilter = activeFilter === "all" || job.filter === activeFilter;
    const query = searchQuery.toLowerCase();
    const skillsList: string[] = Array.isArray(job.skills) ? job.skills : [];
    const matchesSearch =
      searchQuery === "" ||
      (job.title && job.title.toLowerCase().includes(query)) ||
      (job.department && job.department.toLowerCase().includes(query)) ||
      skillsList.some((s: string) => s.toLowerCase().includes(query));
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <SearchBar onSearch={setSearchQuery} />
      <FilterButtons
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {filteredJobs.length === 0 ? (
        <div className="text-center py-16 px-4 bg-[#14161C] border border-[#232731] rounded-2xl mb-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#1E222D] flex items-center justify-center text-[#ADC6FF]">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
            No Open Positions Found
          </h3>
          <p className="text-[#8C909F] max-w-md mx-auto text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
            We currently do not have any open positions matching your search. Try changing the category filter or check back later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredJobs.map((job) => {
            const colors = colorMap[job.filter] ?? colorMap.developer;
            return (
              <JobCard
                key={job.id || job.slug}
                icon={iconMap[job.icon as keyof typeof iconMap] || <DeveloperIcon />}
                category={(job.filter || "DEVELOPER").toUpperCase()}
                categoryColor={colors.badge}
                iconBg={colors.iconBg}
                title={job.title}
                skills={Array.isArray(job.skills) ? job.skills : []}
                btnGradient={colors.btnGradient}
                jobId={job.slug || job.id}
              />
            );
          })}
        </div>
      )}

      {filteredJobs.length > 6 && (
        <div className="text-center">
          <button
            className="px-8 py-3 border border-[#32353C] rounded-full text-[#C2C6D6] hover:border-[#ADC6FF]/50 hover:text-white transition-colors text-sm"
            style={{
              backgroundColor: "#191B23",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}
