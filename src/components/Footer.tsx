import { Link } from 'react-router-dom'
import { GithubIcon, BilibiliIcon, TwitterIcon } from './Icons'

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com', label: 'GitHub' },
  { icon: BilibiliIcon, href: 'https://bilibili.com', label: 'Bilibili' },
  { icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
]

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)' }}>
      <div className="container-custom" style={{ padding: '48px var(--pad-x)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
        }}>
          {/* 品牌 */}
          <div>
            <Link to="/" style={{
              fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 600,
              color: 'var(--ink)', display: 'block', marginBottom: '12px',
            }}>
              解构世界
            </Link>
            <p style={{ fontSize: '13px', color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: '16px' }}>
              用文字记录思考，用技术辅助表达。
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {socialLinks.map((s) => {
                const Icon = s.icon
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    style={{
                      width: 32, height: 32, border: '1px solid var(--line)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--ink-muted)', transition: 'color .25s, border-color .25s',
                    }}>
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* 导航 */}
          <div>
            <div style={{ fontSize: '11px', color: 'var(--ink-muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '16px' }}>导航</div>
            {[
              { label: '首页', path: '/' },
              { label: '关于我', path: '/about' },
              { label: '文章', path: '/blog' },
              { label: '联系', path: '/contact' },
            ].map((link) => (
              <Link key={link.label} to={link.path}
                style={{
                  display: 'block', fontSize: '14px', color: 'var(--ink-muted)',
                  padding: '4px 0', transition: 'color .25s',
                }}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* 引言 */}
          <div>
            <div style={{ fontSize: '11px', color: 'var(--ink-muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '16px' }}>写给我自己</div>
            <blockquote style={{
              fontFamily: 'var(--serif)', fontSize: '14px',
              color: 'var(--ink-muted)', lineHeight: 1.8, fontStyle: 'italic',
            }}>
              「世界是一个巨大的文本，
              <br />
              而我试图读懂它。
              <br />
              每一篇文章，都是一次尝试。」
            </blockquote>
          </div>
        </div>

        {/* 底部 */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--line)',
          fontSize: '12px', color: 'var(--ink-muted)',
        }}>
          <span>© {new Date().getFullYear()} 解构世界</span>
          <span>用 ❤️ 和 React 构建</span>
        </div>
      </div>
    </footer>
  )
}