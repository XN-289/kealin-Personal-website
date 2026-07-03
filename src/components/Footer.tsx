import { Link } from 'react-router-dom'
import { Code2, Mail, Heart } from 'lucide-react'
import { GithubIcon, TwitterIcon, LinkedinIcon } from './Icons'

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com', label: 'GitHub' },
  { icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
  { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:your@email.com', label: 'Email' },
]

const footerLinks = [
  {
    title: '导航',
    links: [
      { label: '首页', path: '/' },
      { label: '关于我', path: '/about' },
      { label: '博客', path: '/blog' },
      { label: '作品集', path: '/projects' },
    ],
  },
  {
    title: '社交媒体',
    links: [
      { label: 'GitHub', href: 'https://github.com' },
      { label: '哔哩哔哩', href: 'https://bilibili.com' },
      { label: '抖音', href: 'https://douyin.com' },
      { label: 'Twitter', href: 'https://twitter.com' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0e1a] border-t border-white/5">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="relative container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* 品牌区域 */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">TechBlog</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              热爱技术的极客，专注于分享编程知识、技术见解和创新项目。
              在这里，我记录我的技术旅程和思考。
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
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* 链接区域 */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {'path' in link ? (
                      <Link
                        to={link.path}
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 底部版权 */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} TechBlog. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using React & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}