import React from 'react'
import { EventProps } from '../../../../types'
import { View, Image, StyleSheet, Text } from 'react-native'
import { images } from './images'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 120,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
  },
  previewImage: {
    height: 10,
    width: 10,
  },
})

export const EventPreview: React.FC<EventProps> = ({
  name,
  description,
  photo,
  createdBy,
  date,
  eventUsers,
  status,
  tags,
  rate,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: photo ?? images.defaultImage }} style={styles.previewImage} />
      <Text>{name}</Text>
    </View>
  )
}
