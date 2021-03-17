import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

export const Providers: React.FC = ({ children }) => {
  return <NavigationContainer>{children}</NavigationContainer>
}
