import Icon from '@/components/MaterialIcons'
import Modal from '@/components/Modal'
import Layout from '@/layouts'
import { HolyFansApi } from '@/utils/api'
import { useAuth } from '@/utils/auth'
import { dayjs } from '@/utils/config'
import { storage } from '@/utils/firebase'
import {
  ActionModal,
  IAdvSearch,
  ITeller,
  ITellerPost,
  IUser,
} from '@/utils/types'
import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PostManPage = () => {
  const { token } = useAuth()

  const [results, setResults] = useState<ITellerPost[]>([])

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
        } = await HolyFansApi.admin.posts.getAll(token)

        if (status !== 200) return
        const d = (await Promise.all(
          payload.map(async (p) => {
            return {
              ...p,
              author: {
                ...p.author,
                img: p.author?.img.includes('https')
                  ? p.author?.img
                  : await storage.ref(p.author?.img).getDownloadURL(),
              },
            }
          })
        )) as ITellerPost[]
        setResults(d)
      })()
    }
  }, [token])

  const deleteModal = (u: ITellerPost) => {
    setModalTitle('Are you sure to delete post?')
    setModalDesc(`You are about to delete post "${u.id}"`)
    setModalAction([
      {
        title: 'Cancel',
        variant: 'blue',
        action: () => {
          setModalOpen(false)
        },
      },
      {
        title: 'Delete Post',
        variant: 'red',
        action: () => {
          setModalOpen(false)
          ;(async () => {
            await HolyFansApi.admin.posts.delete(
              u.author?.id || '',
              u.id || '',
              token || ''
            )
            window.location.reload()
          })()
        },
      },
    ])

    setModalOpen(true)
  }

  return (
    <Layout adminUi className="max-w-screen-md px-5 pt-28 pb-20">
      <div className="flex justify-between">
        <div className="flex-shrink-0 text-4xl font-bold">Posts</div>
        <Link
          to="/admin/posts/add"
          className="flex items-center justify-center py-1 px-3 rounded-lg gap-x-2 text-blue-900 bg-blue-100 hover:bg-blue-200 focus-visible:ring-blue-500"
        >
          Create Post <Icon icon="add" />
        </Link>
      </div>

      {/* <Formik
        enableReinitialize
        initialValues={{ search_keyword: '', categories: '', area: '' }}
        onSubmit={async (values, actions) => {
          console.log({ values, actions })
          const {
            data: { payload },
          } = await HolyFansApi.tellers.search(values)
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
          <button
            type="submit"
            className="bg-green-400 p-2 rounded-xl flex-auto"
          >
            Apply
          </button>
        </Form>
      </Formik> */}
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className=" shadow-md overflow-hidden border-b border-gray-200 rounded-lg mt-5">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4/12">
                    Post
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                    Date
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
                  <tr key={res.id}>
                    <td className="px-6 py-4">
                      <div className="line-clamp-1">{res.content}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={res.author?.img}
                            alt={res.author?.nameEN}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {res.author?.nameEN}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {dayjs
                        .unix(res.dateCreated._seconds)
                        .format('DD MMM YYYY')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/admin/posts/edit/${res.author?.id}/${res.id}`}
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

export default PostManPage
