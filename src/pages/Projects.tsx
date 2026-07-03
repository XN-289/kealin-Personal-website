import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Code2, Star, GitFork, Filter } from 'lucide-react'
import { GithubIcon } from '../components/Icons'

const projects = [
  {
    id: 1,
    title: '个人博客系统',
    description: '一个现代化的个人博客系统，支持 Markdown 编辑、文章分类、标签系统和评论功能。使用 React + Node.js 构建。',
    image: '/api/placeholder/600/400',
    category: '全栈',
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    github: 'https://github.com',
    live: 'https://example.com',
    stars: 128,
    forks: 32,
    featured: true,
  },
  {
    id: 2,
    title: '任务管理工具',
    description: '一个高效的任务管理应用，支持拖拽排序、优先级设置、团队协作和进度跟踪。',
    image: '/api/placeholder/600/400',
    category: '前端',
    techStack: ['Vue 3', 'TypeScript', 'Pinia', 'Element Plus'],
    github: 'https://github.com',
    live: 'https://example.com',
    stars: 89,
    forks: 21,
    featured: true,
  },
  {
    id: 3,
    title: 'API 网关服务',
    description: '一个高性能的 API 网关服务，支持负载均衡、限流、缓存和日志监控。',
    image: '/api/placeholder/600/400',
    category: '后端',
    techStack: ['Go', 'Redis', 'Docker', 'Kubernetes'],
    github: 'https://github.com',
    live: null,
    stars: 256,
    forks: 45,
    featured: true,
  },
  {
    id: 4,
    title: '数据可视化平台',
    description: '一个强大的数据可视化平台，支持多种图表类型、实时数据更新和自定义仪表板。',
    image: '/api/placeholder/600/400',
    category: '全栈',
    techStack: ['React', 'D3.js', 'Python', 'FastAPI'],
    github: 'https://github.com',
    live: 'https://example.com',
    stars: 167,
    forks: 38,
    featured: false,
  },
  {
    id: 5,
    title: '移动端 UI 组件库',
    description: '一个高质量的移动端 UI 组件库，提供丰富的组件和主题定制能力。',
    image: '/api/placeholder/600/400',
    category: '前端',
    techStack: ['React Native', 'TypeScript', 'Storybook'],
    github: 'https://github.com',
    live: 'https://example.com',
    stars: 312,
    forks: 67,
    featured: false,
  },
  {
    id: 6,
    title: '微服务架构脚手架',
    description: '一个开箱即用的微服务架构脚手架，集成服务注册、配置中心、链路追踪等功能。',
    image: '/api/placeholder/600/400',
    category: '后端',
    techStack: ['Java', 'Spring Cloud', 'MySQL', 'RabbitMQ'],
    github: 'https://github.com',
    live: null,
    stars: 198,
    forks: 52,
    featured: false,
  },
]

const categories = ['全部', '前端', '后端', '全栈']

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const filteredProjects = projects.filter(
    (project) => selectedCategory === '全部' || project.category === selectedCategory
  )

  const featuredProjects = filteredProjects.filter((p) => p.featured)
  const regularProjects = filteredProjects.filter((p) => !p.featured)

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            我的<span className="gradient-text">作品集</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            这里展示了我参与开发的一些项目
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Filter className="w-4 h-4" />
              {category}
            </button>
          ))}
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold text-white mb-8 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              精选项目
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="group relative"
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="card overflow-hidden h-full flex flex-col">
                    {/* Project Image Placeholder */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mb-4 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Code2 className="w-16 h-16 text-blue-400/50" />
                      </div>
                      {/* Hover Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-4"
                      >
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <GithubIcon className="w-6 h-6" />
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-6 h-6" />
                          </a>
                        )}
                      </motion.div>
                    </div>

                    {/* Project Info */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <span className="tag text-xs flex-shrink-0 ml-2">{project.category}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {project.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-4 h-4" />
                          {project.forks}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Projects */}
        {regularProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-8 flex items-center gap-2">
              <Code2 className="w-6 h-6 text-blue-400" />
              更多项目
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.4 }}
                  className="card group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <GithubIcon className="w-5 h-5" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" />
                      {project.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      {project.forks}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Code2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">没有找到相关项目</p>
            <p className="text-gray-500 mt-2">尝试调整筛选条件</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}