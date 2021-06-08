import React from 'react'
import { EventProps } from '../../../../types'
import { View, StyleSheet, Text, TouchableNativeFeedback } from 'react-native'
// import Ionicons from 'react-native-vector-icons/Ionicons'
import { cutIfMaximumLengthExceeded } from './helpers'
import moment from 'moment'
import { Participants } from './components'
import { parseDescriptionToDescriptionAndGeo } from '../../../../helpers'
// import { generateTagsView } from '../../../../helpers'
// import { config } from '../../../../config'

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
    borderRadius: 10,
  },
  description: {
    marginLeft: 15,
  },
  name: {
    fontFamily: 'MontserratBold',
    marginBottom: 3,
  },
  field: {
    fontFamily: 'Montserrat',
  },
  link: {
    color: '#0645AD',
    marginTop: 5,
    fontFamily: 'Montserrat',
  },
  date: {
    position: 'absolute',
    right: 10,
    fontSize: 12,
    fontFamily: 'Montserrat',
    bottom: 7,
    opacity: 0.5,
  },
  users: {
    position: 'absolute',
    fontSize: 12,
    bottom: 7,
    fontFamily: 'Montserrat',
    left: 22,
  },
})

interface Props extends EventProps {
  onPress: () => void
}

export const EventPreview: React.FC<Props> = ({
  name,
  description,
  date,
  participants,
  onPress,
}) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.description}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.field}>
            {cutIfMaximumLengthExceeded(
              parseDescriptionToDescriptionAndGeo(description).description,
            )}
          </Text>
          {/*<Text style={styles.link}>{generateTagsView(tags)}</Text>*/}
        </View>
        <Text style={styles.date}>{moment(date).format('MMM Do, h:mm a')}</Text>
        <Participants numberParticipants={participants.length} />
      </View>
    </TouchableNativeFeedback>
  )
}
