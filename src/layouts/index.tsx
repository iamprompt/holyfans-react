import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="pt-20 pb-10">{children}</div>

      <Footer />
    </div>
  )
}
export default Layout
