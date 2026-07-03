import { Link } from 'react-router-dom'
import { Terminal, Mail, Heart, ArrowUpRight } from 'lucide-react'
import { GithubIcon, TwitterIcon, BilibiliIcon } from './Icons'

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com', label: 'GitHub' },
  { icon: BilibiliIcon, href: 'https://bilibili.com', label: 'Bilibili' },
  { icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:your@email.com', label: 'Email' },
]

const footerLinks: Array<{
  title: string
  links: Array<{ label: string; path: string } | { label: string; href: string }>
}> = [
  {
    title: 'NAVIGATE',
    links: [
      { label: '首页', path: '/' },
      { label: '关于我', path: '/about' },
      { label: '博客', path: '/blog' },
      { label: '作品集', path: '/projects' },
    ],
  },
  {
    title: 'CONNECT',
    links: [
      { label: 'GitHub', href: 'https://github.com' },
      { label: '哔哩哔哩', href: 'https://bilibili.com' },
      { label: '抖音', href: 'https://douyin.com' },
      { label: '联系我', path: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-cyan-500/10">
      {/* 背景网格 */}
      <div className="absolute inset-0 bg-grid-cyan opacity-30" />

      <div className="relative container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* 品牌 */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-9 h-9 border border-cyan-400/40 flex items-center justify-center rotate-45 group-hover:border-cyan-400/80 transition-colors">
                <Terminal className="w-4 h-4 text-cyan-400 -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-widest text-cyan-300">DIGITAL</span>
                <span className="text-[10px] tracking-[0.3em] text-cyan-500/60">ARCHITECT</span>
              </div>
            </Link>
            <p className="text-slate-400 mb-6 max-w-md text-sm leading-relaxed">
              热爱技术的极客，专注于用代码解构世界、用技术构建未来。
              在这里，我记录我的探索旅程和思考。
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-cyan-500/20 flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-500/5 transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* 链接 */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-[10px] tracking-[0.2em] text-cyan-400/60 font-mono mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {'path' in link ? (
                      <Link
                        to={link.path}
                        className="text-sm text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1 group"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1 group"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 底部 */}
        <div className="mt-16 pt-8 border-t border-cyan-500/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-600 font-mono">
              © {new Date().getFullYear()} DIGITAL_ARCHITECT // ALL.RIGHTS.RESERVED
            </p>
            <p className="text-xs text-slate-600 flex items-center gap-1">
              CRAFTED.WITH <Heart className="w-3 h-3 text-cyan-500 fill-cyan-500" /> USING REACT & TAILWIND
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}