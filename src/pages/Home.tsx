import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { BookOpen, Pen, MessageCircle, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { loadBlogPosts, type BlogPost } from '../utils/content'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [posts, setPosts] = useState<BlogPost[]>([])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -30])

  useEffect(() => { loadBlogPosts().then(setPosts) }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-reveal]', {
        y: 20, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out', delay: 0.3,
      })
      gsap.from('.feature-card', {
        scrollTrigger: { trigger: '.features-section', start: 'top 85%' },
        y: 25, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
      })
      gsap.from('.post-card', {
        scrollTrigger: { trigger: '.posts-section', start: 'top 85%' },
        y: 20, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out',
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef}>
      {/* ===== HERO ===== */}
      <section style={{
        minHeight: '100vh',
        padding: '0 var(--pad-x) 0 calc(var(--rail-x) + 48px)',
        display: 'flex', alignItems: 'center',
      }}>
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="container-custom">
          {/* 大标题 - Sac 风格 */}
          <div data-reveal style={{ marginBottom: '12px' }}>
            <div style={{
              fontFamily: 'var(--serif)', fontWeight: 600,
              fontSize: 'clamp(64px, 12vw, 140px)', lineHeight: .9,
              letterSpacing: '-.02em', color: 'var(--ink)',
              marginBottom: '8px',
            }}>
              解构
            </div>
            <div style={{
              fontFamily: 'var(--serif)', fontWeight: 600,
              fontSize: 'clamp(64px, 12vw, 140px)', lineHeight: .9,
              letterSpacing: '-.02em',
              background: 'linear-gradient(135deg, var(--accent), #c49660)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              世界
            </div>
          </div>

          {/* 副标题 */}
          <div data-reveal style={{ marginBottom: '32px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              fontSize: '14px', letterSpacing: '.05em', color: 'var(--accent)',
              marginBottom: '20px',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
              一个年轻人的数字花园
            </div>
            <p style={{
              fontFamily: 'var(--serif)', fontWeight: 300,
              fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.7,
              color: 'var(--ink-soft)', maxWidth: '26em',
            }}>
              用文字记录思考，用技术辅助表达，
              <br />
              在这个空间里种下对世界的观察。
            </p>
          </div>

          {/* CTA */}
          <div data-reveal style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/blog" className="btn btn--ghost">
              <BookOpen className="w-4 h-4" />
              读我的文章
              <span className="arr">→</span>
            </Link>
            <Link to="/about" className="btn btn--ghost">
              <MessageCircle className="w-4 h-4" />
              了解我
              <span className="arr">→</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ===== 我在做什么 ===== */}
      <section className="features-section" style={{
        padding: '80px 0',
        borderTop: '1px solid var(--line)',
      }}>
        <div className="container-custom">
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{
              fontFamily: 'var(--serif)', fontWeight: 600,
              fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.1,
              color: 'var(--ink)', marginBottom: '8px',
            }}>
              我在做什么
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--ink-muted)', letterSpacing: '.04em' }}>
              用不同的方式理解这个世界
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {[
              { icon: Pen, title: '写作', desc: '把想法变成文字，在文字中寻找意义。' },
              { icon: Sparkles, title: 'AI 协作', desc: '把 AI 当作思考的伙伴，用技术辅助表达。' },
              { icon: BookOpen, title: '阅读与观察', desc: '读书、看世界、和人聊天。所有的输入，最终都会变成输出。' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="feature-card card">
                  <div style={{
                    width: 36, height: 36,
                    border: '1px solid var(--line)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '16px',
                  }}>
                    <Icon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 600,
                    color: 'var(--ink)', marginBottom: '8px',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--ink-muted)', lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== 最新文章 ===== */}
      <section className="posts-section" style={{
        padding: '80px 0',
        borderTop: '1px solid var(--line)',
      }}>
        <div className="container-custom">
          <div style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            marginBottom: '40px',
          }}>
            <div>
              <h2 style={{
                fontFamily: 'var(--serif)', fontWeight: 600,
                fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.1,
                color: 'var(--ink)', marginBottom: '8px',
              }}>
                最新文章
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>最近写的一些东西</p>
            </div>
            <Link to="/blog" style={{
              fontSize: '13px', color: 'var(--ink-muted)',
              borderBottom: '1px solid var(--line)',
              paddingBottom: '2px',
              transition: 'color .25s, border-color .25s',
            }}>
              全部 →
            </Link>
          </div>

          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <BookOpen className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--ink-muted)', opacity: .3 }} />
              <p style={{ color: 'var(--ink-muted)', fontSize: '14px' }}>还没有文章</p>
              <p style={{ color: 'var(--ink-muted)', fontSize: '12px', marginTop: '4px' }}>
                在 content/blog/ 文件夹中添加 .md 文件
              </p>
            </div>
          ) : (
            <div>
              {posts.slice(0, 3).map((post, i) => (
                <Link
                  key={post.slug}
                  to="/blog"
                  className="post-card"
                  style={{
                    display: 'block',
                    padding: '24px 0',
                    borderBottom: '1px solid var(--line)',
                    transition: 'padding-left .3s var(--ease)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = '12px')}
                  onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = '0')}
                >
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    marginBottom: '8px',
                  }}>
                    <span style={{
                      fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 600,
                      color: 'var(--ink-muted)', opacity: .4,
                      fontVariantNumeric: 'tabular-nums',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="tag">{post.category}</span>
                    <span style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>{post.date}</span>
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 600,
                    color: 'var(--ink)', marginBottom: '6px',
                    transition: 'color .25s',
                  }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--ink-muted)', lineHeight: 1.6 }}>
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== 底部引言 ===== */}
      <section style={{ padding: '100px 0', borderTop: '1px solid var(--line)' }}>
        <div className="container-custom" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--ink-muted)', fontSize: '24px', marginBottom: '12px' }}>「</p>
          <p style={{
            fontFamily: 'var(--serif)', fontWeight: 300,
            fontSize: 'clamp(20px, 3vw, 28px)', lineHeight: 1.7,
            color: 'var(--ink-soft)', maxWidth: '18em', margin: '0 auto 12px',
          }}>
            世界是一个巨大的文本，
            <br />
            而我试图读懂它。
          </p>
          <p style={{ color: 'var(--ink-muted)', fontSize: '24px', marginBottom: '40px' }}>」</p>
          <Link to="/contact" className="btn btn--ghost">
            <MessageCircle className="w-4 h-4" />
            和我聊聊
            <span className="arr">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}