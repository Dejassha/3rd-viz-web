import Link from 'next/link';

interface BlogHeroProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function BlogHero({ searchQuery, onSearchChange }: BlogHeroProps) {
  return (
    <section className="blog-hero">
      <h1>Blog</h1>
      

      {onSearchChange && (
        <div className="blog-top-search-wrapper">
          <input
            type="text"
            placeholder="Search articles, topics..."
            value={searchQuery || ''}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button className="blog-search-btn" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
