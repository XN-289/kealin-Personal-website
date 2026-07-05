import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { BookOpen, Pen, MessageCircle, Sparkles, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { loadBlogPosts, type BlogPost } from '../utils/content'

const ease = [0.22, 0.61, 0.36, 1] as const
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
})

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 400], [0, -24])
  const heroOp = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => { loadBlogPosts().then(setPosts) }, [])

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: '100vh',
        display: 'grid', gridTemplateColumns: 'minmax(0, 42%) minmax(0, 58%)',
        padding: '0 var(--pad) 0 calc(var(--rail) + 40px)',
        alignItems: 'stretch', overflow: 'hidden',
      }}>
        {/* 左栏 */}
        <motion.div style={{
          y: heroY, opacity: heroOp,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'calc(var(--nav-h) + 6vh) 0 8vh',
        }}>
          <motion.div {...fadeUp(0.15)}>
            <div className="page-title">解构</div>
            <div className="page-title" style={{
              background: 'linear-gradient(135deg, var(--accent), #c49660)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>世界</div>
          </motion.div>

          <motion.div {...fadeUp(0.35)} style={{ marginTop: 'clamp(20px, 4vh, 44px)', marginLeft: 'clamp(8px, 1.2vw, 20px)' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              fontSize: 'clamp(14px, 1.1vw, 18px)', color: 'var(--accent)',
              letterSpacing: '0.04em', marginBottom: '18px',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
              一个年轻人的数字花园
            </div>
            <p style={{
              fontFamily: 'var(--serif)', fontWeight: 300,
              fontSize: 'clamp(17px, 1.6vw, 24px)', lineHeight: 1.75,
              color: 'var(--ink-soft)', maxWidth: '22em', marginBottom: '28px',
            }}>
              用文字记录思考，用技术辅助表达，<br />在这个空间里种下对世界的观察。
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/blog" className="btn"><BookOpen size={15} /><span>查看内容</span><span className="arr">→</span></Link>
              <Link to="/contact" className="btn"><MessageCircle size={15} /><span>联系我</span><span className="arr">→</span></Link>
            </div>
          </motion.div>
        </motion.div>

        {/* 右栏：蓝图档案 */}
        <motion.div {...fadeUp(0.45)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 'var(--nav-h)' }}>
          <BlueprintCard />
        </motion.div>
      </section>

      {/* ═══ 写·思·创 ═══ */}
      <section style={{ padding: 'var(--sp-9) 0', borderTop: '1px solid var(--line)' }}>
        <div className="wrap">
          <motion.div {...fadeUp()} style={{ marginBottom: 'var(--sp-7)' }}>
            <h2 className="section-title" style={{ marginBottom: 'var(--sp-1)' }}>我在做什么</h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-muted)' }}>用不同的方式理解这个世界</p>
          </motion.div>

          {/* 流程图 */}
          <motion.div {...fadeUp(0.1)} style={{
            display: 'grid', gridTemplateColumns: 'auto minmax(36px, 1fr) auto minmax(36px, 1fr) auto',
            alignItems: 'center', marginBottom: 'var(--sp-7)', maxWidth: '440px',
          }}>
            <FlowNode zh="写" en="WRITE" />
            <span style={{ height: 1, background: 'var(--accent)', opacity: 0.35 }} />
            <FlowNode zh="思" en="THINK" />
            <span style={{ height: 1, background: 'var(--accent)', opacity: 0.35 }} />
            <FlowNode zh="创" en="BUILD" />
          </motion.div>

          {/* 卡片 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--sp-4)' }}>
            {[
              { icon: Pen, title: '写作', desc: '把想法变成文字，在文字中寻找意义。' },
              { icon: Sparkles, title: 'AI 协作', desc: '把 AI 当作思考的伙伴，用技术辅助表达。' },
              { icon: Eye, title: '阅读与观察', desc: '读书、看世界、和人聊天。所有输入最终变成输出。' },
            ].map((item, i) => (
              <motion.div key={item.title} {...fadeUp(0.15 + i * 0.08)} className="card">
                <div style={{ width: 30, height: 30, border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--sp-4)' }}>
                  <item.icon size={14} style={{ color: 'var(--accent)' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--sp-1)' }}>{item.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-muted)', lineHeight: 1.7 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 文章 ═══ */}
      <section style={{ padding: 'var(--sp-9) 0', borderTop: '1px solid var(--line)' }}>
        <div className="wrap">
          <motion.div {...fadeUp()} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'var(--sp-6)' }}>
            <div>
              <h2 className="section-title" style={{ marginBottom: 'var(--sp-1)' }}>最新文章</h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-muted)' }}>最近写的一些东西</p>
            </div>
            <Link to="/blog" style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-muted)', borderBottom: '1px solid var(--line)', paddingBottom: '2px' }}>全部 →</Link>
          </motion.div>

          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--sp-8) 0', color: 'var(--ink-muted)' }}>
              <BookOpen size={24} style={{ opacity: 0.15, margin: '0 auto var(--sp-3)' }} />
              <p style={{ fontSize: 'var(--text-sm)' }}>还没有文章</p>
            </div>
          ) : (
            <div>
              {posts.slice(0, 3).map((post, i) => (
                <motion.div key={post.slug} {...fadeUp(0.1 + i * 0.06)}>
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

      {/* ═══ Marquee ═══ */}
      <Marquee />

      {/* ═══ 引言 ═══ */}
      <section style={{ padding: 'var(--sp-10) 0', borderTop: '1px solid var(--line)' }}>
        <motion.div {...fadeUp()} className="wrap" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--ink-muted)', fontSize: 'var(--text-xl)', marginBottom: 'var(--sp-3)' }}>「</p>
          <p style={{ fontFamily: 'var(--serif)', fontWeight: 300, fontSize: 'clamp(var(--text-lg), 2.5vw, var(--text-2xl))', lineHeight: 1.85, color: 'var(--ink-soft)', maxWidth: '16em', margin: '0 auto var(--sp-3)' }}>
            世界是一个巨大的文本，<br />而我试图读懂它。
          </p>
          <p style={{ color: 'var(--ink-muted)', fontSize: 'var(--text-xl)', marginBottom: 'var(--sp-7)' }}>」</p>
          <Link to="/contact" className="btn"><MessageCircle size={15} /><span>和我聊聊</span><span className="arr">→</span></Link>
        </motion.div>
      </section>
    </div>
  )
}

/* ── 蓝图档案 ── */
function BlueprintCard() {
  const corners = [
    { top: 10, left: 10 }, { top: 10, right: 10 },
    { bottom: 10, left: 10 }, { bottom: 10, right: 10 },
  ]
  const crosses = [
    { top: '28%', left: '22%' }, { top: '65%', left: '28%' },
    { top: '32%', left: '65%' }, { top: '58%', left: '60%' },
  ]
  const annoStyle = { fontFamily: 'var(--mono)' as const, fontSize: 7, color: 'var(--ink-muted)', letterSpacing: '0.04em', lineHeight: 1.6 }

  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: '420px', aspectRatio: '945/638',
      border: '1px solid var(--line)',
      background: `
        linear-gradient(rgba(212,165,116,0.03) 1px, transparent 1px) 0 0/100% 26px,
        linear-gradient(90deg, rgba(212,165,116,0.03) 1px, transparent 1px) 0 0/26px 100%
      `,
    }}>
      {/* 四角准星 */}
      {corners.map((pos, i) => (
        <span key={i} style={{ position: 'absolute', ...pos, width: 12, height: 12 }}>
          <span style={{ position: 'absolute', left: 5, top: 0, width: 1, height: 12, background: 'var(--accent)', opacity: 0.4 }} />
          <span style={{ position: 'absolute', top: 5, left: 0, height: 1, width: 12, background: 'var(--accent)', opacity: 0.4 }} />
        </span>
      ))}

      {/* 散落十字 */}
      {crosses.map((pos, i) => (
        <span key={i} style={{ position: 'absolute', ...pos, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', opacity: 0.2 }}>+</span>
      ))}

      {/* 圆环 */}
      <span style={{ position: 'absolute', top: '50%', left: '52%', width: '40%', aspectRatio: '1', transform: 'translate(-50%, -50%)', border: '1px solid rgba(212,165,116,0.06)', borderRadius: '50%' }} />

      {/* 人物 */}
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-48%)', width: '46%' }}>
        <span style={{ fontSize: '64px', display: 'block', textAlign: 'center', lineHeight: 1 }}>🧑‍💻</span>
      </div>

      {/* 标注 */}
      <div style={{ position: 'absolute', top: 22, left: 26 }}>
        <p style={{ ...annoStyle, fontWeight: 600, color: 'var(--ink)', fontSize: 8 }}>
          <span style={{ width: 4, height: 4, background: 'var(--accent)', display: 'inline-block', marginRight: 5 }} />
          WRITER / THINKER
        </p>
        <span style={{ display: 'block', width: 72, height: 1, background: 'var(--line)', margin: '5px 0' }} />
        <p style={annoStyle}>WRITE · THINK · BUILD</p>
      </div>

      <div style={{ position: 'absolute', top: '30%', left: 26 }}>
        <p style={{ ...annoStyle, fontWeight: 600 }}>SPEC.001</p>
        <p style={annoStyle}>FOCUS&nbsp;&nbsp;: 人文 × 技术</p>
        <p style={annoStyle}>TOPIC&nbsp;&nbsp;: 解构世界</p>
        <p style={annoStyle}>FORMAT&nbsp;: 文章 / 思考</p>
        <p style={annoStyle}>TOOL&nbsp;&nbsp;&nbsp;: AI 协作</p>
      </div>

      <div style={{ position: 'absolute', bottom: 44, left: 26 }}>
        <p style={{ ...annoStyle, fontWeight: 600 }}>VER. 1.0.0</p>
        <p style={annoStyle}>DATE. 2024</p>
      </div>

      <div style={{ position: 'absolute', top: 22, right: 26, textAlign: 'right' }}>
        <p style={{ ...annoStyle, fontWeight: 600 }}>ID // 解构世界</p>
      </div>

      <div style={{ position: 'absolute', top: '30%', right: 26, textAlign: 'right' }}>
        <p style={annoStyle}>CATEGORY</p>
        <p style={annoStyle}>人文思考</p>
        <span style={{ display: 'block', width: 30, height: 8, marginTop: 3, background: 'repeating-linear-gradient(45deg, var(--line) 0 1px, transparent 1px 4px)' }} />
      </div>

      <div style={{ position: 'absolute', bottom: 44, right: 26, textAlign: 'right' }}>
        <p style={annoStyle}>EST. 2022</p>
      </div>

      <span style={{
        position: 'absolute', left: '50%', bottom: 10, transform: 'translateX(-50%)',
        fontFamily: 'var(--mono)', fontSize: 7, letterSpacing: '0.1em', color: 'var(--ink-muted)', whiteSpace: 'nowrap',
      }}>
        N 31° 24′ 37″&nbsp;&nbsp;&nbsp;&nbsp;E 121° 35′ 09″
      </span>
    </div>
  )
}

/* ── 流程节点 ── */
function FlowNode({ zh, en }: { zh: string; en: string }) {
  return (
    <div style={{
      width: 'clamp(68px, 7.5vw, 96px)', aspectRatio: '1',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
      border: '1px solid var(--accent)', borderRadius: '50%',
      transition: 'all var(--dur) var(--ease)', cursor: 'default',
    }}>
      <span style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: 'clamp(20px, 2vw, 28px)', lineHeight: 1 }}>{zh}</span>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.08em', color: 'var(--ink-muted)' }}>{en}</span>
    </div>
  )
}

/* ── Marquee ── */
function Marquee() {
  const words = '写作 · 思考 · AI · 阅读 · 解构 · 人文 · 技术 · 表达 · 观察 · 构建 · '
  return (
    <section style={{ overflow: 'hidden', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '13px 0' }}>
      <motion.div
        animate={{ x: [0, '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', width: 'max-content' }}
      >
        <span style={{ fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--ink-muted)', letterSpacing: '0.06em', whiteSpace: 'nowrap', flex: 'none' }}>{words}{words}</span>
      </motion.div>
    </section>
  )
}