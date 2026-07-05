import { MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

const ease = [0.22, 0.61, 0.36, 1] as const
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, delay, ease },
})

const timeline = [
  { year: '现在', title: '持续写作与探索', desc: '用文字和 AI 去理解世界，记录思考的过程' },
  { year: '2023', title: '开始接触 AI', desc: '发现 AI 不只是工具，更是思考的伙伴' },
  { year: '2022', title: '开始写作', desc: '在文字中找到了表达自己的方式' },
  { year: '更早', title: '一切的开始', desc: '对世界充满好奇，总想知道为什么' },
]

const books = [
  { title: '《百年孤独》', author: '马尔克斯', note: '魔幻现实主义的极致' },
  { title: '《局外人》', author: '加缪', note: '荒诞与存在' },
  { title: '《人类简史》', author: '赫拉利', note: '重新理解人类' },
  { title: '《设计中的设计》', author: '原研哉', note: '少即是多' },
]

const interests = ['写作', '阅读', 'AI', '哲学', '心理学', '设计', '音乐', '电影', '咖啡', '摄影']

export default function About() {
  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      {/* 标题 */}
      <section style={{ padding: '10vh var(--pad) var(--sp-7) calc(var(--rail) + 40px)' }}>
        <motion.div {...fadeUp()}>
          <div className="page-title" style={{ marginBottom: 'var(--sp-3)' }}>关于我</div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-muted)' }}>一个试图理解世界的人</p>
        </motion.div>
      </section>

      {/* 自我介绍 */}
      <section style={{ padding: '0 var(--pad) var(--sp-8) calc(var(--rail) + 40px)' }}>
        <motion.div {...fadeUp(0.1)} style={{
          display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.3fr)',
          gap: 'clamp(var(--sp-5), 4vw, var(--sp-7))', alignItems: 'start',
        }}>
          {/* 头像 */}
          <div style={{
            width: '100%', maxWidth: '220px', aspectRatio: '1',
            border: '1px solid var(--line)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <span style={{ fontSize: '48px' }}>🧑‍💻</span>
            <div style={{ position: 'absolute', top: '-5px', left: '-5px', width: 10, height: 10, borderTop: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)', opacity: 0.25 }} />
            <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', width: 10, height: 10, borderBottom: '1px solid var(--accent)', borderRight: '1px solid var(--accent)', opacity: 0.25 }} />
          </div>

          {/* 文字 */}
          <div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 'var(--sp-1)' }}>你的名字</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', fontSize: 'var(--text-sm)', color: 'var(--ink-muted)', marginBottom: 'var(--sp-5)' }}>
              <MapPin size={14} /> 中国 <span style={{ color: 'var(--line)' }}>·</span> 写作者 / 思考者
            </div>
            <div style={{ fontSize: 'var(--text-base)', color: 'var(--ink-soft)', lineHeight: 1.85 }}>
              <p style={{ marginBottom: 'var(--sp-4)' }}>我是一个对世界充满好奇的人。喜欢阅读、写作、思考，也喜欢用技术去辅助我的表达。对我来说，技术不是目的，而是理解世界的一种方式。</p>
              <p style={{ marginBottom: 'var(--sp-4)' }}>我相信文字的力量。一篇文章、一个想法，有时候比任何代码都有力量。所以我把更多的时间花在写作和思考上，用人文的视角去观察这个世界。</p>
              <p>AI 是我最近发现的好伙伴。它不是替我写作，而是帮我更好地思考。人和机器的协作，或许是一种新的创作方式。</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 时间线 */}
      <Section title="我的轨迹">
        {timeline.map((item, i) => (
          <motion.div key={item.year} {...fadeUp(i * 0.06)}
            style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: 'var(--sp-5)', padding: 'var(--sp-4) 0', borderBottom: '1px solid var(--line)' }}>
            <span style={{ fontFamily: 'var(--serif)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--accent)' }}>{item.year}</span>
            <div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: '2px' }}>{item.title}</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-muted)' }}>{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </Section>

      {/* 阅读 */}
      <Section title="最近在读">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--sp-3)' }}>
          {books.map((book, i) => (
            <motion.div key={book.title} {...fadeUp(i * 0.06)} className="card" style={{ padding: 'var(--sp-4) var(--sp-5)' }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: '2px' }}>{book.title}</h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', marginBottom: 'var(--sp-1)' }}>{book.author}</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-soft)' }}>{book.note}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 兴趣 */}
      <Section title="兴趣标签" last>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
          {interests.map((item, i) => (
            <motion.span key={item} {...fadeUp(i * 0.03)}
              style={{
                padding: 'var(--sp-2) var(--sp-4)', border: '1px solid var(--line)',
                fontSize: 'var(--text-sm)', color: 'var(--ink-soft)',
                transition: 'all var(--dur) var(--ease)', cursor: 'default',
              }}>
              {item}
            </motion.span>
          ))}
        </div>
      </Section>
    </div>
  )
}

function Section({ title, children, last }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <section style={{
      padding: `var(--sp-8) var(--pad) ${last ? 'var(--sp-9)' : 'var(--sp-8)'} calc(var(--rail) + 40px)`,
      borderTop: '1px solid var(--line)',
    }}>
      <motion.div {...fadeUp()}>
        <h2 className="section-title" style={{ marginBottom: 'var(--sp-6)' }}>{title}</h2>
      </motion.div>
      {children}
    </section>
  )
}