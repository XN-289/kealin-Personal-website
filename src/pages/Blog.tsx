import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Calendar, Clock, ArrowRight, Tag, BookOpen, TrendingUp } from 'lucide-react'

// 模拟博客数据
const blogPosts = [
  {
    id: 1,
    title: 'React 18 新特性深度解析',
    excerpt: '深入了解 React 18 带来的并发特性、自动批处理和 Suspense 改进，以及如何在项目中应用这些新功能。',
    category: '前端',
    tags: ['React', 'JavaScript', '前端框架'],
    date: '2024-01-15',
    readTime: '8 分钟',
    featured: true,
  },
  {
    id: 2,
    title: 'TypeScript 高级类型技巧',
    excerpt: '探索 TypeScript 中的条件类型、映射类型和模板字面量类型，提升你的类型编程能力。',
    category: '前端',
    tags: ['TypeScript', '类型系统'],
    date: '2024-01-10',
    readTime: '12 分钟',
    featured: true,
  },
  {
    id: 3,
    title: 'Node.js 性能优化实战',
    excerpt: '分享 Node.js 应用性能优化的实用技巧，包括内存管理、异步优化和集群部署。',
    category: '后端',
    tags: ['Node.js', '性能优化', '后端'],
    date: '2024-01-05',
    readTime: '10 分钟',
    featured: false,
  },
  {
    id: 4,
    title: 'Docker 容器化最佳实践',
    excerpt: '从基础到进阶，学习 Docker 容器化的最佳实践，包括镜像优化、多阶段构建和安全配置。',
    category: 'DevOps',
    tags: ['Docker', '容器化', 'DevOps'],
    date: '2024-01-01',
    readTime: '15 分钟',
    featured: false,
  },
  {
    id: 5,
    title: 'CSS Grid 布局完全指南',
    excerpt: '全面掌握 CSS Grid 布局，从基础概念到高级技巧，打造复杂的响应式布局。',
    category: '前端',
    tags: ['CSS', '布局', '响应式'],
    date: '2023-12-28',
    readTime: '10 分钟',
    featured: false,
  },
  {
    id: 6,
    title: 'Git 工作流最佳实践',
    excerpt: '介绍几种常见的 Git 工作流，以及如何选择适合团队的分支策略。',
    category: '工具',
    tags: ['Git', '版本控制', '团队协作'],
    date: '2023-12-25',
    readTime: '7 分钟',
    featured: false,
  },
]

const categories = ['全部', '前端', '后端', 'DevOps', '工具']

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全部')

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === '全部' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

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
            技术<span className="gradient-text">博客</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            分享技术见解、学习心得和项目经验
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="搜索文章..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#111827] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">精选文章</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="card group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="tag">{post.category}</span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs text-gray-500 flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-blue-400 group-hover:gap-3 transition-all">
                      <span className="text-sm font-medium">阅读更多</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.article>
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
            <BookOpen className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">
              {selectedCategory === '全部' ? '所有文章' : `${selectedCategory}文章`}
            </h2>
            <span className="text-gray-500 text-sm ml-2">({filteredPosts.length})</span>
          </div>

          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">没有找到匹配的文章</p>
              <p className="text-gray-500 mt-2">尝试调整搜索关键词或筛选条件</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.4 }}
                  className="card group cursor-pointer flex flex-col md:flex-row md:items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="tag text-xs">{post.category}</span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors mb-1">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-1">{post.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-2 text-blue-400 group-hover:gap-3 transition-all md:flex-shrink-0">
                    <span className="text-sm font-medium">阅读</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}