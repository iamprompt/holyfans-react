import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router'
import { HolyFansApi } from './api'
import { ILoginForm, IRegisterForm, IUser } from './types'

//@ts-expect-error
const authContext = createContext<IAuthContext>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = Authen()

  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

const Authen = () => {
  const [user, setUser] = useState<IUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loadingAuth, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  useEffect(() => {
    const localTokenString = localStorage.getItem('token')
    const localUserString = localStorage.getItem('user')

    const localUser = localUserString ? JSON.parse(localUserString) : null

    setToken(localTokenString)
    setUser(localUser)
  }, [])

  const signIn = async (
    loginInfo: ILoginForm,
    redirect?: string
  ): Promise<void> => {
    setLoading(true)
    const {
      data: {
        payload: { user: resUser, token: resToken },
      },
    } = await HolyFansApi.auth.login(loginInfo)

    handleUser(resUser, resToken)

    setLoading(false)

    if (redirect) {
      navigate(redirect)
    }
  }

  const register = async (
    registerInfo: IRegisterForm,
    redirect?: string
  ): Promise<void> => {
    setLoading(true)
    const {
      data: {
        payload: { user: resUser, token: resToken },
      },
    } = await HolyFansApi.auth.register(registerInfo)

    handleUser(resUser, resToken)

    setLoading(false)

    if (redirect) {
      navigate(redirect)
    }
  }

  const signOut = async () => {
    handleUser(null, null)
    navigate(`/`)
  }

  const handleUser = (user: IUser | null, token: string | null) => {
    setUser(user)
    setToken(token)

    if (user && token) {
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }

  return {
    user,
    token,
    loadingAuth,
    signIn,
    signOut,
    register,
  }
}

type IAuthContext = {
  user: IUser | null
  token: string | null
  loadingAuth: boolean
  signIn: (loginInfo: ILoginForm, redirect?: string) => Promise<void>
  register: (registerInfo: IRegisterForm, redirect?: string) => Promise<void>
  signOut: () => void
}
