import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/src/lib/blog';

interface RecentPostsWidgetProps {
  recentBlogs: BlogPost[];
}

export default function RecentPostsWidget({ recentBlogs }: RecentPostsWidgetProps) {
  if (recentBlogs.length === 0) return null;

  return (
    <aside className="blog-detail-right-sidebar">
      <div className="recent-posts-widget">
        <h3>Recent Posts</h3>
        <div className="recent-posts-list">
          {recentBlogs.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="recent-post-item">
              {post.featuredImage ? (
                <Image
                  src={post.featuredImage}
                  alt={post.featuredImageAlt || post.title}
                  width={80}
                  height={60}
                  unoptimized
                  className="recent-post-img object-cover"
                />
              ) : (
                <div
                  style={{
                    width: '80px',
                    height: '60px',
                    background: '#1a1a1a',
                    borderRadius: '6px',
                    flexShrink: 0
                  }}
                />
              )}
              <div className="recent-post-info">
                <span className="recent-post-title">{post.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
