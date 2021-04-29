import { AxiosResponse } from 'axios'

// Axios Call
type IHolyFansApiResponse<T> = {
  status: 'success' | 'error'
  payload: T
}

export interface HolyFansAxiosResponse<T> extends AxiosResponse {
  data: IHolyFansApiResponse<T>
}

// Tellers
export type ITeller = {
  id: string
  subPrice: number
  nameEN: string
  category: string[]
  contact: {
    email: string
    line: string
    facebook: string
    twitter: string
    phoneNum: string
    website: string
    instagram: string
  }
  region: string
  address: {
    _latitude: number
    _longitude: number
  }
  img: string
  nameTH: string
  bio: string
}

// Search Function
export type ISearch = {
  [key: string]: string
  search_keyword: string
  categories: string
  area: string
  price_range: string
}

export type IAdvSearch = {
  [key: string]: {
    name: string
    option: {
      name: string
      value: string
    }[]
  }
}
