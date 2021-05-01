import Icon from '@/components/MaterialIcons'
import Layout from '@/layouts'
import { HolyFansApi } from '@/utils/api'
import { useAuth } from '@/utils/auth'
import { storage } from '@/utils/firebase'
import { UserDataForm } from '@/utils/types'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

type Props = {
  edit?: boolean
}

const TellerFormPage = ({ edit }: Props) => {
  const navigate = useNavigate()
  const { userId } = useParams()
  const { token } = useAuth()
  const [isPassShow, setPassShow] = useState<boolean>(false)
  const [formTitle, setTitle] = useState<string>('')
  const [formSubtitle, setSubtitle] = useState<string>('')
  const [initData, setData] = useState<UserDataForm>({
    role: 'user',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [actionButton, setActionButton] = useState<{
    title: string
    action: (values: UserDataForm, actions: FormikHelpers<UserDataForm>) => void
  }>({
    title: 'Create Account',
    action: async (values, actions) => {},
  })

  const [imgUrl, setImgUrl] = useState<string>('')

  useEffect(() => {
    console.log(userId)

    if (edit) {
      setTitle('Edit User')
      if (token) {
        ;(async () => {
          const { data, status } = await HolyFansApi.admin.users.getById(
            userId || '',
            token || ''
          )
          if (status === 200) {
            const {
              payload: { role, firstName, lastName, email },
            } = data

            setData({
              ...initData,
              role,
              firstName,
              lastName,
              email,
            })
          }
        })()

        setActionButton({
          title: 'Update User',
          action: async (values, actions) => {
            console.log(values)
            await HolyFansApi.admin.users.update(
              userId || '',
              values,
              token || ''
            )
            navigate(`/admin/users`)
          },
        })
      }
    } else {
      setTitle('Add New User')
      setSubtitle('Create a brand new user and add them to this site')
      setActionButton({
        title: 'Create Account',
        action: async (values, actions) => {
          console.log(values)
          await HolyFansApi.admin.users.create(values, token || '')
          navigate(`/admin/users`)
        },
      })
    }
  }, [token])

  const uploadHandler = (fileList: FileList) => {
    if (fileList.length === 0) {
      return
    }

    const file = fileList[0]

    console.log(file)

    const task = storage.ref().child(`/holyfans/tellers/${file.name}`).put(file)
    task.on(
      'state_change',
      (snapshot) => {
        console.log(snapshot)
      },
      (error) => {
        console.log(error)
      },
      async () => {
        const url = await task.snapshot.ref.getDownloadURL()
        setImgUrl(url)
      }
    )
  }

  return (
    <Layout adminUi className="max-w-screen-md px-5 pt-28 pb-20">
      <div>
        <div className="text-4xl font-bold">{formTitle}</div>
        <div className="text-lg">{formSubtitle}</div>
      </div>
      <Formik
        enableReinitialize
        initialValues={initData}
        onSubmit={actionButton.action}
      >
        <Form className="mt-5 p-5 border-2 border-pink-400 rounded-xl space-y-3">
          <div className="flex">
            <div className="flex justify-center">
              <img src={imgUrl} />
            </div>
            <label htmlFor="uploadImg">
              <span className="p-2 bg-pink-500 cursor-pointer">
                Upload Profile Image
              </span>
            </label>
            <input
              type="file"
              name="uploadImg"
              id="uploadImg"
              accept="image/*"
              onChange={(e) => {
                e.target.files !== null ? uploadHandler(e.target.files) : null
              }}
              className="hidden"
            />
          </div>
          <div className="flex items-center gap-x-3">
            <label htmlFor="role">Role</label>
            <Field
              component="select"
              id="role"
              name="role"
              className="block appearance-none rounded-xl bg-gray-100 focus:bg-gray-50 border-0 focus:ring focus:ring-pink-400 focus:outline-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Field>
          </div>
          <div className="flex items-center gap-x-3">
            <label htmlFor="firstName">
              First Name <small className="text-red-500">*require</small>
            </label>
            <Field
              id="firstName"
              name="firstName"
              className="block appearance-none rounded-xl bg-gray-100 focus:bg-gray-50 border-0 focus:ring focus:ring-pink-400 p-2 flex-auto focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-x-3">
            <label htmlFor="lastName">
              Last Name <small className="text-red-500">*require</small>
            </label>
            <Field
              id="lastName"
              name="lastName"
              className="block appearance-none rounded-xl bg-gray-100 focus:bg-gray-50 border-0 focus:ring focus:ring-pink-400 p-2 flex-auto focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-x-3">
            <label htmlFor="email">
              Email <small className="text-red-500">*require</small>
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              className="block appearance-none rounded-xl bg-gray-100 focus:bg-gray-50 border-0 focus:ring focus:ring-pink-400 p-2 flex-auto focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-x-3">
            <label htmlFor="password">
              Password <small className="text-red-500">*require</small>
            </label>
            <div className="relative flex-auto">
              <Field
                id="password"
                name="password"
                type={isPassShow ? `text` : `password`}
                className="block appearance-none rounded-xl bg-gray-100 focus:bg-gray-50 border-0 focus:ring focus:ring-pink-400 p-2 w-full focus:outline-none"
              />
              <Icon
                icon={isPassShow ? `visibility_off` : `visibility`}
                onClick={() => setPassShow(!isPassShow)}
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-400 p-2 rounded-xl w-full focus:outline-none"
          >
            {actionButton.title}
          </button>
        </Form>
      </Formik>
    </Layout>
  )
}

export default TellerFormPage
