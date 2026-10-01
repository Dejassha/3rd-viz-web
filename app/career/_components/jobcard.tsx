import Link from 'next/link';

interface JobCardProps {
  icon: React.ReactNode;
  category: string;
  categoryColor: string;   // badge pill color classes
  iconBg: string;          // icon container bg class
  title: string;
  skills: string[];
  btnGradient: string;     // CSS gradient string for the button
  jobId: string;
}

export default function JobCard({
  icon,
  category,
  categoryColor,
  iconBg,
  title,
  skills,
  btnGradient,
  jobId,
}: JobCardProps) {
  return (
    <div
      className="rounded-2xl p-6 border border-[#32353C] hover:border-[#ADC6FF]/30 transition-all flex flex-col"
      style={{ backgroundColor: '#191B23' }}
    >
      {/* Icon + badge row */}
      <div className="flex justify-between items-start mb-6">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>
        <span
          className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${categoryColor}`}
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          {category}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-xl font-bold text-white mb-4"
        style={{ fontFamily: 'Outfit, sans-serif' }}
      >
        {title}
      </h3>

      {/* Skill chips */}
      <div className="flex flex-wrap gap-2 mb-6 flex-grow">
        {skills.slice(0, 3).map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-full text-xs text-[#C2C6D6] border border-[#32353C]"
            style={{ backgroundColor: '#272A31', fontFamily: 'Poppins, sans-serif' }}
          >
            {skill}
          </span>
        ))}
      </div>

      {/* CTA button — category gradient */}
      <Link href={`/career/${jobId}`} className="block">
        <button
          className="w-full py-3 rounded-full font-medium text-white text-sm transition-opacity hover:opacity-90"
          style={{
            background: btnGradient,
            fontFamily: 'Outfit, sans-serif',
            // make text dark for light gradients (testing/operations)
            color: '#fff',
          }}
        >
          View Details
        </button>
      </Link>
    </div>
  );
}