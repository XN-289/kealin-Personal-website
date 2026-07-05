import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, MapPin, Clock, CheckCircle, MessageCircle } from 'lucide-react'
import { GithubIcon, TwitterIcon, BilibiliIcon } from '../components/Icons'

const ease = [0.22, 0.61, 0.36, 1] as const
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease },
})

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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setSending(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSending(false); setSent(true); setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
      <div className="wrap" style={{ padding: '10vh var(--pad) var(--sp-9) calc(var(--rail) + 40px)' }}>
        <motion.div {...fade()} style={{ marginBottom: 'var(--sp-8)' }}>
          <div style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: 'clamp(48px, 8vw, 88px)', lineHeight: 0.95, marginBottom: '10px' }}>联系</div>
          <p style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>如果你有任何想法，欢迎和我聊聊</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px' }}>
          <motion.div {...fade(0.1)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <MessageCircle size={14} style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: '12px', color: 'var(--ink-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>给我留言</span>
            </div>

            {sent ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <CheckCircle size={32} style={{ color: '#34d399', margin: '0 auto 12px' }} />
                <p style={{ marginBottom: '4px' }}>消息已发送</p>
                <p style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>谢谢，我会尽快回复</p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'var(--ink-muted)', marginBottom: '6px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>名字</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="你的名字" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'var(--ink-muted)', marginBottom: '6px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>邮箱</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--ink-muted)', marginBottom: '6px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>想说的话</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} placeholder="任何想法都可以..."
                    style={{ resize: 'none', fontFamily: 'inherit' }} />
                </div>
                <button type="submit" disabled={sending} className="btn" style={{ justifyContent: 'center', opacity: sending ? 0.5 : 1 }}>
                  {sending ? <span>发送中...</span> : <><Send size={14} /><span>发送</span><span className="arr">→</span></>}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div {...fade(0.2)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '11px', color: 'var(--ink-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>其他联系方式</div>
            {channels.map((ch) => {
              const Icon = ch.icon
              return (
                <a key={ch.label} href={ch.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '12px 0', borderBottom: '1px solid var(--line)',
                    transition: 'padding-left var(--duration) var(--ease)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = '8px')}
                  onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = '0')}
                >
                  <div style={{ width: 32, height: 32, border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--ink-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{ch.label}</div>
                    <div style={{ fontSize: '14px' }}>{ch.value}</div>
                  </div>
                </a>
              )
            })}
            <div style={{ marginTop: '8px', fontSize: '13px', color: 'var(--ink-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={14} /> 中国</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={14} /> 通常 24 小时内回复</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}