import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import DigitalWorld from './DigitalWorld'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* 数字世界背景 */}
      <DigitalWorld />

      {/* 扫描线效果 */}
      <div className="scan-line" />

      {/* 主内容 */}
      <Navbar />
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}