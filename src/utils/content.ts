export interface BlogPost {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  excerpt: string
  content: string
}

export interface Project {
  slug: string
  title: string
  date: string
  category: string
  tech: string[]
  github?: string
  live?: string
  stars?: number
  desc: string
  content: string
}

const blogModules = import.meta.glob('/content/blog/*.md', { query: '?raw', import: 'default' })
const projectModules = import.meta.glob('/content/projects/*.md', { query: '?raw', import: 'default' })

function parse(raw: string) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!m) return { data: {} as Record<string, string | string[]>, content: raw }

  const data: Record<string, string | string[]> = {}
  m[1].split('\n').forEach((line) => {
    const i = line.indexOf(':')
    if (i === -1) return
    const k = line.slice(0, i).trim()
    let v: string | string[] = line.slice(i + 1).trim()
    if (typeof v === 'string' && v.startsWith('[') && v.endsWith(']')) {
      v = v.slice(1, -1).split(',').map((s) => s.trim())
    }
    data[k] = v
  })
  return { data, content: m[2] }
}

export async function loadBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = []
  for (const [path, loader] of Object.entries(blogModules)) {
    try {
      const raw = (await loader()) as string
      const { data, content } = parse(raw)
      const slug = path.split('/').pop()?.replace('.md', '') || ''
      posts.push({
        slug,
        title: (data.title as string) || '无标题',
        date: (data.date as string) || '',
        category: (data.category as string) || '未分类',
        tags: Array.isArray(data.tags) ? data.tags : [],
        excerpt: (data.excerpt as string) || '',
        content,
      })
    } catch (e) {
      console.warn(`Failed to load ${path}:`, e)
    }
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date))
}

export async function loadProjects(): Promise<Project[]> {
  const projects: Project[] = []
  for (const [path, loader] of Object.entries(projectModules)) {
    try {
      const raw = (await loader()) as string
      const { data, content } = parse(raw)
      const slug = path.split('/').pop()?.replace('.md', '') || ''
      projects.push({
        slug,
        title: (data.title as string) || '无标题',
        date: (data.date as string) || '',
        category: (data.category as string) || '未分类',
        tech: Array.isArray(data.tech) ? data.tech : [],
        github: data.github as string | undefined,
        live: data.live as string | undefined,
        stars: data.stars ? Number(data.stars) : undefined,
        desc: (data.desc as string) || '',
        content,
      })
    } catch (e) {
      console.warn(`Failed to load ${path}:`, e)
    }
  }
  return projects.sort((a, b) => b.date.localeCompare(a.date))
}