import Icon from '@/components/MaterialIcons'
import Modal from '@/components/Modal'
import Layout from '@/layouts'
import { HolyFansApi } from '@/utils/api'
import { useAuth } from '@/utils/auth'
import { ActionModal, IUser } from '@/utils/types'
import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UserManPage = () => {
  const { token } = useAuth()

  const [results, setResults] = useState<IUser[]>([])

  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalDesc, setModalDesc] = useState<string>('')
  const [modalAction, setModalAction] = useState<ActionModal[]>([])

  useEffect(() => {
    if (token) {
      ;(async () => {
        const {
          data: { payload },
          status,
        } = await HolyFansApi.admin.users.getAll(token || '')

        if (status !== 200) return
        setResults(payload)
      })()
    }
  }, [token])

  const deleteModal = (u: IUser) => {
    setModalTitle('Are you sure to delete user?')
    setModalDesc(`You are about to delete user with email "${u.email}"`)
    setModalAction([
      {
        title: 'Cancel',
        variant: 'blue',
        action: () => {
          setModalOpen(false)
        },
      },
      {
        title: 'Delete User',
        variant: 'red',
        action: () => {
          setModalOpen(false)
          ;(async () => {
            await HolyFansApi.admin.users.delete(u.id || '', token || '')
          })()
          window.location.reload()
        },
      },
    ])

    setModalOpen(true)
  }

  return (
    <Layout adminUi className="max-w-screen-md px-5 pt-28 pb-20">
      <div className="flex justify-between">
        <div className="flex-shrink-0 text-4xl font-bold">Users</div>
        <Link
          to="/admin/users/add"
          className="flex items-center justify-center py-1 px-3 rounded-lg gap-x-2 text-blue-900 bg-blue-100 hover:bg-blue-200 focus-visible:ring-blue-500"
        >
          Create User <Icon icon="add" />
        </Link>
      </div>

      <Formik
        enableReinitialize
        initialValues={{ search_keyword: '', role: '', status: '' }}
        onSubmit={async (values, actions) => {
          console.log({ values, actions })
          const {
            data: { payload },
          } = await HolyFansApi.admin.users.search(values, token || '')
          setResults(payload)
        }}
      >
        <Form className="flex items-center gap-x-3 mt-5 flex-wrap gap-y-3">
          <div className="font-bold">Filter</div>
          <Field
            id="search_keyword"
            name="search_keyword"
            className="block appearance-none rounded-xl bg-gray-100 focus:bg-gray-50 border-0 focus:ring focus:ring-pink-400 p-2 flex-auto focus:outline-none"
            placeholder="Search Keyword"
          />

          <Field
            component="select"
            id="role"
            name="role"
            className="block appearance-none rounded-xl bg-gray-100 focus:bg-gray-50 border-0 focus:ring focus:ring-pink-400 flex-auto"
          >
            <option value="">-- Role --</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Field>

          <Field
            component="select"
            id="status"
            name="status"
            className="block appearance-none rounded-xl bg-gray-100 focus:bg-gray-50 border-0 focus:ring focus:ring-pink-400 flex-auto"
          >
            <option value="">-- Status --</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Field>

          <button
            type="submit"
            className="bg-green-400 p-2 rounded-xl flex-auto"
          >
            Apply
          </button>
        </Form>
      </Formik>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className=" shadow-md overflow-hidden border-b border-gray-200 rounded-lg mt-5">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-6/12">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                    Role
                  </th>
                  <th className="relative px-6 py-3 w-1/12">
                    <span className="sr-only">Edit</span>
                  </th>
                  <th className="relative px-6 py-3 w-1/12">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((res) => (
                  <tr key={res.email}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {`${res.firstName} ${res.lastName}`}
                      </div>
                      <div className="text-sm text-gray-500">{res.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {res.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/admin/users/edit/${res.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div
                        className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                        onClick={() => deleteModal(res)}
                      >
                        Delete
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        open={[isModalOpen, setModalOpen]}
        title={modalTitle}
        desc={modalDesc}
        action={modalAction}
      />
    </Layout>
  )
}

export default UserManPage
