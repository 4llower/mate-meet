import React, { useEffect, useState } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { EventProps } from '../../types'
import { EventPreview } from './components'
import { useNavigation } from '@react-navigation/native'
import { APP_NAVIGATION } from '../../enums/navigation'
import { useClient, useToken } from '../../providers'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff1f0',
    paddingTop: 10,
  },
})

export const EventList: React.FC = () => {
  const [data, setData] = useState<EventProps[]>([])
  const { token } = useToken()
  const client = useClient()

  useEffect(() => {
    client.getAllEvents(token).then((response) => setData(response))
  }, [])

  const { navigate } = useNavigation()

  const onEventPress = (props: EventProps) => {
    navigate(APP_NAVIGATION.EVENT, props)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <EventPreview {...item} key={item.name} onPress={() => onEventPress(item)} />
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  )
}
