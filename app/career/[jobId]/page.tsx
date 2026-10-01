import Link from 'next/link';
import { getCareerById } from '@/src/lib/payload';
import JobHeader from './components/jobheader';
import JobSidebar from './components/jobsidebar';
import {
  JobDescription,
  RolesAndResponsibilities,
  Eligibility,
  SkillsRequired,
  ImportantNote,
} from './components/jobsections';

export const revalidate = 60; // Revalidate every minute

interface Props {
  params: Promise<{
    jobId: string;
  }>;
}

export default async function JobDetailsPage({ params }: Props) {
  const { jobId } = await params;
  const job = await getCareerById(jobId);

  if (!job) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Job Not Found</h1>
          <p style={{ color: '#8C909F' }}>The job posting doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const sections = [
    'Job Description',
    'Roles and Responsibilities',
    'Eligibility',
    'Skills Required',
  ];

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{
        paddingLeft: '80px',
        paddingRight: '80px',
        paddingTop: '48px',
        paddingBottom: '64px',
      }}
    >
      <JobHeader
        title={job.title}
        experience={job.experience}
        location={job.location}
        jobType={job.jobType}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <aside style={{ width: '281px', flexShrink: 0 }}>
          <div
            style={{
              position: 'sticky',
              top: '24px',
              maxHeight: 'calc(100vh - 48px)',
              overflowY: 'auto',
            }}
          >
            <JobSidebar sections={sections} />
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <JobDescription content={job.description} />
          <RolesAndResponsibilities items={job.responsibilities} />
          <Eligibility items={job.eligibility} />
          <SkillsRequired skills={job.skills} />
          {job.importantNote && <ImportantNote content={job.importantNote} />}

          <div className="mt-6">
            <Link href={`/career/${jobId}/apply`}>
              <button
                className="bg-gradient-to-r from-[#ADC6FF] to-[#4D8EFF] text-[#1E1E1E] font-medium py-3 px-8 rounded-full transition-all flex items-center justify-center gap-3 text-xl hover:opacity-90"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                I&apos;m Interested - Apply Now 
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}