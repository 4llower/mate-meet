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
      const requestData = new FormData()
      requestData.append('name', values.name)
      requestData.append('description', values.description)
      requestData.append('address', values.address)
      requestData.append('date', values.date)
      if (values.eventPhoto) requestData.append('event_photo', values.eventPhoto)

      return client.post('/events/', requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
  }
}
