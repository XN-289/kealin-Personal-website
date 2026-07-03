import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, MessageSquare, MapPin, Clock, CheckCircle } from 'lucide-react'
import { GithubIcon, TwitterIcon, LinkedinIcon } from '../components/Icons'

const contactMethods = [
  { icon: Mail, label: 'EMAIL', value: 'your@email.com', href: 'mailto:your@email.com' },
  { icon: GithubIcon, label: 'GITHUB', value: 'github.com/you', href: 'https://github.com' },
  { icon: TwitterIcon, label: 'TWITTER', value: '@you', href: 'https://twitter.com' },
  { icon: LinkedinIcon, label: 'LINKEDIN', value: 'linkedin.com/in/you', href: 'https://linkedin.com' },
]

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-6 text-xs font-mono">
            <span className="text-cyan-500/40">HOME</span>
            <span className="text-cyan-500/20">/</span>
            <span className="text-cyan-400">CONTACT</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            建立<span className="gradient-text-cyan">连接</span>
          </h1>
          <p className="text-sm font-mono text-cyan-500/40">ESTABLISH.CONNECTION // OPEN.CHANNEL</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="glass border border-cyan-500/10 p-8"
              style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}
            >
              <div className="flex items-center gap-2 mb-8">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <span className="text-xs tracking-[0.2em] text-cyan-400/60 font-mono">SEND.MESSAGE</span>
              </div>

              {isSubmitted ? (
                <div className="text-center py-16">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">传输完成</h3>
                  <p className="text-sm text-slate-400 font-mono">MESSAGE.DELIVERED // EXPECT.REPLY.SOON</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] tracking-wider text-cyan-400/60 font-mono mb-2">NAME</label>
                      <input
                        type="text" name="name" value={formData.name} onChange={handleChange} required
                        placeholder="你的名字"
                        className="w-full px-4 py-3 bg-[#050a14] border border-cyan-500/15 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 transition-colors font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-wider text-cyan-400/60 font-mono mb-2">EMAIL</label>
                      <input
                        type="email" name="email" value={formData.email} onChange={handleChange} required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-[#050a14] border border-cyan-500/15 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-wider text-cyan-400/60 font-mono mb-2">SUBJECT</label>
                    <input
                      type="text" name="subject" value={formData.subject} onChange={handleChange} required
                      placeholder="消息主题"
                      className="w-full px-4 py-3 bg-[#050a14] border border-cyan-500/15 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-wider text-cyan-400/60 font-mono mb-2">MESSAGE</label>
                    <textarea
                      name="message" value={formData.message} onChange={handleChange} required rows={5}
                      placeholder="请输入你想说的话..."
                      className="w-full px-4 py-3 bg-[#050a14] border border-cyan-500/15 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 transition-colors resize-none font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-cyber w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                        <span className="font-mono">TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span className="font-mono">TRANSMIT</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Contact Methods */}
            <div className="glass border border-cyan-500/10 p-6"
              style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}
            >
              <span className="text-[10px] tracking-[0.2em] text-cyan-400/60 font-mono">CHANNELS</span>
              <div className="mt-4 space-y-3">
                {contactMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <a
                      key={method.label}
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 border border-transparent hover:border-cyan-500/15 hover:bg-cyan-500/5 transition-all group"
                    >
                      <div className="w-10 h-10 border border-cyan-500/20 bg-cyan-500/5 flex items-center justify-center group-hover:border-cyan-500/40 transition-colors">
                        <Icon className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <div className="text-[10px] tracking-wider text-cyan-500/50 font-mono">{method.label}</div>
                        <div className="text-sm text-slate-300">{method.value}</div>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Info */}
            <div className="glass border border-cyan-500/10 p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <MapPin className="w-4 h-4 text-cyan-500/60" />
                  <span>中国</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <Clock className="w-4 h-4 text-cyan-500/60" />
                  <span>通常 24 小时内回复</span>
                </div>
              </div>
            </div>

            {/* Collaboration */}
            <div className="glass border border-cyan-500/10 p-6"
              style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}
            >
              <span className="text-[10px] tracking-[0.2em] text-cyan-400/60 font-mono">COLLABORATION.OPTIONS</span>
              <div className="mt-4 space-y-2">
                {['开源项目协作', '技术文章撰写', '技术咨询与培训', '项目外包合作'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="w-1 h-1 rounded-full bg-cyan-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}