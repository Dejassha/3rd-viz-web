'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => onSearch(query);

  return (
    <div className="flex items-center bg-[#191B23] border border-[#32353C] rounded-full px-5 py-2.5 max-w-2xl mx-auto mb-10 gap-3">
      <svg className="w-5 h-5 text-[#8C909F] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder="Search roles, skills...."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        className="bg-transparent text-white placeholder-[#8C909F] flex-1 outline-none text-sm"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      />
      <button
        onClick={handleSearch}
        className="text-[#0D0F17] text-sm font-semibold px-6 py-2 rounded-full transition-opacity hover:opacity-90 flex-shrink-0"
        style={{
          background: 'linear-gradient(to right, #ADC6FF, #4D8EFF)',
          fontFamily: 'Outfit, sans-serif',
        }}
      >
        Search
      </button>
    </div>
  );
}