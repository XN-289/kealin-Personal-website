import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, BookOpen, Zap, Code2, Cpu, Layers, Binary, Braces } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GithubIcon } from '../components/Icons'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const capabilities = [
  {
    icon: Code2,
    label: '代码编织',
    desc: '用代码构建数字世界的骨架',
    color: 'cyan',
  },
  {
    icon: Cpu,
    label: '系统解构',
    desc: '拆解复杂问题，找到最优解',
    color: 'violet',
  },
  {
    icon: Layers,
    label: '架构设计',
    desc: '从零搭建可扩展的数字空间',
    color: 'emerald',
  },
  {
    icon: Binary,
    label: '数据流动',
    desc: '让信息在系统中自由流转',
    color: 'cyan',
  },
]

const stats = [
  { value: '50+', label: 'ARTICLES', sublabel: '技术文章' },
  { value: '20+', label: 'PROJECTS', sublabel: '开源项目' },
  { value: '1000+', label: 'COMMITS', sublabel: '代码提交' },
  { value: '3+', label: 'YEARS', sublabel: '持续探索' },
]

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    el.style.width = '0'
    const timeout = setTimeout(() => {
      gsap.to(el, {
        width: '100%',
        duration: 1.5,
        ease: 'steps(30)',
      })
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, delay])

  return (
    <span ref={ref} className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-cyan-400" style={{ width: 0 }}>
      {text}
    </span>
  )
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 能力卡片依次出现
      gsap.from('.capability-card', {
        scrollTrigger: {
          trigger: '.capabilities-section',
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      })

      // 统计数字
      gsap.from('.stat-item', {
        scrollTrigger: {
          trigger: '.stats-section',
          start: 'top 80%',
        },
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(1.7)',
      })

      // 文章预览
      gsap.from('.post-card', {
        scrollTrigger: {
          trigger: '.posts-section',
          start: 'top 80%',
        },
        x: -40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {/* ===== HERO: 数字建筑师的入口 ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 container-custom text-center"
        >
          {/* 状态栏 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 mb-8 border border-cyan-500/20 bg-cyan-500/5"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs tracking-[0.2em] text-cyan-400/80 font-mono">SYSTEM.INITIALIZED</span>
            <span className="text-xs text-cyan-500/40">|</span>
            <span className="text-xs tracking-wider text-cyan-500/50 font-mono">v2.0.25</span>
          </motion.div>

          {/* 头像 - 几何框 */}
          <motion.div
            initial={{ scale: 0, rotate: 45 }}
            animate={{ scale: 1, rotate: 45 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
            className="w-28 h-28 mx-auto mb-10 relative"
          >
            <div className="absolute inset-0 border-2 border-cyan-400/30 rotate-0" />
            <div className="absolute inset-2 border border-cyan-400/20" />
            <div className="absolute inset-0 flex items-center justify-center -rotate-45">
              <span className="text-4xl">👨‍💻</span>
            </div>
            {/* 角落装饰 */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
          </motion.div>

          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight">
              <span className="text-white">数字</span>
              <span className="gradient-text-cyan">建筑师</span>
            </h1>
          </motion.div>

          {/* 副标题 - 终端风格 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 text-slate-500 font-mono text-sm">
              <Braces className="w-4 h-4 text-cyan-500/50" />
              <span className="text-cyan-400/60">&gt;</span>
              <TypewriterText text="热爱技术的极客 · 用代码解构世界" delay={1500} />
            </div>
          </motion.div>

          {/* 描述 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="text-lg text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed"
          >
            在这里，每一行代码都是构建数字世界的一块砖石。
            <br />
            我记录探索的过程，分享解构与重建的思考。
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/blog" className="btn-cyber flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4" />
              进入代码库
            </Link>
            <Link to="/projects" className="btn-outline-cyber flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" />
              查看构建物
            </Link>
          </motion.div>

          {/* GitHub */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.6 }}
            className="mt-10"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-cyan-400 transition-colors text-sm tracking-wider"
            >
              <GithubIcon className="w-4 h-4" />
              <span className="font-mono">GITHUB://PROFILE</span>
            </a>
          </motion.div>
        </motion.div>

        {/* 滚动提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] tracking-[0.3em] text-cyan-500/40 uppercase">Scroll to explore</span>
            <ArrowDown className="w-4 h-4 text-cyan-500/40" />
          </motion.div>
        </motion.div>

        {/* 装饰性坐标 */}
        <div className="absolute bottom-8 left-8 text-[10px] font-mono text-cyan-500/20 hidden lg:block">
          <div>X: 0.000</div>
          <div>Y: 0.000</div>
          <div>Z: 0.000</div>
        </div>
        <div className="absolute top-24 right-8 text-[10px] font-mono text-cyan-500/20 hidden lg:block text-right">
          <div>LAT: 00.000</div>
          <div>LNG: 00.000</div>
        </div>
      </section>

      {/* ===== CAPABILITIES: 能力矩阵 ===== */}
      <section className="capabilities-section relative py-24 md:py-32">
        <div className="container-custom">
          {/* 区域标题 */}
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/20" />
            <h2 className="text-xs tracking-[0.3em] text-cyan-400/60 font-mono uppercase">Capabilities</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap) => {
              const Icon = cap.icon
              const colorMap = {
                cyan: { border: 'border-cyan-500/20', bg: 'bg-cyan-500/10', text: 'text-cyan-400', glow: 'shadow-cyan-500/10' },
                violet: { border: 'border-violet-500/20', bg: 'bg-violet-500/10', text: 'text-violet-400', glow: 'shadow-violet-500/10' },
                emerald: { border: 'border-emerald-500/20', bg: 'bg-emerald-500/10', text: 'text-emerald-400', glow: 'shadow-emerald-500/10' },
              }
              const colors = colorMap[cap.color as keyof typeof colorMap] || colorMap.cyan

              return (
                <div
                  key={cap.label}
                  className="capability-card card-cyber group"
                >
                  <div className={`w-12 h-12 ${colors.border} border flex items-center justify-center mb-5 ${colors.bg} group-hover:shadow-lg ${colors.glow} transition-all`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 tracking-wide">{cap.label}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{cap.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== STATS: 数据面板 ===== */}
      <section className="stats-section relative py-20">
        <div className="container-custom">
          <div className="glass border border-cyan-500/10 p-8 md:p-12"
            style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-item text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text-cyan mb-1 font-mono">
                    {stat.value}
                  </div>
                  <div className="text-[10px] tracking-[0.2em] text-cyan-400/60 font-mono mb-1">{stat.label}</div>
                  <div className="text-xs text-slate-500">{stat.sublabel}</div>
                </div>
              ))}
            </div>

            {/* 装饰性进度条 */}
            <div className="mt-8 pt-6 border-t border-cyan-500/10">
              <div className="flex items-center justify-between text-[10px] font-mono text-cyan-500/40 mb-2">
                <span>SYSTEM.LOAD</span>
                <span>87%</span>
              </div>
              <div className="h-1 bg-cyan-500/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '87%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LATEST POSTS: 数据流 ===== */}
      <section className="posts-section relative py-24 md:py-32">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                最新<span className="gradient-text-cyan">数据流</span>
              </h2>
              <p className="text-sm text-slate-500 font-mono">RECENT.TRANSMISSIONS</p>
            </div>
            <Link to="/blog" className="text-sm text-cyan-400/60 hover:text-cyan-400 transition-colors font-mono tracking-wider">
              VIEW.ALL →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'React 18 并发特性深度解析', tag: '前端', date: '2024.01.15', time: '8 min' },
              { title: 'TypeScript 高级类型编程', tag: '语言', date: '2024.01.10', time: '12 min' },
              { title: 'Node.js 性能优化实战', tag: '后端', date: '2024.01.05', time: '10 min' },
            ].map((post, i) => (
              <div key={i} className="post-card card-cyber group cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <span className="tag-cyber">{post.tag}</span>
                  <span className="text-[10px] font-mono text-slate-600">{post.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">{post.time} read</span>
                  <span className="text-xs text-cyan-400/50 group-hover:text-cyan-400 transition-colors font-mono">
                    READ →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA: 加入构建 ===== */}
      <section className="relative py-24">
        <div className="container-custom text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              一起<span className="gradient-text-multi">构建</span>未来
            </h2>
            <p className="text-slate-400 mb-8">
              技术是工具，代码是语言，世界是画布。
              <br />
              让我们一起用技术解构问题，用代码构建解决方案。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-cyber">
                建立连接
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-cyber flex items-center justify-center gap-2"
              >
                <GithubIcon className="w-4 h-4" />
                源代码
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}