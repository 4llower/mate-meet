import { AxiosInstance } from 'axios'
import humps from 'humps'
import { Profile } from '../../../types/profile'

export interface UserProfile {
  getProfile: () => Promise<Profile>
  createProfile: (values: Profile) => Promise<unknown>
  updateProfile: (values: Profile) => Promise<unknown>
}

export const profileInitializer = (client: AxiosInstance, token: string): UserProfile => {
  return {
    async getProfile() {
      // const { data } = await client.get<Profile>('/users/current/profile-details/', {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // })
      return new Promise<Profile>((resolve) => {
        setTimeout(() => {
          resolve({
            lastName: 'Макеенко',
            firstName: 'Игорь',
            phone: '+375292932742',
            avatar: '/',
            description: 'hello',
          })
        }, 1000)
      })
    },
    async createProfile(values: Profile) {
      return await client.post('/users/current/profile/', humps.decamelizeKeys(values), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    async updateProfile(values: Profile) {
      return await client.put('/users/current/profile-details/', humps.decamelizeKeys(values), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
  }
}
