import { AxiosInstance } from 'axios'

import { UserAuth, authInitializer } from './auth'
import { UserPassword, passwordInitializer } from './password'

export type PublicUser = UserAuth
export type PrivateUser = UserPassword

export const PublicUserApi = (client: AxiosInstance): PublicUser => {
  return {
    ...authInitializer(client),
  }
}

export const PrivateUserApi = (client: AxiosInstance, token: string): PrivateUser => {
  return {
    ...passwordInitializer(client, token),
  }
}
