import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Star, FolderOpen } from 'lucide-react'
import { GithubIcon } from '../components/Icons'
import { loadProjects, type Project } from '../utils/content'

const categories = ['全部', '全栈', 'AI', '工具', '可视化']

export default function Projects() {
  const [cat, setCat] = useState('全部')
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProjects().then((data) => {
      setProjects(data)
      setLoading(false)
    })
  }, [])

  const filtered = cat === '全部' ? projects : projects.filter((p) => p.category === cat)

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-light text-white/90 mb-3">
            <span className="gradient-text font-medium">项目</span>
          </h1>
          <p className="text-stone-500">用技术实现想法，用产品解决问题</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                cat === c
                  ? 'bg-sky-500/15 text-sky-300 border border-sky-500/25'
                  : 'text-stone-500 border border-white/5 hover:border-sky-500/15 hover:text-sky-400'
              }`}
            >
              {c}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-6 h-6 border-2 border-sky-500/30 border-t-sky-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-stone-500 text-sm">加载中...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <FolderOpen className="w-10 h-10 text-stone-700 mx-auto mb-4" />
            <p className="text-stone-500">还没有项目</p>
            <p className="text-stone-600 text-sm mt-2">在 content/projects/ 文件夹中添加 .md 文件即可</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="card group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-white/90 group-hover:text-sky-300 transition-colors mb-1">
                      {project.title}
                    </h3>
                    <span className="text-xs text-sky-400/60">{project.category}</span>
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="text-stone-500 hover:text-sky-400 transition-colors">
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                        className="text-stone-500 hover:text-sky-400 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm text-stone-400 mb-4">{project.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-sky-500/5 text-sky-300/60 border border-sky-500/10">
                        {t}
                      </span>
                    ))}
                  </div>
                  {project.stars !== undefined && (
                    <div className="flex items-center gap-3 text-xs text-stone-600">
                      <span className="flex items-center gap-1"><Star className="w-3 h-3" />{project.stars}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}