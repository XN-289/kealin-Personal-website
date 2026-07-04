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

// 从 markdown 文件加载博客文章
const blogModules = import.meta.glob('/content/blog/*.md', { query: '?raw', import: 'default' })
const projectModules = import.meta.glob('/content/projects/*.md', { query: '?raw', import: 'default' })

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const frontmatter = match[1]
  const content = match[2]
  const data: Record<string, string | string[]> = {}

  frontmatter.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) return
    const key = line.slice(0, colonIndex).trim()
    let value: string | string[] = line.slice(colonIndex + 1).trim()

    // 处理数组 [tag1, tag2]
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map((s) => s.trim())
    }

    data[key] = value
  })

  return { data, content }
}

export async function loadBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = []

  for (const [path, loader] of Object.entries(blogModules)) {
    const raw = (await loader()) as string
    const { data, content } = parseFrontmatter(raw)
    const slug = path.split('/').pop()?.replace('.md', '') || ''

    posts.push({
      slug,
      title: (data.title as string) || '无标题',
      date: (data.date as string) || '',
      category: (data.category as string) || '未分类',
      tags: (data.tags as string[]) || [],
      excerpt: (data.excerpt as string) || '',
      content,
    })
  }

  // 按日期倒序
  return posts.sort((a, b) => b.date.localeCompare(a.date))
}

export async function loadProjects(): Promise<Project[]> {
  const projects: Project[] = []

  for (const [path, loader] of Object.entries(projectModules)) {
    const raw = (await loader()) as string
    const { data, content } = parseFrontmatter(raw)
    const slug = path.split('/').pop()?.replace('.md', '') || ''

    projects.push({
      slug,
      title: (data.title as string) || '无标题',
      date: (data.date as string) || '',
      category: (data.category as string) || '未分类',
      tech: (data.tech as string[]) || [],
      github: data.github as string | undefined,
      live: data.live as string | undefined,
      stars: data.stars ? Number(data.stars) : undefined,
      desc: (data.desc as string) || '',
      content,
    })
  }

  return projects.sort((a, b) => b.date.localeCompare(a.date))
}