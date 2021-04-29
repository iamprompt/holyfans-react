import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { HolyFansAxiosResponse, ITeller } from '@/utils/types'
import { ISearch } from '@/utils/types'

const baseApiUrl: string = import.meta.env.PROD
  ? 'https://holyfans-api.herokuapp.com'
  : 'http://localhost:3030'

const Config: AxiosRequestConfig = {
  baseURL: baseApiUrl,
}

const HolyFansInstance: AxiosInstance = axios.create(Config)

export const HolyFansApi = {
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
