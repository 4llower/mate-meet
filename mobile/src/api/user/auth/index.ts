import { AxiosInstance } from 'axios'

import { AuthRequest } from './request'
import { AuthResponse } from './response'

export interface UserAuth {
  auth: (values: AuthRequest) => Promise<{ ok: boolean; access: string; refresh: string }>
}

export const authInitializer = (client: AxiosInstance): UserAuth => {
  return {
    async auth(values) {
      try {
        const {
          data: { access, refresh },
        } = await client.post<AuthResponse>('/auth/', values)
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
  }
}
