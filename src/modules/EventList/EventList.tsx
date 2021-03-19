import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { EventProps } from '../../types'
import { EventPreview } from './components'
import { useNavigation } from '@react-navigation/native'
import { APP_NAVIGATION } from '../../enums/navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff1f0',
    paddingTop: 10,
  },
})

export const EventList: React.FC = () => {
  const data: EventProps[] = [
    {
      date: '2022-11-22',
      createdBy: '4llower',
      description:
        'Hi there, this is test event Hi there, this is test event  Hi there, this is test event  Hi there, this is test event Hi there, this is test event  Hi there, this is test event  Hi Hi there, this is test event Hi there, this is test event  Hi there, this is test event  Hi Hi there, this is test event  Hi there, this is test event  Hi there, this is test event  ',
      name: 'MMA Botaem',
      eventUsers: ['4llower', 'max', 'tsudd', 'slavik175cm'],
      status: 'notStarted',
      tags: ['try hard'],
      photo:
        'https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg',
    },
    {
      date: '2022-11-22',
      createdBy: '4llower',
      description: 'Hi there   , this is test event',
      name: 'MMA Botaem',
      eventUsers: ['4llower', 'max', 'tsudd', 'slavik175cm'],
      status: 'notStarted',
      tags: ['mma', 'try hard'],
    },
    {
      date: '2022-11-22',
      createdBy: '4llower',
      description: 'Hi there, this is test event',
      name: 'MMA Botaem',
      eventUsers: ['4llower', 'max', 'tsudd', 'slavik175cm'],
      status: 'notStarted',
      tags: ['mma', 'try hard'],
    },
    {
      date: '2022-11-22',
      createdBy: '4llower',
      description: 'Hi there, this is test event',
      name: 'MMA Botaem',
      eventUsers: ['4llower', 'max', 'tsudd', 'slavik175cm'],
      status: 'notStarted',
      tags: ['mma', 'try hard'],
    },
    {
      date: '2022-11-22',
      createdBy: '4llower',
      description: 'Hi there, this is test event',
      name: 'MMA Botaem',
      eventUsers: ['4llower', 'max', 'tsudd', 'slavik175cm'],
      status: 'notStarted',
      tags: ['mma', 'try hard'],
    },
    {
      date: '2022-11-22',
      createdBy: '4llower',
      description: 'Hi there, this is test event',
      name: 'MMA Botaem',
      eventUsers: ['4llower', 'max', 'tsudd', 'slavik175cm'],
      status: 'notStarted',
      tags: ['mma', 'try hard'],
    },
    {
      date: '2022-11-22',
      createdBy: '4llower',
      description: 'Hi there, this is test event',
      name: 'MMA Botaem',
      eventUsers: ['4llower', 'max', 'tsudd', 'slavik175cm'],
      status: 'notStarted',
      tags: ['mma', 'try hard'],
    },
  ]

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
      />
    </View>
  )
}
