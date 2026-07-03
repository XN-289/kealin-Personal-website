import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Briefcase, Code2, Database, Globe, Server, Smartphone, GitBranch, Terminal, Cpu, Layers } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  {
    year: '2024',
    title: '持续进化',
    desc: '探索前沿技术，参与开源项目，分享技术知识',
    icon: Cpu,
    status: 'ACTIVE',
  },
  {
    year: '2022',
    title: '技能升级',
    desc: '深入学习全栈开发，掌握多种技术栈',
    icon: Layers,
    status: 'COMPLETED',
  },
  {
    year: '2020',
    title: '系统初始化',
    desc: '开始学习编程，探索计算机科学的奥秘',
    icon: Terminal,
    status: 'COMPLETED',
  },
]

const skillMatrix = [
  { category: 'FRONTEND', icon: Globe, items: ['React', 'Vue', 'TypeScript', 'Next.js', 'Tailwind'], color: 'cyan' },
  { category: 'BACKEND', icon: Server, items: ['Node.js', 'Python', 'Go', 'Express', 'FastAPI'], color: 'violet' },
  { category: 'DATABASE', icon: Database, items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'], color: 'emerald' },
  { category: 'MOBILE', icon: Smartphone, items: ['React Native', 'Flutter', '小程序'], color: 'cyan' },
  { category: 'DEVOPS', icon: GitBranch, items: ['Docker', 'K8s', 'CI/CD', 'AWS', 'Linux'], color: 'violet' },
  { category: 'SYSTEM', icon: Code2, items: ['C/C++', 'Rust', '算法', '数据结构'], color: 'emerald' },
]

const interests = [
  '开源贡献', '技术写作', '系统设计', '新语言探索',
  'AI 领域', '阅读', '运动', '游戏',
]

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-card', {
        scrollTrigger: {
          trigger: '.skills-section',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
      })

      gsap.from('.timeline-item', {
        scrollTrigger: {
          trigger: '.timeline-section',
          start: 'top 80%',
        },
        x: -30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: 'power2.out',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen pt-28 pb-16">
      {/* Header */}
      <section className="container-custom mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 面包屑 */}
          <div className="flex items-center gap-2 mb-6 text-xs font-mono">
            <span className="text-cyan-500/40">HOME</span>
            <span className="text-cyan-500/20">/</span>
            <span className="text-cyan-400">ABOUT</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            关于<span className="gradient-text-cyan">我</span>
          </h1>
          <p className="text-sm font-mono text-cyan-500/40">USER.PROFILE // LOADED</p>
        </motion.div>
      </section>

      {/* Profile Card */}
      <section className="container-custom mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass border border-cyan-500/10 p-8"
          style={{ clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))' }}
        >
          <div className="flex flex-col md:flex-row gap-8">
            {/* 头像 */}
            <div className="flex-shrink-0">
              <div className="w-40 h-40 mx-auto md:mx-0 relative">
                <div className="absolute inset-0 border-2 border-cyan-400/20 rotate-45" />
                <div className="absolute inset-4 border border-cyan-400/10 rotate-45" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">👨‍💻</span>
                </div>
              </div>
            </div>

            {/* 信息 */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">你的名字</h2>
              <p className="text-cyan-400 font-mono text-sm mb-6">FULL_STACK.DEVELOPER // TECH.WRITER</p>

              <div className="flex flex-wrap gap-4 mb-6 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-500/60" />
                  中国
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-500/60" />
                  2020 开始编程
                </span>
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-cyan-500/60" />
                  自由职业者
                </span>
              </div>

              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  我是一名热爱技术的开发者，对编程充满热情。从2020年开始接触编程，
                  一路走来，我不断学习新技术，探索编程的无限可能。
                </p>
                <p>
                  我相信技术是解构世界的工具，代码是构建未来的语言。
                  在这个网站上，我记录我的技术旅程、分享项目经验，以及一些关于技术与世界的思考。
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Skills Matrix */}
      <section className="skills-section container-custom mb-20">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/20" />
          <h2 className="text-xs tracking-[0.3em] text-cyan-400/60 font-mono">SKILL.MATRIX</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillMatrix.map((skill) => {
            const Icon = skill.icon
            const colorMap: Record<string, { accent: string; border: string; bg: string }> = {
              cyan: { accent: 'text-cyan-400', border: 'border-cyan-500/20', bg: 'bg-cyan-500/10' },
              violet: { accent: 'text-violet-400', border: 'border-violet-500/20', bg: 'bg-violet-500/10' },
              emerald: { accent: 'text-emerald-400', border: 'border-emerald-500/20', bg: 'bg-emerald-500/10' },
            }
            const c = colorMap[skill.color] || colorMap.cyan

            return (
              <div key={skill.category} className="skill-card card-cyber">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 ${c.border} border ${c.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${c.accent}`} />
                  </div>
                  <span className="text-[10px] tracking-[0.2em] text-cyan-400/60 font-mono">{skill.category}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span key={item} className="text-xs px-3 py-1.5 bg-white/5 text-slate-300 border border-white/5 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section container-custom mb-20">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/20" />
          <h2 className="text-xs tracking-[0.3em] text-cyan-400/60 font-mono">TIMELINE</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/20" />
        </div>

        <div className="max-w-2xl mx-auto">
          {timeline.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={item.year} className="timeline-item relative pl-10 pb-12 last:pb-0">
                {/* 连接线 */}
                {index < timeline.length - 1 && (
                  <div className="absolute left-[14px] top-10 bottom-0 w-px bg-gradient-to-b from-cyan-500/30 to-transparent" />
                )}

                {/* 节点 */}
                <div className="absolute left-0 top-2 w-[30px] h-[30px] border border-cyan-500/30 bg-[#0a1628] flex items-center justify-center rotate-45">
                  <Icon className="w-3.5 h-3.5 text-cyan-400 -rotate-45" />
                </div>

                {/* 内容 */}
                <div className="glass border border-cyan-500/10 p-5 ml-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-cyan-400">{item.year}</span>
                    <span className={`text-[10px] font-mono tracking-wider px-2 py-0.5 ${
                      item.status === 'ACTIVE'
                        ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                        : 'text-slate-500 bg-white/5 border border-white/5'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Interests */}
      <section className="container-custom">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/20" />
          <h2 className="text-xs tracking-[0.3em] text-cyan-400/60 font-mono">INTERESTS</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/20" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          {interests.map((interest, i) => (
            <motion.div
              key={interest}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="px-5 py-2.5 border border-cyan-500/15 bg-cyan-500/5 text-cyan-300 text-sm hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all cursor-default"
            >
              {interest}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}