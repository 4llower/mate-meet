import React, { useContext } from 'react'
import { PrivateClient, publicClient, privateClient, PublicClient } from '../../api'
import { useToken } from '../TokenProvider'

type IClientContext = PrivateClient & PublicClient
const ClientContext = React.createContext<IClientContext>({} as IClientContext)

export const useClient = () => {
  const context = useContext(ClientContext)
  if (!context) throw new Error('[usePrivateClient] outside')
  return context
}

export const ClientProvider: React.FC = ({ children }) => {
  const { token } = useToken()
  return (
    <ClientContext.Provider value={{ ...privateClient(token), ...publicClient() }}>
      {children}
    </ClientContext.Provider>
  )
}
