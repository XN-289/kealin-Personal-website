import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Terminal, Home, User, BookOpen, FolderOpen, Mail } from 'lucide-react'

const navItems = [
  { path: '/', label: 'HOME', icon: Home },
  { path: '/about', label: 'ABOUT', icon: User },
  { path: '/blog', label: 'BLOG', icon: BookOpen },
  { path: '/projects', label: 'PROJECTS', icon: FolderOpen },
  { path: '/contact', label: 'CONTACT', icon: Mail },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3'
          : 'py-5'
      }`}
    >
      <div className="container-custom">
        <div className={`flex items-center justify-between px-6 py-3 rounded-none transition-all duration-500 ${
          scrolled
            ? 'glass border border-cyan-500/10'
            : 'bg-transparent'
        }`}
        style={scrolled ? {
          clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
        } : {}}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-9 h-9 border border-cyan-400/40 flex items-center justify-center rotate-45 group-hover:border-cyan-400/80 transition-colors">
                <Terminal className="w-4 h-4 text-cyan-400 -rotate-45" />
              </div>
              <div className="absolute -inset-1 bg-cyan-400/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-bold tracking-widest text-cyan-300">DIGITAL</span>
              <span className="text-[10px] tracking-[0.3em] text-cyan-500/60">ARCHITECT</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 text-xs tracking-widest font-medium transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'text-cyan-300'
                      : 'text-slate-500 hover:text-cyan-400'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Status indicator */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] tracking-wider text-emerald-400/70 uppercase">Online</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-cyan-500/10 mt-2"
          >
            <div className="container-custom py-4">
              {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 mb-1 transition-all ${
                        isActive
                          ? 'text-cyan-300 bg-cyan-500/10'
                          : 'text-slate-500 hover:text-cyan-400 hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm tracking-widest font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}