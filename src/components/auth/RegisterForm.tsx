import { useEffect, useState } from 'react'
import { Form, Field, withFormik, FormikProps } from 'formik'
import { IRegisterForm } from '@/utils/types'
import Icon from '@/components/MaterialIcons'
import { Link } from 'react-router-dom'

type FormProps = {
  onSubmit?: (value: IRegisterForm) => void
  value?: IRegisterForm
}

const LoginForm = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
}: FormikProps<IRegisterForm>) => {
  const [isPassShow, setPassShow] = useState<boolean>(false)

  return (
    <div className="relative mx-auto w-full">
      <Form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="firstName">First Name</label>
          <Field
            id="firstName"
            name="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            type="text"
            className="mt-2 appearance-none py-3 px-3 w-full rounded-2xl border-none bg-gray-100 focus:bg-gray-50 shadow-md focus:shadow-lg focus:ring focus:ring-pink-400"
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <Field
            id="lastName"
            name="lastName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            type="text"
            className="mt-2 appearance-none py-3 px-3 w-full rounded-2xl border-none bg-gray-100 focus:bg-gray-50 shadow-md focus:shadow-lg focus:ring focus:ring-pink-400"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            type="email"
            className="mt-2 appearance-none py-3 px-3 w-full rounded-2xl border-none bg-gray-100 focus:bg-gray-50 shadow-md focus:shadow-lg focus:ring focus:ring-pink-400"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <div className="mt-2 relative">
            <Field
              id="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              type={isPassShow ? `text` : `password`}
              className="appearance-none py-3 px-3 pr-14 w-full rounded-2xl border-none bg-gray-100 focus:bg-gray-50 shadow-md focus:shadow-lg focus:ring focus:ring-pink-400"
            />
            <Icon
              icon={isPassShow ? `visibility_off` : `visibility`}
              onClick={() => setPassShow(!isPassShow)}
              className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password">Re-enter Password</label>
          <div className="mt-2 relative">
            <Field
              id="repassword"
              name="repassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.repassword}
              type={isPassShow ? `text` : `password`}
              className="appearance-none py-3 px-3 pr-14 w-full rounded-2xl border-none bg-gray-100 focus:bg-gray-50 shadow-md focus:shadow-lg focus:ring focus:ring-pink-400"
            />
            <Icon
              icon={isPassShow ? `visibility_off` : `visibility`}
              onClick={() => setPassShow(!isPassShow)}
              className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 to-purple-500 w-full py-3 rounded-2xl shadow-md text-lg text-white focus:outline-none"
          >
            Register
          </button>
        </div>
        <div className="text-center text-gray-500">
          Already have an account? Let's{' '}
          <Link to="/auth/login" className="text-blue-500 hover:text-blue-800">
            Sign in
          </Link>
        </div>
      </Form>
    </div>
  )
}

const LoginInput = withFormik<FormProps, IRegisterForm>({
  mapPropsToValues: (props) => ({
    firstName: props.value?.firstName || '',
    lastName: props.value?.lastName || '',
    email: props.value?.email || '',
    password: props.value?.password || '',
    repassword: props.value?.repassword || '',
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit?.(values)
    setSubmitting(false)
  },
})(LoginForm)

export default LoginInput
