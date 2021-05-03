import React, { useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { UserProps } from '../../types/user'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Input } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  profilePhoto: {
    borderRadius: 100,
    height: 200,
    width: 200,
  },
  profilePhotoContainer: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  profileContainer: {
    flex: 2,
    backgroundColor: 'black',
  },
})

// const dataWithPhoto: UserProps = {
//   name: 'Никита',
//   description:
//     'Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик',
//   profilePhoto:
//     'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg',
// }

const dataWithoutPhoto: UserProps = {
  name: 'Никита',
  description:
    'Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик Жамойдик',
}

export const Profile: React.FC = ({}) => {
  const [profile] = useState(dataWithoutPhoto)

  return (
    <View style={styles.container}>
      <View style={styles.profilePhotoContainer}>
        {profile.profilePhoto && (
          <Image source={{ uri: profile.profilePhoto }} style={styles.profilePhoto} />
        )}
        {!profile.profilePhoto && <Ionicons name="happy" size={200} />}
      </View>
      <View style={styles.profileContainer}></View>
    </View>
  )
}
