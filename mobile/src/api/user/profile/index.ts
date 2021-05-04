import { AxiosInstance } from 'axios'
import humps from 'humps'
import { Profile } from '../../../types/profile'

export interface UserProfile {
  getProfile: (token: string) => Promise<Profile>
  createProfile: (values: Profile, token: string) => Promise<unknown>
  updateProfile: (values: Profile, token: string) => Promise<unknown>
}

export const profileInitializer = (client: AxiosInstance): UserProfile => {
  return {
    async getProfile(token: string) {
      const { data } = await client.get<Profile>('/users/current/profile-details/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return data
    },
    async createProfile(values: Profile, token: string) {
      return await client.post('/users/current/profile/', humps.decamelizeKeys(values), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    async updateProfile(values: Profile, token: string) {
      return await client.put('/users/current/profile-details/', humps.decamelizeKeys(values), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
  }
}
