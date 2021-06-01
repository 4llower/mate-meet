import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import moment from 'moment'
import { parseDescriptionToDescriptionAndGeo } from '../../helpers'

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f8f8ff',
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
    marginBottom: 30,
    textAlign: 'center',
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
  const { name, description, date, participants } = props.route.params
  return (
    <View style={styles.container}>
      <ScrollView style={styles.propsView}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.descriptionView}>
          <Text style={styles.title}>{'Description:'}</Text>
          <Text style={styles.description}>
            {parseDescriptionToDescriptionAndGeo(description).description}
          </Text>
        </View>
        <View style={styles.descriptionView}>
          <Text style={styles.title}>{'Participants:'}</Text>
          {participants.map((user: any) => (
            <Text style={styles.link} key={user.fullName}>
              {user.fullName}
            </Text>
          ))}
        </View>
        <View style={styles.descriptionView}>
          <Text style={styles.title}>{'Date:'}</Text>
          <Text style={styles.description}>{moment(date).format('MMMM Do YYYY, h:mm a')}</Text>
        </View>
        <View style={styles.descriptionView}>
          <Text style={styles.title}>{'Address:'}</Text>
          <Text style={styles.description}>
            {parseDescriptionToDescriptionAndGeo(description).geo}
          </Text>
        </View>
        {/*<View style={styles.descriptionView}>*/}
        {/*  <Text style={styles.title}>{'Tags:'}</Text>*/}
        {/*  <Text style={styles.link}>{generateTagsView(tags, 20)}</Text>*/}
        {/*</View>*/}
        <View style={styles.enterButton}>
          <Button title="Connect" />
        </View>
      </ScrollView>
    </View>
  )
}
