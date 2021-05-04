import * as DocumentPicker from 'expo-document-picker'

export interface CreateEvent {
  name: string
  description: string
  address: string
  date: string
  eventPhoto: DocumentPicker.DocumentResult
}
