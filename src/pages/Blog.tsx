import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Calendar, Clock, ArrowRight, Tag, BookOpen, TrendingUp } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: 'React 18 并发特性深度解析',
    excerpt: '深入了解 React 18 带来的并发特性、自动批处理和 Suspense 改进，以及如何在项目中应用这些新功能。',
    category: 'FRONTEND',
    tags: ['React', 'JavaScript'],
    date: '2024.01.15',
    readTime: '8 min',
    featured: true,
  },
  {
    id: 2,
    title: 'TypeScript 高级类型编程',
    excerpt: '探索 TypeScript 中的条件类型、映射类型和模板字面量类型，提升你的类型编程能力。',
    category: 'LANGUAGE',
    tags: ['TypeScript', '类型系统'],
    date: '2024.01.10',
    readTime: '12 min',
    featured: true,
  },
  {
    id: 3,
    title: 'Node.js 性能优化实战',
    excerpt: '分享 Node.js 应用性能优化的实用技巧，包括内存管理、异步优化和集群部署。',
    category: 'BACKEND',
    tags: ['Node.js', '性能'],
    date: '2024.01.05',
    readTime: '10 min',
    featured: false,
  },
  {
    id: 4,
    title: 'Docker 容器化最佳实践',
    excerpt: '从基础到进阶，学习 Docker 容器化的最佳实践，包括镜像优化和安全配置。',
    category: 'DEVOPS',
    tags: ['Docker', '容器化'],
    date: '2024.01.01',
    readTime: '15 min',
    featured: false,
  },
  {
    id: 5,
    title: 'CSS Grid 布局完全指南',
    excerpt: '全面掌握 CSS Grid 布局，从基础概念到高级技巧，打造复杂的响应式布局。',
    category: 'FRONTEND',
    tags: ['CSS', '布局'],
    date: '2023.12.28',
    readTime: '10 min',
    featured: false,
  },
  {
    id: 6,
    title: 'Git 工作流最佳实践',
    excerpt: '介绍几种常见的 Git 工作流，以及如何选择适合团队的分支策略。',
    category: 'TOOLS',
    tags: ['Git', '版本控制'],
    date: '2023.12.25',
    readTime: '7 min',
    featured: false,
  },
]

const categories = ['ALL', 'FRONTEND', 'BACKEND', 'DEVOPS', 'TOOLS']

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'ALL' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = filteredPosts.filter((p) => p.featured)
  const regularPosts = filteredPosts.filter((p) => !p.featured)

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
            <span className="text-cyan-400">BLOG</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            技术<span className="gradient-text-cyan">数据流</span>
          </h1>
          <p className="text-sm font-mono text-cyan-500/40">TRANSMISSIONS // {filteredPosts.length} ENTRIES</p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          <div className="relative max-w-xl mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500/40 w-4 h-4" />
            <input
              type="text"
              placeholder="SEARCH.DATABASE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-[#0a1628] border border-cyan-500/15 text-white placeholder-cyan-500/30 text-sm font-mono focus:outline-none focus:border-cyan-500/40 transition-colors"
              style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-mono tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                    : 'bg-transparent text-slate-500 border border-white/5 hover:border-cyan-500/20 hover:text-cyan-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured */}
        {featuredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span className="text-xs tracking-[0.2em] text-cyan-400/60 font-mono">FEATURED</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {featuredPosts.map((post) => (
                <div key={post.id} className="card-cyber group cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <span className="tag-cyber">{post.category}</span>
                    <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Tag className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-cyan-400/50 group-hover:text-cyan-400 transition-colors font-mono flex items-center gap-1">
                      READ <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Posts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-xs tracking-[0.2em] text-cyan-400/60 font-mono">
              {selectedCategory === 'ALL' ? 'ALL.ENTRIES' : selectedCategory}
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-cyan-500/20 mx-auto mb-4" />
              <p className="text-slate-500 font-mono text-sm">NO.RESULTS.FOUND</p>
            </div>
          ) : (
            <div className="space-y-3">
              {regularPosts.map((post) => (
                <div
                  key={post.id}
                  className="card-cyber group cursor-pointer flex flex-col md:flex-row md:items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="tag-cyber text-[10px]">{post.category}</span>
                      <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-1">{post.excerpt}</p>
                  </div>
                  <span className="text-xs text-cyan-400/50 group-hover:text-cyan-400 transition-colors font-mono flex items-center gap-1 md:flex-shrink-0">
                    READ <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}