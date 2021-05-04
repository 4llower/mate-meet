import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TextInput, ActivityIndicator, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { Profile as IProfile } from '../../types/profile'
import { useClient } from '../../providers'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useForm } from '../../hooks'
import { object, string } from 'yup'

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  loaderHorizontal: {
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
    flex: 1,
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    height: 43,
    fontFamily: 'Montserrat',
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    fontFamily: 'Montserrat',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
})

const validationSchema = object().shape({
  firstName: string().required(),
  lastName: string().required(),
  phone: string().required(),
  description: string(),
})

export const Profile: React.FC = ({}) => {
  const [profile, setProfile] = useState<null | IProfile>(null)
  const client = useClient()
  const onSubmit = async (values: any) => console.log(values)

  const { field, submitProps, formik } = useForm({
    initialValues: {} as IProfile,
    validationSchema,
    onSubmit,
  })

  useEffect(() => {
    client.getProfile().then((response) => {
      formik.setValues(response)
      setProfile(response)
    })
  }, [client])

  if (!profile) {
    return (
      <View style={[styles.loaderContainer, styles.loaderHorizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.profilePhotoContainer}>
        {profile.avatar && <Image source={{ uri: profile.avatar }} style={styles.profilePhoto} />}
        {!profile.avatar && <Ionicons name="happy" size={200} />}
      </View>
      <View style={styles.container}>
        <TextInput style={styles.input} {...field('firstName')} />
        <TextInput style={styles.input} {...field('lastName')} />
        <TextInput style={styles.input} {...field('phone')} />
        <TextInput style={styles.input} {...field('description')} />
        <Button buttonStyle={styles.button} title="Save" {...submitProps} />
      </View>
    </View>
  )
}
