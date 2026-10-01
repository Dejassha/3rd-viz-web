'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

interface JobSidebarProps {
  sections: string[];
}

export default function JobSidebar({ sections }: JobSidebarProps) {
  const [copied, setCopied] = useState(false);

  const scrollToSection = (section: string) => {
    const el = document.getElementById(section.toLowerCase().replace(/\s+/g, '-'));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  };

  const handleWhatsAppShare = () => {
    const url = getShareUrl();
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`, '_blank');
  };

  const handleLinkedInShare = () => {
    const url = getShareUrl();
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleCopyLink = () => {
    const url = getShareUrl();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* On this Page */}
      <div
        className="rounded-xl p-4"
        style={{
          backgroundColor: '#12141C',
          border: '1px solid #1E2D4A',
        }}
      >
        <h3
          className="text-[#E1E2EC] text-xl font-semibold mb-3"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          On this Page
        </h3>
        <ul className="space-y-1">
          {sections.map((section, i) => (
            <li key={i}>
              <button
                onClick={() => scrollToSection(section)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  i === 0
                    ? 'text-white bg-white/5 font-medium'
                    : 'text-[#8D8D8D] hover:text-white'
                }`}
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                {section}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Share this Job */}
      <div
        className="rounded-xl p-4"
        style={{
          backgroundColor: '#12141C',
          border: '1px solid #1E2D4A',
        }}
      >
        <h3
          className="text-[#E1E2EC] text-xl font-semibold mb-3"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Share this Job
        </h3>
        <div className="flex flex-wrap items-center gap-2.5">
          {/* WhatsApp Share */}
          <button
            type="button"
            onClick={handleWhatsAppShare}
            title="Share on WhatsApp"
            aria-label="Share on WhatsApp"
            className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center hover:bg-[#20ba5a] transition-all hover:scale-105 shadow-md cursor-pointer"
          >
            <Icon icon="ic:baseline-whatsapp" className="w-5 h-5 text-white" />
          </button>

          {/* LinkedIn Share */}
          <button
            type="button"
            onClick={handleLinkedInShare}
            title="Share on LinkedIn"
            aria-label="Share on LinkedIn"
            className="w-10 h-10 bg-[#0077B5] rounded-full flex items-center justify-center hover:bg-[#006097] transition-all hover:scale-105 shadow-md cursor-pointer"
          >
            <Icon icon="mdi:linkedin" className="w-5 h-5 text-white" />
          </button>

          {/* Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            title="Copy Job Link"
            aria-label="Copy Job Link"
            className={`h-10 px-3.5 rounded-full flex items-center gap-2 transition-all hover:scale-105 text-xs font-medium cursor-pointer ${
              copied
                ? 'bg-green-600/90 text-white'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
            }`}
          >
            <Icon icon={copied ? 'lucide:check' : 'lucide:copy'} className="w-4 h-4" />
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}