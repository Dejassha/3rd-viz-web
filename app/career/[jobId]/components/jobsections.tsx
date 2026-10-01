// function GradientIcon({ children }: { children: React.ReactNode }) {
//   return (
//     <div
//       className="w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0"
//       style={{ background: 'linear-gradient(to right, #ADC6FF, #4D8EFF)' }}
//     >
//       {children}
//     </div>
//   );
// }

// export function JobDescription({ content }: { content: string[] }) {
//   return (
//     <section 
//       id="job-description"
//       className="border border-[#32353C] rounded-xl p-6 mb-6"
//       style={{ backgroundColor: '#191B23' } } 
//     >
//       <div className="flex items-center gap-4 mb-4">
//         <GradientIcon>
//           {/* Filled document icon with folded corner */}
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
//             <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" />
//             <path d="M14 2V8H20" fill="white" opacity="0.6" />
//             <path d="M8 13H16M8 17H13" stroke="#4D8EFF" strokeWidth="1.5" strokeLinecap="round" />
//           </svg>
//         </GradientIcon>
//         <h2
//           className="text-2xl text-white"
//           style={{ fontFamily: 'Outfit, sans-serif' }}
//         >
//           Job Description
//         </h2>
//       </div>
//       <div
//         className="space-y-4 text-base leading-relaxed"
//         style={{ color: '#C2C6D6', fontFamily: 'Poppins, sans-serif' }}
//       >
//         {content.map((p, i) => <p key={i}>{p}</p>)}
//       </div>
//     </section>
//   );
// }

// export function RolesAndResponsibilities({ items }: { items: string[] }) {
//   return (
//     <section
//       id="roles-and-responsibilities"
//       className="border border-[#32353C] rounded-xl p-6 mb-6"
//       style={{ backgroundColor: '#191B23' }}
//     >
//       <div className="flex items-center gap-4 mb-6">
//         <GradientIcon>
//           {/* Filled clipboard with check */}
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
//             <path d="M19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" />
//             <path d="M12 3C12.55 3 13 3.45 13 4C13 4.55 12.55 5 12 5C11.45 5 11 4.55 11 4C11 3.45 11.45 3 12 3Z" fill="#4D8EFF" />
//             <path d="M7 12.5L10 15.5L17 8.5" stroke="#4D8EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
//           </svg>
//         </GradientIcon>
//         <h2
//           className="text-2xl text-white"
//           style={{ fontFamily: 'Outfit, sans-serif' }}
//         >
//           Roles and Responsibilities
//         </h2>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {items.map((item, i) => (
//           <div
//             key={i}
//             className="border border-[#32353C] rounded-xl p-4 flex gap-4"
//             style={{ backgroundColor: '#191B23' }}
//           >
//             <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20">
//               <defs>
//                 <linearGradient id={`checkGrad${i}`} x1="0" y1="0" x2="20" y2="0">
//                   <stop stopColor="#ADC6FF" />
//                   <stop offset="1" stopColor="#4D8EFF" />
//                 </linearGradient>
//               </defs>
//               <circle cx="10" cy="10" r="9" fill={`url(#checkGrad${i})`} />
//               <path d="M6 10l3 3 5-6" stroke="#191B23" strokeWidth="2" fill="none" strokeLinecap="round" />
//             </svg>
//             <p
//               className="text-base leading-relaxed"
//               style={{ color: '#C2C6D6', fontFamily: 'Poppins, sans-serif' }}
//             >
//               {item}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export function Eligibility({ items }: { items: string[] }) {
//   return (
//     <section
//       id="eligibility"
//       className="border border-[#32353C] rounded-xl p-6 mb-6"
//       style={{ backgroundColor: '#191B23' }}
//     >
//       <div className="flex items-center gap-4 mb-4">
//         <GradientIcon>
//           {/* Filled graduation cap */}
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
//             <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3Z" />
//             <path d="M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
//           </svg>
//         </GradientIcon>
//         <h2
//           className="text-2xl text-white"
//           style={{ fontFamily: 'Outfit, sans-serif' }}
//         >
//           Eligibility
//         </h2>
//       </div>
//       <h3
//         className="text-base font-medium mb-4 bg-clip-text text-transparent"
//         style={{
//           backgroundImage: 'linear-gradient(to right, #ADC6FF, #4D8EFF)',
//           fontFamily: 'Outfit, sans-serif',
//         }}
//       >
//         Academic Qualifications
//       </h3>
//       <ul className="space-y-3">
//         {items.map((item, i) => (
//           <li
//             key={i}
//             className="flex items-start gap-4 text-base"
//             style={{ color: '#E1E2EC', fontFamily: 'Poppins, sans-serif' }}
//           >
//             <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 22 16">
//               <defs>
//                 <linearGradient id={`eliGrad${i}`} x1="0" y1="0" x2="22" y2="0">
//                   <stop stopColor="#ADC6FF" />
//                   <stop offset="1" stopColor="#4D8EFF" />
//                 </linearGradient>
//               </defs>
//               <path
//                 d="M1 8l5 6L21 1"
//                 stroke={`url(#eliGrad${i})`}
//                 strokeWidth="2.5"
//                 fill="none"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <span>{item}</span>
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }

// export function SkillsRequired({ skills }: { skills: string[] }) {
//   return (
//     <section
//       id="skills-required"
//       className="border border-[#32353C] rounded-xl p-6 mb-6"
//       style={{ backgroundColor: '#191B23' }}
//     >
//       <div className="flex items-center gap-4 mb-4">
//         <GradientIcon>
//           {/* Filled lightbulb */}
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
//             <path d="M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2Z" />
//             <path d="M9 21C9 21.55 9.45 22 10 22H14C14.55 22 15 21.55 15 21V20H9V21Z" />
//             <path d="M9 19H15V18H9V19Z" fill="#4D8EFF" />
//           </svg>
//         </GradientIcon>
//         <h2
//           className="text-2xl text-white"
//           style={{ fontFamily: 'Outfit, sans-serif' }}
//         >
//           Skills Required
//         </h2>
//       </div>
//       <div className="flex flex-wrap gap-3">
//         {skills.map((skill, i) => (
//           <span
//             key={i}
//             className="px-4 py-2 rounded-full text-base border border-[#32353C]"
//             style={{
//               backgroundColor: '#272A31',
//               color: '#E1E2EC',
//               fontFamily: 'Poppins, sans-serif',
//             }}
//           >
//             {skill}
//           </span>
//         ))}
//       </div>
//     </section>
//   );
// }

// export function ImportantNote({ content }: { content: string }) {
//   const lines = content
//     .split(/(?<=\.)\s+/)
//     .map((s) => s.trim())
//     .filter(Boolean);

//   return (
//     <div
//       className="rounded-xl p-6 mb-6 flex gap-4"
//       style={{
//         backgroundColor: 'rgba(65, 0, 2, 0.4)',
//         border: '2px solid rgba(255, 180, 171, 0.2)',
//         fontFamily: 'Poppins, sans-serif',
//       }}
//     >
//       <div className="flex-shrink-0 mt-0.5">
//         <div
//           className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
//           style={{ backgroundColor: '#FFB4AB', color: '#410002' }}
//         >
//           i
//         </div>
//       </div>
//       <div>
//         <h4
//           className="text-base font-semibold mb-3"
//           style={{ color: '#FFB4AB' }}
//         >
//           Important Note:
//         </h4>
//         <ul className="space-y-2">
//           {lines.map((line, i) => (
//             <li
//               key={i}
//               className="text-base leading-relaxed"
//               style={{ color: '#FFB4AB' }}
//             >
//               {line}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// function GradientIcon({ children }: { children: React.ReactNode }) {
//   return (
//     <div
//       className="w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0"
//       style={{ background: 'linear-gradient(to right, #ADC6FF, #4D8EFF)' }}
//     >
//       {children}
//     </div>
//   );
// }

// const sectionStyle = {
//   backgroundColor: '#12141C',
//   border: '1px solid #1E2D4A',
// };

// const cardStyle = {
//   backgroundColor: '#0D0F18',
//   border: '1px solid #1E2D4A',
// };

// export function JobDescription({ content }: { content: string[] }) {
//   return (
//     <section
//       id="job-description"
//       className="rounded-xl p-6 mb-6"
//       style={sectionStyle}
//     >
//       <div className="flex items-center gap-4 mb-4">
//         <GradientIcon>
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
//             <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" />
//             <path d="M14 2V8H20" fill="white" opacity="0.6" />
//             <path d="M8 13H16M8 17H13" stroke="#4D8EFF" strokeWidth="1.5" strokeLinecap="round" />
//           </svg>
//         </GradientIcon>
//         <h2 className="text-2xl text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
//           Job Description
//         </h2>
//       </div>
//       <div
//         className="space-y-4 text-base leading-relaxed"
//         style={{ color: '#C2C6D6', fontFamily: 'Poppins, sans-serif' }}
//       >
//         {content.map((p, i) => <p key={i}>{p}</p>)}
//       </div>
//     </section>
//   );
// }

// export function RolesAndResponsibilities({ items }: { items: string[] }) {
//   return (
//     <section
//       id="roles-and-responsibilities"
//       className="rounded-xl p-6 mb-6"
//       style={sectionStyle}
//     >
//       <div className="flex items-center gap-4 mb-6">
//         <GradientIcon>
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
//             <path d="M19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" />
//             <path d="M12 3C12.55 3 13 3.45 13 4C13 4.55 12.55 5 12 5C11.45 5 11 4.55 11 4C11 3.45 11.45 3 12 3Z" fill="#4D8EFF" />
//             <path d="M7 12.5L10 15.5L17 8.5" stroke="#4D8EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
//           </svg>
//         </GradientIcon>
//         <h2 className="text-2xl text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
//           Roles and Responsibilities
//         </h2>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {items.map((item, i) => (
//           <div key={i} className="rounded-xl p-4 flex gap-4" style={cardStyle}>
//             <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20">
//               <defs>
//                 <linearGradient id={`checkGrad${i}`} x1="0" y1="0" x2="20" y2="0">
//                   <stop stopColor="#ADC6FF" />
//                   <stop offset="1" stopColor="#4D8EFF" />
//                 </linearGradient>
//               </defs>
//               <circle cx="10" cy="10" r="9" fill={`url(#checkGrad${i})`} />
//               <path d="M6 10l3 3 5-6" stroke="#0D0F18" strokeWidth="2" fill="none" strokeLinecap="round" />
//             </svg>
//             <p
//               className="text-base leading-relaxed"
//               style={{ color: '#C2C6D6', fontFamily: 'Poppins, sans-serif' }}
//             >
//               {item}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export function Eligibility({ items }: { items: string[] }) {
//   return (
//     <section
//       id="eligibility"
//       className="rounded-xl p-6 mb-6"
//       style={sectionStyle}
//     >
//       <div className="flex items-center gap-4 mb-4">
//         <GradientIcon>
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
//             <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3Z" />
//             <path d="M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
//           </svg>
//         </GradientIcon>
//         <h2 className="text-2xl text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
//           Eligibility
//         </h2>
//       </div>
//       <h3
//         className="text-base font-medium mb-4 bg-clip-text text-transparent"
//         style={{
//           backgroundImage: 'linear-gradient(to right, #ADC6FF, #4D8EFF)',
//           fontFamily: 'Outfit, sans-serif',
//         }}
//       >
//         Academic Qualifications
//       </h3>
//       <ul className="space-y-3">
//         {items.map((item, i) => (
//           <li
//             key={i}
//             className="flex items-start gap-4 text-base"
//             style={{ color: '#E1E2EC', fontFamily: 'Poppins, sans-serif' }}
//           >
//             <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 22 16">
//               <defs>
//                 <linearGradient id={`eliGrad${i}`} x1="0" y1="0" x2="22" y2="0">
//                   <stop stopColor="#ADC6FF" />
//                   <stop offset="1" stopColor="#4D8EFF" />
//                 </linearGradient>
//               </defs>
//               <path
//                 d="M1 8l5 6L21 1"
//                 stroke={`url(#eliGrad${i})`}
//                 strokeWidth="2.5"
//                 fill="none"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <span>{item}</span>
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }

// export function SkillsRequired({ skills }: { skills: string[] }) {
//   return (
//     <section
//       id="skills-required"
//       className="rounded-xl p-6 mb-6"
//       style={sectionStyle}
//     >
//       <div className="flex items-center gap-4 mb-4">
//         <GradientIcon>
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
//             <path d="M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2Z" />
//             <path d="M9 21C9 21.55 9.45 22 10 22H14C14.55 22 15 21.55 15 21V20H9V21Z" />
//             <path d="M9 19H15V18H9V19Z" fill="#4D8EFF" />
//           </svg>
//         </GradientIcon>
//         <h2 className="text-2xl text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
//           Skills Required
//         </h2>
//       </div>
//       <div className="flex flex-wrap gap-3">
//         {skills.map((skill, i) => (
//           <span
//             key={i}
//             className="px-4 py-2 rounded-full text-base"
//             style={{
//               backgroundColor: '#272A31',
//               border: '1px solid #32353C',
//               color: '#E1E2EC',
//               fontFamily: 'Poppins, sans-serif',
//             }}
//           >
//             {skill}
//           </span>
//         ))}
//       </div>
//     </section>
//   );
// }

// export function ImportantNote({ content }: { content: string }) {
//   const lines = content
//     .split(/(?<=\.)\s+/)
//     .map((s) => s.trim())
//     .filter(Boolean);

//   return (
//     <div
//       className="rounded-xl p-6 mb-6 flex gap-4"
//       style={{
//         backgroundColor: 'rgba(65, 0, 2, 0.4)',
//         border: '1px solid rgba(255, 180, 171, 0.2)',
//         fontFamily: 'Poppins, sans-serif',
//       }}
//     >
//       <div className="flex-shrink-0 mt-0.5">
//         <div
//           className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
//           style={{ backgroundColor: '#FFB4AB', color: '#410002' }}
//         >
//           i
//         </div>
//       </div>
//       <div>
//         <h4 className="text-base font-semibold mb-3" style={{ color: '#FFB4AB' }}>
//           Important Note:
//         </h4>
//         <ul className="space-y-2">
//           {lines.map((line, i) => (
//             <li key={i} className="text-base leading-relaxed" style={{ color: '#FFB4AB' }}>
//               {line}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

function GradientIcon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-center rounded-lg flex-shrink-0"
      style={{
        width: '48px',
        height: '48px',
        background: 'linear-gradient(135deg, #1E2D4A 0%, #0D1829 100%)',
        border: '1px solid #2A3F6F',
      }}
    >
      {children}
    </div>
  );
}

const sectionStyle = {
  backgroundColor: '#12141C',
  border: '1px solid #1E2D4A',
};

const cardStyle = {
  backgroundColor: '#0D0F18',
  border: '1px solid #1E2D4A',
};

export function JobDescription({ content }: { content: string[] }) {
  return (
    <section id="job-description" className="rounded-xl p-6 mb-6" style={sectionStyle}>
      <div className="flex items-center gap-3 mb-4">
        <GradientIcon>
          {/* Filled document with lines */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
              fill="#4D8EFF"
              fillOpacity="0.9"
            />
            <path d="M14 2V8H20" fill="#ADC6FF" fillOpacity="0.6" />
            <path
              d="M8 13H16M8 17H13"
              stroke="#0D1829"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </GradientIcon>
        <h2 className="text-2xl text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Job Description
        </h2>
      </div>
      <div
        className="space-y-4 text-base leading-relaxed"
        style={{ color: '#C2C6D6', fontFamily: 'Poppins, sans-serif' }}
      >
        {content.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </section>
  );
}

export function RolesAndResponsibilities({ items }: { items: string[] }) {
  return (
    <section id="roles-and-responsibilities" className="rounded-xl p-6 mb-6" style={sectionStyle}>
      <div className="flex items-center gap-3 mb-6">
        <GradientIcon>
          {/* Clipboard with checkmark */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="4" width="14" height="17" rx="2" fill="#4D8EFF" fillOpacity="0.9" />
            <path
              d="M9 3H15C15 3 15 5 12 5C9 5 9 3 9 3Z"
              fill="#ADC6FF"
            />
            <rect x="9" y="2" width="6" height="4" rx="1" fill="#ADC6FF" fillOpacity="0.8" />
            <path
              d="M8.5 12.5L11 15L15.5 10"
              stroke="#0D1829"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </GradientIcon>
        <h2 className="text-2xl text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Roles and Responsibilities
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={i} className="rounded-xl p-4 flex gap-4" style={cardStyle}>
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20">
              <defs>
                <linearGradient id={`checkGrad${i}`} x1="0" y1="0" x2="20" y2="0">
                  <stop stopColor="#ADC6FF" />
                  <stop offset="1" stopColor="#4D8EFF" />
                </linearGradient>
              </defs>
              <circle cx="10" cy="10" r="9" fill={`url(#checkGrad${i})`} />
              <path d="M6 10l3 3 5-6" stroke="#0D0F18" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
            <p
              className="text-base leading-relaxed"
              style={{ color: '#C2C6D6', fontFamily: 'Poppins, sans-serif' }}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Eligibility({ items }: { items: string[] }) {
  return (
    <section id="eligibility" className="rounded-xl p-6 mb-6" style={sectionStyle}>
      <div className="flex items-center gap-3 mb-4">
        <GradientIcon>
          {/* Graduation cap / box hat */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            {/* Cap board top */}
            <path
              d="M12 3L2 8L12 13L22 8L12 3Z"
              fill="#4D8EFF"
              fillOpacity="0.9"
              stroke="#ADC6FF"
              strokeWidth="0.5"
            />
            {/* Left side of box */}
            <path
              d="M7 10.5V15.5C7 15.5 9 17.5 12 17.5"
              stroke="#ADC6FF"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Right side of box */}
            <path
              d="M17 10.5V15.5C17 15.5 15 17.5 12 17.5"
              stroke="#ADC6FF"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Bottom of cap */}
            <path
              d="M7 15.5C7 15.5 9 18 12 18C15 18 17 15.5 17 15.5"
              fill="#4D8EFF"
              fillOpacity="0.4"
            />
          </svg>
        </GradientIcon>
        <h2 className="text-2xl text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Eligibility
        </h2>
      </div>
      <h3
        className="text-base font-medium mb-4 bg-clip-text text-transparent"
        style={{
          backgroundImage: 'linear-gradient(to right, #ADC6FF, #4D8EFF)',
          fontFamily: 'Outfit, sans-serif',
        }}
      >
        Academic Qualifications
      </h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-4 text-base"
            style={{ color: '#E1E2EC', fontFamily: 'Poppins, sans-serif' }}
          >
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 22 16">
              <defs>
                <linearGradient id={`eliGrad${i}`} x1="0" y1="0" x2="22" y2="0">
                  <stop stopColor="#ADC6FF" />
                  <stop offset="1" stopColor="#4D8EFF" />
                </linearGradient>
              </defs>
              <path
                d="M1 8l5 6L21 1"
                stroke={`url(#eliGrad${i})`}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SkillsRequired({ skills }: { skills: string[] }) {
  return (
    <section id="skills-required" className="rounded-xl p-6 mb-6" style={sectionStyle}>
      <div className="flex items-center gap-3 mb-4">
        <GradientIcon>
          {/* Human head with gear */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            {/* Head silhouette */}
            <path
              d="M12 3C9.5 3 7.5 5 7.5 7.5C7.5 9.5 8.5 11 10 11.8V13H14V11.8C15.5 11 16.5 9.5 16.5 7.5C16.5 5 14.5 3 12 3Z"
              fill="#4D8EFF"
              fillOpacity="0.85"
            />
            {/* Neck */}
            <path
              d="M10 13H14V14.5C14 14.5 13 15 12 15C11 15 10 14.5 10 14.5V13Z"
              fill="#4D8EFF"
              fillOpacity="0.7"
            />
            {/* Gear inside head */}
            <circle cx="12" cy="7.5" r="1.2" fill="#0D1829" />
            <path
              d="M12 5.5V6M12 9V9.5M10 7.5H9.5M14.5 7.5H14M10.6 6.1L10.2 5.7M13.8 9.3L13.4 8.9M10.6 8.9L10.2 9.3M13.8 5.7L13.4 6.1"
              stroke="#ADC6FF"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
            {/* Shoulders arc */}
            <path
              d="M7 21C7 18.2 9.2 16 12 16C14.8 16 17 18.2 17 21"
              stroke="#4D8EFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              fillOpacity="0.6"
            />
          </svg>
        </GradientIcon>
        <h2 className="text-2xl text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Skills Required
        </h2>
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="px-4 py-2 rounded-full text-base"
            style={{
              backgroundColor: '#272A31',
              border: '1px solid #32353C',
              color: '#E1E2EC',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

export function ImportantNote({ content }: { content: string }) {
  const lines = content
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div
      className="rounded-xl p-6 mb-6 flex gap-4"
      style={{
        backgroundColor: 'rgba(65, 0, 2, 0.4)',
        border: '1px solid rgba(255, 180, 171, 0.2)',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <div className="flex-shrink-0 mt-0.5">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ backgroundColor: '#FFB4AB', color: '#410002' }}
        >
          i
        </div>
      </div>
      <div>
        <h4 className="text-base font-semibold mb-3" style={{ color: '#FFB4AB' }}>
          Important Note:
        </h4>
        <ul className="space-y-2">
          {lines.map((line, i) => (
            <li key={i} className="text-base leading-relaxed" style={{ color: '#FFB4AB' }}>
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}