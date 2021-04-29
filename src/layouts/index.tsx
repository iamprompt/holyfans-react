import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type Props = { children?: ReactNode; className?: string }

const Layout = ({ children, className }: Props) => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <div className={`mx-auto${className ? ` ${className}` : ``} pt-20 pb-10`}>
        {children}
      </div>

      <Footer />
    </div>
  )
}
export default Layout
