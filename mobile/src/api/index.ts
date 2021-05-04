import axios, { AxiosInstance } from 'axios'
import { camelizeKeys } from 'humps'
import { config } from '../config'
import { PrivateUser, PrivateUserApi, PublicUser, PublicUserApi } from './user'
import { eventInitializer } from './event'

export type PublicClient = PublicUser
export type PrivateClient = PrivateUser

const createClient = (): AxiosInstance => {
  const client = axios.create({ baseURL: config.api })
  client.interceptors.response.use(({ data, ...response }) => {
    const parsed = camelizeKeys(data)
    return { data: parsed, ...response }
  })
  return client
}

export const publicClient = () => {
  const client = createClient()
  return {
    ...PublicUserApi(client),
  }
}

export const privateClient = (token: string) => {
  const client = createClient()
  return {
    ...PrivateUserApi(client, token),
    ...eventInitializer(client, token),
  }
}
