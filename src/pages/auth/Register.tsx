import RegisterInput from '@/components/auth/RegisterForm'
import Layout from '@/layouts'
import { useAuth } from '@/utils/auth'
import { IRegisterForm } from '@/utils/types'

const RegisterPage = () => {
  const { user, register } = useAuth()

  const handleRegister = async (val: IRegisterForm) => {
    await register(val, `/`)
  }

  return (
    <Layout className="max-w-screen-sm px-5 pt-28 pb-16 min-h-screen flex flex-col justify-center">
      <div className="mb-5 font-bold text-4xl md:text-7xl space-y-3">
        <div className="text-center">Register</div>
      </div>
      <RegisterInput onSubmit={handleRegister} />
    </Layout>
  )
}

export default RegisterPage
