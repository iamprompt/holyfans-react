import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// Components
import Icon from '@/components/MaterialIcons'

import { HolyfansStorage } from '@/utils/firebase'
import { useAuth } from '@/utils/auth'

type INavItem = {
  title: string
  target: string
  icon?: string
  role?: ('admin' | 'user' | undefined)[]
}

type Props = {
  adminUi?: boolean
}

const NavBar = ({ adminUi = false }: Props) => {
  const { user, loadingAuth, signOut } = useAuth()
  const { pathname } = useLocation()
  const [isMenuOpen, toggleMenu] = useState<boolean>(false)
  const [NavItems, setNavItems] = useState<INavItem[]>([])

  useEffect(() => {
    if (!adminUi) {
      setNavItems([
        { title: 'Home', target: '/' },
        { title: 'Explore', target: '/explore' },
        { title: 'About us', target: '/aboutus' },
        { title: 'Admin', target: '/admin', role: ['admin'] },
      ])
    } else {
      setNavItems([
        { title: 'Home', target: '/' },
        { title: 'Dashboard', target: '/admin' },
        { title: 'Users', target: '/admin/users' },
        { title: 'Tellers', target: '/admin/tellers' },
        { title: 'Posts', target: '/admin/posts' },
      ])
    }
  }, [user])

  return (
    <header
      id="header"
      className="fixed bg-white border-b border-gray-200 z-10 p-5 px-7 w-full"
    >
      <div className="flex flex-wrap justify-between items-center w-full max-w-screen-md mx-auto">
        <Link to="/" className="flex-shrink-0">
          <picture>
            <source
              srcSet={HolyfansStorage.getUrl(
                `logo/lockup_color_horizontal.avif`
              )}
              type="image/avif"
            />
            <source
              srcSet={HolyfansStorage.getUrl(
                `logo/lockup_color_horizontal.webp`
              )}
              type="image/webp"
            />
            <source
              srcSet={HolyfansStorage.getUrl(
                `logo/lockup_color_horizontal.svg`
              )}
              type="image/svg+xml"
            />
            <source
              srcSet={HolyfansStorage.getUrl(
                `logo/lockup_color_horizontal.png`
              )}
              type="image/png"
            />
            <img
              src={HolyfansStorage.getUrl(`logo/lockup_color_horizontal.png`)}
              className="h-10 w-40 object-contain"
              alt="HolyFans Logo"
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
            if (item.role && !item.role.includes(user?.role || undefined))
              return

            return (
              <li
                key={item.title}
                className="p-2 flex justify-center items-center md:p-0 md:block"
              >
                <Link
                  to={item.target}
                  className={`flex items-center gap-x-2${
                    pathname === item.target ? ` font-bold` : ``
                  }`}
                >
                  {item.icon && <Icon icon={item.icon} />}
                  {item.title}
                </Link>
              </li>
            )
          })}
          {user && !loadingAuth ? (
            <li
              key="logout"
              className="p-2 flex justify-center items-center md:p-0 md:block"
            >
              <div
                className="flex items-center gap-x-2 cursor-pointer"
                onClick={signOut}
              >
                <Icon icon="logout" />
                Logout
              </div>
            </li>
          ) : (
            <li
              key="login"
              className="p-2 flex justify-center items-center md:p-0 md:block"
            >
              <Link
                to="/auth/login"
                className={`flex items-center gap-x-2${
                  pathname === `/auth/login` ? ` font-bold` : ``
                }`}
              >
                <Icon icon="login" />
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  )
}

export default NavBar
