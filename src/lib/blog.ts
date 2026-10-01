/**
 * Payload CMS API helpers for fetching blog data.
 *
 * These functions call the Payload REST API and transform the response
 * into the BlogPost shape that the blog components expect.
 */

const PAYLOAD_URL =
  process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001'

// ─── Types ──────────────────────────────────────────────────────

interface PayloadMedia {
  id: string
  url: string
  filename: string
  alt: string
  width?: number
  height?: number
  sizes?: {
    thumbnail?: { url: string; width: number; height: number }
    card?: { url: string; width: number; height: number }
    banner?: { url: string; width: number; height: number }
  }
}

interface PayloadBlogDoc {
  id: string
  title: string
  slug: string
  author: string
  status: 'draft' | 'published'
  category: string
  featuredImage: PayloadMedia | string
  slideshow?: Array<{ id: string; image: PayloadMedia | string }>
  excerpt: string
  content: unknown // Lexical rich-text JSON
  tags?: Array<{ tag: string }>
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  author: string
  category: string
  featuredImage: string
  featuredImageAlt: string
  slideshow: Array<{ url: string; alt: string }>
  excerpt: string
  content: unknown
  tags: string[]
}

// ─── Helpers ────────────────────────────────────────────────────

function resolveMediaUrl(media: PayloadMedia | string | null | undefined): string {
  if (!media) return ''
  let url = typeof media === 'string' ? media : media.url

  if (url.startsWith('/api/media/file/')) {
    url = url.replace('/api/media/file/', '/media/')
  }

  return url.startsWith('http') ? url : `${PAYLOAD_URL}${url}`
}

function resolveMediaAlt(media: PayloadMedia | string | null | undefined): string {
  if (!media || typeof media === 'string') return ''
  return media.alt || ''
}

function transformBlog(doc: PayloadBlogDoc): BlogPost {
  return {
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    author: doc.author,
    category: doc.category,
    featuredImage: resolveMediaUrl(doc.featuredImage),
    featuredImageAlt: resolveMediaAlt(doc.featuredImage),
    slideshow: (doc.slideshow || []).map(item => ({
      url: resolveMediaUrl(item.image),
      alt: resolveMediaAlt(item.image)
    })).filter(img => img.url),
    excerpt: doc.excerpt,
    content: doc.content,
    tags: (doc.tags || []).map((t) => t.tag),
  }
}

// ─── Public API ─────────────────────────────────────────────────

/**
 * Fetch all published blog posts, ordered by publishedDate descending.
 */
export async function getAllBlogs(): Promise<BlogPost[]> {
  try {
    const url = new URL(`${PAYLOAD_URL}/api/blogs`)
    url.searchParams.set('where[status][equals]', 'published')
    url.searchParams.set('sort', '-createdAt')
    url.searchParams.set('depth', '1')
    url.searchParams.set('limit', '100')

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      console.error(`Payload API error: ${res.status} ${res.statusText}`)
      return []
    }

    const data = await res.json()
    return (data.docs || []).map((doc: PayloadBlogDoc) => transformBlog(doc))
  } catch (error) {
    console.error('Failed to fetch blogs from Payload CMS:', error)
    return []
  }
}

/**
 * Fetch a single blog post by slug.
 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const url = new URL(`${PAYLOAD_URL}/api/blogs`)
    url.searchParams.set('where[slug][equals]', slug)
    url.searchParams.set('where[status][equals]', 'published')
    url.searchParams.set('depth', '1')
    url.searchParams.set('limit', '1')

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      console.error(`Payload API error: ${res.status} ${res.statusText}`)
      return null
    }

    const data = await res.json()

    if (!data.docs || data.docs.length === 0) {
      return null
    }

    return transformBlog(data.docs[0] as PayloadBlogDoc)
  } catch (error) {
    console.error('Failed to fetch blog from Payload CMS:', error)
    return null
  }
}

/**
 * Fetch blogs filtered by category.
 */
export async function getBlogsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const url = new URL(`${PAYLOAD_URL}/api/blogs`)
    url.searchParams.set('where[status][equals]', 'published')
    url.searchParams.set('where[category][equals]', category)
    url.searchParams.set('sort', '-createdAt')
    url.searchParams.set('depth', '1')
    url.searchParams.set('limit', '100')

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      console.error(`Payload API error: ${res.status} ${res.statusText}`)
      return []
    }

    const data = await res.json()
    return (data.docs || []).map((doc: PayloadBlogDoc) => transformBlog(doc))
  } catch (error) {
    console.error('Failed to fetch blogs by category from Payload CMS:', error)
    return []
  }
}

/**
 * Get all unique categories that have published blogs.
 */
export async function getBlogCategories(): Promise<string[]> {
  const blogs = await getAllBlogs()
  const categories = Array.from(new Set(blogs.map((b) => b.category)))
  return categories.sort()
}
