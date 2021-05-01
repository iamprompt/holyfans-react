import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type Props = {
  children?: ReactNode
  className?: string
  adminUi?: boolean
}

const Layout = ({ children, className, adminUi = false }: Props) => {
  return (
    <div className="relative min-h-screen">
      <Header adminUi={adminUi} />
      <div className={`mx-auto${className ? ` ${className}` : ``} pt-20 pb-10`}>
        {children}
      </div>

      <Footer />
    </div>
  )
}
export default Layout
