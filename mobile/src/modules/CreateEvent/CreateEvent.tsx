import React, { useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { UserProps } from '../../types/user'
import Ionicons from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  container: {},
  profilePhoto: {
    borderRadius: 100,
    height: 100,
    width: 100,
  },
})

const dataWithPhoto: UserProps = {
  name: 'Никита',
  description:
    'Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик',
  profilePhoto:
    'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg',
}

const dataWithoutPhoto: UserProps = {
  name: 'Никита',
  description:
    'Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик',
}

export const CreateEvent: React.FC = ({}) => {
  const [profile] = useState(dataWithPhoto)

  return (
    <View style={styles.container}>
      {profile.profilePhoto && (
        <Image source={{ uri: profile.profilePhoto }} style={styles.profilePhoto} />
      )}
      {!profile.profilePhoto && <Ionicons name="happy" />}
    </View>
  )
}
