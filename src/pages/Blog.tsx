import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, BookOpen, ChevronLeft } from 'lucide-react'
import { loadBlogPosts, type BlogPost } from '../utils/content'

const categories = ['全部', '随笔', 'AI', '读书', '技术']
const ease = [0.22, 0.61, 0.36, 1] as const
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease },
})

export default function Blog() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('全部')
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selected, setSelected] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadBlogPosts().then((d) => { setPosts(d); setLoading(false) }) }, [])

  const filtered = posts.filter((p) => {
    const s = p.title.includes(search) || p.excerpt.includes(search)
    return s && (cat === '全部' || p.category === cat)
  })

  if (selected) return <Post post={selected} onBack={() => setSelected(null)} />

  return (
    <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
      <div className="wrap" style={{ padding: '10vh var(--pad) var(--sp-9) calc(var(--rail) + 40px)' }}>
        <motion.div {...fade()} style={{ marginBottom: 'var(--sp-7)' }}>
          <div style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: 'clamp(48px, 8vw, 88px)', lineHeight: 0.95, marginBottom: '10px' }}>文章</div>
          <p style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>写下来的东西，才是真实存在过的思考</p>
        </motion.div>

        <motion.div {...fade(0.1)} style={{ marginBottom: '32px' }}>
          <div style={{ position: 'relative', maxWidth: '360px', marginBottom: '16px' }}>
            <Search size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)' }} />
            <input type="text" placeholder="搜索文章..." value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '38px' }} />
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {categories.map((c) => (
              <button key={c} onClick={() => setCat(c)} style={{
                padding: '5px 14px', border: '1px solid', cursor: 'pointer',
                borderColor: cat === c ? 'var(--accent)' : 'var(--line)',
                background: cat === c ? 'rgba(212,165,116,0.08)' : 'transparent',
                color: cat === c ? 'var(--accent)' : 'var(--ink-muted)',
                fontSize: '12px', letterSpacing: '0.04em',
                transition: 'all var(--duration) var(--ease)',
              }}>{c}</button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 'var(--sp-8) 0', color: 'var(--ink-muted)', fontSize: '13px' }}>加载中...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--sp-8) 0', color: 'var(--ink-muted)' }}>
            <BookOpen size={24} style={{ opacity: 0.2, margin: '0 auto 10px' }} />
            <p style={{ fontSize: '14px' }}>还没有文章</p>
          </div>
        ) : (
          <div>
            {filtered.map((post, i) => (
              <motion.div key={post.slug} {...fade(i * 0.05)}>
                <div className="post-row" onClick={() => setSelected(post)}>
                  <div className="post-row__meta" style={{ marginBottom: '4px' }}>
                    <span className="post-row__idx">{String(i + 1).padStart(2, '0')}</span>
                    <span className="tag">{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <div className="post-row__title">{post.title}</div>
                  <p style={{ fontSize: '14px', color: 'var(--ink-muted)', marginTop: '4px' }}>{post.excerpt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Post({ post, onBack }: { post: BlogPost; onBack: () => void }) {
  return (
    <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
      <div className="wrap" style={{ maxWidth: '600px', padding: 'var(--sp-8) var(--pad) var(--sp-9)' }}>
        <motion.div {...fade()}>
          <button onClick={onBack} style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            fontSize: '13px', color: 'var(--ink-muted)', background: 'none', border: 'none',
            cursor: 'pointer', marginBottom: '36px', padding: 0,
            transition: 'color var(--duration)',
          }}>
            <ChevronLeft size={16} /> 返回
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span className="tag">{post.category}</span>
            <span style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>{post.date}</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--serif)', fontWeight: 600,
            fontSize: 'clamp(26px, 4.5vw, 36px)', lineHeight: 1.25,
            marginBottom: '10px',
          }}>{post.title}</h1>

          <div style={{ display: 'flex', gap: '6px', marginBottom: '28px' }}>
            {post.tags.map((t) => <span key={t} style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>#{t}</span>)}
          </div>

          <div className="hr" style={{ marginBottom: '28px' }} />

          <div style={{ fontSize: '16px', color: 'var(--ink-soft)', lineHeight: 1.9 }}>
            {post.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) return <h2 key={i} style={{ fontFamily: 'var(--serif)', fontSize: '22px', fontWeight: 600, color: 'var(--ink)', marginTop: '36px', marginBottom: '14px' }}>{line.slice(3)}</h2>
              if (line.startsWith('### ')) return <h3 key={i} style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 600, color: 'var(--ink)', marginTop: '28px', marginBottom: '10px' }}>{line.slice(4)}</h3>
              if (line.startsWith('- ')) return <li key={i} style={{ marginLeft: '20px', marginBottom: '4px' }}>{line.slice(2)}</li>
              if (line.startsWith('---')) return <div key={i} className="hr" style={{ margin: '32px 0' }} />
              if (line.startsWith('*') && line.endsWith('*')) return <p key={i} style={{ color: 'var(--ink-muted)', fontStyle: 'italic', marginTop: '20px' }}>{line.slice(1, -1)}</p>
              if (line.trim() === '') return <div key={i} style={{ height: '8px' }} />
              return <p key={i} style={{ marginBottom: '10px' }}>{line}</p>
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}