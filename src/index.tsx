import React from 'react'
import { Providers } from './providers'
import { createStackNavigator } from '@react-navigation/stack'
import { APP_NAVIGATION } from './enums/navigation'
import { Login, Register, Event, EventList, Profile } from './modules'

const Stack = createStackNavigator()

export const AppContent = () => {
  return (
    <Providers>
      <Stack.Navigator initialRouteName={APP_NAVIGATION.LOGIN}>
        <Stack.Screen
          options={{ title: 'Connect' }}
          name={APP_NAVIGATION.LOGIN}
          component={Login}
        />
        <Stack.Screen name={APP_NAVIGATION.REGISTER} component={Register} />
        <Stack.Screen name={APP_NAVIGATION.EVENTLIST} component={EventList} />
        <Stack.Screen name={APP_NAVIGATION.EVENT} component={Event} />
        <Stack.Screen name={APP_NAVIGATION.PROFILE} component={Profile} />
      </Stack.Navigator>
    </Providers>
  )
}
