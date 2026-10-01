import { getAllCareers, getCareerPageGlobal } from '@/src/lib/payload';
import CareerClient from './_components/CareerClient';
import CareerGallery from './_components/CareerGallery';
import CareerHero from './_components/CareerHero';

export const revalidate = 60; // Revalidate every minute

export default async function CareerPage() {
  const [jobs, careerPageGlobal] = await Promise.all([
    getAllCareers(),
    getCareerPageGlobal()
  ]);

  return (
    <div className="min-h-screen bg-black text-white w-full">
      {/* ── Full Width Career Hero Section (Pure Black & Dark Matrix Grid) ── */}
      <CareerHero />

      {/* ── Open Roles Search & Filters Section ── */}
      <div className="px-4 sm:px-8 md:px-12 lg:px-[80px] py-10 sm:py-14">
        <div id="open-roles-section" className="pt-2">
          <CareerClient jobs={jobs} />
        </div>

        {careerPageGlobal && (
          <div className="mt-20 pt-10 border-t border-[#1E2D4A]/50">
            <CareerGallery 
              images={careerPageGlobal.images} 
              videos={careerPageGlobal.videos} 
            />
          </div>
        )}
      </div>
    </div>
  );
}