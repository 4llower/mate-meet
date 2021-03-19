import React from 'react'
import { EventProps } from '../../../../types'
import { View, Image, StyleSheet, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { cutIfMaximumLengthExceeded, generateTagsView } from './helpers'

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
  name: {
    fontFamily: 'MontserratBold',
  },
  field: {
    fontFamily: 'Montserrat',
  },
  link: {
    color: '#0645AD',
    marginRight: 2,
    fontFamily: 'Montserrat',
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
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.field}>{cutIfMaximumLengthExceeded(description)}</Text>
        <Text style={styles.link}>{generateTagsView(tags)}</Text>
      </View>
    </View>
  )
}
