import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// Components
import Icon from '@/components/Icons/MaterialIcons'

// Lockups
import LockupWEBP from '@/assets/logo/lockup_color_horizontal.webp'
import LockupSVG from '@/assets/logo/lockup_color_horizontal.svg'
import LockupPNG from '@/assets/logo/lockup_color_horizontal.png'

const NavLinks = [
  { title: 'Home', target: '/' },
  { title: 'Explore', target: '/explore', icon: 'explore' },
  { title: 'About us', target: '/aboutus' },
]

const navBar = () => {
  return (
    <header
      id="header"
      className="fixed flex justify-between items-center w-full bg-white border-b border-gray-200 z-[9999] p-5"
    >
      <Link to="/">
        <picture>
          <source srcSet={LockupWEBP} type="image/webp" />
          <source srcSet={LockupSVG} type="image/svg+xml" />
          <img src={LockupPNG} alt="HolyFans Logo" className="h-10" />
        </picture>
      </Link>
      <div className="flex gap-x-5 items-center">
        {NavLinks.map((item) => {
          return (
            <Link to={item.target} className="flex items-center gap-x-2">
              {item.icon && <Icon icon={item.icon} />}
              {item.title}
            </Link>
          )
        })}
      </div>
    </header>
  )
}

export default navBar
