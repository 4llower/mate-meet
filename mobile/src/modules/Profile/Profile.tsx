import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, TextInput, ActivityIndicator } from 'react-native'
import { UserProps } from '../../types/user'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Profile as IProfile } from '../../types/profile'
import { useClient } from '../../providers'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
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

export const Profile: React.FC = ({}) => {
  const [profile, setProfile] = useState<null | IProfile>(null)
  const client = useClient()

  useEffect(() => {
    client.getProfile().then(setProfile)
  }, [client])

  if (!profile) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.profilePhotoContainer}>
        {/*{profile.profilePhoto && (*/}
        {/*  <Image source={{ uri: profile.profilePhoto }} style={styles.profilePhoto} />*/}
        {/*)}*/}
        {/*{!profile.profilePhoto && <Ionicons name="happy" size={200} />}*/}
      </View>
      <View style={styles.profileContainer}>
        <TextInput />
      </View>
    </View>
  )
}
