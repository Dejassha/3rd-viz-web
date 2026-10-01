import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogBySlug, getAllBlogs } from '@/src/lib/blog';
import BlogDetailSidebar from './../_components/BlogDetailSidebar';
import RecentPostsWidget from './../_components/RecentPostsWidget';
import BlogSlideshow from './../_components/BlogSlideshow';
import '../blog.css';

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { title: 'Blog Not Found' };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
  };
}

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export const revalidate = 60;

/**
 * Render Lexical rich-text content as HTML.
 * Handles the nested node structure from Payload's Lexical editor.
 */
function renderRichText(content: unknown): string {
  if (!content) return '';

  // Handle if content is already a string (HTML)
  if (typeof content === 'string') return content;

  // Handle Lexical JSON structure
  const root = content as { root?: { children?: unknown[] } };
  if (!root.root?.children) return '';

  return renderNodes(root.root.children);
}

function renderNodes(nodes: unknown[]): string {
  return nodes
    .map((node) => {
      const n = node as {
        type?: string;
        tag?: string;
        text?: string;
        format?: number;
        children?: unknown[];
        url?: string;
        fields?: { url?: string; newTab?: boolean; doc?: { relationTo?: string; value?: { slug?: string; category?: string; } } };
        listType?: string;
        value?: { url?: string; alt?: string };
      };

      // Text node
      if (n.type === 'text' && n.text !== undefined) {
        let text = n.text;
        if (n.format) {
          if (n.format & 1) text = `<strong>${text}</strong>`;
          if (n.format & 2) text = `<em>${text}</em>`;
          if (n.format & 8) text = `<u>${text}</u>`;
          if (n.format & 16) text = `<code>${text}</code>`;
          if (n.format & 4) text = `<s>${text}</s>`;
        }
        return text;
      }

      // Linebreak
      if (n.type === 'linebreak') return '<br />';

      const children = n.children ? renderNodes(n.children) : '';

      switch (n.type) {
        case 'heading':
          return `<${n.tag || 'h2'}>${children}</${n.tag || 'h2'}>`;
        case 'paragraph':
          return `<p>${children}</p>`;
        case 'list':
          if (n.listType === 'number') return `<ol>${children}</ol>`;
          return `<ul>${children}</ul>`;
        case 'listitem':
          return `<li>${children}</li>`;
        case 'link': {
          let url = n.fields?.url || n.url || '#';
          // Handle internal doc links if the user links to another payload document
          if (n.fields?.doc?.value?.slug) {
            const relation = n.fields.doc.relationTo;
            const slug = n.fields.doc.value.slug;
            const category = n.fields.doc.value.category;
            if (relation === 'services') {
              url = category ? `/services/${category}/${slug}` : `/services/${slug}`;
            } else if (relation === 'blogs') {
              url = `/blog/${slug}`;
            } else {
              url = `/${slug}`;
            }
          }
          const isExternal = n.fields?.newTab ?? url.startsWith('http');
          const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
          return `<a href="${url}"${target}>${children}</a>`;
        }
        case 'quote':
          return `<blockquote>${children}</blockquote>`;
        case 'upload':
          if (n.value?.url) {
            return `<img src="${n.value.url}" alt="${n.value.alt || ''}" />`;
          }
          return '';
        default:
          return children;
      }
    })
    .join('');
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  
  // Fetch current blog and all blogs to get recent ones
  const [blog, allBlogs] = await Promise.all([
    getBlogBySlug(slug),
    getAllBlogs(),
  ]);

  if (!blog) {
    notFound();
  }
  
  // Get up to 3 recent blogs excluding the current one
  const recentBlogs = allBlogs.filter(b => b.id !== blog.id).slice(0, 3);

  const categoryLabel = blog.category
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const htmlContent = renderRichText(blog.content);

  return (
    <div className="min-h-screen bg-black">
      <div className="containar blog-detail-layout">
        <BlogDetailSidebar />
        
        <div className="blog-detail-main blog-detail">
          {/* Back Link */}
          <Link href="/blog" className="blog-detail-back">
            ← Back to Blog
          </Link>

          {/* Meta (Removed Author and Date per user request) */}
          <div className="blog-detail-meta">
            <span className="blog-detail-category">{categoryLabel}</span>
          </div>

          {/* Title */}
          <h1>{blog.title}</h1>

          {/* Featured Image or Slideshow */}
          {blog.slideshow && blog.slideshow.length > 0 ? (
            <BlogSlideshow images={blog.slideshow} />
          ) : blog.featuredImage ? (
            <div className="blog-detail-image">
              <Image
                src={blog.featuredImage}
                alt={blog.featuredImageAlt || blog.title}
                width={860}
                height={480}
                style={{ width: '100%', height: 'auto' }}
                priority
                unoptimized
              />
            </div>
          ) : null}

          {/* Content */}
          <div
            className="blog-detail-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Tags */}
          {blog.tags.length > 0 && (
            <div className="blog-detail-tags">
              {blog.tags.map((tag) => (
                <span key={tag} className="blog-detail-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <RecentPostsWidget recentBlogs={recentBlogs} />
      </div>
    </div>
  );
}
