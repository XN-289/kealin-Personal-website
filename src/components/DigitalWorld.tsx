import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export default function DigitalWorld() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    const particleCount = 80
    const mouseRadius = 150

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const init = () => {
      particles = Array.from({ length: particleCount }, () => {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        return {
          x, y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.25 + 0.08,
        }
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const mouseActive = mouseRef.current.active

      // 绘制连线
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            const opacity = (1 - dist / 100) * 0.05
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(212, 165, 116, ${opacity})`
            ctx.lineWidth = 0.4
            ctx.stroke()
          }
        }
      }

      // 更新和绘制粒子
      particles.forEach((p) => {
        // 鼠标交互：推开粒子
        if (mouseActive) {
          const dx = p.x - mx
          const dy = p.y - my
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < mouseRadius) {
            // 在鼠标范围内：推开
            const force = (mouseRadius - dist) / mouseRadius
            const angle = Math.atan2(dy, dx)
            p.x += Math.cos(angle) * force * 3
            p.y += Math.sin(angle) * force * 3
          } else {
            // 鼠标范围外：缓慢回到原位
            p.x += (p.baseX - p.x) * 0.01
            p.y += (p.baseY - p.y) * 0.01
          }
        } else {
          // 鼠标不在：缓慢回到原位
          p.x += (p.baseX - p.x) * 0.005
          p.y += (p.baseY - p.y) * 0.005
        }

        // 自然漂浮
        p.x += p.vx
        p.y += p.vy
        p.baseX += p.vx * 0.5
        p.baseY += p.vy * 0.5

        // 轻微的上下浮动
        p.y += Math.sin(Date.now() * 0.0008 + p.baseX * 0.01) * 0.15

        // 边界循环
        if (p.baseX < -20) p.baseX = canvas.width + 20
        if (p.baseX > canvas.width + 20) p.baseX = -20
        if (p.baseY < -20) p.baseY = canvas.height + 20
        if (p.baseY > canvas.height + 20) p.baseY = -20

        // 鼠标附近的粒子更亮
        let currentOpacity = p.opacity
        if (mouseActive) {
          const distToMouse = Math.sqrt((p.x - mx) ** 2 + (p.y - my) ** 2)
          if (distToMouse < mouseRadius * 1.5) {
            currentOpacity = p.opacity + (1 - distToMouse / (mouseRadius * 1.5)) * 0.3
          }
        }

        // 绘制柔和光点
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4)
        gradient.addColorStop(0, `rgba(212, 165, 116, ${currentOpacity})`)
        gradient.addColorStop(1, 'rgba(212, 165, 116, 0)')
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // 核心
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 237, 213, ${currentOpacity * 1.2})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    resize()
    init()
    animate()

    window.addEventListener('resize', () => { resize(); init() })
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}