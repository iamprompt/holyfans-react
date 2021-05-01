import { AxiosResponse } from 'axios'

// Firebase
type FirestoreTimeStamp = {
  _seconds: number
  _nanoseconds: number
}

// Axios Call
export type IHolyFansApiResponse<T> = {
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
  posts?: ITellerPost[]
}

export type ITellerPost = {
  id: string
  img?: string
  content?: string
  dateCreated: FirestoreTimeStamp
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

// User
export type IUser = {
  id: string
  role: 'admin' | 'user'
  firstName: string
  lastName: string
  displayName: string
  altFirstName?: string
  altLastName?: string
  altDisplayName?: string
  email: string
  password: string
  isActive: boolean
  dateCreated: FirestoreTimeStamp
  dateModified: FirestoreTimeStamp
}

// Authentication
export type ILoginForm = {
  email: string
  password: string
}

export type IRegisterForm = {
  firstName: string
  lastName: string
  email: string
  password: string
  repassword: string
}

export type ILoginAPIResponse = {
  token: string
  user: IUser
}

// Modal
export type ActionModal = {
  title: string
  variant?: 'blue' | 'red'
  action: () => void
}

export type UserDataForm = {
  role: 'admin' | 'user'
  firstName: string
  lastName: string
  email: string
  password: string
}
