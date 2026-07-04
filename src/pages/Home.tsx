import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, BookOpen, Pen, MessageCircle, Sparkles, Calendar } from 'lucide-react'
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

  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -40])

  useEffect(() => {
    loadBlogPosts().then(setPosts)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: { trigger: '.features-section', start: 'top 85%' },
        y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power2.out',
      })
      gsap.from('.post-card', {
        scrollTrigger: { trigger: '.posts-section', start: 'top 85%' },
        y: 25, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[85vh] flex items-center">
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 container-custom"
        >
          {/* 头像 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mb-10"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400/15 to-amber-600/10 border border-amber-400/15 flex items-center justify-center">
              <span className="text-3xl">✨</span>
            </div>
          </motion.div>

          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.1] tracking-tight mb-6">
              <span className="text-white/85 block">你好，我是</span>
              <span className="gradient-text font-medium">一个解构世界的人</span>
            </h1>
          </motion.div>

          {/* 副标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-lg mb-12"
          >
            <p className="text-lg text-stone-400 leading-relaxed mb-2">
              用文字记录思考，用技术辅助表达，
              <br />
              在这个数字花园里种下对世界的观察。
            </p>
            <p className="text-sm text-stone-500">
              写作者 · 思考者 · AI 协作者
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
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
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-stone-600 tracking-wider">向下探索</span>
            <ArrowDown className="w-4 h-4 text-stone-600" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== 我在做什么 ===== */}
      <section className="features-section py-24 md:py-32">
        <div className="container-custom">
          <div className="mb-14">
            <h2 className="text-2xl md:text-3xl font-light text-white/85 mb-2">
              我在<span className="gradient-text font-medium">做什么</span>
            </h2>
            <p className="text-stone-500 text-sm">用不同的方式理解这个世界</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Pen, title: '写作', desc: '把想法变成文字，在文字中寻找意义。技术、生活、思考，都是写作的素材。' },
              { icon: Sparkles, title: 'AI 协作', desc: '把 AI 当作思考的伙伴，用技术辅助表达，而不是替代表达。' },
              { icon: BookOpen, title: '阅读与观察', desc: '读书、看世界、和人聊天。所有的输入，最终都会变成输出。' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="feature-card card">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/8 border border-amber-500/12 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-base font-medium text-white/90 mb-2">{item.title}</h3>
                  <p className="text-sm text-stone-400 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== 最新文章 ===== */}
      <section className="posts-section py-24 md:py-32">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-light text-white/85 mb-2">
                最新<span className="gradient-text font-medium">文章</span>
              </h2>
              <p className="text-stone-500 text-sm">最近写的一些东西</p>
            </div>
            <Link to="/blog" className="text-sm text-amber-400/60 hover:text-amber-300 transition-colors">
              全部 →
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-8 h-8 text-stone-700 mx-auto mb-3" />
              <p className="text-stone-600 text-sm">还没有文章</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.slice(0, 3).map((post) => (
                <Link
                  key={post.slug}
                  to="/blog"
                  className="post-card card group flex flex-col md:flex-row md:items-center gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="tag">{post.category}</span>
                      <span className="text-xs text-stone-600 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-white/85 group-hover:text-amber-300 transition-colors mb-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-stone-500 line-clamp-1">{post.excerpt}</p>
                  </div>
                  <span className="text-sm text-stone-600 group-hover:text-amber-400 transition-colors flex-shrink-0">
                    阅读 →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== 底部引言 ===== */}
      <section className="py-28">
        <div className="container-custom text-center">
          <p className="text-stone-600 text-lg mb-3">「</p>
          <p className="text-xl md:text-2xl font-light text-white/75 leading-relaxed max-w-md mx-auto mb-3">
            世界是一个巨大的文本，
            <br />
            而我试图读懂它。
          </p>
          <p className="text-stone-600 text-lg mb-10">」</p>
          <Link to="/contact" className="btn-ghost">
            <MessageCircle className="w-4 h-4" />
            和我聊聊
          </Link>
        </div>
      </section>
    </div>
  )
}