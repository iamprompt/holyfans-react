import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import {
  HolyFansAxiosResponse,
  ILoginAPIResponse,
  ILoginForm,
  IRegisterForm,
  ITeller,
  ITellerPost,
  IUser,
  TellerDataForm,
  TellerPostForm,
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
    register: async (
      registerInfo: IRegisterForm
    ): Promise<HolyFansAxiosResponse<ILoginAPIResponse>> =>
      await HolyFansInstance.post(`/auth/register`, registerInfo),
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
      ): Promise<HolyFansAxiosResponse<any>> =>
        await HolyFansInstance.delete(`/users`, {
          headers: { Authorization: `Bearer ${adminToken}` },
          params: { uId: userId },
        }),
    },
    tellers: {
      delete: async (
        tellerId: string,
        adminToken: string
      ): Promise<HolyFansAxiosResponse<any>> =>
        await HolyFansInstance.delete(`/tellers`, {
          headers: { Authorization: `Bearer ${adminToken}` },
          params: { tId: tellerId },
        }),
      create: async (
        data: TellerDataForm,
        adminToken: string
      ): Promise<HolyFansAxiosResponse<any>> =>
        await HolyFansInstance.post(`/tellers`, data, {
          headers: { Authorization: `Bearer ${adminToken}` },
        }),
      update: async (
        tellerId: string,
        data: TellerDataForm,
        adminToken: string
      ): Promise<HolyFansAxiosResponse<any>> =>
        await HolyFansInstance.put(
          `/tellers`,
          { ...data, id: tellerId },
          {
            headers: { Authorization: `Bearer ${adminToken}` },
          }
        ),
    },
    posts: {
      getAll: async (
        adminToken: string
      ): Promise<HolyFansAxiosResponse<ITellerPost[]>> =>
        await HolyFansInstance.get(`/posts/all`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        }),
      getById: async (
        tId: string,
        pId: string,
        adminToken: string
      ): Promise<HolyFansAxiosResponse<ITellerPost>> =>
        await HolyFansInstance.get(`/posts`, {
          headers: { Authorization: `Bearer ${adminToken}` },
          params: { tId, pId },
        }),
      create: async (data: TellerPostForm, adminToken: string) =>
        await HolyFansInstance.post(`/posts`, data, {
          headers: { Authorization: `Bearer ${adminToken}` },
        }),
      update: async (
        data: TellerPostForm & { id: string },
        adminToken: string
      ) =>
        await HolyFansInstance.put(`/posts`, data, {
          headers: { Authorization: `Bearer ${adminToken}` },
        }),
      delete: async (tId: string, pId: string, adminToken: string) =>
        await HolyFansInstance.delete(`/posts`, {
          headers: { Authorization: `Bearer ${adminToken}` },
          params: { tId, pId },
        }),
    },
  },
  tellers: {
    getAll: async (): Promise<HolyFansAxiosResponse<ITeller[]>> =>
      await HolyFansInstance.get(`/tellers/all`),
    getById: async (
      tellerId: string
    ): Promise<HolyFansAxiosResponse<ITeller>> =>
      await HolyFansInstance.get(`/tellers`, { params: { tId: tellerId } }),
    search: async (
      searchParams: Partial<ISearch>
    ): Promise<HolyFansAxiosResponse<ITeller[]>> =>
      await HolyFansInstance.get(`/tellers/search`, {
        params: searchParams,
      }),
  },
}
