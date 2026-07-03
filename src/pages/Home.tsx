import { motion } from 'framer-motion'
import { ArrowDown, BookOpen, Zap, Code2, Rocket, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GithubIcon } from '../components/Icons'
import ParticleBackground from '../components/ParticleBackground'

const highlights = [
  {
    icon: Code2,
    title: '技术探索',
    description: '深入学习前沿技术，探索编程的无限可能',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: BookOpen,
    title: '知识分享',
    description: '通过博客分享技术见解和学习心得',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Rocket,
    title: '项目实践',
    description: '将想法转化为实际项目，不断挑战自我',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Star,
    title: '持续成长',
    description: '保持好奇心，在技术道路上不断前进',
    color: 'from-green-500 to-emerald-500',
  },
]

const stats = [
  { value: '50+', label: '技术文章' },
  { value: '20+', label: '开源项目' },
  { value: '1000+', label: '代码提交' },
  { value: '3+', label: '年经验' },
]

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 粒子背景 */}
        <ParticleBackground />

        {/* 装饰性光晕 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* 内容 */}
        <div className="relative z-10 container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 头像占位 */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1"
            >
              <div className="w-full h-full rounded-full bg-[#0a0e1a] flex items-center justify-center">
                <span className="text-5xl">👨‍💻</span>
              </div>
            </motion.div>

            {/* 标题 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="text-white">你好，我是</span>
              <br />
              <span className="gradient-text-animated text-5xl md:text-7xl lg:text-8xl">
                技术探索者
              </span>
            </motion.h1>

            {/* 副标题 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              热爱技术的极客 | 终身学习者 | 开源贡献者
            </motion.p>

            {/* 打字机效果描述 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg text-gray-500 mb-12 max-w-xl mx-auto"
            >
              <p>在这里，我分享技术见解、项目经验和学习心得</p>
              <p className="mt-2">让我们一起探索技术的无限可能 ✨</p>
            </motion.div>

            {/* CTA按钮 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/blog" className="btn-primary flex items-center justify-center gap-2">
                <BookOpen className="w-5 h-5" />
                阅读博客
              </Link>
              <Link to="/projects" className="btn-outline flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                查看项目
              </Link>
            </motion.div>

            {/* GitHub链接 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-8"
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
              >
                <GithubIcon className="w-5 h-5" />
                <span>在 GitHub 上关注我</span>
              </a>
            </motion.div>
          </motion.div>

          {/* 滚动提示 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-gray-500"
            >
              <span className="text-sm">向下滚动</span>
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="relative py-24 md:py-32">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              我的<span className="gradient-text">技术旅程</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              探索、学习、创造 - 这是我对技术的热爱
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="card group"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts Preview */}
      <section className="relative py-24 md:py-32">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              最新<span className="gradient-text">文章</span>
            </h2>
            <p className="text-gray-400 text-lg">
              分享我的技术见解和学习心得
            </p>
          </motion.div>

          {/* 博客文章占位 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="card group cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-blue-400" />
                </div>
                <div className="flex gap-2 mb-3">
                  <span className="tag text-xs">技术</span>
                  <span className="tag text-xs">教程</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  文章标题 {i}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  这里是文章的简短描述，点击阅读更多...
                </p>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>2024-01-{10 + i}</span>
                  <span>5 分钟阅读</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/blog" className="btn-outline">
              查看所有文章 →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}