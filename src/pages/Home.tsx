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
      <section className="hero-section">
        {/* 左栏 */}
        <motion.div className="hero-left" style={{ y: heroY, opacity: heroOp }}>
          <motion.div {...fadeUp(0.15)}>
            <div className="page-title">解构</div>
            <div className="page-title" style={{
              background: 'linear-gradient(135deg, var(--accent), #c49660)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>世界</div>
          </motion.div>

          <motion.div {...fadeUp(0.35)} className="hero-content">
            <div className="hero-kicker">
              <span className="hero-dot" />
              一个年轻人的数字花园
            </div>
            <p className="hero-slogan">
              用文字记录思考，用技术辅助表达，<br />在这个空间里种下对世界的观察。
            </p>
            <div className="hero-cta">
              <Link to="/blog" className="btn"><BookOpen size={15} /><span>查看内容</span><span className="arr">→</span></Link>
              <Link to="/contact" className="btn"><MessageCircle size={15} /><span>联系我</span><span className="arr">→</span></Link>
            </div>
          </motion.div>
        </motion.div>

        {/* 右栏：蓝图档案 */}
        <motion.div {...fadeUp(0.45)} className="hero-right">
          <BlueprintCard />
        </motion.div>
      </section>

      {/* ═══ 写·思·创 ═══ */}
      <section className="section-block">
        <div className="wrap">
          <motion.div {...fadeUp()} className="section-header">
            <h2 className="section-title">我在做什么</h2>
            <p className="section-sub">用不同的方式理解这个世界</p>
          </motion.div>

          {/* 流程图 */}
          <motion.div {...fadeUp(0.1)} className="flow-diagram">
            <FlowNode zh="写" en="WRITE" />
            <span className="flow-line" />
            <FlowNode zh="思" en="THINK" />
            <span className="flow-line" />
            <FlowNode zh="创" en="BUILD" />
          </motion.div>

          {/* 卡片 */}
          <div className="cards-grid">
            {[
              { icon: Pen, title: '写作', desc: '把想法变成文字，在文字中寻找意义。' },
              { icon: Sparkles, title: 'AI 协作', desc: '把 AI 当作思考的伙伴，用技术辅助表达。' },
              { icon: Eye, title: '阅读与观察', desc: '读书、看世界、和人聊天。所有输入最终变成输出。' },
            ].map((item, i) => (
              <motion.div key={item.title} {...fadeUp(0.15 + i * 0.08)} className="card">
                <div className="card-icon">
                  <item.icon size={14} style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 文章 ═══ */}
      <section className="section-block">
        <div className="wrap">
          <motion.div {...fadeUp()} className="section-header-between">
            <div>
              <h2 className="section-title">最新文章</h2>
              <p className="section-sub">最近写的一些东西</p>
            </div>
            <Link to="/blog" className="section-link">全部 →</Link>
          </motion.div>

          {posts.length === 0 ? (
            <div className="empty-state">
              <BookOpen size={24} style={{ opacity: 0.15, margin: '0 auto var(--sp-3)' }} />
              <p>还没有文章</p>
            </div>
          ) : (
            <div>
              {posts.slice(0, 3).map((post, i) => (
                <motion.div key={post.slug} {...fadeUp(0.1 + i * 0.06)}>
                  <Link to="/blog" className="post-row">
                    <div className="post-row__meta">
                      <span className="post-row__idx">{String(i + 1).padStart(2, '0')}</span>
                      <span className="tag">{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                    <div className="post-row__title">{post.title}</div>
                    <p className="post-row__excerpt">{post.excerpt}</p>
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
      <section className="section-block quote-section">
        <motion.div {...fadeUp()} className="wrap quote-wrap">
          <p className="quote-mark">「</p>
          <p className="quote-text">
            世界是一个巨大的文本，<br />而我试图读懂它。
          </p>
          <p className="quote-mark">」</p>
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

  return (
    <div className="blueprint">
      {/* 四角准星 */}
      {corners.map((pos, i) => (
        <span key={i} className="bp-cross" style={pos}>
          <span className="bp-cross-v" />
          <span className="bp-cross-h" />
        </span>
      ))}

      {/* 散落十字 */}
      {crosses.map((pos, i) => (
        <span key={i} className="bp-plus" style={pos}>+</span>
      ))}

      {/* 圆环 */}
      <span className="bp-ring" />

      {/* 人物 */}
      <div className="bp-figure">
        <span className="bp-emoji">🧑‍💻</span>
      </div>

      {/* 标注 */}
      <div className="bp-anno bp-anno--tl">
        <p className="bp-lead"><span className="bp-sq" />WRITER / THINKER</p>
        <span className="bp-hr" />
        <p className="bp-mono">WRITE · THINK · BUILD</p>
      </div>

      <div className="bp-anno bp-anno--ml">
        <p className="bp-mono bp-key">SPEC.001</p>
        <p className="bp-mono">FOCUS&nbsp;&nbsp;: 人文 × 技术</p>
        <p className="bp-mono">TOPIC&nbsp;&nbsp;: 解构世界</p>
        <p className="bp-mono">FORMAT&nbsp;: 文章 / 思考</p>
        <p className="bp-mono">TOOL&nbsp;&nbsp;&nbsp;: AI 协作</p>
      </div>

      <div className="bp-anno bp-anno--bl">
        <p className="bp-mono bp-key">VER. 1.0.0</p>
        <p className="bp-mono">DATE. 2024</p>
      </div>

      <div className="bp-anno bp-anno--tr">
        <p className="bp-mono bp-key">ID // 解构世界</p>
      </div>

      <div className="bp-anno bp-anno--mr">
        <p className="bp-mono">CATEGORY</p>
        <p className="bp-mono">人文思考</p>
        <span className="bp-hatch" />
      </div>

      <div className="bp-anno bp-anno--br">
        <p className="bp-mono">EST. 2022</p>
      </div>

      <span className="bp-coords">N 31° 24′ 37″&nbsp;&nbsp;&nbsp;&nbsp;E 121° 35′ 09″</span>
    </div>
  )
}

/* ── 流程节点 ── */
function FlowNode({ zh, en }: { zh: string; en: string }) {
  return (
    <div className="flow-node">
      <span className="flow-zh">{zh}</span>
      <span className="flow-en">{en}</span>
    </div>
  )
}

/* ── Marquee ── */
function Marquee() {
  const words = '写作 · 思考 · AI · 阅读 · 解构 · 人文 · 技术 · 表达 · 观察 · 构建 · '
  return (
    <section className="marquee-section">
      <motion.div
        animate={{ x: [0, '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="marquee-track"
      >
        <span className="marquee-text">{words}{words}</span>
      </motion.div>
    </section>
  )
}