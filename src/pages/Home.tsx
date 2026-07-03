import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, BookOpen, Pen, MessageCircle, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const recentPosts = [
  {
    title: '关于技术与人文的一点思考',
    date: '2024.03.15',
    excerpt: '技术不应该是冰冷的工具，它应该服务于人的表达...',
    tag: '随笔',
  },
  {
    title: '用 AI 重新理解写作这件事',
    date: '2024.03.08',
    excerpt: '当我开始和 AI 一起写作，我发现了一种新的创作方式...',
    tag: 'AI',
  },
  {
    title: '一个年轻人眼中的世界',
    date: '2024.02.28',
    excerpt: '我们这一代人，似乎总在解构些什么，又在构建些什么...',
    tag: '思考',
  },
]

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.post-item', {
        scrollTrigger: {
          trigger: '.posts-section',
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
      })

      gsap.from('.feature-item', {
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 80%',
        },
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center">
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 container-custom text-center"
        >
          {/* 头像 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-sky-400/20 to-sky-600/20 border border-sky-400/20 flex items-center justify-center"
          >
            <span className="text-4xl">✨</span>
          </motion.div>

          {/* 标题 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 tracking-tight"
          >
            <span className="text-white/90">你好，我是</span>
            <br />
            <span className="gradient-text font-medium">一个解构世界的人</span>
          </motion.h1>

          {/* 副标题 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg md:text-xl text-stone-400 max-w-xl mx-auto mb-4 leading-relaxed"
          >
            用文字记录思考，用技术辅助表达，
            <br />
            在这个数字花园里种下对世界的观察。
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-sm text-stone-500 mb-12"
          >
            写作者 · 思考者 · AI 协作者
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/blog" className="btn-primary">
              <BookOpen className="w-4 h-4" />
              读我的文章
            </Link>
            <Link to="/about" className="btn-ghost">
              <MessageCircle className="w-4 h-4" />
              了解我
            </Link>
          </motion.div>
        </motion.div>

        {/* 滚动提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-stone-600">向下探索</span>
            <ArrowDown className="w-4 h-4 text-stone-600" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== 我在做什么 ===== */}
      <section className="features-section py-20 md:py-28">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-light text-white/90 mb-3">
              我在<span className="gradient-text font-medium">做什么</span>
            </h2>
            <p className="text-stone-500 text-sm">用不同的方式理解这个世界</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Pen,
                title: '写作',
                desc: '把想法变成文字，在文字中寻找意义。技术、生活、思考，都是我写作的素材。',
              },
              {
                icon: Sparkles,
                title: 'AI 协作',
                desc: '把 AI 当作思考的伙伴，用技术辅助表达，而不是替代表达。',
              },
              {
                icon: BookOpen,
                title: '阅读与观察',
                desc: '读书、看世界、和人聊天。所有的输入，最终都会变成输出。',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="feature-item card text-center">
                  <div className="w-12 h-12 mx-auto mb-5 rounded-xl bg-sky-500/10 border border-sky-500/15 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-sky-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white/90 mb-3">{item.title}</h3>
                  <p className="text-sm text-stone-400 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== 最新文章 ===== */}
      <section className="posts-section py-20 md:py-28">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-light text-white/90 mb-1">
                最新<span className="gradient-text font-medium">文章</span>
              </h2>
              <p className="text-sm text-stone-500">最近写的一些东西</p>
            </div>
            <Link to="/blog" className="text-sm text-sky-400/70 hover:text-sky-300 transition-colors">
              全部文章 →
            </Link>
          </div>

          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Link
                key={post.title}
                to="/blog"
                className="post-item card group flex flex-col md:flex-row md:items-center gap-4 cursor-pointer"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="tag">{post.tag}</span>
                    <span className="text-xs text-stone-600">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-medium text-white/90 group-hover:text-sky-300 transition-colors mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-stone-500 line-clamp-1">{post.excerpt}</p>
                </div>
                <span className="text-sm text-stone-600 group-hover:text-sky-400 transition-colors">
                  阅读 →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 底部 CTA ===== */}
      <section className="py-24">
        <div className="container-custom text-center">
          <div className="max-w-lg mx-auto">
            <p className="text-lg text-stone-400 mb-2">「</p>
            <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed mb-2">
              世界是一个巨大的文本，
              <br />
              而我试图读懂它。
            </p>
            <p className="text-lg text-stone-400 mb-8">」</p>
            <Link to="/contact" className="btn-ghost">
              <MessageCircle className="w-4 h-4" />
              和我聊聊
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}