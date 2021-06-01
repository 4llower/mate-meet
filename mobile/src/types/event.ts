export interface EventProps {
  uuid: string
  date: string
  name: string
  author: {
    uuid: string
    fullName: string
  }
  description: string
  participants: { uuid: string; fullName: string }[]
  status: 'in progress' | 'finished' | 'not started'
  photo?: string
  rate?: number
}
