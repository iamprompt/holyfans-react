import { ReactNode } from 'react'
import NavBar from '@/components/Headers/NavBar'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative min-h-screen">
      <NavBar />
      {children}
      {/* <Footer /> */}
    </div>
  )
}
export default Layout
