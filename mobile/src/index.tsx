import React from 'react'
import { Providers } from './providers'
import { createStackNavigator } from '@react-navigation/stack'
import { APP_NAVIGATION } from './enums/navigation'
import { Login, Register, EventList, Profile, CreateEvent, Event } from './modules'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useFonts } from 'expo-font'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

export const MainScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName={APP_NAVIGATION.EVENT_LIST}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName

          switch (route.name) {
            case APP_NAVIGATION.PROFILE:
              iconName = 'person'
              break
            case APP_NAVIGATION.EVENT_LIST:
              iconName = 'apps-sharp'
              break
            case APP_NAVIGATION.CREATE_EVENT:
              iconName = 'add-circle'
              break
            default:
              iconName = 'information'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen
        name={APP_NAVIGATION.EVENT_LIST}
        component={EventList}
        options={{ title: 'Events' }}
      />
      <Tab.Screen
        name={APP_NAVIGATION.CREATE_EVENT}
        component={CreateEvent}
        options={{ title: 'Create' }}
      />
      <Tab.Screen name={APP_NAVIGATION.PROFILE} component={Profile} />
    </Tab.Navigator>
  )
}

export const AppContent = () => {
  const [loaded] = useFonts({
    Montserrat: require('./fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('./fonts/Montserrat-Bold.ttf'),
  })

  if (!loaded) return null

  return (
    <Providers>
      <Stack.Navigator
        initialRouteName={APP_NAVIGATION.LOGIN}
        screenOptions={{ headerTitleAlign: 'center' }}
      >
        <Stack.Screen
          options={{ title: 'Sign in' }}
          name={APP_NAVIGATION.LOGIN}
          component={Login}
        />
        <Stack.Screen
          name={APP_NAVIGATION.REGISTER}
          component={Register}
          options={{ title: 'Sign up' }}
        />
        <Stack.Screen
          name={APP_NAVIGATION.MAIN_SCREEN}
          component={MainScreen}
          options={{ title: 'Mate Meet' }}
        />
        <Stack.Screen
          name={APP_NAVIGATION.EVENT}
          component={Event}
          options={{ title: 'Mate Meet' }}
        />
      </Stack.Navigator>
    </Providers>
  )
}
