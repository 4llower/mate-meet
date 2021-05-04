import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

export { useClient } from './ClientProvider'
export { useToken } from './TokenProvider'

export const Providers: React.FC = ({ children }) => {
  return <NavigationContainer>{children}</NavigationContainer>
}
