// interface JobHeaderProps {
//   title: string;
//   experience: string;
//   location: string;
//   jobType: string;
// }

// export default function JobHeader({ title, experience, location, jobType }: JobHeaderProps) {
//   return (
//     <div
//       className="border border-[#32353C] rounded-2xl p-8 mb-8"
//       style={{ backgroundColor: '#191B23' }}   // ← was #0B0E15, now visible
//     >
//       {/* Breadcrumb */}
//       <nav
//         className="flex items-center gap-2 text-sm mb-6"
//         style={{ fontFamily: 'Poppins, sans-serif' }}
//       >
//         <a href="/career" className="text-[#8C909F] hover:text-white transition-colors">
//           Career Home
//         </a>
//         <span className="text-[#8C909F]">›</span>
//         <span className="text-[#8C909F]">Job Details</span>
//         <span className="text-[#8C909F]">›</span>
//         <span
//           className="bg-clip-text text-transparent font-medium"
//           style={{ backgroundImage: 'linear-gradient(to right, #ADC6FF, #4D8EFF)' }}
//         >
//           Application Form
//         </span>
//       </nav>

//       {/* Job title */}
//       <h1
//         className="text-[56px] leading-tight text-white mb-8"
//         style={{ fontFamily: 'Anta, sans-serif' }}
//       >
//         {title}
//       </h1>

//       {/* Meta row */}
//       <div className="flex flex-wrap gap-8">

//         {/* Experience */}
//         <div className="flex items-center gap-2">
//           <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24">
//             <defs>
//               <linearGradient id="hg1" x1="0" y1="0" x2="24" y2="0">
//                 <stop stopColor="#ADC6FF" />
//                 <stop offset="1" stopColor="#4D8EFF" />
//               </linearGradient>
//             </defs>
//             <rect x="2" y="4" width="20" height="17" rx="2" fill="url(#hg1)" />
//             <path d="M7 10h10M7 14h6" stroke="#191B23" strokeWidth="1.5" strokeLinecap="round" />
//           </svg>
//           <span
//             className="text-[#C2C6D6] text-base"
//             style={{ fontFamily: 'Poppins, sans-serif' }}
//           >
//             {experience}
//           </span>
//         </div>

//         {/* Location */}
//         <div className="flex items-center gap-2">
//           <svg className="w-4 h-5 flex-shrink-0" fill="none" viewBox="0 0 16 20">
//             <defs>
//               <linearGradient id="hg2" x1="0" y1="0" x2="16" y2="0">
//                 <stop stopColor="#ADC6FF" />
//                 <stop offset="1" stopColor="#4D8EFF" />
//               </linearGradient>
//             </defs>
//             <path
//               d="M8 1C4.686 1 2 3.686 2 7c0 4.5 6 12 6 12s6-7.5 6-12c0-3.314-2.686-6-6-6z"
//               fill="url(#hg2)"
//             />
//             <circle cx="8" cy="7" r="2" fill="#191B23" />
//           </svg>
//           <span
//             className="text-[#C2C6D6] text-base"
//             style={{ fontFamily: 'Poppins, sans-serif' }}
//           >
//             {location}
//           </span>
//         </div>

//         {/* Job type */}
//         <div className="flex items-center gap-2">
//           <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 20 20">
//             <defs>
//               <linearGradient id="hg3" x1="0" y1="0" x2="20" y2="0">
//                 <stop stopColor="#ADC6FF" />
//                 <stop offset="1" stopColor="#4D8EFF" />
//               </linearGradient>
//             </defs>
//             <circle cx="10" cy="10" r="9" fill="url(#hg3)" />
//             <path
//               d="M10 5v5l3 3"
//               stroke="#191B23"
//               strokeWidth="1.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//           <span
//             className="text-[#C2C6D6] text-base"
//             style={{ fontFamily: 'Poppins, sans-serif' }}
//           >
//             {jobType}
//           </span>
//         </div>

//       </div>
//     </div>
//   );
// }


interface JobHeaderProps {
  title: string;
  experience: string;
  location: string;
  jobType: string;
}

export default function JobHeader({ title, experience, location, jobType }: JobHeaderProps) {
  return (
    <div
      className="rounded-2xl p-8 mb-8"
      style={{
        backgroundColor: '#12141C',
        border: '1px solid #1E2D4A',
      }}
    >
      <nav
        className="flex items-center gap-2 text-sm mb-6"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <a href="/career" className="text-[#8C909F] hover:text-white transition-colors">
          Career Home
        </a>
        <span className="text-[#8C909F]">›</span>
        <span
          className="bg-clip-text text-transparent font-medium"
          style={{ backgroundImage: 'linear-gradient(to right, #ADC6FF, #4D8EFF)' }}
        >
          Job Details
        </span>
      </nav>

      <h1
        className="text-[56px] leading-tight text-white mb-8"
        style={{ fontFamily: 'Anta, sans-serif' }}
      >
        {title}
      </h1>

      <div className="flex flex-wrap gap-8">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="hg1" x1="0" y1="0" x2="24" y2="0">
                <stop stopColor="#ADC6FF" />
                <stop offset="1" stopColor="#4D8EFF" />
              </linearGradient>
            </defs>
            <rect x="2" y="4" width="20" height="17" rx="2" fill="url(#hg1)" />
            <path d="M7 10h10M7 14h6" stroke="#12141C" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-[#C2C6D6] text-base" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {experience}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <svg className="w-4 h-5 flex-shrink-0" fill="none" viewBox="0 0 16 20">
            <defs>
              <linearGradient id="hg2" x1="0" y1="0" x2="16" y2="0">
                <stop stopColor="#ADC6FF" />
                <stop offset="1" stopColor="#4D8EFF" />
              </linearGradient>
            </defs>
            <path
              d="M8 1C4.686 1 2 3.686 2 7c0 4.5 6 12 6 12s6-7.5 6-12c0-3.314-2.686-6-6-6z"
              fill="url(#hg2)"
            />
            <circle cx="8" cy="7" r="2" fill="#12141C" />
          </svg>
          <span className="text-[#C2C6D6] text-base" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {location}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="hg3" x1="0" y1="0" x2="20" y2="0">
                <stop stopColor="#ADC6FF" />
                <stop offset="1" stopColor="#4D8EFF" />
              </linearGradient>
            </defs>
            <circle cx="10" cy="10" r="9" fill="url(#hg3)" />
            <path
              d="M10 5v5l3 3"
              stroke="#12141C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[#C2C6D6] text-base" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {jobType}
          </span>
        </div>
      </div>
    </div>
  );
}