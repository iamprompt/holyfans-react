import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import {
  HolyFansAxiosResponse,
  ILoginAPIResponse,
  ILoginForm,
  ITeller,
} from '@/utils/types'
import { ISearch } from '@/utils/types'

const baseApiUrl: string = import.meta.env.PROD
  ? 'https://holyfans-api.herokuapp.com'
  : 'http://localhost:3030'

const Config: AxiosRequestConfig = {
  baseURL: baseApiUrl,
}

const HolyFansInstance: AxiosInstance = axios.create(Config)

export const HolyFansApi = {
  auth: {
    login: async (
      loginInfo: ILoginForm
    ): Promise<HolyFansAxiosResponse<ILoginAPIResponse>> =>
      await HolyFansInstance.post(`/auth/login`, loginInfo),
  },
  tellers: {
    getAll: async (): Promise<HolyFansAxiosResponse<ITeller[]>> =>
      await HolyFansInstance.get(`/tellers/all`),
    getTellerById: async (
      tellerId: string
    ): Promise<HolyFansAxiosResponse<ITeller>> =>
      await HolyFansInstance.get(`/tellers`, { params: { tId: tellerId } }),
    searchTellers: async (
      searchParams: ISearch
    ): Promise<HolyFansAxiosResponse<ITeller[]>> =>
      await HolyFansInstance.get(`/tellers/search`, {
        params: searchParams,
      }),
  },
}
