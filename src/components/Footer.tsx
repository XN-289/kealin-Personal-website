import { Link } from 'react-router-dom'
import { GithubIcon, BilibiliIcon, TwitterIcon } from './Icons'

const socials = [
  { icon: GithubIcon, href: 'https://github.com', label: 'GitHub' },
  { icon: BilibiliIcon, href: 'https://bilibili.com', label: 'Bilibili' },
  { icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
]

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)' }}>
      <div className="wrap" style={{ padding: 'var(--sp-7) var(--pad)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '36px' }}>
          <div>
            <Link to="/" style={{ fontFamily: 'var(--serif)', fontSize: '16px', fontWeight: 600, display: 'block', marginBottom: '10px' }}>解构世界</Link>
            <p style={{ fontSize: '13px', color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: '14px' }}>用文字记录思考，用技术辅助表达。</p>
            <div style={{ display: 'flex', gap: '6px' }}>
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    style={{ width: 28, height: 28, border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-muted)', transition: 'color var(--duration)' }}>
                    <Icon className="w-3 h-3" />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>导航</div>
            {[{ label: '首页', path: '/' }, { label: '关于我', path: '/about' }, { label: '文章', path: '/blog' }, { label: '联系', path: '/contact' }].map((l) => (
              <Link key={l.label} to={l.path} style={{ display: 'block', fontSize: '13px', color: 'var(--ink-muted)', padding: '3px 0', transition: 'color var(--duration)' }}>{l.label}</Link>
            ))}
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>写给我自己</div>
            <blockquote style={{ fontFamily: 'var(--serif)', fontSize: '13px', color: 'var(--ink-muted)', lineHeight: 1.8, fontStyle: 'italic' }}>
              「世界是一个巨大的文本，而我试图读懂它。每一篇文章，都是一次尝试。」
            </blockquote>
          </div>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: '36px', paddingTop: '16px', borderTop: '1px solid var(--line)',
          fontSize: '11px', color: 'var(--ink-muted)',
        }}>
          <span>© {new Date().getFullYear()} 解构世界</span>
          <span>用 ❤️ 和 React 构建</span>
        </div>
      </div>
    </footer>
  )
}