import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// Components
import Icon from '@/components/MaterialIcons'

// Lockups
import LockupWEBP from '@/assets/logo/lockup_color_horizontal.webp'
import LockupSVG from '@/assets/logo/lockup_color_horizontal.svg'
import LockupPNG from '@/assets/logo/lockup_color_horizontal.png'

type INavItem = {
  title: string
  target: string
  icon?: string
}

const navBar = () => {
  const [isMenuOpen, toggleMenu] = useState<boolean>(false)
  const [NavItems, setNavItems] = useState<INavItem[]>([
    { title: 'Home', target: '/' },
    { title: 'Explore', target: '/explore' },
    { title: 'About us', target: '/aboutus' },
  ])

  return (
    <header
      id="header"
      className="fixed bg-white border-b border-gray-200 z-[9999] p-5 px-7 w-full"
    >
      <div className="flex flex-wrap justify-between items-center w-full max-w-screen-md mx-auto">
        <Link to="/" className="flex-shrink-0">
          <picture>
            <source srcSet={LockupWEBP} type="image/webp" />
            <source srcSet={LockupSVG} type="image/svg+xml" />
            <img
              src={LockupPNG}
              alt="HolyFans Logo"
              className="h-10 w-40 object-contain"
            />
          </picture>
        </Link>
        <div
          className="flex items-center justify-center md:hidden text-xl border rounded-md p-1 cursor-pointer"
          onClick={() => toggleMenu(!isMenuOpen)}
        >
          <Icon icon={isMenuOpen ? `close` : `menu`} />
        </div>
        <ul
          className={`${
            isMenuOpen ? `flex flex-col` : `hidden`
          } w-full divide-y divide-gray-200 pt-5 md:p-0 md:divide-y-0 md:flex md:flex-row md:w-auto md:gap-x-5`}
        >
          {NavItems.map((item) => {
            return (
              <li
                key={item.title}
                className="p-2 flex justify-center items-center md:p-0 md:block"
              >
                <Link to={item.target} className="flex items-center gap-x-2">
                  {item.icon && <Icon icon={item.icon} />}
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </header>
  )
}

export default navBar
