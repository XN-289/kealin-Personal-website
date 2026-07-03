import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Calendar, Clock, BookOpen, Tag } from 'lucide-react'

const posts = [
  { id: 1, title: '关于技术与人文的一点思考', excerpt: '技术不应该是冰冷的工具，它应该服务于人的表达。当我们过度关注技术本身，往往会忘记技术的初衷。', category: '随笔', tags: ['思考', '技术'], date: '2024.03.15', readTime: '5 分钟', featured: true },
  { id: 2, title: '用 AI 重新理解写作这件事', excerpt: '当我开始和 AI 一起写作，我发现了一种新的创作方式。AI 不是替我写，而是帮我更好地思考。', category: 'AI', tags: ['AI', '写作'], date: '2024.03.08', readTime: '8 分钟', featured: true },
  { id: 3, title: '一个年轻人眼中的世界', excerpt: '我们这一代人，似乎总在解构些什么，又在构建些什么。这种矛盾感，或许就是年轻的样子。', category: '随笔', tags: ['思考', '生活'], date: '2024.02.28', readTime: '6 分钟', featured: true },
  { id: 4, title: '读书笔记：百年孤独', excerpt: '马尔克斯用魔幻现实主义写出了拉丁美洲的孤独，也写出了人类共通的孤独。', category: '读书', tags: ['读书', '文学'], date: '2024.02.20', readTime: '10 分钟' },
  { id: 5, title: '关于「效率」的反思', excerpt: '我们总是追求效率，但有时候慢下来，反而能看到更多。', category: '随笔', tags: ['思考', '生活'], date: '2024.02.15', readTime: '4 分钟' },
  { id: 6, title: '技术人的浪漫：用代码写诗', excerpt: '代码也是一种语言，它有自己的韵律和美感。', category: '技术', tags: ['技术', '创意'], date: '2024.02.10', readTime: '7 分钟' },
]

const categories = ['全部', '随笔', 'AI', '读书', '技术']

export default function Blog() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('全部')

  const filtered = posts.filter((p) => {
    const matchSearch = p.title.includes(search) || p.excerpt.includes(search)
    const matchCat = cat === '全部' || p.category === cat
    return matchSearch && matchCat
  })

  const featured = filtered.filter((p) => p.featured)
  const regular = filtered.filter((p) => !p.featured)

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-light text-white/90 mb-3">
            <span className="gradient-text font-medium">文章</span>
          </h1>
          <p className="text-stone-500">写下来的东西，才是真实存在过的思考</p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 w-4 h-4" />
            <input
              type="text"
              placeholder="搜索文章..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#111a2e]/80 border border-white/5 text-white placeholder-stone-600 text-sm focus:outline-none focus:border-sky-500/30 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  cat === c
                    ? 'bg-sky-500/15 text-sky-300 border border-sky-500/25'
                    : 'text-stone-500 border border-white/5 hover:border-sky-500/15 hover:text-sky-400'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured */}
        {featured.length > 0 && (
          <div className="mb-14">
            <h2 className="text-sm text-stone-500 mb-6">精选文章</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {featured.map((post) => (
                <div key={post.id} className="card group cursor-pointer">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="tag">{post.category}</span>
                    <span className="text-xs text-stone-600">{post.date}</span>
                  </div>
                  <h3 className="font-medium text-white/90 group-hover:text-sky-300 transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-stone-500 line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {post.tags.map((t) => (
                        <span key={t} className="text-xs text-stone-600 flex items-center gap-1">
                          <Tag className="w-2.5 h-2.5" />
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-stone-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="text-sm text-stone-500 mb-6">全部文章 ({filtered.length})</h2>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-10 h-10 text-stone-700 mx-auto mb-4" />
              <p className="text-stone-600">没有找到相关文章</p>
            </div>
          ) : (
            <div className="space-y-3">
              {regular.map((post) => (
                <div key={post.id} className="card group cursor-pointer flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="tag text-xs">{post.category}</span>
                      <span className="text-xs text-stone-600 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="text-xs text-stone-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-medium text-white/90 group-hover:text-sky-300 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-stone-500 line-clamp-1">{post.excerpt}</p>
                  </div>
                  <span className="text-sm text-stone-600 group-hover:text-sky-400 transition-colors">
                    阅读 →
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}