import { MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

const ease = [0.22, 0.61, 0.36, 1] as const
const fade = (delay = 0) => ({
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
      <section style={{ padding: '10vh var(--pad) 5vh calc(var(--rail) + 40px)' }}>
        <motion.div {...fade()}>
          <div style={{
            fontFamily: 'var(--serif)', fontWeight: 600,
            fontSize: 'clamp(48px, 9vw, 100px)', lineHeight: 0.95,
            marginBottom: '12px',
          }}>关于我</div>
          <p style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>一个试图理解世界的人</p>
        </motion.div>
      </section>

      {/* 介绍 */}
      <section style={{ padding: '0 var(--pad) var(--sp-8) calc(var(--rail) + 40px)' }}>
        <motion.div {...fade(0.1)} style={{
          display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.3fr)',
          gap: 'clamp(24px, 4vw, 48px)', alignItems: 'start',
        }}>
          <div style={{
            width: '100%', maxWidth: '240px', aspectRatio: '1',
            border: '1px solid var(--line)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <span style={{ fontSize: '56px' }}>🧑‍💻</span>
            <div style={{ position: 'absolute', top: '-5px', left: '-5px', width: 10, height: 10, borderTop: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)', opacity: 0.3 }} />
            <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', width: 10, height: 10, borderBottom: '1px solid var(--accent)', borderRight: '1px solid var(--accent)', opacity: 0.3 }} />
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '22px', fontWeight: 600, marginBottom: '4px' }}>你的名字</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--ink-muted)', marginBottom: '24px' }}>
              <MapPin size={14} /> 中国 <span style={{ color: 'var(--line)' }}>·</span> 写作者 / 思考者
            </div>
            <div style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.85 }}>
              <p style={{ marginBottom: '14px' }}>我是一个对世界充满好奇的人。喜欢阅读、写作、思考，也喜欢用技术去辅助我的表达。对我来说，技术不是目的，而是理解世界的一种方式。</p>
              <p style={{ marginBottom: '14px' }}>我相信文字的力量。一篇文章、一个想法，有时候比任何代码都有力量。所以我把更多的时间花在写作和思考上，用人文的视角去观察这个世界。</p>
              <p>AI 是我最近发现的好伙伴。它不是替我写作，而是帮我更好地思考。人和机器的协作，或许是一种新的创作方式。</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 时间线 */}
      <section style={{ padding: 'var(--sp-8) var(--pad) var(--sp-8) calc(var(--rail) + 40px)', borderTop: '1px solid var(--line)' }}>
        <motion.div {...fade()}>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: 'clamp(24px, 3.5vw, 36px)', marginBottom: '32px' }}>我的轨迹</h2>
        </motion.div>
        {timeline.map((item, i) => (
          <motion.div key={item.year} {...fade(i * 0.08)}
            style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: '20px', padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
            <span style={{ fontFamily: 'var(--serif)', fontSize: '14px', fontWeight: 600, color: 'var(--accent)' }}>{item.year}</span>
            <div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '16px', fontWeight: 600, marginBottom: '2px' }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* 阅读 */}
      <section style={{ padding: 'var(--sp-8) var(--pad) var(--sp-8) calc(var(--rail) + 40px)', borderTop: '1px solid var(--line)' }}>
        <motion.div {...fade()}>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: 'clamp(24px, 3.5vw, 36px)', marginBottom: '32px' }}>最近在读</h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {books.map((book, i) => (
            <motion.div key={book.title} {...fade(i * 0.06)} className="card" style={{ padding: '18px 20px' }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '15px', fontWeight: 600, marginBottom: '2px' }}>{book.title}</h3>
              <p style={{ fontSize: '12px', color: 'var(--ink-muted)', marginBottom: '6px' }}>{book.author}</p>
              <p style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>{book.note}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 兴趣 */}
      <section style={{ padding: 'var(--sp-8) var(--pad) var(--sp-9) calc(var(--rail) + 40px)', borderTop: '1px solid var(--line)' }}>
        <motion.div {...fade()}>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: 'clamp(24px, 3.5vw, 36px)', marginBottom: '24px' }}>兴趣标签</h2>
        </motion.div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {interests.map((item, i) => (
            <motion.span key={item} {...fade(i * 0.04)}
              style={{
                padding: '7px 16px', border: '1px solid var(--line)',
                fontSize: '13px', color: 'var(--ink-soft)',
                transition: 'all var(--duration) var(--ease)', cursor: 'default',
              }}>
              {item}
            </motion.span>
          ))}
        </div>
      </section>
    </div>
  )
}