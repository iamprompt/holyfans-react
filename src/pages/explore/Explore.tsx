import Layout from '@/layouts'
import SearchInput from '@/components/explore/SearchBar'
import { HolyfansStorage } from '@/utils/firebase'
import { useEffect, useRef, useState } from 'react'
import { ITeller, ISearch } from '@/utils/types'
import ResultCard from '@/components/explore/ResultCard'
import { HolyFansApi } from '@/utils/api'

const exploreImages = [
  {
    id: 1,
    imgUrl: {
      jpg: 'explore/horo-news-1.jpg',
      webp: 'explore/horo-news-1.webp',
    },
  },
  {
    id: 2,
    imgUrl: {
      jpg: 'explore/horo-news-2.jpg',
      webp: 'explore/horo-news-2.webp',
    },
  },
  {
    id: 3,
    imgUrl: {
      jpg: 'explore/horo-news-3.jpg',
      webp: 'explore/horo-news-3.webp',
    },
  },
  {
    id: 4,
    imgUrl: {
      jpg: 'explore/horo-news-4.jpg',
      webp: 'explore/horo-news-4.webp',
    },
  },
  {
    id: 5,
    imgUrl: {
      jpg: 'explore/lotto-announce.jpg',
      webp: 'explore/lotto-announce.webp',
    },
  },
  {
    id: 6,
    imgUrl: {
      jpg: 'explore/lotto-in-hand.jpg',
      webp: 'explore/lotto-in-hand.webp',
    },
  },
  {
    id: 7,
    imgUrl: {
      jpg: 'explore/lotto-technique.jpg',
      webp: 'explore/lotto-technique.webp',
    },
  },
  {
    id: 8,
    imgUrl: {
      jpg: 'explore/lotto-ticket.jpg',
      webp: 'explore/lotto-ticket.webp',
    },
  },
  {
    id: 9,
    imgUrl: {
      jpg: 'explore/previous-lotto.jpg',
      webp: 'explore/previous-lotto.webp',
    },
  },
]

const priceOption: { [key: string]: string } = {
  '1': '0฿ - 100฿',
  '2': '101฿ - 300฿',
  '3': '300฿ - 500฿',
  '4': '500฿ - 1,000฿',
}

const ExplorePage = () => {
  const initialRender = useRef(true)
  const [searchRequest, setSearchRequest] = useState<ISearch>({
    search_keyword: '',
    categories: '',
    area: '',
    price_range: '',
  })
  const [result, setResult] = useState<ITeller[]>([])
  const [notFound, setNotFoundStatus] = useState<boolean>(false)

  const handleSubmit = (val: ISearch) => {
    console.log(val)
    setSearchRequest(val)
  }

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    ;(async () => {
      const { data, status } = await HolyFansApi.tellers.search(searchRequest)
      if (status === 200) {
        setResult(data.payload)
        setNotFoundStatus(data.payload.length === 0)
      }
    })()
  }, [searchRequest])

  return (
    <Layout className="max-w-screen-sm pb-20">
      <h1 className="text-center m-10 font-bold text-4xl">Explore the magic</h1>
      <SearchInput value={searchRequest} onSubmit={handleSubmit} />
      {result.length !== 0 ? (
        <div className="flex flex-col gap-y-5">
          <div className="text-center">
            <div className="font-bold text-3xl mb-2">
              {searchRequest.search_keyword === ``
                ? `All Results`
                : `Results for "${searchRequest.search_keyword.toUpperCase()}"`}
              {searchRequest.categories === ``
                ? ``
                : ` in ${searchRequest.categories} Category`}
            </div>
            <div className="text-xl">
              {searchRequest.area === ``
                ? ``
                : ` in ${searchRequest.area} Area`}
              {searchRequest.price_range === ``
                ? ``
                : ` in price range ${priceOption[searchRequest.price_range]}`}
            </div>
          </div>
          {result.map((res) => {
            return <ResultCard d={res} key={res.id} />
          })}
        </div>
      ) : notFound ? (
        <div className="text-center">Not found</div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-5">
            {exploreImages.map((eImg) => {
              return (
                <div className="aspect-w-1 aspect-h-1" key={eImg.id}>
                  <img
                    src={HolyfansStorage.getUrl(eImg.imgUrl.jpg)}
                    className="object-cover"
                  />
                </div>
              )
            })}
          </div>
        </>
      )}
    </Layout>
  )
}

export default ExplorePage
