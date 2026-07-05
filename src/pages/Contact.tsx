import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, MapPin, Clock, CheckCircle, MessageCircle } from 'lucide-react'
import { GithubIcon, TwitterIcon, BilibiliIcon } from '../components/Icons'

const ease = [0.22, 0.61, 0.36, 1] as const
const fadeUp = (delay = 0) => ({
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
    await new Promise((r) => setTimeout(r, 1200))
    setSending(false); setSent(true); setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
      <div className="wrap" style={{ padding: '10vh var(--pad) var(--sp-9) calc(var(--rail) + 40px)' }}>
        {/* 标题 */}
        <motion.div {...fadeUp()} style={{ marginBottom: 'var(--sp-8)' }}>
          <div className="page-title" style={{ marginBottom: 'var(--sp-3)' }}>联系</div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-muted)' }}>如果你有任何想法，欢迎和我聊聊</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--sp-7)' }}>
          {/* 表单 */}
          <motion.div {...fadeUp(0.1)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', marginBottom: 'var(--sp-5)' }}>
              <MessageCircle size={14} style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>给我留言</span>
            </div>

            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease }}
                style={{ textAlign: 'center', padding: 'var(--sp-7) 0' }}>
                <CheckCircle size={32} style={{ color: '#34d399', margin: '0 auto var(--sp-3)' }} />
                <p style={{ marginBottom: 'var(--sp-1)' }}>消息已发送</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-muted)' }}>谢谢，我会尽快回复</p>
              </motion.div>
            ) : (
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-3)' }}>
                  <Field label="名字" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="你的名字" type="text" />
                  <Field label="邮箱" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="your@email.com" type="email" />
                </div>
                <Field label="想说的话" value={form.message} onChange={(v) => setForm({ ...form, message: v })} placeholder="任何想法都可以..." textarea />
                <button type="submit" disabled={sending} className="btn" style={{ justifyContent: 'center', opacity: sending ? 0.5 : 1 }}>
                  {sending ? <span>发送中...</span> : <><Send size={14} /><span>发送</span><span className="arr">→</span></>}
                </button>
              </form>
            )}
          </motion.div>

          {/* 联系方式 */}
          <motion.div {...fadeUp(0.2)} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>其他联系方式</div>
            {channels.map((ch) => {
              const Icon = ch.icon
              return (
                <a key={ch.label} href={ch.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 'var(--sp-4)',
                    padding: 'var(--sp-3) 0', borderBottom: '1px solid var(--line)',
                    transition: 'padding-left var(--dur) var(--ease)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = 'var(--sp-2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = '0')}
                >
                  <div style={{ width: 32, height: 32, border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{ch.label}</div>
                    <div style={{ fontSize: 'var(--text-sm)' }}>{ch.value}</div>
                  </div>
                </a>
              )
            })}
            <div style={{ marginTop: 'var(--sp-2)', fontSize: 'var(--text-sm)', color: 'var(--ink-muted)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}><MapPin size={14} /> 中国</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}><Clock size={14} /> 通常 24 小时内回复</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type, textarea }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string; textarea?: boolean
}) {
  const style = { marginBottom: 0 }
  return (
    <div style={style}>
      <label style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', marginBottom: 'var(--sp-1)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} required rows={5} placeholder={placeholder}
          style={{ resize: 'none', fontFamily: 'inherit' }} />
      ) : (
        <input type={type || 'text'} value={value} onChange={(e) => onChange(e.target.value)} required placeholder={placeholder} />
      )}
    </div>
  )
}