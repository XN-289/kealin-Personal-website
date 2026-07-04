import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MapPin, BookOpen, Sparkles, Pen, Heart } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const interests = [
  '写作', '阅读', 'AI', '哲学', '心理学', '设计', '音乐', '电影',
  '城市漫步', '咖啡', '摄影', '播客',
]

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

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-item', {
        scrollTrigger: { trigger: '.timeline-section', start: 'top 85%' },
        x: -15, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out',
      })
      gsap.from('.book-item', {
        scrollTrigger: { trigger: '.reading-section', start: 'top 85%' },
        y: 15, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out',
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen pt-28 pb-16">
      {/* Header */}
      <section className="container-custom mb-16">
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl md:text-4xl font-light text-white/85 mb-2">
            关于<span className="gradient-text font-medium">我</span>
          </h1>
          <p className="text-stone-500 text-sm">一个试图理解世界的人</p>
        </motion.div>
      </section>

      {/* 自我介绍 */}
      <section className="container-custom mb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-amber-400/12 to-amber-600/8 border border-amber-400/12 flex items-center justify-center mx-auto md:mx-0">
                <span className="text-4xl">🧑‍💻</span>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-medium text-white/90 mb-1">你的名字</h2>
              <div className="flex items-center gap-2 text-sm text-stone-500 mb-6">
                <MapPin className="w-3.5 h-3.5" />
                <span>中国</span>
                <span className="text-stone-700">·</span>
                <span>写作者 / 思考者</span>
              </div>
              <div className="space-y-4 text-[15px] text-stone-300/90 leading-[1.8]">
                <p>
                  我是一个对世界充满好奇的人。喜欢阅读、写作、思考，也喜欢用技术去辅助我的表达。
                  对我来说，技术不是目的，而是理解世界的一种方式。
                </p>
                <p>
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
        </motion.div>
      </section>

      {/* 我在做什么 */}
      <section className="container-custom mb-20">
        <div className="mb-8">
          <h2 className="text-xl font-light text-white/85 mb-1">
            我在<span className="gradient-text font-medium">做什么</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Pen, title: '写作', desc: '记录思考、分享观点，用文字构建自己的世界' },
            { icon: Sparkles, title: 'AI 协作', desc: '探索人和 AI 的协作方式，用技术辅助创作' },
            { icon: BookOpen, title: '阅读', desc: '读书、看文章、听播客，保持对世界的好奇' },
            { icon: Heart, title: '生活', desc: '认真生活，因为所有的创作都来源于生活' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="card flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/8 border border-amber-500/12 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white/90 mb-1">{item.title}</h3>
                  <p className="text-sm text-stone-400">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 时间线 */}
      <section className="timeline-section container-custom mb-20">
        <div className="mb-8">
          <h2 className="text-xl font-light text-white/85 mb-1">
            我的<span className="gradient-text font-medium">轨迹</span>
          </h2>
        </div>
        <div className="space-y-8">
          {timeline.map((item) => (
            <div key={item.year} className="timeline-item flex gap-6">
              <div className="flex-shrink-0 w-14 text-right">
                <span className="text-sm font-medium text-amber-400/70">{item.year}</span>
              </div>
              <div className="relative pl-6 border-l border-amber-500/12">
                <div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-amber-500/40 -translate-x-[4px]" />
                <h3 className="font-medium text-white/90 mb-1">{item.title}</h3>
                <p className="text-sm text-stone-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 阅读清单 */}
      <section className="reading-section container-custom mb-20">
        <div className="mb-8">
          <h2 className="text-xl font-light text-white/85 mb-1">
            最近在<span className="gradient-text font-medium">读</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {readingList.map((book) => (
            <div key={book.title} className="book-item card flex items-start gap-4">
              <div className="w-9 h-13 rounded-lg bg-gradient-to-b from-amber-500/15 to-amber-600/8 border border-amber-500/12 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h3 className="font-medium text-white/90 text-sm mb-0.5">{book.title}</h3>
                <p className="text-xs text-stone-500 mb-1">{book.author}</p>
                <p className="text-xs text-stone-400">{book.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 兴趣标签 */}
      <section className="container-custom">
        <div className="mb-8">
          <h2 className="text-xl font-light text-white/85 mb-1">
            兴趣<span className="gradient-text font-medium">标签</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {interests.map((item) => (
            <span key={item} className="px-4 py-2 rounded-xl bg-amber-500/5 border border-amber-500/8 text-sm text-amber-300/60">
              {item}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}