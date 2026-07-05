import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, BookOpen, ChevronLeft } from 'lucide-react'
import { loadBlogPosts, type BlogPost } from '../utils/content'

const ease = [0.22, 0.61, 0.36, 1] as const
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease },
})

const categories = ['全部', '随笔', 'AI', '读书', '技术']

export default function Blog() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('全部')
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selected, setSelected] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadBlogPosts().then((d) => { setPosts(d); setLoading(false) }) }, [])

  const filtered = posts.filter((p) =>
    (p.title.includes(search) || p.excerpt.includes(search)) && (cat === '全部' || p.category === cat)
  )

  if (selected) return <PostView post={selected} onBack={() => setSelected(null)} />

  return (
    <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
      <div className="wrap" style={{ padding: '10vh var(--pad) var(--sp-9) calc(var(--rail) + 40px)' }}>
        {/* 标题 */}
        <motion.div {...fadeUp()} style={{ marginBottom: 'var(--sp-7)' }}>
          <div className="page-title" style={{ marginBottom: 'var(--sp-3)' }}>文章</div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-muted)' }}>写下来的东西，才是真实存在过的思考</p>
        </motion.div>

        {/* 搜索 + 筛选 */}
        <motion.div {...fadeUp(0.1)} style={{ marginBottom: 'var(--sp-6)' }}>
          <div style={{ position: 'relative', maxWidth: '340px', marginBottom: 'var(--sp-4)' }}>
            <Search size={14} style={{ position: 'absolute', left: 'var(--sp-4)', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)' }} />
            <input type="text" placeholder="搜索文章..." value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '36px' }} />
          </div>
          <div style={{ display: 'flex', gap: 'var(--sp-1)', flexWrap: 'wrap' }}>
            {categories.map((c) => (
              <button key={c} onClick={() => setCat(c)} style={{
                padding: 'var(--sp-1) var(--sp-4)', border: '1px solid',
                borderColor: cat === c ? 'var(--accent)' : 'var(--line)',
                background: cat === c ? 'var(--accent-dim)' : 'transparent',
                color: cat === c ? 'var(--accent)' : 'var(--ink-muted)',
                fontSize: 'var(--text-xs)', letterSpacing: '0.04em', cursor: 'pointer',
                transition: 'all var(--dur) var(--ease)',
              }}>{c}</button>
            ))}
          </div>
        </motion.div>

        {/* 列表 */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 'var(--sp-8) 0', color: 'var(--ink-muted)', fontSize: 'var(--text-sm)' }}>加载中...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--sp-8) 0', color: 'var(--ink-muted)' }}>
            <BookOpen size={24} style={{ opacity: 0.15, margin: '0 auto var(--sp-3)' }} />
            <p style={{ fontSize: 'var(--text-sm)' }}>还没有文章</p>
          </div>
        ) : (
          <div>
            {filtered.map((post, i) => (
              <motion.div key={post.slug} {...fadeUp(i * 0.04)}>
                <div className="post-row" onClick={() => setSelected(post)}>
                  <div className="post-row__meta" style={{ marginBottom: 'var(--sp-1)' }}>
                    <span className="post-row__idx">{String(i + 1).padStart(2, '0')}</span>
                    <span className="tag">{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <div className="post-row__title">{post.title}</div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-muted)', marginTop: 'var(--sp-1)' }}>{post.excerpt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function PostView({ post, onBack }: { post: BlogPost; onBack: () => void }) {
  return (
    <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
      <div className="wrap" style={{ maxWidth: '600px', padding: 'var(--sp-8) var(--pad) var(--sp-9)' }}>
        <motion.div {...fadeUp()}>
          {/* 返回 */}
          <button onClick={onBack} style={{
            display: 'flex', alignItems: 'center', gap: 'var(--sp-1)',
            fontSize: 'var(--text-sm)', color: 'var(--ink-muted)',
            background: 'none', border: 'none', cursor: 'pointer',
            marginBottom: 'var(--sp-7)', padding: 0,
            transition: 'color var(--dur)',
          }}>
            <ChevronLeft size={16} /> 返回
          </button>

          {/* 头部 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-4)' }}>
            <span className="tag">{post.category}</span>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-muted)' }}>{post.date}</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--serif)', fontWeight: 600,
            fontSize: 'clamp(var(--text-2xl), 4.5vw, var(--text-3xl))',
            lineHeight: 1.3, marginBottom: 'var(--sp-3)',
          }}>{post.title}</h1>
          <div style={{ display: 'flex', gap: 'var(--sp-1)', marginBottom: 'var(--sp-5)' }}>
            {post.tags.map((t) => <span key={t} style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)' }}>#{t}</span>)}
          </div>
          <div className="hr" style={{ marginBottom: 'var(--sp-5)' }} />

          {/* 正文 */}
          <div style={{ fontSize: 'var(--text-base)', color: 'var(--ink-soft)', lineHeight: 1.9 }}>
            {post.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) return <h2 key={i} style={{ fontFamily: 'var(--serif)', fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--ink)', marginTop: 'var(--sp-7)', marginBottom: 'var(--sp-4)' }}>{line.slice(3)}</h2>
              if (line.startsWith('### ')) return <h3 key={i} style={{ fontFamily: 'var(--serif)', fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--ink)', marginTop: 'var(--sp-6)', marginBottom: 'var(--sp-3)' }}>{line.slice(4)}</h3>
              if (line.startsWith('- ')) return <li key={i} style={{ marginLeft: 'var(--sp-5)', marginBottom: 'var(--sp-1)' }}>{line.slice(2)}</li>
              if (line.startsWith('---')) return <div key={i} className="hr" style={{ margin: 'var(--sp-6) 0' }} />
              if (line.startsWith('*') && line.endsWith('*')) return <p key={i} style={{ color: 'var(--ink-muted)', fontStyle: 'italic', marginTop: 'var(--sp-5)' }}>{line.slice(1, -1)}</p>
              if (line.trim() === '') return <div key={i} style={{ height: 'var(--sp-2)' }} />
              return <p key={i} style={{ marginBottom: 'var(--sp-3)' }}>{line}</p>
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}