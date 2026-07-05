import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, BookOpen, ChevronLeft } from 'lucide-react'
import { loadBlogPosts, type BlogPost } from '../utils/content'

const categories = ['全部', '随笔', 'AI', '读书', '技术']

export default function Blog() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('全部')
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBlogPosts().then((data) => { setPosts(data); setLoading(false) })
  }, [])

  const filtered = posts.filter((p) => {
    const matchSearch = p.title.includes(search) || p.excerpt.includes(search)
    const matchCat = cat === '全部' || p.category === cat
    return matchSearch && matchCat
  })

  // 文章详情
  if (selectedPost) {
    return (
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
        <div className="container-custom" style={{ maxWidth: '640px', padding: '60px var(--pad-x) 80px' }}>
          <button
            onClick={() => setSelectedPost(null)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '13px', color: 'var(--ink-muted)',
              marginBottom: '40px', background: 'none', border: 'none', cursor: 'pointer',
              transition: 'color .25s',
            }}
          >
            <ChevronLeft className="w-4 h-4" /> 返回
          </button>

          <article>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span className="tag">{selectedPost.category}</span>
                <span style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>{selectedPost.date}</span>
              </div>
              <h1 style={{
                fontFamily: 'var(--serif)', fontWeight: 600,
                fontSize: 'clamp(28px, 5vw, 40px)', lineHeight: 1.2,
                color: 'var(--ink)', marginBottom: '12px',
              }}>
                {selectedPost.title}
              </h1>
              <div style={{ display: 'flex', gap: '8px' }}>
                {selectedPost.tags.map((t) => (
                  <span key={t} style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>#{t}</span>
                ))}
              </div>
            </div>

            <div className="divider" />

            <div style={{ fontSize: '16px', color: 'var(--ink-soft)', lineHeight: 1.9 }}>
              {selectedPost.content.split('\n').map((line, i) => {
                if (line.startsWith('## ')) return <h2 key={i} style={{ fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 600, color: 'var(--ink)', marginTop: '40px', marginBottom: '16px' }}>{line.slice(3)}</h2>
                if (line.startsWith('### ')) return <h3 key={i} style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 600, color: 'var(--ink)', marginTop: '32px', marginBottom: '12px' }}>{line.slice(4)}</h3>
                if (line.startsWith('- ')) return <li key={i} style={{ marginLeft: '20px', marginBottom: '4px' }}>{line.slice(2)}</li>
                if (line.startsWith('---')) return <div key={i} className="divider" />
                if (line.startsWith('*') && line.endsWith('*')) return <p key={i} style={{ color: 'var(--ink-muted)', fontStyle: 'italic', marginTop: '24px' }}>{line.slice(1, -1)}</p>
                if (line.trim() === '') return <br key={i} />
                return <p key={i} style={{ marginBottom: '12px' }}>{line}</p>
              })}
            </div>
          </article>
        </div>
      </div>
    )
  }

  // 文章列表
  return (
    <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
      <div className="container-custom" style={{ padding: '10vh var(--pad-x) 80px calc(var(--rail-x) + 48px)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '48px' }}>
          <div style={{
            fontFamily: 'var(--serif)', fontWeight: 600,
            fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: .95,
            color: 'var(--ink)', marginBottom: '12px',
          }}>
            文章
          </div>
          <p style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>写下来的东西，才是真实存在过的思考</p>
        </motion.div>

        {/* 搜索和筛选 */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ position: 'relative', maxWidth: '400px', marginBottom: '20px' }}>
            <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)' }} className="w-4 h-4" />
            <input
              type="text" placeholder="搜索文章..." value={search} onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px 12px 40px',
                background: 'transparent', border: '1px solid var(--line)',
                color: 'var(--ink)', fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((c) => (
              <button
                key={c} onClick={() => setCat(c)}
                style={{
                  padding: '6px 16px', border: '1px solid',
                  borderColor: cat === c ? 'var(--accent)' : 'var(--line)',
                  background: cat === c ? 'rgba(212, 165, 116, 0.1)' : 'transparent',
                  color: cat === c ? 'var(--accent)' : 'var(--ink-muted)',
                  fontSize: '12px', letterSpacing: '.04em', cursor: 'pointer',
                  transition: 'all .25s',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* 文章列表 */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ width: 20, height: 20, border: '2px solid var(--line)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
            <p style={{ color: 'var(--ink-muted)', fontSize: '13px' }}>加载中...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <BookOpen className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--ink-muted)', opacity: .3 }} />
            <p style={{ color: 'var(--ink-muted)', fontSize: '14px' }}>还没有文章</p>
          </div>
        ) : (
          <div>
            {filtered.map((post, i) => (
              <div
                key={post.slug}
                onClick={() => setSelectedPost(post)}
                style={{
                  display: 'block', padding: '20px 0',
                  borderBottom: '1px solid var(--line)',
                  cursor: 'pointer', transition: 'padding-left .3s var(--ease)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = '12px')}
                onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = '0')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink-muted)', opacity: .3 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="tag">{post.category}</span>
                  <span style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>{post.date}</span>
                </div>
                <h3 style={{
                  fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 600,
                  color: 'var(--ink)', marginBottom: '4px',
                }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>{post.excerpt}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}