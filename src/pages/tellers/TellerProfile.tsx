import Layout from '@/layouts'
import { HolyFansApi } from '@/utils/api'
import { ITeller } from '@/utils/types'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { dayjs } from '@/utils/config'
import PostCard from '@/components/tellers/PostCard'

const GAPI_KEY = (import.meta.env.VITE_GAPI_KEY as string) || ''

type ParamsType = {
  tellerId: string
}

const TellerProfile = () => {
  const { tellerId } = useParams()
  const [profileData, setProfile] = useState<ITeller>()

  useEffect(() => {
    ;(async () => {
      const { data, status } = await HolyFansApi.tellers.getById(tellerId)
      if (status === 200) {
        setProfile(data.payload)
        setLocation({
          lat: data.payload?.address._latitude || 0,
          lng: data.payload?.address._longitude || 0,
        })
        setZoom(18)
      }
    })()
  }, [])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GAPI_KEY,
  })

  const [map, setMap] = useState(null)
  const [mapLocation, setLocation] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >()
  const [mapZoom, setZoom] = useState<number>(10)

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (
    <Layout className="max-w-screen-sm divide-y">
      <div className="py-5">
        <div className="z-10 w-40 h-40 overflow-hidden bg-gray-300 rounded-full my-5 mx-auto">
          <img id="profile-img" src={profileData?.img} />
        </div>
        <h2 className="text-4xl font-bold text-center">
          {profileData?.nameEN}
          <span className="text-2xl font-normal">
            {profileData?.nameTH ? ` (${profileData?.nameTH})` : ``}
          </span>
        </h2>
        <p className="mt-5" id="ht-fullBio">
          {profileData?.bio}
        </p>
        <div className="flex items-center justify-center h-10 bg-gray-200 rounded-full shadow-md max-w bg-gradient-to-r from-blue-400 to-purple-500 text-white my-3">
          Subscribe for {profileData?.subPrice}฿ / Month
        </div>
      </div>
      {isLoaded && (
        <div className="py-5">
          <div className="font-bold text-3xl mb-5 text-center">Location</div>
          <GoogleMap
            mapContainerClassName={`w-full h-72 rounded-xl shadow-xl`}
            center={mapLocation}
            zoom={mapZoom}
            options={{ disableDefaultUI: true }}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker position={mapLocation as google.maps.LatLng} />
          </GoogleMap>
        </div>
      )}
      {profileData?.posts?.length !== 0 && (
        <div className="py-5">
          <div className="font-bold text-3xl mb-5 text-center">Posts</div>
          <div className="py-2">
            {profileData?.posts?.length &&
              `${profileData?.posts?.length} Posts`}
          </div>
          <div className="space-y-5">
            {profileData?.posts?.map((p) => {
              return <PostCard profile={profileData} post={p} key={p.id} />
            })}
          </div>
        </div>
      )}
    </Layout>
  )
}

export default TellerProfile
