import axios, { AxiosInstance } from 'axios'

import { AuthRequest } from './request'
import { AuthResponse } from './response'

export interface UserAuth {
  auth: (values: AuthRequest) => Promise<{ ok: boolean; access: string; refresh: string }>
  register: (values: AuthRequest) => Promise<{ ok: boolean }>
}

export const authInitializer = (client: AxiosInstance): UserAuth => {
  return {
    async auth(values) {
      try {
        const {
          data: { refresh, access },
        } = await client.post<AuthResponse>('/auth/', {
          login: values.login,
          password: values.password,
        })
        return {
          ok: true,
          access,
          refresh,
        }
      } catch (e) {
        return {
          ok: false,
          access: '',
          refresh: '',
        }
      }
    },
    async register(values) {
      try {
        await client.post<AuthResponse>('/users/', values)
        return {
          ok: true,
        }
      } catch (e) {
        return {
          ok: false,
        }
      }
    },
  }
}
