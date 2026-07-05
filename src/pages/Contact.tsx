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
    <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
      <div className="container-custom" style={{ padding: '10vh var(--pad-x) 80px calc(var(--rail-x) + 48px)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '60px' }}>
          <div style={{
            fontFamily: 'var(--serif)', fontWeight: 600,
            fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: .95,
            color: 'var(--ink)', marginBottom: '12px',
          }}>
            联系
          </div>
          <p style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>如果你有任何想法，欢迎和我聊聊</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
          {/* 表单 */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageCircle className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: '13px', color: 'var(--ink-muted)', letterSpacing: '.06em' }}>给我留言</span>
            </div>

            {sent ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <CheckCircle className="w-10 h-10 mx-auto mb-4" style={{ color: '#34d399' }} />
                <p style={{ color: 'var(--ink)', marginBottom: '4px' }}>消息已发送</p>
                <p style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>谢谢你的留言，我会尽快回复</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'var(--ink-muted)', marginBottom: '8px', letterSpacing: '.08em', textTransform: 'uppercase' }}>名字</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="你的名字"
                      style={{ width: '100%', padding: '12px 16px', background: 'transparent', border: '1px solid var(--line)', color: 'var(--ink)', fontSize: '14px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'var(--ink-muted)', marginBottom: '8px', letterSpacing: '.08em', textTransform: 'uppercase' }}>邮箱</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="your@email.com"
                      style={{ width: '100%', padding: '12px 16px', background: 'transparent', border: '1px solid var(--line)', color: 'var(--ink)', fontSize: '14px', outline: 'none' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--ink-muted)', marginBottom: '8px', letterSpacing: '.08em', textTransform: 'uppercase' }}>想说的话</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} placeholder="任何想法都可以..."
                    style={{ width: '100%', padding: '12px 16px', background: 'transparent', border: '1px solid var(--line)', color: 'var(--ink)', fontSize: '14px', outline: 'none', resize: 'none', fontFamily: 'inherit' }} />
                </div>
                <button type="submit" disabled={sending} className="btn btn--ghost" style={{ justifyContent: 'center', opacity: sending ? .5 : 1 }}>
                  {sending ? <><div style={{ width: 16, height: 16, border: '2px solid var(--line)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /> 发送中...</> : <><Send className="w-4 h-4" /> 发送 <span className="arr">→</span></>}
                </button>
              </form>
            )}
          </motion.div>

          {/* 联系方式 */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ fontSize: '11px', color: 'var(--ink-muted)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '4px' }}>其他联系方式</div>
            {channels.map((ch) => {
              const Icon = ch.icon
              return (
                <a key={ch.label} href={ch.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '14px 0', borderBottom: '1px solid var(--line)',
                    transition: 'padding-left .3s var(--ease)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = '8px')}
                  onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = '0')}
                >
                  <div style={{ width: 36, height: 36, border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--ink-muted)', letterSpacing: '.06em', textTransform: 'uppercase' }}>{ch.label}</div>
                    <div style={{ fontSize: '15px', color: 'var(--ink)' }}>{ch.value}</div>
                  </div>
                </a>
              )
            })}

            <div style={{ marginTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--ink-muted)', marginBottom: '8px' }}>
                <MapPin className="w-3.5 h-3.5" /> 中国
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--ink-muted)' }}>
                <Clock className="w-3.5 h-3.5" /> 通常 24 小时内回复
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}