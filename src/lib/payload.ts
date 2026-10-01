/**
 * Payload CMS API helpers for fetching service page data.
 *
 * These functions call the Payload REST API and transform the response
 * into the ServicePageData shape that existing components expect.
 */

const PAYLOAD_URL =
  process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001'

// ─── Types for Payload REST API response ────────────────────────
// Media objects returned by Payload when depth >= 1
interface PayloadMedia {
  id: string | number
  url: string
  filename?: string
  alt?: string
  width?: number
  height?: number
  sizes?: {
    thumbnail?: { url: string; width?: number; height?: number }
    card?: { url: string; width?: number; height?: number }
    banner?: { url: string; width?: number; height?: number }
  }
}

interface PayloadServiceDoc {
  id: string | number
  title: string
  slug: string
  category: string | { id: string | number; slug: string; title: string }
  themeColor?: string
  meta_data: {
    title: string
    description: string
  }
  hero: {
    bg_color: string
    maintitle: string
    title: string
    video?: string
  }
  layoutOrder?: Array<{
    section: 'hero' | 'about' | 'industry' | 'tools' | 'process' | 'projects' | 'faq' | 'reviews'
  }>
  statscards?: Array<{
    count: string
    symbol: string
    heading: string
  }>

  industries?: Array<{
    name: string
    heading: string
    description: string
    buttonText: string
    cards: Array<{
      title: string
      description?: string
      variant: 'default' | 'dark' | 'accent'
      span?: 'half' | 'full'
    }>
  }>
  tools?: {
    heading: string
    sub_heading: string
    description: string
    tool_logos: Array<{
      name: string
      src: string
    }>
  }
  our_process: {
    main_icon: PayloadMedia | string | number
    steps: Array<{
      step_id: string
      title: string
      icon: PayloadMedia | string | number
    }>
  }
  projects?: Array<{
    id?: string | number
    title: string
    banner_image: PayloadMedia | string | number
  }>
  why_choose: Array<{
    num: string
    title: string
    desc: string
    icon: string
  }>
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  questions?: Array<{
    id?: string;
    question?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    type?: "text" | "textarea" | "select" | "radio" | "checkbox";
    options?: Array<{ label?: string; value?: string; title?: string } | string>;
    placeholder?: string;
    required?: boolean;
  }>;
}

interface PayloadProjectDoc {
  id: string | number
  title: string
  banner_image?: PayloadMedia | string | number | null
  service?: string | number | {
    id: string | number
    slug?: string
    title?: string
  }
}

export interface FetchedProject {
  id: string
  title: string
  banner_image: string
  alt?: string
  service?: {
    id: string
    slug: string
    title: string
  }
}

// ─── Helpers ────────────────────────────────────────────────────

/**
 * Resolve a Payload media field to a full URL string.
 * If depth=0, media is just an ID string/number; if depth>=1, it's an object with url.
 */
function resolveMediaUrl(media: PayloadMedia | string | number | null | undefined): string {
  if (!media || typeof media === 'number') return ''
  let url = typeof media === 'string' ? media : (media.sizes?.banner?.url || media.url || '')
  if (!url) return ''
  
  // Fix cached URLs from before Payload staticURL was updated
  if (url.includes('/api/media/file/')) {
    url = url.replace('/api/media/file/', '/media/')
  }

  if (url.startsWith('http')) {
    try {
      const parsedUrl = new URL(url)
      const base = PAYLOAD_URL.replace(/\/+$/, '')
      const baseParsed = new URL(base)
      
      // If we are developing against localhost or custom PAYLOAD_URL and media points to remote CMS
      if (
        (baseParsed.hostname === 'localhost' || baseParsed.hostname === '127.0.0.1') &&
        (parsedUrl.hostname === 'cms.thirdvizion.com' || parsedUrl.hostname !== baseParsed.hostname)
      ) {
        return `${base}${parsedUrl.pathname}${parsedUrl.search}`
      }
      return url
    } catch {
      return url
    }
  }

  const base = PAYLOAD_URL.replace(/\/+$/, '')
  const path = url.startsWith('/') ? url : `/${url}`
  return `${base}${path}`
}

/**
 * Transform a Payload service document into the ServicePageData shape
 * that the existing website components expect.
 */
function transformPayloadService(doc: PayloadServiceDoc) {
  return {
    id: doc.id,
    themeColor: doc.themeColor || '#A461FF',
    meta_data: doc.meta_data,
    layoutOrder: ((doc.layoutOrder && doc.layoutOrder.length > 0) 
      ? doc.layoutOrder.map((l) => l.section) 
      : [
          'hero',
          'about',
          'industry',
          'tools',
          'process',
          'projects',
          'faq',
          'reviews',
        ]) as any,
    hero: doc.hero,
    statscards: doc.statscards?.map((s) => ({
      count: s.count,
      sysmbol: s.symbol, // Note: existing type has typo "sysmbol"
      heading: s.heading,
    })),
    industries: doc.industries?.map((ind, index) => ({
      id: ind.name || String(index),
      name: ind.name,
      heading: ind.heading,
      description: ind.description,
      buttonText: ind.buttonText,
      cards: ind.cards,
    })),
    tools: doc.tools,
    our_process: {
      main_icon: resolveMediaUrl(doc.our_process?.main_icon),
      steps: (doc.our_process?.steps || []).map((step) => ({
        id: step.step_id,
        title: step.title,
        icon: resolveMediaUrl(step.icon),
      })),
    },
    projects: (doc.projects || []).map((p, index) => ({
      id: p.id ? String(p.id) : String(index + 1).padStart(2, '0'),
      title: p.title || '',
      banner_image: resolveMediaUrl(p.banner_image),
      alt: (typeof p.banner_image === 'object' && p.banner_image !== null ? (p.banner_image as PayloadMedia).alt : '') || p.title || '',
    })),
    why_choose: doc.why_choose || [],
    faqs: doc.faqs,
    questions: (doc.questions || []).map((q: any, index: number) => ({
      id: q.id ? String(q.id) : `q-${index}`,
      question: q.question || q.title || "",
      subtitle: q.subtitle || q.description || "",
      type: q.type || "radio",
      options: (q.options || []).map((opt: any) => {
        if (typeof opt === "string") return { label: opt, value: opt };
        const label = opt.label || opt.title || opt.text || opt.option || opt.value || "";
        const value = opt.value || opt.label || opt.title || opt.text || opt.option || "";
        return { label: String(label), value: String(value) };
      }),
      placeholder: q.placeholder || "",
      required: Boolean(q.required),
    })),
  }
}

// ─── Public API ─────────────────────────────────────────────────

/**
 * Fetch a single service by category and slug.
 * Returns null if the service is not found or the API is unreachable.
 */
export async function getServiceBySlug(
  category: string,
  slug: string,
) {
  try {
    const decodedCategory = decodeURIComponent(category)
    const decodedSlug = decodeURIComponent(slug)
    
    // First try querying with both category and slug
    let url = new URL(`${PAYLOAD_URL}/api/services`)
    url.searchParams.set('where[slug][equals]', decodedSlug)
    url.searchParams.set('where[category.slug][equals]', decodedCategory)
    url.searchParams.set('depth', '2')
    url.searchParams.set('limit', '1')

    let res = await fetch(url.toString(), {
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    })

    let data = res.ok ? await res.json() : null

    // If not found with category filter, query by slug alone
    if (!data?.docs || data.docs.length === 0) {
      url = new URL(`${PAYLOAD_URL}/api/services`)
      url.searchParams.set('where[slug][equals]', decodedSlug)
      url.searchParams.set('depth', '2')
      url.searchParams.set('limit', '1')

      res = await fetch(url.toString(), {
        next: { revalidate: 60 },
      })
      data = res.ok ? await res.json() : null
    }

    if (!data?.docs || data.docs.length === 0) {
      return null
    }

    return transformPayloadService(data.docs[0] as PayloadServiceDoc)
  } catch (error) {
    console.error('Failed to fetch service from Payload CMS:', error)
    return null
  }
}

/**
 * Fetch all services. Useful for generating static params or service listing pages.
 */
export async function getAllServices() {
  try {
    const url = new URL(`${PAYLOAD_URL}/api/services`)
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

    return (data.docs || []).map((doc: PayloadServiceDoc) =>
      transformPayloadService(doc),
    )
  } catch (error) {
    console.error('Failed to fetch services from Payload CMS:', error)
    return []
  }
}

export const SERVICE_SLUG_ALIASES: Record<string, string> = {
  // IAM
  'iam': 'identity-and-access-management',
  'iam-solutions': 'identity-and-access-management',
  'identity-and-access-management': 'identity-and-access-management',
  
  // CRM
  'crm': 'customer-relationship-management',
  'crm-solutions': 'customer-relationship-management',
  'customer-relationship-management': 'customer-relationship-management',
  
  // ERP
  'erp': 'enterprise-resource-planning',
  'erp-solutions': 'enterprise-resource-planning',
  'enterprise-resource-planning': 'enterprise-resource-planning',

  // App development
  'mobile-apps': 'app-development',
  'app-development': 'app-development',
  'mobile-app-development': 'app-development',

  // Web development
  'web-development': 'web-development',

  // Digital marketing
  'digital-marketing': 'digital-marketing',

  // Game development
  'game-development': 'game-development',

  // Server management
  'server-management': 'server-management',

  // 3D services
  '3d-services': '3d-services',
  '3d-service': '3d-services',

  // Augmented reality
  'augmented-reality': 'augmented-reality',
  'ar': 'augmented-reality',

  // Virtual reality
  'virtual-reality': 'virtual-reality',
  'vr': 'virtual-reality',
}

export function normalizeServiceSlug(slug?: string | null): string {
  if (!slug) return ''
  const clean = String(slug).toLowerCase().trim().replace(/\s+/g, '-')
  return SERVICE_SLUG_ALIASES[clean] || clean
}

const PROJECT_SERVICE_TITLES: Record<string, string> = {
  'web-development': 'Web Development',
  'app-development': 'Mobile Apps',
  'game-development': 'Game Development',
  'digital-marketing': 'Digital Marketing',
  'customer-relationship-management': 'CRM Solutions',
  'enterprise-resource-planning': 'ERP Solutions',
  'identity-and-access-management': 'IAM Solutions',
  'server-management': 'Server Management',
  '3d-services': '3D Services',
  'augmented-reality': 'Augmented Reality',
  'virtual-reality': 'Virtual Reality',
}

function formatProjectServiceTitle(slug: string): string {
  const normalized = normalizeServiceSlug(slug)
  if (PROJECT_SERVICE_TITLES[normalized]) return PROJECT_SERVICE_TITLES[normalized]
  if (PROJECT_SERVICE_TITLES[slug]) return PROJECT_SERVICE_TITLES[slug]
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

/**
 * Fetch projects from Payload CMS using GET /api/projects?depth=2
 * Returns an array of FetchedProject docs, or empty array if unreachable.
 */
export async function getProjects(options?: {
  serviceId?: string | number
  serviceSlug?: string
  limit?: number
  depth?: number
}): Promise<FetchedProject[]> {
  try {
    const url = new URL(`${PAYLOAD_URL}/api/projects`)
    url.searchParams.set('depth', String(options?.depth ?? 2))
    url.searchParams.set('limit', String(options?.limit ?? 100))

    if (options?.serviceId !== undefined) {
      url.searchParams.set('where[service][equals]', String(options.serviceId))
    } else if (options?.serviceSlug !== undefined) {
      url.searchParams.set('where[service][equals]', String(options.serviceSlug))
    }

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      console.error(
        `Payload Projects API error: ${res.status} ${res.statusText}`,
      )
      return []
    }

    const data = await res.json()

    return (data.docs || []).map((doc: PayloadProjectDoc) => {
      const bannerMedia = typeof doc.banner_image === 'object' && doc.banner_image !== null
        ? (doc.banner_image as PayloadMedia)
        : null

      let resolvedService: FetchedProject['service'] = undefined

      if (typeof doc.service === 'string') {
        const rawSlug = doc.service
        const canonicalSlug = normalizeServiceSlug(rawSlug)
        resolvedService = {
          id: canonicalSlug,
          slug: canonicalSlug,
          title: formatProjectServiceTitle(rawSlug),
        }
      } else if (typeof doc.service === 'object' && doc.service !== null) {
        const rawSlug = doc.service.slug || String(doc.service.id)
        const canonicalSlug = normalizeServiceSlug(rawSlug)
        resolvedService = {
          id: String(doc.service.id),
          slug: canonicalSlug,
          title: doc.service.title || formatProjectServiceTitle(rawSlug),
        }
      } else if (typeof doc.service === 'number') {
        const idStr = String(doc.service)
        resolvedService = {
          id: idStr,
          slug: idStr,
          title: formatProjectServiceTitle(idStr),
        }
      }

      return {
        id: String(doc.id),
        title: doc.title || '',
        banner_image: resolveMediaUrl(doc.banner_image),
        alt: bannerMedia?.alt || doc.title || '',
        service: resolvedService,
      }
    })
  } catch (error) {
    console.error('Failed to fetch projects from Payload CMS:', error)
    return []
  }
}

export async function getProjectsByService(serviceId: string | number) {
  return getProjects({ serviceId, depth: 2 })
}

export async function getAllProjects(limit?: number) {
  return getProjects({ limit, depth: 2 })
}

/**
 * Fetch service videos from Payload CMS using GET /api/service-videos?limit=100&depth=2
 * Returns a mapping of service slug -> full video URL.
 */
export async function getServiceVideos(): Promise<Record<string, string>> {
  try {
    const url = new URL(`${PAYLOAD_URL}/api/service-videos`)
    url.searchParams.set('depth', '2')
    url.searchParams.set('limit', '100')

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      if (res.status !== 404) {
        console.error(
          `Payload Service Videos API error: ${res.status} ${res.statusText}`,
        )
      }
      return {}
    }

    const data = await res.json()
    const videoMap: Record<string, string> = {}

    data.docs?.forEach((item: any) => {
      const rawSlug =
        typeof item.service === 'string'
          ? item.service
          : (item.service_immersive ||
             item.service_data_cloud ||
             item.service_dev_software ||
             item.service?.slug ||
             item.service?.id)

      const videoUrl = resolveMediaUrl(item.video)

      if (rawSlug && videoUrl) {
        const rawStr = String(rawSlug).toLowerCase().trim()
        const canonical = normalizeServiceSlug(rawStr)

        videoMap[rawStr] = videoUrl
        videoMap[canonical] = videoUrl
      }
    })

    return videoMap
  } catch (error) {
    console.error('Failed to fetch service videos from Payload CMS:', error)
    return {}
  }
}

/**
 * Fetch dedicated Service Questions from Payload CMS GET /api/service-questions?depth=2&limit=100
 */
export async function getServiceQuestionnaires(): Promise<Record<string, Array<any>>> {
  const hosts = [PAYLOAD_URL, 'http://localhost:3001'].filter(Boolean);
  
  for (const host of hosts) {
    try {
      let url = `${host}/api/service-questions?depth=2&limit=100`;
      let res = await fetch(url, {
        next: { revalidate: 60 },
      }).catch(() => null);

      if (!res || !res.ok) {
        url = `${host}/api/service-questionnaires?depth=2&limit=100`;
        res = await fetch(url, {
          next: { revalidate: 60 },
        }).catch(() => null);
      }

      if (!res || !res.ok) continue;

      const data = await res.json();
      if (!data.docs || !Array.isArray(data.docs)) continue;

      const questionnaireMap: Record<string, Array<any>> = {};

      data.docs.forEach((doc: any) => {
        const rawSlugs = [
          doc.service,
          doc.service_immersive,
          doc.service_data_cloud,
          doc.service_dev_software,
          doc.service?.slug,
          doc.service?.id ? String(doc.service.id) : null,
          doc.serviceSlug,
          doc.title,
        ].filter(Boolean);

        if (rawSlugs.length && doc.questions?.length) {
          const mappedQuestions = (doc.questions || []).map((q: any, index: number) => ({
            id: q.id ? String(q.id) : `q-${index}`,
            question: q.question || q.title || "",
            subtitle: q.subtitle || q.description || "",
            type: q.type || "radio",
            options: (q.options || []).map((opt: any) => {
              if (typeof opt === "string") return { label: opt, value: opt };
              const label = opt.label || opt.title || opt.text || opt.option || opt.value || "";
              const value = opt.value || opt.label || opt.title || opt.text || opt.option || "";
              return { label: String(label), value: String(value) };
            }),
            placeholder: q.placeholder || "",
            required: Boolean(q.required),
          }));

          rawSlugs.forEach((slug) => {
            const rawStr = String(slug).toLowerCase().trim();
            const canonical = normalizeServiceSlug(rawStr);
            questionnaireMap[rawStr] = mappedQuestions;
            questionnaireMap[canonical] = mappedQuestions;
          });
        }
      });

      if (Object.keys(questionnaireMap).length > 0) {
        return questionnaireMap;
      }
    } catch (error) {
      console.warn('Failed to fetch service questions from Payload CMS on host ' + host, error);
    }
  }

  return {};
}

/**
 * Fetch dedicated Service Metrics from Payload CMS GET /api/service-metrics?depth=2&limit=100
 */
export async function getServiceMetrics(): Promise<Record<string, Array<{ count: string; sysmbol: string; heading: string }>>> {
  try {
    const url = new URL(`${PAYLOAD_URL}/api/service-metrics`)
    url.searchParams.set('depth', '2')
    url.searchParams.set('limit', '100')

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
    })

    if (!res.ok) return {}

    const data = await res.json()
    const metricsMap: Record<string, Array<{ count: string; sysmbol: string; heading: string }>> = {}

    data.docs?.forEach((doc: any) => {
      const rawSlug =
        typeof doc.service === 'string'
          ? doc.service
          : (doc.service?.slug || doc.service?.id || doc.serviceSlug || doc.title)

      const cards: Array<{ count: string; sysmbol: string; heading: string }> = [
        {
          count: String(doc.clientSatisfactionCount ?? doc.client_satisfaction_count ?? "99"),
          sysmbol: String(doc.clientSatisfactionSymbol ?? doc.client_satisfaction_symbol ?? "%"),
          heading: String(doc.clientSatisfactionLabel ?? doc.client_satisfaction_label ?? "Client Satisfaction"),
        },
        {
          count: String(doc.toolsWeKnowCount ?? doc.tools_we_know_count ?? "25"),
          sysmbol: String(doc.toolsWeKnowSymbol ?? doc.tools_we_know_symbol ?? "+"),
          heading: String(doc.toolsWeKnowLabel ?? doc.tools_we_know_label ?? "Tools We Know"),
        },
        {
          count: String(doc.toolsWeExpertiseCount ?? doc.tools_we_expertise_count ?? "15"),
          sysmbol: String(doc.toolsWeExpertiseSymbol ?? doc.tools_we_expertise_symbol ?? "+"),
          heading: String(doc.toolsWeExpertiseLabel ?? doc.tools_we_expertise_label ?? "Tools We Expertise"),
        },
      ]

      if (rawSlug) {
        const canonical = normalizeServiceSlug(String(rawSlug).toLowerCase().trim())
        metricsMap[String(rawSlug).toLowerCase().trim()] = cards
        metricsMap[canonical] = cards
      }
    })

    return metricsMap
  } catch (error) {
    console.error('Failed to fetch metrics from Payload CMS:', error)
    return {}
  }
}

// ─── Career Helpers (Powered by Internal Backend) ────────────────

const INTERNAL_BACKEND_URL =
  process.env.INTERNAL_BACKEND_URL ||
  process.env.NEXT_PUBLIC_INTERNAL_API_URL ||
  "http://localhost:5001"

export type CareerCategory =
  | "developer"
  | "design"
  | "sales"
  | "testing"
  | "operations"

function mapDepartmentToCategory(
  department?: string | null,
  title?: string | null
): CareerCategory {
  const str = `${department || ""} ${title || ""}`.toLowerCase()
  if (
    str.includes("design") ||
    str.includes("ui") ||
    str.includes("ux") ||
    str.includes("product designer") ||
    str.includes("brand")
  ) {
    return "design"
  }
  if (
    str.includes("sale") ||
    str.includes("business dev") ||
    str.includes("marketing") ||
    str.includes("growth")
  ) {
    return "sales"
  }
  if (
    str.includes("qa") ||
    str.includes("test") ||
    str.includes("quality") ||
    str.includes("automation qa")
  ) {
    return "testing"
  }
  if (
    str.includes("operation") ||
    str.includes("hr") ||
    str.includes("admin") ||
    str.includes("coordinator") ||
    str.includes("devops") ||
    str.includes("infrastructure")
  ) {
    return "operations"
  }
  return "developer"
}

function parseStringOrArray(val: unknown): string[] {
  if (!val) return []
  if (Array.isArray(val)) {
    return val
      .map((item) =>
        typeof item === "string"
          ? item
          : item.text || item.title || JSON.stringify(item)
      )
      .filter(Boolean)
  }
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val)
      if (Array.isArray(parsed)) {
        return parsed
          .map((item) =>
            typeof item === "string"
              ? item
              : item.text || JSON.stringify(item)
          )
          .filter(Boolean)
      }
    } catch {
      // not json
    }
    return val
      .split("\n")
      .map((line) => line.trim().replace(/^[-*•]\s*/, ""))
      .filter(Boolean)
  }
  return []
}

function parseSkills(val: unknown): string[] {
  if (!val) return []
  if (Array.isArray(val)) {
    return val
      .map((item) => (typeof item === "string" ? item : item.text || item.name || ""))
      .filter(Boolean)
  }
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val)
      if (Array.isArray(parsed)) {
        return parsed
          .map((item) => (typeof item === "string" ? item : item.text || ""))
          .filter(Boolean)
      }
    } catch {
      // not json
    }
    return val
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return []
}

export interface TransformedJob {
  id: string
  slug: string
  title: string
  department: string
  experience: string
  location: string
  jobType: string
  salaryRange: string
  importantNote?: string
  description: string[]
  responsibilities: string[]
  eligibility: string[]
  skills: string[]
  filter: CareerCategory
  icon: CareerCategory
  createdAt?: string
}

function transformInternalJob(doc: Record<string, unknown>): TransformedJob {
  const category = mapDepartmentToCategory(
    (doc.department || doc.filter) as string | undefined,
    doc.title as string | undefined
  )
  return {
    id: String(doc.id || ""),
    slug: String(doc.slug || doc.id || ""),
    title: String(doc.title || ""),
    department: String(doc.department || "Engineering"),
    experience: String(doc.experienceLevel || doc.experience || "1 - 3 Years"),
    location: String(doc.location || "Coimbatore, India"),
    jobType: String(doc.employmentType || doc.jobType || "Full-Time"),
    salaryRange: String(doc.salaryRange || ""),
    importantNote: String(
      doc.importantNote ||
      (doc.deadline
        ? `Application Deadline: ${new Date(doc.deadline as string).toLocaleDateString()}`
        : "")
    ),
    description: parseStringOrArray(doc.description || doc.overview),
    responsibilities: parseStringOrArray(doc.responsibilities),
    eligibility: parseStringOrArray(doc.requirements || doc.eligibility),
    skills: parseSkills(doc.skills),
    filter: category,
    icon: category,
    createdAt: doc.createdAt as string | undefined,
  }
}

export async function getAllCareers(): Promise<TransformedJob[]> {
  try {
    const url = `${INTERNAL_BACKEND_URL}/api/jobs`
    const res = await fetch(url, {
      next: { revalidate: 30 }, // ISR: 30 seconds
    })

    if (!res.ok) {
      console.error(
        `Internal Backend Jobs API error: ${res.status} ${res.statusText}`
      )
      return []
    }

    const json = await res.json()
    const jobs = json.data || (Array.isArray(json) ? json : [])
    return jobs.map((job: Record<string, unknown>) => transformInternalJob(job))
  } catch (error) {
    console.error("Failed to fetch careers from Internal Backend:", error)
    return []
  }
}

export async function getCareerById(
  idOrSlug: string
): Promise<TransformedJob | null> {
  try {
    const url = `${INTERNAL_BACKEND_URL}/api/jobs/${idOrSlug}`
    const res = await fetch(url, {
      next: { revalidate: 30 },
    })

    if (!res.ok) {
      if (res.status !== 404) {
        console.error(
          `Internal Backend Job API error: ${res.status} ${res.statusText}`
        )
      }
      return null
    }

    const json = await res.json()
    if (!json.data && !json.id) {
      return null
    }
    return transformInternalJob(json.data || json)
  } catch (error) {
    console.error(
      `Failed to fetch career ${idOrSlug} from Internal Backend:`,
      error
    )
    return null
  }
}

// ─── Global Config Helpers (Payload CMS) ─────────────────────────

export async function getCareerPageGlobal() {
  try {
    const url = new URL(`${PAYLOAD_URL}/api/globals/career-page`)

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      if (res.status !== 404) {
        console.error(`Payload API error: ${res.status} ${res.statusText}`)
      }
      return null
    }

    const data = await res.json()

    // Transform media to proper URLs
    if (data.images) {
      data.images = data.images.map((item: any) => ({
        ...item,
        media:
          typeof item.media === "string"
            ? item.media
            : {
                ...item.media,
                url: resolveMediaUrl(item.media),
              },
      }))
    }

    if (data.videos) {
      data.videos = data.videos.map((item: any) => ({
        ...item,
        media:
          typeof item.media === "string"
            ? item.media
            : {
                ...item.media,
                url: resolveMediaUrl(item.media),
              },
      }))
    }

    return data
  } catch (error) {
    console.error("Failed to fetch Career Page global from Payload CMS:", error)
    return null
  }
}
