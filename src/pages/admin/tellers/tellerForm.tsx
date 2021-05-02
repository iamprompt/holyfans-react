import Icon from '@/components/MaterialIcons'
import Layout from '@/layouts'
import { HolyFansApi } from '@/utils/api'
import { useAuth } from '@/utils/auth'
import { storage } from '@/utils/firebase'
import { TellerDataForm } from '@/utils/types'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

const GAPI_KEY = (import.meta.env.VITE_GAPI_KEY as string) || ''

type Props = {
  edit?: boolean
}

const advInfo = {
  categories: [
    'Tarot',
    'Thai Horo',
    'Chinese Horo',
    'Zodiac Sign',
    'Candle prediction',
    'Feng Shui',
  ],
  area: ['Bangkok', 'Central'],
}

const TellerFormPage = ({ edit }: Props) => {
  const navigate = useNavigate()
  const { tellerId } = useParams()
  const { token } = useAuth()
  const [formTitle, setTitle] = useState<string>('')
  const [formSubtitle, setSubtitle] = useState<string>('')
  const [initData, setData] = useState<TellerDataForm>({
    img: '',
    nameTH: '',
    nameEN: '',
    region: '',
    subPrice: 0,
    bio: '',
    category: [],
    address: {
      _latitude: 0,
      _longitude: 0,
    },
  })
  const [actionButton, setActionButton] = useState<{
    title: string
    action: (
      values: TellerDataForm,
      actions: FormikHelpers<TellerDataForm>
    ) => void
  }>({
    title: 'Create Account',
    action: async (values, actions) => {},
  })

  const [imgUrl, setImgUrl] = useState<string>('')
  const [imgPath, setImgPath] = useState<string>('')

  useEffect(() => {
    if (edit) {
      setTitle('Edit Teller')
      if (token) {
        ;(async () => {
          const { data, status } = await HolyFansApi.tellers.getById(
            tellerId || ''
          )
          if (status === 200) {
            const {
              payload: {
                img,
                nameEN,
                nameTH,
                region,
                subPrice,
                bio,
                category,
                address,
              },
            } = data

            setData({
              img,
              nameEN,
              nameTH,
              region,
              subPrice,
              bio,
              category,
              address,
            })
            setImgUrl(img)
            setInitialCenter({
              lat: address._latitude,
              lng: address._longitude,
            })
          }
        })()

        setActionButton({
          title: 'Update Teller',
          action: async (values, actions) => {
            console.log(values)
            await HolyFansApi.admin.tellers.update(
              tellerId || '',
              values,
              token || ''
            )
            navigate(`/admin/tellers`)
          },
        })
      }
    } else {
      setTitle('Add New Teller')
      setActionButton({
        title: 'Create Teller',
        action: async (values, actions) => {
          console.log(values)
          await HolyFansApi.admin.tellers.create(values, token || '')
          navigate(`/admin/teller`)
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
        const path = task.snapshot.ref.fullPath
        setImgUrl(url)
        setImgPath(path)
        setFieldValue('img', path)
      }
    )
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GAPI_KEY,
  })

  const [map, setMap] = useState<google.maps.Map<Element> | null>(null)
  const [initialCenter, setInitialCenter] = useState<google.maps.LatLngLiteral>(
    {
      lat: 13.74551,
      lng: 100.533784,
    }
  )

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
              <div className="flex flex-col items-center justify-center mx-auto">
                <div className="flex justify-center w-10/12 h-48 sm:w-52 sm:h-48 relative rounded-xl">
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
                    {imgUrl ? `Change Profile Image` : `Upload Profile Image`}
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
                  Profile Image Url
                </label>
                <Field
                  id="img"
                  name="img"
                  type="text"
                  className="block appearance-none rounded-xl bg-gray-100 focus:bg-gray-50 border-0 focus:ring focus:ring-pink-400 p-2 flex-auto focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-x-3">
                <label htmlFor="nameEN" className="font-bold">
                  Display Name (EN)
                </label>
                <Field
                  id="nameEN"
                  name="nameEN"
                  type="text"
                  className="block appearance-none rounded-xl bg-gray-100 focus:bg-gray-50 border-0 focus:ring focus:ring-pink-400 p-2 flex-auto focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-x-3">
                <label htmlFor="nameTH" className="font-bold">
                  Display Name (TH)
                </label>
                <Field
                  id="nameTH"
                  name="nameTH"
                  type="text"
                  className="block appearance-none rounded-xl bg-gray-100 focus:bg-gray-50 border-0 focus:ring focus:ring-pink-400 p-2 flex-auto focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-x-3">
                <label htmlFor="region" className="font-bold">
                  Region
                </label>
                <Field
                  component="select"
                  id="region"
                  name="region"
                  className="block appearance-none rounded-xl bg-gray-100 focus:bg-gray-50 border-0 focus:ring focus:ring-pink-400 p-2 flex-auto focus:outline-none"
                >
                  <option value="Bangkok">Bangkok</option>
                  <option value="Central">Central</option>
                </Field>
              </div>

              <div className="flex items-center gap-x-3">
                <label htmlFor="subPrice" className="font-bold">
                  Subscription Price
                </label>
                <Field
                  id="subPrice"
                  name="subPrice"
                  type="number"
                  inputMode="decimal"
                  className="block appearance-none rounded-xl bg-gray-100 focus:bg-gray-50 border-0 focus:ring focus:ring-pink-400 p-2 flex-auto focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-y-3">
                <label htmlFor="bio" className="font-bold">
                  Biography
                </label>
                <Field
                  component="textarea"
                  id="bio"
                  name="bio"
                  rows={4}
                  className="block appearance-none rounded-xl bg-gray-100 focus:bg-gray-50 border-0 focus:ring focus:ring-pink-400 p-2 flex-auto focus:outline-none"
                />
              </div>

              <div className="space-y-3">
                <div id="category-group" className="font-bold">
                  Category
                </div>
                <div
                  role="group"
                  aria-labelledby="category-group"
                  className="flex flex-wrap gap-x-5 gap-y-2"
                >
                  {advInfo.categories.map((c) => (
                    <label className="flex gap-x-2 items-center" key={c}>
                      <Field
                        type="checkbox"
                        name="category"
                        value={c}
                        className="rounded-md"
                      />
                      {c}
                    </label>
                  ))}
                </div>
              </div>

              {isLoaded && (
                <div className="flex flex-col gap-y-3">
                  <label htmlFor="address" className="font-bold">
                    Address
                  </label>
                  <GoogleMap
                    mapContainerClassName={`w-full h-72 rounded-xl shadow-xl`}
                    center={initialCenter}
                    zoom={15}
                    options={{ disableDefaultUI: true }}
                    onLoad={(map) => setMap(map)}
                    onUnmount={() => setMap(null)}
                  >
                    <Marker
                      position={initialCenter}
                      draggable={true}
                      onDragEnd={(e) => {
                        setFieldValue('address._latitude', e.latLng.lat())
                        setFieldValue('address._longitude', e.latLng.lng())
                      }}
                    />
                  </GoogleMap>
                  <div className="hidden gap-x-5">
                    <Field
                      name="address._latitude"
                      type="number"
                      className="block appearance-none rounded-xl bg-gray-100 focus:bg-gray-50 border-0 focus:ring focus:ring-pink-400 p-2 flex-auto focus:outline-none"
                    />
                    <Field
                      name="address._longitude"
                      type="number"
                      className="block appearance-none rounded-xl bg-gray-100 focus:bg-gray-50 border-0 focus:ring focus:ring-pink-400 p-2 flex-auto focus:outline-none"
                    />
                  </div>
                </div>
              )}
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

export default TellerFormPage
