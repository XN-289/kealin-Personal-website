import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  { year: '现在', title: '持续写作与探索', desc: '用文字和 AI 去理解世界，记录思考的过程' },
  { year: '2023', title: '开始接触 AI', desc: '发现 AI 不只是工具，更是思考的伙伴' },
  { year: '2022', title: '开始写作', desc: '在文字中找到了表达自己的方式' },
  { year: '更早', title: '一切的开始', desc: '对世界充满好奇，总想知道为什么' },
]

const readingList = [
  { title: '《百年孤独》', author: '马尔克斯', note: '魔幻现实主义的极致' },
  { title: '《局外人》', author: '加缪', note: '荒诞与存在' },
  { title: '《人类简史》', author: '赫拉利', note: '重新理解人类' },
  { title: '《设计中的设计》', author: '原研哉', note: '少即是多' },
]

const interests = ['写作', '阅读', 'AI', '哲学', '心理学', '设计', '音乐', '电影', '咖啡', '摄影']

export default function About() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        scrollTrigger: { trigger: '.about-reveal', start: 'top 85%' },
        y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} style={{ paddingTop: 'var(--nav-h)' }}>
      {/* 大标题 */}
      <section style={{
        padding: '10vh var(--pad-x) 6vh calc(var(--rail-x) + 48px)',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            fontFamily: 'var(--serif)', fontWeight: 600,
            fontSize: 'clamp(56px, 10vw, 120px)', lineHeight: .92,
            color: 'var(--ink)', marginBottom: '20px',
          }}>
            关于我
          </div>
          <p style={{ fontSize: '14px', color: 'var(--ink-muted)', letterSpacing: '.04em' }}>
            一个试图理解世界的人
          </p>
        </motion.div>
      </section>

      {/* 自我介绍 */}
      <section className="about-reveal" style={{
        padding: '0 var(--pad-x) 60px calc(var(--rail-x) + 48px)',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
          gap: 'clamp(32px, 5vw, 64px)', alignItems: 'start',
        }}>
          {/* 左：头像 */}
          <div>
            <div style={{
              width: '100%', maxWidth: '280px', aspectRatio: '1',
              border: '1px solid var(--line)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(212, 165, 116, 0.03)',
              position: 'relative',
            }}>
              <span style={{ fontSize: '64px' }}>🧑‍💻</span>
              {/* 角落准星 */}
              <div style={{
                position: 'absolute', top: '-6px', left: '-6px',
                width: '12px', height: '12px',
                borderTop: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)',
                opacity: .4,
              }} />
              <div style={{
                position: 'absolute', bottom: '-6px', right: '-6px',
                width: '12px', height: '12px',
                borderBottom: '1px solid var(--accent)', borderRight: '1px solid var(--accent)',
                opacity: .4,
              }} />
            </div>
          </div>

          {/* 右：文字 */}
          <div>
            <h2 style={{
              fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 600,
              color: 'var(--ink)', marginBottom: '4px',
            }}>
              你的名字
            </h2>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              fontSize: '13px', color: 'var(--ink-muted)', marginBottom: '28px',
            }}>
              <MapPin className="w-3.5 h-3.5" />
              <span>中国</span>
              <span style={{ color: 'var(--line)' }}>·</span>
              <span>写作者 / 思考者</span>
            </div>
            <div style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.85 }}>
              <p style={{ marginBottom: '16px' }}>
                我是一个对世界充满好奇的人。喜欢阅读、写作、思考，也喜欢用技术去辅助我的表达。
                对我来说，技术不是目的，而是理解世界的一种方式。
              </p>
              <p style={{ marginBottom: '16px' }}>
                我相信文字的力量。一篇文章、一个想法，有时候比任何代码都有力量。
                所以我把更多的时间花在写作和思考上，用人文的视角去观察这个世界。
              </p>
              <p>
                AI 是我最近发现的好伙伴。它不是替我写作，而是帮我更好地思考。
                人和机器的协作，或许是一种新的创作方式。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 时间线 */}
      <section className="about-reveal" style={{
        padding: '60px var(--pad-x) 60px calc(var(--rail-x) + 48px)',
        borderTop: '1px solid var(--line)',
      }}>
        <h2 style={{
          fontFamily: 'var(--serif)', fontWeight: 600,
          fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.1,
          color: 'var(--ink)', marginBottom: '40px',
        }}>
          我的轨迹
        </h2>
        <div>
          {timeline.map((item) => (
            <div key={item.year} style={{
              display: 'grid', gridTemplateColumns: '60px 1fr', gap: '24px',
              padding: '20px 0', borderBottom: '1px solid var(--line)',
            }}>
              <span style={{
                fontFamily: 'var(--serif)', fontSize: '14px', fontWeight: 600,
                color: 'var(--accent)',
              }}>
                {item.year}
              </span>
              <div>
                <h3 style={{
                  fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 600,
                  color: 'var(--ink)', marginBottom: '4px',
                }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 阅读清单 */}
      <section className="about-reveal" style={{
        padding: '60px var(--pad-x) 60px calc(var(--rail-x) + 48px)',
        borderTop: '1px solid var(--line)',
      }}>
        <h2 style={{
          fontFamily: 'var(--serif)', fontWeight: 600,
          fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.1,
          color: 'var(--ink)', marginBottom: '40px',
        }}>
          最近在读
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {readingList.map((book) => (
            <div key={book.title} className="card" style={{ padding: '20px 24px' }}>
              <h3 style={{
                fontFamily: 'var(--serif)', fontSize: '16px', fontWeight: 600,
                color: 'var(--ink)', marginBottom: '4px',
              }}>
                {book.title}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--ink-muted)', marginBottom: '8px' }}>{book.author}</p>
              <p style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>{book.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 兴趣 */}
      <section className="about-reveal" style={{
        padding: '60px var(--pad-x) 80px calc(var(--rail-x) + 48px)',
        borderTop: '1px solid var(--line)',
      }}>
        <h2 style={{
          fontFamily: 'var(--serif)', fontWeight: 600,
          fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.1,
          color: 'var(--ink)', marginBottom: '32px',
        }}>
          兴趣标签
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {interests.map((item) => (
            <span key={item} style={{
              padding: '8px 20px',
              border: '1px solid var(--line)',
              fontSize: '14px', color: 'var(--ink-soft)',
              transition: 'all .25s',
              cursor: 'default',
            }}>
              {item}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}