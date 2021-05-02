import Icon from '@/components/MaterialIcons'
import Modal from '@/components/Modal'
import Layout from '@/layouts'
import { HolyFansApi } from '@/utils/api'
import { useAuth } from '@/utils/auth'
import { ActionModal, IAdvSearch, ITeller, IUser } from '@/utils/types'
import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const advancedSearchModule: IAdvSearch = {
  categories: {
    name: 'Categories',
    option: [
      { name: 'Tarot', value: 'Tarot' },
      { name: 'Thai Horo', value: 'Thai Horo' },
      { name: 'Chinese Horo', value: 'Chinese Horo' },
      { name: 'Zodiac Sign', value: 'Zodiac Sign' },
      { name: 'Candle prediction', value: 'Candle prediction' },
      { name: 'Feng Shui', value: 'Feng Shui' },
    ],
  },
  area: {
    name: 'Area',
    option: [
      { name: 'Bangkok', value: 'Bangkok' },
      { name: 'Central', value: 'Central' },
    ],
  },
}

const TellerManPage = () => {
  const { token } = useAuth()

  const [results, setResults] = useState<ITeller[]>([])

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
        } = await HolyFansApi.tellers.getAll()

        if (status !== 200) return
        setResults(payload)
      })()
    }
  }, [token])

  const deleteModal = (u: ITeller) => {
    setModalTitle('Are you sure to delete teller?')
    setModalDesc(`You are about to delete teller "${u.nameEN}"`)
    setModalAction([
      {
        title: 'Cancel',
        variant: 'blue',
        action: () => {
          setModalOpen(false)
        },
      },
      {
        title: 'Delete Teller',
        variant: 'red',
        action: () => {
          setModalOpen(false)
          ;(async () => {
            await HolyFansApi.admin.tellers.delete(u.id || '', token || '')
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
        <div className="flex-shrink-0 text-4xl font-bold">Tellers</div>
        <Link
          to="/admin/tellers/add"
          className="flex items-center justify-center py-1 px-3 rounded-lg gap-x-2 text-blue-900 bg-blue-100 hover:bg-blue-200 focus-visible:ring-blue-500"
        >
          Create Teller <Icon icon="add" />
        </Link>
      </div>

      <Formik
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

          {Object.keys(advancedSearchModule).map((k) => {
            const data = advancedSearchModule[k]
            return (
              <Field
                component="select"
                id={k.toLowerCase()}
                name={k.toLowerCase()}
                className="block appearance-none rounded-xl bg-gray-100 focus:bg-gray-50 border-0 focus:ring focus:ring-pink-400 flex-auto"
              >
                <option value="">-- {data.name} --</option>
                {data.option.map((o: any) => {
                  return (
                    <option value={o.value} key={`${data.name}-${o.name}`}>
                      {o.name}
                    </option>
                  )
                })}
              </Field>
            )
          })}
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
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                    Area
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={res.img}
                            alt={res.nameEN}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {res.nameEN}
                          </div>
                          <div className="text-sm text-gray-500">
                            {res.nameTH}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2 flex-wrap">
                        {res.category.map((c) => (
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {res.region}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/admin/tellers/edit/${res.id}`}
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

export default TellerManPage
