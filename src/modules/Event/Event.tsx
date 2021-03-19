import React from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  imageContainer: {
    flex: 1.4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    height: 'auto',
    width: '100%',
  },
  propsView: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  name: {
    marginTop: 15,
    fontSize: 30,
    fontFamily: 'MontserratBold',
  },
})

export const Event: React.FC<any> = ({ ...props }) => {
  const { name, description, photo, date, eventUsers, tags } = props.route.params
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {!photo && <Ionicons name="image" size={300} />}
        {photo && <Image source={{ uri: photo }} style={styles.image} />}
      </View>
      <ScrollView style={styles.propsView}>
        <Text style={styles.name}>{name}</Text>
        <Text>{description}</Text>
        <Text>{date}</Text>
        <Text>{tags}</Text>
        <Text>{eventUsers}</Text>
      </ScrollView>
    </View>
  )
}
