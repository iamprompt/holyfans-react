import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import {
  HolyFansAxiosResponse,
  ILoginAPIResponse,
  ILoginForm,
  ITeller,
  IUser,
  UserDataForm,
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
  admin: {
    users: {
      search: async (
        keyword: any,
        adminToken: string
      ): Promise<HolyFansAxiosResponse<IUser[]>> =>
        await HolyFansInstance.get(`/users/search`, {
          headers: { Authorization: `Bearer ${adminToken}` },
          params: keyword,
        }),
      getAll: async (
        adminToken: string
      ): Promise<HolyFansAxiosResponse<IUser[]>> =>
        await HolyFansInstance.get(`/users/all`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        }),
      getById: async (
        userId: string,
        adminToken: string
      ): Promise<HolyFansAxiosResponse<IUser>> =>
        await HolyFansInstance.get(`/users`, {
          headers: { Authorization: `Bearer ${adminToken}` },
          params: { uId: userId },
        }),
      create: async (
        data: UserDataForm,
        adminToken: string
      ): Promise<HolyFansAxiosResponse<any>> =>
        await HolyFansInstance.post(
          `/users`,
          { ...data },
          {
            headers: { Authorization: `Bearer ${adminToken}` },
          }
        ),
      update: async (
        userId: string,
        data: UserDataForm,
        adminToken: string
      ): Promise<HolyFansAxiosResponse<any>> =>
        await HolyFansInstance.put(
          `/users`,
          { ...data, id: userId },
          {
            headers: { Authorization: `Bearer ${adminToken}` },
          }
        ),
      delete: async (
        userId: string,
        adminToken: string
      ): Promise<HolyFansAxiosResponse<IUser[]>> =>
        await HolyFansInstance.delete(`/users`, {
          headers: { Authorization: `Bearer ${adminToken}` },
          params: { uId: userId },
        }),
    },
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
