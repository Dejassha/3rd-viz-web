'use client';

import { useState, useMemo } from 'react';
import BlogHero from './BlogHero';
import BlogSidebar, { SERVICE_CATEGORIES } from './BlogSidebar';
import BlogGrid from './BlogGrid';
import type { BlogPost } from '@/src/lib/blog';

interface BlogContentProps {
  blogs: BlogPost[];
}

export default function BlogContent({ blogs }: BlogContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  const filteredBlogs = useMemo(() => {
    let result = blogs;

    // Filter by category
    if (activeCategory) {
      result = result.filter((blog) => blog.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog.excerpt.toLowerCase().includes(query) ||
          blog.author.toLowerCase().includes(query) ||
          blog.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return result;
  }, [blogs, searchQuery, activeCategory]);

  return (
    <>
      <BlogHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="blog-layout">
        <BlogSidebar
          categories={SERVICE_CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <BlogGrid blogs={filteredBlogs} />
      </div>
    </>
  );
}
