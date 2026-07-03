import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, MapPin, Clock, CheckCircle, MessageCircle } from 'lucide-react'
import { GithubIcon, TwitterIcon, BilibiliIcon } from '../components/Icons'

const channels = [
  { icon: Mail, label: '邮箱', value: 'your@email.com', href: 'mailto:your@email.com' },
  { icon: GithubIcon, label: 'GitHub', value: 'github.com/you', href: 'https://github.com' },
  { icon: BilibiliIcon, label: '哔哩哔哩', value: 'bilibili.com/you', href: 'https://bilibili.com' },
  { icon: TwitterIcon, label: 'Twitter', value: '@you', href: 'https://twitter.com' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSending(false)
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-light text-white/90 mb-3">
            <span className="gradient-text font-medium">联系</span>
          </h1>
          <p className="text-stone-500">如果你有任何想法，欢迎和我聊聊</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 表单 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card">
              <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="w-4 h-4 text-sky-400" />
                <span className="text-sm text-stone-400">给我留言</span>
              </div>

              {sent ? (
                <div className="text-center py-16">
                  <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
                  <p className="text-white/90 mb-1">消息已发送</p>
                  <p className="text-sm text-stone-500">谢谢你的留言，我会尽快回复</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-stone-500 mb-2">名字</label>
                      <input
                        type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                        placeholder="你的名字"
                        className="w-full px-4 py-3 rounded-xl bg-[#0c1222] border border-white/5 text-white placeholder-stone-600 text-sm focus:outline-none focus:border-sky-500/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-500 mb-2">邮箱</label>
                      <input
                        type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#0c1222] border border-white/5 text-white placeholder-stone-600 text-sm focus:outline-none focus:border-sky-500/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-stone-500 mb-2">想说的话</label>
                    <textarea
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5}
                      placeholder="任何想法都可以..."
                      className="w-full px-4 py-3 rounded-xl bg-[#0c1222] border border-white/5 text-white placeholder-stone-600 text-sm focus:outline-none focus:border-sky-500/30 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit" disabled={sending}
                    className="btn-primary w-full justify-center disabled:opacity-50"
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        发送中...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        发送
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* 联系方式 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="card">
              <span className="text-xs text-stone-500 mb-4 block">其他联系方式</span>
              <div className="space-y-3">
                {channels.map((ch) => {
                  const Icon = ch.icon
                  return (
                    <a
                      key={ch.label}
                      href={ch.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-sky-500/5 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/15 flex items-center justify-center group-hover:border-sky-500/30 transition-colors">
                        <Icon className="w-4 h-4 text-sky-400" />
                      </div>
                      <div>
                        <div className="text-xs text-stone-500">{ch.label}</div>
                        <div className="text-sm text-stone-300">{ch.value}</div>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="card">
              <div className="space-y-3 text-sm text-stone-400">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-sky-500/60" />
                  <span>中国</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-sky-500/60" />
                  <span>通常 24 小时内回复</span>
                </div>
              </div>
            </div>

            <div className="card">
              <span className="text-xs text-stone-500 mb-3 block">欢迎聊的话题</span>
              <div className="space-y-2 text-sm text-stone-400">
                {['写作与创作', 'AI 与技术', '读书与思考', '合作与交流'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-sky-400" />
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