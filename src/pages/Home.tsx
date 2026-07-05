import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { BookOpen, Pen, MessageCircle, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { loadBlogPosts, type BlogPost } from '../utils/content'

// 统一的入场动画
const ease = [0.22, 0.61, 0.36, 1] as const
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease },
})

export default function Home() {
  const ref = useRef<HTMLDivElement>(null)
  const [posts, setPosts] = useState<BlogPost[]>([])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -24])
  const heroOp = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  useEffect(() => { loadBlogPosts().then(setPosts) }, [])

  return (
    <div ref={ref}>
      {/* HERO */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        padding: '0 var(--pad) 0 calc(var(--rail) + 40px)',
      }}>
        <motion.div style={{ y: heroY, opacity: heroOp }} className="wrap">
          <motion.div {...fade(0.1)} style={{ marginBottom: '8px' }}>
            <div style={{
              fontFamily: 'var(--serif)', fontWeight: 600,
              fontSize: 'clamp(56px, 11vw, 120px)', lineHeight: 0.9,
              letterSpacing: '-0.02em',
            }}>
              解构
            </div>
            <div style={{
              fontFamily: 'var(--serif)', fontWeight: 600,
              fontSize: 'clamp(56px, 11vw, 120px)', lineHeight: 0.9,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, var(--accent), #c49660)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              世界
            </div>
          </motion.div>

          <motion.div {...fade(0.25)} style={{ marginBottom: '28px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              fontSize: '13px', color: 'var(--accent)', letterSpacing: '0.04em',
              marginBottom: '16px',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
              一个年轻人的数字花园
            </div>
            <p style={{
              fontFamily: 'var(--serif)', fontWeight: 300,
              fontSize: 'clamp(17px, 1.8vw, 22px)', lineHeight: 1.75,
              color: 'var(--ink-soft)', maxWidth: '24em',
            }}>
              用文字记录思考，用技术辅助表达，
              <br />
              在这个空间里种下对世界的观察。
            </p>
          </motion.div>

          <motion.div {...fade(0.4)} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/blog" className="btn">
              <BookOpen size={15} />
              <span>读我的文章</span>
              <span className="arr">→</span>
            </Link>
            <Link to="/about" className="btn">
              <MessageCircle size={15} />
              <span>了解我</span>
              <span className="arr">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 能力 */}
      <Features />

      {/* 文章 */}
      <Posts posts={posts} />

      {/* 引言 */}
      <Quote />
    </div>
  )
}

function Features() {
  const items = [
    { icon: Pen, title: '写作', desc: '把想法变成文字，在文字中寻找意义。' },
    { icon: Sparkles, title: 'AI 协作', desc: '把 AI 当作思考的伙伴，用技术辅助表达。' },
    { icon: BookOpen, title: '阅读与观察', desc: '读书、看世界、和人聊天。所有输入最终变成输出。' },
  ]

  return (
    <section style={{ padding: 'var(--sp-9) 0', borderTop: '1px solid var(--line)' }}>
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          style={{ marginBottom: 'var(--sp-7)' }}
        >
          <h2 style={{
            fontFamily: 'var(--serif)', fontWeight: 600,
            fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.1,
            marginBottom: '6px',
          }}>
            我在做什么
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>用不同的方式理解这个世界</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
              className="card"
            >
              <div style={{
                width: 32, height: 32,
                border: '1px solid var(--line)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '14px',
              }}>
                <item.icon size={15} style={{ color: 'var(--accent)' }} />
              </div>
              <h3 style={{
                fontFamily: 'var(--serif)', fontSize: '16px', fontWeight: 600,
                marginBottom: '6px',
              }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-muted)', lineHeight: 1.7 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Posts({ posts }: { posts: BlogPost[] }) {
  return (
    <section style={{ padding: 'var(--sp-9) 0', borderTop: '1px solid var(--line)' }}>
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            marginBottom: 'var(--sp-6)',
          }}
        >
          <div>
            <h2 style={{
              fontFamily: 'var(--serif)', fontWeight: 600,
              fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.1,
              marginBottom: '6px',
            }}>
              最新文章
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>最近写的一些东西</p>
          </div>
          <Link to="/blog" style={{
            fontSize: '13px', color: 'var(--ink-muted)',
            borderBottom: '1px solid var(--line)', paddingBottom: '2px',
            transition: 'color var(--duration), border-color var(--duration)',
          }}>
            全部 →
          </Link>
        </motion.div>

        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--sp-8) 0', color: 'var(--ink-muted)' }}>
            <BookOpen size={24} style={{ opacity: 0.2, margin: '0 auto 12px' }} />
            <p style={{ fontSize: '14px' }}>还没有文章</p>
          </div>
        ) : (
          <div>
            {posts.slice(0, 3).map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <Link to="/blog" className="post-row">
                  <div className="post-row__meta" style={{ marginBottom: '6px' }}>
                    <span className="post-row__idx">{String(i + 1).padStart(2, '0')}</span>
                    <span className="tag">{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <div className="post-row__title">{post.title}</div>
                  <p style={{ fontSize: '14px', color: 'var(--ink-muted)', marginTop: '4px' }}>{post.excerpt}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function Quote() {
  return (
    <section style={{ padding: 'var(--sp-10) 0', borderTop: '1px solid var(--line)' }}>
      <motion.div
        className="wrap"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        style={{ textAlign: 'center' }}
      >
        <p style={{ color: 'var(--ink-muted)', fontSize: '20px', marginBottom: '12px' }}>「</p>
        <p style={{
          fontFamily: 'var(--serif)', fontWeight: 300,
          fontSize: 'clamp(18px, 2.5vw, 26px)', lineHeight: 1.8,
          color: 'var(--ink-soft)', maxWidth: '16em', margin: '0 auto 12px',
        }}>
          世界是一个巨大的文本，
          <br />
          而我试图读懂它。
        </p>
        <p style={{ color: 'var(--ink-muted)', fontSize: '20px', marginBottom: '36px' }}>」</p>
        <Link to="/contact" className="btn">
          <MessageCircle size={15} />
          <span>和我聊聊</span>
          <span className="arr">→</span>
        </Link>
      </motion.div>
    </section>
  )
}