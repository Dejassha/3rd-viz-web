import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/src/lib/blog';

interface BlogCardProps {
  blog: BlogPost;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="blog-card">
      <Link href={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }}>
        <div className="blog-card-image-wrapper">
          {blog.featuredImage ? (
            <Image
              src={blog.featuredImage}
              alt={blog.featuredImageAlt || blog.title}
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain w-full h-full"
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: '#1a1a1a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#444',
                fontSize: '0.9rem',
              }}
            >
              No Image
            </div>
          )}
        </div>

        <div className="blog-card-body">
          <div className="blog-card-author">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>By {blog.author}</span>
          </div>

          <h3 className="blog-card-title">{blog.title}</h3>

          <span className="blog-card-readmore">
            Read More <span className="readmore-icon">+</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
