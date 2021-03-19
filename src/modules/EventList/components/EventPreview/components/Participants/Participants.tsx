import React from 'react'

import { Text, StyleSheet, View } from 'react-native'

interface Props {
  numberParticipants: number
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: 100,
    borderColor: '#1890ff',
    backgroundColor: '#1890ff',
    color: 'white',
    borderWidth: 2,
    width: 30,
    height: 30,
    right: 5,
    top: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontFamily: 'Montserrat',
    color: 'white',
  },
})

export const Participants: React.FC<Props> = ({ numberParticipants }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{numberParticipants}</Text>
    </View>
  )
}
