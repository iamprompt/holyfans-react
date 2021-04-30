import Layout from '@/layouts'
import LoginInput from '@/components/auth/LoginForm'
import { ILoginForm } from '@/utils/types'
import { HolyFansApi } from '@/utils/api'
import { useAuth } from '@/utils/auth'

const LoginPage = () => {
  const { user, signIn } = useAuth()

  const handleSignIn = async (loginInfo: ILoginForm) => {
    const res = await signIn(loginInfo)
    console.log(user)
  }

  return (
    <Layout className="max-w-screen-sm px-5 pt-28 pb-16 min-h-screen flex flex-col justify-center">
      <div className="mb-5 font-bold text-4xl md:text-7xl space-y-3">
        <div>Hello!!</div>
        <div>Welcome Back</div>
      </div>
      <LoginInput onSubmit={handleSignIn} />
    </Layout>
  )
}

export default LoginPage
