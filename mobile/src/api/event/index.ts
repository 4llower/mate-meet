import { EventProps } from '../../types'
import { AxiosInstance } from 'axios'
import { CreateEvent } from './request'

export interface Event {
  getAllEvents: (token: string) => Promise<EventProps[]>
  createEvent: (values: CreateEvent, token: string) => void
}

export const eventInitializer = (client: AxiosInstance) => {
  return {
    getAllEvents: async (token: string) => {
      const { data } = await client.get('/events/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return data
    },
    createEvent: async (values: CreateEvent, token: string) => {
      return client.post('/events/', values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
  }
}
