import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { GithubIcon } from './Icons'

const links = [
  { path: '/', label: '首页' },
  { path: '/about', label: '关于' },
  { path: '/blog', label: '文章' },
  { path: '/contact', label: '联系' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <div className="rail"><i /><i /><i /></div>
      <div className="cross cross--tr" />
      <div className="cross cross--bl" />
      <div className="cross cross--br" />

      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav__brand">解构世界</Link>

        <div className="nav__links hidden md:flex">
          {links.map((l) => (
            <Link key={l.path} to={l.path} className={`nav__link ${pathname === l.path ? 'active' : ''}`}>
              {l.label}
            </Link>
          ))}
          <span className="nav__sep">·</span>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="nav__link">
            <GithubIcon className="w-3.5 h-3.5" />
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: 'var(--ink-muted)' }}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            style={{
              position: 'fixed', top: 'var(--nav-h)', left: 0, right: 0, zIndex: 40,
              background: 'rgba(26, 26, 46, 0.97)', backdropFilter: 'blur(16px)',
              borderBottom: '1px solid var(--line)',
            }}
          >
            {links.map((l) => (
              <Link key={l.path} to={l.path}
                style={{
                  display: 'block', padding: '14px var(--pad)',
                  color: pathname === l.path ? 'var(--ink)' : 'var(--ink-muted)',
                  fontSize: '13px', letterSpacing: '0.06em',
                  borderBottom: '1px solid var(--line)',
                }}>
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}