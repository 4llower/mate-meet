export interface EventProps {
  date: string
  name: string
  createdBy: string
  description: string
  eventUsers: string[]
  status: 'inProgress' | 'finished' | 'notStarted'
  tags: string[]
  photo?: string
  rate?: number
}
