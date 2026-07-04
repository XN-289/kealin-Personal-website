import { Link } from 'react-router-dom'
import { Heart, Pen } from 'lucide-react'
import { GithubIcon, BilibiliIcon, TwitterIcon } from './Icons'

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com', label: 'GitHub' },
  { icon: BilibiliIcon, href: 'https://bilibili.com', label: 'Bilibili' },
  { icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* 品牌 */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Pen className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-sm font-medium text-amber-200/80">解构世界</span>
            </Link>
            <p className="text-sm text-stone-500 leading-relaxed mb-4">
              用文字记录思考，用技术辅助表达。
              <br />
              在这个数字花园里，种下对世界的观察。
            </p>
            <div className="flex gap-2">
              {socialLinks.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-stone-500 hover:text-amber-400 hover:border-amber-500/20 transition-all"
                    aria-label={s.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* 导航 */}
          <div>
            <h3 className="text-sm text-stone-400 mb-4">导航</h3>
            <ul className="space-y-2.5">
              {[
                { label: '首页', path: '/' },
                { label: '关于我', path: '/about' },
                { label: '文章', path: '/blog' },
                { label: '联系', path: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-stone-500 hover:text-amber-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 引言 */}
          <div>
            <h3 className="text-sm text-stone-400 mb-4">写给我自己</h3>
            <blockquote className="text-sm text-stone-500 leading-relaxed italic">
              「世界是一个巨大的文本，
              <br />
              而我试图读懂它。
              <br />
              每一篇文章，都是一次尝试。」
            </blockquote>
          </div>
        </div>

        {/* 底部 */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-600">
            © {new Date().getFullYear()} 解构世界
          </p>
          <p className="text-xs text-stone-600 flex items-center gap-1">
            用 <Heart className="w-3 h-3 text-amber-500 fill-amber-500" /> 和 React 构建
          </p>
        </div>
      </div>
    </footer>
  )
}