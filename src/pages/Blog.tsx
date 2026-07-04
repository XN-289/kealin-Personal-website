import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Calendar, BookOpen, Tag, ChevronLeft } from 'lucide-react'
import { loadBlogPosts, type BlogPost } from '../utils/content'

const categories = ['全部', '随笔', 'AI', '读书', '技术']

export default function Blog() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('全部')
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBlogPosts().then((data) => {
      setPosts(data)
      setLoading(false)
    })
  }, [])

  const filtered = posts.filter((p) => {
    const matchSearch = p.title.includes(search) || p.excerpt.includes(search)
    const matchCat = cat === '全部' || p.category === cat
    return matchSearch && matchCat
  })

  // 文章详情页
  if (selectedPost) {
    return (
      <div className="min-h-screen pt-28 pb-16">
        <div className="container-custom max-w-2xl">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-sm text-stone-500 hover:text-sky-400 transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            返回文章列表
          </button>

          <article>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="tag">{selectedPost.category}</span>
                <span className="text-sm text-stone-500">{selectedPost.date}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-light text-white/90 mb-4">
                {selectedPost.title}
              </h1>
              <div className="flex gap-2">
                {selectedPost.tags.map((t) => (
                  <span key={t} className="text-xs text-stone-500">#{t}</span>
                ))}
              </div>
            </div>

            <div className="divider" />

            <div className="prose prose-invert max-w-none">
              {selectedPost.content.split('\n').map((line, i) => {
                if (line.startsWith('## ')) {
                  return <h2 key={i} className="text-2xl font-light text-white/90 mt-10 mb-4">{line.slice(3)}</h2>
                }
                if (line.startsWith('### ')) {
                  return <h3 key={i} className="text-xl font-medium text-white/80 mt-8 mb-3">{line.slice(4)}</h3>
                }
                if (line.startsWith('- ')) {
                  return <li key={i} className="text-stone-300 ml-4 mb-1">{line.slice(2)}</li>
                }
                if (line.match(/^\d+\. /)) {
                  return <li key={i} className="text-stone-300 ml-4 mb-1 list-decimal">{line.replace(/^\d+\. /, '')}</li>
                }
                if (line.startsWith('---')) {
                  return <div key={i} className="divider" />
                }
                if (line.startsWith('*') && line.endsWith('*')) {
                  return <p key={i} className="text-stone-500 italic mt-6">{line.slice(1, -1)}</p>
                }
                if (line.trim() === '') {
                  return <br key={i} />
                }
                return <p key={i} className="text-stone-300 leading-relaxed mb-3">{line}</p>
              })}
            </div>
          </article>
        </div>
      </div>
    )
  }

  // 文章列表页
  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container-custom">
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

        {/* 搜索和筛选 */}
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

        {/* 加载状态 */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-6 h-6 border-2 border-sky-500/30 border-t-sky-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-stone-500 text-sm">加载中...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-10 h-10 text-stone-700 mx-auto mb-4" />
            <p className="text-stone-500">还没有文章</p>
            <p className="text-stone-600 text-sm mt-2">在 content/blog/ 文件夹中添加 .md 文件即可</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                onClick={() => setSelectedPost(post)}
                className="card group cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="tag">{post.category}</span>
                  <span className="text-xs text-stone-600 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                </div>
                <h2 className="text-xl font-medium text-white/90 group-hover:text-sky-300 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-stone-400 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {post.tags.map((t) => (
                      <span key={t} className="text-xs text-stone-600 flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5" />
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-stone-600 group-hover:text-sky-400 transition-colors">
                    阅读 →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}