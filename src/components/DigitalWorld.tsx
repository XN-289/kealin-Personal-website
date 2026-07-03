import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  size: number
  opacity: number
  type: 'dot' | 'ring' | 'square'
  color: string
}

interface FloatingShape {
  x: number
  y: number
  size: number
  rotation: number
  rotationSpeed: number
  type: 'hexagon' | 'triangle' | 'circle' | 'diamond'
  opacity: number
  floatOffset: number
}

const COLORS = [
  'rgba(6, 182, 212,',    // cyan
  'rgba(139, 92, 246,',   // violet
  'rgba(16, 185, 129,',   // emerald
  'rgba(34, 211, 238,',   // light cyan
]

export default function DigitalWorld() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animFrameRef = useRef<number>(0)

  const drawHexagon = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
    ctx.beginPath()
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + rotation
      const px = x + size * Math.cos(angle)
      const py = y + size * Math.sin(angle)
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.closePath()
  }, [])

  const drawTriangle = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
    ctx.beginPath()
    for (let i = 0; i < 3; i++) {
      const angle = (Math.PI * 2 / 3) * i + rotation - Math.PI / 2
      const px = x + size * Math.cos(angle)
      const py = y + size * Math.sin(angle)
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.closePath()
  }, [])

  const drawDiamond = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rotation)
    ctx.beginPath()
    ctx.moveTo(0, -size)
    ctx.lineTo(size * 0.6, 0)
    ctx.lineTo(0, size)
    ctx.lineTo(-size * 0.6, 0)
    ctx.closePath()
    ctx.restore()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let floatingShapes: FloatingShape[] = []
    const particleCount = 100
    const shapeCount = 12

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const initParticles = () => {
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        type: ['dot', 'ring', 'square'][Math.floor(Math.random() * 3)] as 'dot' | 'ring' | 'square',
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }))

      floatingShapes = Array.from({ length: shapeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 15,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.005,
        type: ['hexagon', 'triangle', 'circle', 'diamond'][Math.floor(Math.random() * 4)] as FloatingShape['type'],
        opacity: Math.random() * 0.15 + 0.05,
        floatOffset: Math.random() * Math.PI * 2,
      }))
    }

    const drawParticle = (p: Particle) => {
      const size = p.size * (1 + p.z * 0.3)
      const opacity = p.opacity * (0.5 + p.z * 0.2)

      if (p.type === 'dot') {
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color} ${opacity})`
        ctx.fill()
      } else if (p.type === 'ring') {
        ctx.beginPath()
        ctx.arc(p.x, p.y, size * 1.5, 0, Math.PI * 2)
        ctx.strokeStyle = `${p.color} ${opacity * 0.6})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      } else {
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(Date.now() * 0.001 + p.x)
        ctx.strokeStyle = `${p.color} ${opacity * 0.5})`
        ctx.lineWidth = 0.5
        ctx.strokeRect(-size, -size, size * 2, size * 2)
        ctx.restore()
      }
    }

    const drawShape = (shape: FloatingShape, time: number) => {
      const floatY = Math.sin(time * 0.001 + shape.floatOffset) * 10
      const x = shape.x
      const y = shape.y + floatY

      ctx.strokeStyle = `rgba(6, 182, 212, ${shape.opacity})`
      ctx.lineWidth = 0.8

      switch (shape.type) {
        case 'hexagon':
          drawHexagon(ctx, x, y, shape.size, shape.rotation)
          ctx.stroke()
          break
        case 'triangle':
          drawTriangle(ctx, x, y, shape.size, shape.rotation)
          ctx.stroke()
          break
        case 'circle':
          ctx.beginPath()
          ctx.arc(x, y, shape.size, 0, Math.PI * 2)
          ctx.stroke()
          // 内圈
          ctx.beginPath()
          ctx.arc(x, y, shape.size * 0.6, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(139, 92, 246, ${shape.opacity * 0.5})`
          ctx.stroke()
          break
        case 'diamond':
          drawDiamond(ctx, x, y, shape.size, shape.rotation)
          ctx.stroke()
          break
      }

      // 旋转
      shape.rotation += shape.rotationSpeed
    }

    const drawConnections = () => {
      const connectionDist = 150
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDist) {
            const opacity = (1 - dist / connectionDist) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`
            ctx.lineWidth = 0.3
            ctx.stroke()
          }
        }
      }
    }

    const drawMouseInfluence = () => {
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      if (mx === 0 && my === 0) return

      // 鼠标周围的光晕
      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 200)
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.05)')
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(mx - 200, my - 200, 400, 400)

      // 鼠标影响粒子
      particles.forEach(p => {
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          const force = (200 - dist) / 200 * 0.02
          p.vx += dx * force * 0.01
          p.vy += dy * force * 0.01
        }
      })
    }

    const drawGridOverlay = () => {
      // 十字准星
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const size = 30

      ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)'
      ctx.lineWidth = 0.5

      // 水平线
      ctx.beginPath()
      ctx.moveTo(cx - size, cy)
      ctx.lineTo(cx + size, cy)
      ctx.stroke()

      // 垂直线
      ctx.beginPath()
      ctx.moveTo(cx, cy - size)
      ctx.lineTo(cx, cy + size)
      ctx.stroke()

      // 角落标记
      const cornerSize = 20
      const margin = 40
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.06)'

      // 左上
      ctx.beginPath()
      ctx.moveTo(margin, margin + cornerSize)
      ctx.lineTo(margin, margin)
      ctx.lineTo(margin + cornerSize, margin)
      ctx.stroke()

      // 右上
      ctx.beginPath()
      ctx.moveTo(canvas.width - margin - cornerSize, margin)
      ctx.lineTo(canvas.width - margin, margin)
      ctx.lineTo(canvas.width - margin, margin + cornerSize)
      ctx.stroke()

      // 左下
      ctx.beginPath()
      ctx.moveTo(margin, canvas.height - margin - cornerSize)
      ctx.lineTo(margin, canvas.height - margin)
      ctx.lineTo(margin + cornerSize, canvas.height - margin)
      ctx.stroke()

      // 右下
      ctx.beginPath()
      ctx.moveTo(canvas.width - margin - cornerSize, canvas.height - margin)
      ctx.lineTo(canvas.width - margin, canvas.height - margin)
      ctx.lineTo(canvas.width - margin, canvas.height - margin - cornerSize)
      ctx.stroke()
    }

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 绘制背景网格
      drawGridOverlay()

      // 绘制浮动几何体
      floatingShapes.forEach(shape => drawShape(shape, time))

      // 绘制连线
      drawConnections()

      // 绘制鼠标影响
      drawMouseInfluence()

      // 更新和绘制粒子
      particles.forEach(p => {
        // 鼠标引力
        p.x += p.vx
        p.y += p.vy

        // 摩擦
        p.vx *= 0.99
        p.vy *= 0.99

        // 边界
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        drawParticle(p)
      })

      animFrameRef.current = requestAnimationFrame(animate)
    }

    resize()
    initParticles()
    animate(0)

    window.addEventListener('resize', () => {
      resize()
      initParticles()
    })
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [drawHexagon, drawTriangle, drawDiamond])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}