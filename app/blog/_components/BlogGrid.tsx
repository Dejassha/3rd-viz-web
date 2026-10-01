import BlogCard from './BlogCard';
import type { BlogPost } from '@/src/lib/blog';

interface BlogGridProps {
  blogs: BlogPost[];
}

export default function BlogGrid({ blogs }: BlogGridProps) {
  if (blogs.length === 0) {
    return (
      <div className="containar blog-grid">
        <div className="blog-grid-empty">
          <p>No blog posts found</p>
          <span>Try adjusting your search or category filter</span>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-grid">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
