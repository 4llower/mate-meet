import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { TokenProvider } from './TokenProvider'
import { ClientProvider } from './ClientProvider'

export { useClient } from './ClientProvider'
export { useToken } from './TokenProvider'

export const Providers: React.FC = ({ children }) => {
  return (
    <NavigationContainer>
      <TokenProvider>
        <ClientProvider>{children}</ClientProvider>
      </TokenProvider>
    </NavigationContainer>
  )
}
