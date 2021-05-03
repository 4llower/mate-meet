import React from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Button } from 'react-native-elements'
import { generateTagsView } from '../../helpers'
import moment from 'moment'

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  image: {
    height: 250,
    width: '100%',
  },
  propsView: {},
  name: {
    marginTop: 15,
    marginLeft: 15,
    fontSize: 30,
    fontFamily: 'MontserratBold',
  },
  descriptionView: {
    marginVertical: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  description: {
    fontFamily: 'Montserrat',
    fontSize: 16,
  },
  link: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    color: '#0645AD',
  },
  title: {
    fontFamily: 'MontserratBold',
    fontSize: 17,
  },
  enterButton: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  defaultIconView: { flex: 1, flexDirection: 'row', justifyContent: 'center' },
})

export const Event: React.FC<any> = ({ ...props }) => {
  const { name, description, photo, date, eventUsers, tags } = props.route.params
  return (
    <View style={styles.container}>
      <ScrollView style={styles.propsView}>
        {!photo && (
          <View style={styles.defaultIconView}>
            <Ionicons name="image" size={200} />
          </View>
        )}
        {photo && <Image source={{ uri: photo }} style={styles.image} />}
        <Text style={styles.name}>{name}</Text>
        <View style={styles.descriptionView}>
          <Text style={styles.title}>{'Description:'}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.descriptionView}>
          <Text style={styles.title}>{'Participants:'}</Text>
          {eventUsers.map((user: any) => (
            <Text style={styles.link} key={user}>
              {user}
            </Text>
          ))}
        </View>
        <View style={styles.descriptionView}>
          <Text style={styles.title}>{'Date:'}</Text>
          <Text style={styles.description}>{moment(date).format('MMMM Do YYYY, h:mm a')}</Text>
        </View>
        <View style={styles.descriptionView}>
          <Text style={styles.title}>{'Tags:'}</Text>
          <Text style={styles.link}>{generateTagsView(tags, 20)}</Text>
        </View>
        <View style={styles.enterButton}>
          <Button title="Enter" />
        </View>
      </ScrollView>
    </View>
  )
}
