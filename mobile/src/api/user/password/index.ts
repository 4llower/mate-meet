import { AxiosInstance } from 'axios'
import { decamelizeKeys } from 'humps'

import { UpdatePassword } from './request'

export interface UserPassword {
  setPassword: (password: string) => void
  updatePassword: (values: { oldPassword: string; newPassword: string }) => Promise<unknown>
}

export const passwordInitializer = (client: AxiosInstance, token: string): UserPassword => {
  return {
    setPassword: async (password) => {
      const response = await client.post(
        '/users/set-password/',
        { password: password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response.data
    },
    updatePassword: async ({ oldPassword, newPassword }) => {
      const sendData: UpdatePassword = {
        oldPassword: oldPassword || '',
        newPassword: newPassword || '',
      }
      return await client.put('/users/current/update-password/', decamelizeKeys(sendData), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
  }
}
