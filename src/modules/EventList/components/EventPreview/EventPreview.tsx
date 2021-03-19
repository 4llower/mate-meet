import React from 'react'
import { EventProps } from '../../../../types'
import { View, Image, StyleSheet, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

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
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewImage: {
    height: 65,
    width: 79,
    marginLeft: 6,
    borderRadius: 6,
  },
  description: {
    marginLeft: 15,
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
      {!photo && <Ionicons name="image" size={90} />}
      {photo && <Image source={{ uri: photo }} style={styles.previewImage} />}
      <View style={styles.description}>
        <Text>{name}</Text>
        <Text>{description}</Text>
        <Text>{tags}</Text>
      </View>
    </View>
  )
}
