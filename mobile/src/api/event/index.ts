import { EventProps } from '../../types'
import { AxiosInstance } from 'axios'
import { CreateEvent } from './request'

export interface Event {
  getAllEvents: () => Promise<EventProps[]>
  createEvent: (values: CreateEvent) => void
}

export const eventInitializer = (client: AxiosInstance, token: string) => {
  return {
    getAllEvents: async () => {
      return await client.get('/events/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    createEvent: async (values: CreateEvent) => {
      return client.post('/events/', values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
  }
}
