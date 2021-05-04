import { EventProps } from '../../types'
import { AxiosInstance } from 'axios'
import { CreateEvent } from './request'

export interface Event {
  getAllEvents: (token: string) => Promise<EventProps[]>
  createEvent: (values: CreateEvent) => void
}

export const eventInitializer = (client: AxiosInstance) => {
  return {
    getAllEvents: async (token: string) => {
      return await client.get('/events/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
