import { motion } from 'framer-motion'
import { Calendar, MapPin, GraduationCap, Briefcase, Code2, Database, Globe, Server, Smartphone, GitBranch, Palette, Terminal } from 'lucide-react'

const timeline = [
  {
    year: '2024 - 至今',
    title: '持续学习与创新',
    description: '探索前沿技术，参与开源项目，分享技术知识',
    icon: Code2,
  },
  {
    year: '2022 - 2024',
    title: '技术深耕期',
    description: '深入学习全栈开发，掌握多种技术栈',
    icon: GraduationCap,
  },
  {
    year: '2020 - 2022',
    title: '编程入门',
    description: '开始学习编程，探索计算机科学的奥秘',
    icon: Terminal,
  },
]

const skills = [
  {
    category: '前端开发',
    icon: Globe,
    items: ['React', 'Vue', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    category: '后端开发',
    icon: Server,
    items: ['Node.js', 'Python', 'Java', 'Go', 'Express'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    category: '数据库',
    icon: Database,
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    category: '移动开发',
    icon: Smartphone,
    items: ['React Native', 'Flutter', 'iOS', 'Android', '小程序'],
    color: 'from-orange-500 to-red-500',
  },
  {
    category: 'DevOps',
    icon: GitBranch,
    items: ['Docker', 'K8s', 'CI/CD', 'AWS', 'Linux'],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    category: '设计工具',
    icon: Palette,
    items: ['Figma', 'Photoshop', 'Illustrator', 'Sketch', 'XD'],
    color: 'from-pink-500 to-rose-500',
  },
]

const interests = [
  '开源项目贡献',
  '技术博客写作',
  '参加技术会议',
  '学习新语言',
  '阅读技术书籍',
  '探索AI领域',
]

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              关于<span className="gradient-text">我</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              热爱技术，享受编程的乐趣
            </p>
          </motion.div>

          {/* 个人介绍卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="card">
              <div className="flex flex-col md:flex-row gap-8">
                {/* 头像 */}
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 mx-auto md:mx-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                    <div className="w-full h-full rounded-2xl bg-[#111827] flex items-center justify-center">
                      <span className="text-7xl">👨‍💻</span>
                    </div>
                  </div>
                </div>

                {/* 信息 */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">你的名字</h2>
                  <p className="text-blue-400 mb-4">全栈开发工程师 / 技术博主</p>

                  <div className="flex flex-wrap gap-4 mb-6 text-gray-400">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      中国
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      2020年开始编程
                    </span>
                    <span className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      自由职业者
                    </span>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6">
                    我是一名热爱技术的开发者，对编程充满热情。从2020年开始接触编程，
                    一路走来，我不断学习新技术，探索编程的无限可能。我喜欢通过博客分享
                    我的技术见解和学习心得，希望能帮助到更多的开发者。
                  </p>

                  <p className="text-gray-300 leading-relaxed">
                    除了编程，我还喜欢阅读、运动和探索新事物。我相信终身学习的力量，
                    保持好奇心是成长的关键。在这个网站上，我会记录我的技术旅程、
                    分享我的项目经验，以及一些生活中的思考。
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              技术<span className="gradient-text">栈</span>
            </h2>
            <p className="text-gray-400 text-lg">
              我掌握的技术和工具
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="card group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{skill.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span key={item} className="tag text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              我的<span className="gradient-text">旅程</span>
            </h2>
            <p className="text-gray-400 text-lg">
              从入门到深入的技术成长之路
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="relative pl-8 pb-12 last:pb-0"
                >
                  {/* 时间线 */}
                  {index < timeline.length - 1 && (
                    <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-transparent" />
                  )}

                  {/* 节点 */}
                  <div className="absolute left-0 top-2 w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>

                  {/* 内容 */}
                  <div className="card ml-4">
                    <span className="text-blue-400 text-sm font-medium">{item.year}</span>
                    <h3 className="text-xl font-semibold text-white mt-1 mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section className="relative py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              兴趣<span className="gradient-text">爱好</span>
            </h2>
            <p className="text-gray-400 text-lg">
              除了编程，我还喜欢...
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
            {interests.map((interest, index) => (
              <motion.div
                key={interest}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-300 hover:border-blue-500/40 hover:bg-blue-500/20 transition-all cursor-default"
              >
                {interest}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}