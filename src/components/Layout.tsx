import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import DigitalWorld from './DigitalWorld'

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <DigitalWorld />
      <Navbar />
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}