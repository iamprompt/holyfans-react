import Icon from '@/components/MaterialIcons'
import Layout from '@/layouts'
import { HolyFansApi } from '@/utils/api'
import { useAuth } from '@/utils/auth'
import { storage } from '@/utils/firebase'
import { ITeller, TellerPostForm } from '@/utils/types'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

type Props = {
  edit?: boolean
}

const PostFormPage = ({ edit }: Props) => {
  const navigate = useNavigate()
  const { tellerId, postId } = useParams()
  const { token } = useAuth()
  const [formTitle, setTitle] = useState<string>('')
  const [formSubtitle, setSubtitle] = useState<string>('')
  const [initData, setData] = useState<TellerPostForm>({
    img: '',
    content: '',
    tellerId: '',
  })
  const [actionButton, setActionButton] = useState<{
    title: string
    action: (
      values: TellerPostForm,
      actions: FormikHelpers<TellerPostForm>
    ) => void
  }>({
    title: 'Create Post',
    action: async (values, actions) => {},
  })

  const [imgUrl, setImgUrl] = useState<string>('')
  const [imgPath, setImgPath] = useState<string>('')

  const [allTellers, setTellers] = useState<ITeller[]>([])

  useEffect(() => {
    ;(async () => {
      const {
        data: { payload },
      } = await HolyFansApi.tellers.getAll()

      setTellers(payload)
    })()
  }, [])

  useEffect(() => {
    if (edit) {
      setTitle('Edit Post')
      if (token) {
        ;(async () => {
          const { data, status } = await HolyFansApi.admin.posts.getById(
            tellerId || '',
            postId || '',
            token
          )
          if (status === 200) {
            const {
              payload: { img, content, author },
            } = data

            setData({
              img,
              content,
              tellerId: author?.id || '',
            })
            if (img) {
              if (img.includes('https')) {
                setImgUrl(img as string)
              } else {
                setImgUrl(await storage.ref(img).getDownloadURL())
              }
            }
          }
        })()

        setActionButton({
          title: 'Update Post',
          action: async (values, actions) => {
            console.log(values)
            await HolyFansApi.admin.posts.update(
              { ...values, id: postId },
              token || ''
            )
            navigate(`/admin/posts`)
          },
        })
      }
    } else {
      setTitle('Add New Post')
      setActionButton({
        title: 'Create Post',
        action: async (values, actions) => {
          console.log(values)
          await HolyFansApi.admin.posts.create(values, token || '')
          navigate(`/admin/posts`)
        },
      })
    }
  }, [token])

  const uploadHandler = (
    fileList: FileList,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    if (fileList.length === 0) {
      return
    }

    const file = fileList[0]

    console.log(file)

    const task = storage.ref().child(`/holyfans/posts/${file.name}`).put(file)
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
        const path = task.snapshot.ref.fullPath
        setImgUrl(url)
        setImgPath(path)
        setFieldValue('img', path)
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
        {({ setFieldValue }) => (
          <Form className="mt-5 p-5 border-2 border-pink-400 rounded-xl">
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-x-3">
                <label htmlFor="tellerId" className="font-bold">
                  Holo Author
                </label>
                <Field
                  component="select"
                  id="tellerId"
                  name="tellerId"
                  className="block appearance-none rounded-xl bg-gray-100 focus:bg-gray-50 border-0 focus:ring focus:ring-pink-400 p-2 flex-auto focus:outline-none"
                >
                  <option value="">-- Holo Tellers --</option>
                  {allTellers.map((t) => {
                    return (
                      <option value={t.id} key={t.id}>
                        {t.nameEN}
                      </option>
                    )
                  })}
                </Field>
              </div>

              <div className="flex flex-col gap-y-3">
                <label htmlFor="bio" className="font-bold">
                  Post Content
                </label>
                <Field
                  component="textarea"
                  id="content"
                  name="content"
                  rows={4}
                  className="block appearance-none rounded-xl bg-gray-100 focus:bg-gray-50 border-0 focus:ring focus:ring-pink-400 p-2 flex-auto focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-y-3">
                <label htmlFor="uploadImg" className="font-bold">
                  Post Image
                </label>
                <div className="flex flex-col items-center justify-center mx-auto w-full">
                  <div className="flex justify-center h-52 w-full relative rounded-xl">
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        className="object-cover h-full w-full rounded-xl"
                      />
                    ) : (
                      <label
                        htmlFor="uploadImg"
                        className="absolute h-full w-full flex justify-center items-center bg-gray-100 rounded-xl font-bold cursor-pointer"
                      >
                        No image selected
                      </label>
                    )}
                  </div>
                  <label htmlFor="uploadImg" className="mt-3">
                    <span className="flex items-center justify-center p-2 bg-pink-500 cursor-pointer text-sm sm:text-base sm:w-52 rounded-full text-white">
                      <Icon icon="upload" />
                      {imgUrl ? `Change Image` : `Upload Image`}
                    </span>
                  </label>
                  <input
                    type="file"
                    name="uploadImg"
                    id="uploadImg"
                    accept="image/*"
                    onChange={(e) => {
                      e.target.files !== null
                        ? uploadHandler(e.target.files, setFieldValue)
                        : null
                    }}
                    className="hidden"
                  />
                </div>
                <div className="hidden items-center gap-x-3">
                  <label htmlFor="img" className="font-bold">
                    Image Url
                  </label>
                  <Field
                    id="img"
                    name="img"
                    type="text"
                    className="block appearance-none rounded-xl bg-gray-100 focus:bg-gray-50 border-0 focus:ring focus:ring-pink-400 p-2 flex-auto focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-green-400 p-2 rounded-xl w-full focus:outline-none"
            >
              {actionButton.title}
            </button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default PostFormPage
