import { AxiosInstance } from 'axios'

import { UserAuth, authInitializer } from './auth'
import { UserPassword, passwordInitializer } from './password'
import { profileInitializer, UserProfile } from './profile'

export type PublicUser = UserAuth
export type PrivateUser = UserPassword & UserProfile

export const PublicUserApi = (client: AxiosInstance): PublicUser => {
  return {
    ...authInitializer(client),
  }
}

export const PrivateUserApi = (client: AxiosInstance, token: string): PrivateUser => {
  return {
    ...passwordInitializer(client, token),
    ...profileInitializer(client, token),
  }
}
