import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { BookOpen, Pen, MessageCircle, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { loadBlogPosts, type BlogPost } from '../utils/content'

const ease = [0.22, 0.61, 0.36, 1] as const

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
})

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay, ease },
})

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const { scrollY } = useScroll()

  // Hero 视差
  const heroY = useTransform(scrollY, [0, 400], [0, -30])
  const heroOp = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => { loadBlogPosts().then(setPosts) }, [])

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '0 var(--pad) 0 calc(var(--rail) + 40px)',
      }}>
        <motion.div style={{ y: heroY, opacity: heroOp }} className="wrap">
          {/* 大标题 */}
          <motion.div {...fadeUp(0.1)} style={{ marginBottom: 'var(--sp-3)' }}>
            <div className="page-title">解构</div>
            <div className="page-title" style={{
              background: 'linear-gradient(135deg, var(--accent), #c49660)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>世界</div>
          </motion.div>

          {/* 副标题 */}
          <motion.div {...fadeUp(0.3)} style={{ marginBottom: 'var(--sp-6)' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 'var(--sp-2)',
              fontSize: 'var(--text-sm)', color: 'var(--accent)',
              letterSpacing: '0.04em', marginBottom: 'var(--sp-4)',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
              一个年轻人的数字花园
            </div>
            <p style={{
              fontFamily: 'var(--serif)', fontWeight: 300,
              fontSize: 'clamp(var(--text-base), 1.8vw, var(--text-xl))',
              lineHeight: 1.8, color: 'var(--ink-soft)', maxWidth: '24em',
            }}>
              用文字记录思考，用技术辅助表达，
              <br />
              在这个空间里种下对世界的观察。
            </p>
          </motion.div>

          {/* 按钮 */}
          <motion.div {...fadeUp(0.45)} style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
            <Link to="/blog" className="btn">
              <BookOpen size={15} /><span>读我的文章</span><span className="arr">→</span>
            </Link>
            <Link to="/about" className="btn">
              <MessageCircle size={15} /><span>了解我</span><span className="arr">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ 能力 ═══ */}
      <section style={{ padding: 'var(--sp-9) 0', borderTop: '1px solid var(--line)' }}>
        <div className="wrap">
          <motion.div {...fadeIn()} style={{ marginBottom: 'var(--sp-7)' }}>
            <h2 className="section-title" style={{ marginBottom: 'var(--sp-1)' }}>我在做什么</h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-muted)' }}>用不同的方式理解这个世界</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 'var(--sp-4)' }}>
            {[
              { icon: Pen, title: '写作', desc: '把想法变成文字，在文字中寻找意义。' },
              { icon: Sparkles, title: 'AI 协作', desc: '把 AI 当作思考的伙伴，用技术辅助表达。' },
              { icon: BookOpen, title: '阅读与观察', desc: '读书、看世界、和人聊天。所有输入最终变成输出。' },
            ].map((item, i) => (
              <motion.div key={item.title} {...fadeIn(i * 0.1)} className="card">
                <div style={{
                  width: 32, height: 32, border: '1px solid var(--line)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 'var(--sp-4)',
                }}>
                  <item.icon size={15} style={{ color: 'var(--accent)' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--sp-1)' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-muted)', lineHeight: 1.7 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 文章 ═══ */}
      <section style={{ padding: 'var(--sp-9) 0', borderTop: '1px solid var(--line)' }}>
        <div className="wrap">
          <motion.div {...fadeIn()} style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            marginBottom: 'var(--sp-6)',
          }}>
            <div>
              <h2 className="section-title" style={{ marginBottom: 'var(--sp-1)' }}>最新文章</h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-muted)' }}>最近写的一些东西</p>
            </div>
            <Link to="/blog" style={{
              fontSize: 'var(--text-sm)', color: 'var(--ink-muted)',
              borderBottom: '1px solid var(--line)', paddingBottom: '2px',
              transition: 'color var(--dur), border-color var(--dur)',
            }}>全部 →</Link>
          </motion.div>

          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--sp-8) 0', color: 'var(--ink-muted)' }}>
              <BookOpen size={24} style={{ opacity: 0.15, margin: '0 auto var(--sp-3)' }} />
              <p style={{ fontSize: 'var(--text-sm)' }}>还没有文章</p>
            </div>
          ) : (
            <div>
              {posts.slice(0, 3).map((post, i) => (
                <motion.div key={post.slug} {...fadeIn(i * 0.08)}>
                  <Link to="/blog" className="post-row">
                    <div className="post-row__meta" style={{ marginBottom: 'var(--sp-1)' }}>
                      <span className="post-row__idx">{String(i + 1).padStart(2, '0')}</span>
                      <span className="tag">{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                    <div className="post-row__title">{post.title}</div>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-muted)', marginTop: 'var(--sp-1)' }}>{post.excerpt}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ 引言 ═══ */}
      <section style={{ padding: 'var(--sp-10) 0', borderTop: '1px solid var(--line)' }}>
        <motion.div {...fadeIn()} className="wrap" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--ink-muted)', fontSize: 'var(--text-xl)', marginBottom: 'var(--sp-3)' }}>「</p>
          <p style={{
            fontFamily: 'var(--serif)', fontWeight: 300,
            fontSize: 'clamp(var(--text-lg), 2.5vw, var(--text-2xl))',
            lineHeight: 1.85, color: 'var(--ink-soft)',
            maxWidth: '16em', margin: '0 auto var(--sp-3)',
          }}>
            世界是一个巨大的文本，
            <br />
            而我试图读懂它。
          </p>
          <p style={{ color: 'var(--ink-muted)', fontSize: 'var(--text-xl)', marginBottom: 'var(--sp-7)' }}>」</p>
          <Link to="/contact" className="btn">
            <MessageCircle size={15} /><span>和我聊聊</span><span className="arr">→</span>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}