import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { GithubIcon } from './Icons'

const navItems = [
  { path: '/', label: '首页' },
  { path: '/about', label: '关于' },
  { path: '/blog', label: '文章' },
  { path: '/contact', label: '联系' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => { setIsOpen(false) }, [location])

  return (
    <>
      {/* 左侧脊柱线 */}
      <div className="rail"><i /><i /><i /></div>
      {/* 角落十字准星 */}
      <div className="cross cross--tr" />
      <div className="cross cross--bl" />
      <div className="cross cross--br" />

      {/* 导航 */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="nav"
      >
        <Link to="/" className="nav__brand">解构世界</Link>

        <div className="nav__links hidden md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'is-active' : ''}
            >
              {item.label}
            </Link>
          ))}
          <span className="nav__sep">|</span>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <GithubIcon className="w-3.5 h-3.5" />
          </a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden" style={{ color: 'var(--ink-muted)' }}>
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.nav>

      {/* Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'fixed', top: 'var(--nav-h)', left: 0, right: 0, zIndex: 40,
              background: 'rgba(26, 26, 46, 0.98)', backdropFilter: 'blur(12px)',
              borderBottom: '1px solid var(--line)',
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'block', padding: '16px var(--pad-x)',
                  color: location.pathname === item.path ? 'var(--ink)' : 'var(--ink-muted)',
                  fontSize: '13px', letterSpacing: '.06em',
                }}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}