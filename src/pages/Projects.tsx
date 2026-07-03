import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Code2, Star, GitFork, Filter } from 'lucide-react'
import { GithubIcon } from '../components/Icons'

const projects = [
  {
    id: 1,
    title: '个人博客系统',
    desc: '一个现代化的个人博客系统，支持 Markdown 编辑、文章分类、标签系统和评论功能。',
    category: 'FULLSTACK',
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    github: 'https://github.com',
    live: 'https://example.com',
    stars: 128,
    forks: 32,
    featured: true,
  },
  {
    id: 2,
    title: '任务管理工具',
    desc: '一个高效的任务管理应用，支持拖拽排序、优先级设置、团队协作和进度跟踪。',
    category: 'FRONTEND',
    tech: ['Vue 3', 'TypeScript', 'Pinia'],
    github: 'https://github.com',
    live: 'https://example.com',
    stars: 89,
    forks: 21,
    featured: true,
  },
  {
    id: 3,
    title: 'API 网关服务',
    desc: '一个高性能的 API 网关服务，支持负载均衡、限流、缓存和日志监控。',
    category: 'BACKEND',
    tech: ['Go', 'Redis', 'Docker', 'K8s'],
    github: 'https://github.com',
    live: null,
    stars: 256,
    forks: 45,
    featured: true,
  },
  {
    id: 4,
    title: '数据可视化平台',
    desc: '一个强大的数据可视化平台，支持多种图表类型、实时数据更新和自定义仪表板。',
    category: 'FULLSTACK',
    tech: ['React', 'D3.js', 'Python', 'FastAPI'],
    github: 'https://github.com',
    live: 'https://example.com',
    stars: 167,
    forks: 38,
    featured: false,
  },
  {
    id: 5,
    title: '移动端 UI 组件库',
    desc: '一个高质量的移动端 UI 组件库，提供丰富的组件和主题定制能力。',
    category: 'FRONTEND',
    tech: ['React Native', 'TypeScript', 'Storybook'],
    github: 'https://github.com',
    live: 'https://example.com',
    stars: 312,
    forks: 67,
    featured: false,
  },
  {
    id: 6,
    title: '微服务架构脚手架',
    desc: '一个开箱即用的微服务架构脚手架，集成服务注册、配置中心、链路追踪等功能。',
    category: 'BACKEND',
    tech: ['Java', 'Spring Cloud', 'MySQL', 'RabbitMQ'],
    github: 'https://github.com',
    live: null,
    stars: 198,
    forks: 52,
    featured: false,
  },
]

const categories = ['ALL', 'FRONTEND', 'BACKEND', 'FULLSTACK']

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const filteredProjects = projects.filter(
    (p) => selectedCategory === 'ALL' || p.category === selectedCategory
  )

  const featuredProjects = filteredProjects.filter((p) => p.featured)
  const regularProjects = filteredProjects.filter((p) => !p.featured)

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-6 text-xs font-mono">
            <span className="text-cyan-500/40">HOME</span>
            <span className="text-cyan-500/20">/</span>
            <span className="text-cyan-400">PROJECTS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            构建<span className="gradient-text-cyan">档案</span>
          </h1>
          <p className="text-sm font-mono text-cyan-500/40">BUILDS // {filteredProjects.length} ARTIFACTS</p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-mono tracking-wider transition-all flex items-center gap-2 ${
                selectedCategory === cat
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                  : 'bg-transparent text-slate-500 border border-white/5 hover:border-cyan-500/20 hover:text-cyan-400'
              }`}
            >
              <Filter className="w-3 h-3" />
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Featured */}
        {featuredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-2 mb-8">
              <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              <span className="text-xs tracking-[0.2em] text-cyan-400/60 font-mono">FEATURED.BUILDS</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="card-cyber group cursor-pointer flex flex-col"
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* 占位图 */}
                  <div className="relative h-44 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 border border-cyan-500/10 mb-5 flex items-center justify-center overflow-hidden">
                    <Code2 className="w-12 h-12 text-cyan-500/20" />
                    {/* 网格叠加 */}
                    <div className="absolute inset-0 bg-dots-cyan opacity-30" />
                    {/* Hover */}
                    <div className={`absolute inset-0 bg-[#050a14]/80 backdrop-blur-sm flex items-center justify-center gap-4 transition-opacity duration-300 ${
                      hoveredId === project.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          className="w-10 h-10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/10 transition-colors">
                          <GithubIcon className="w-5 h-5" />
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer"
                          className="w-10 h-10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/10 transition-colors">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                      <span className="tag-cyber text-[10px] ml-2 flex-shrink-0">{project.category}</span>
                    </div>
                    <p className="text-sm text-slate-400 mb-4 flex-1 line-clamp-2">{project.desc}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[10px] px-2 py-1 bg-cyan-500/5 text-cyan-300/70 border border-cyan-500/10">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-[10px] font-mono text-slate-600">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {project.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        {project.forks}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular */}
        {regularProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span className="text-xs tracking-[0.2em] text-cyan-400/60 font-mono">MORE.BUILDS</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {regularProjects.map((project) => (
                <div key={project.id} className="card-cyber group cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex gap-2 ml-2">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          className="text-slate-500 hover:text-cyan-400 transition-colors">
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer"
                          className="text-slate-500 hover:text-cyan-400 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mb-3 line-clamp-2">{project.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] px-2 py-1 bg-white/5 text-slate-400 border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-mono text-slate-600">
                    <span className="flex items-center gap-1"><Star className="w-3 h-3" />{project.stars}</span>
                    <span className="flex items-center gap-1"><GitFork className="w-3 h-3" />{project.forks}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <Code2 className="w-12 h-12 text-cyan-500/20 mx-auto mb-4" />
            <p className="text-slate-500 font-mono text-sm">NO.BUILDS.FOUND</p>
          </div>
        )}
      </div>
    </div>
  )
}