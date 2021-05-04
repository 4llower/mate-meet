import React, { useState } from 'react'

import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from 'react-native'

import { Button } from 'react-native-elements'
import { useForm } from '../../hooks'
import { object, string } from 'yup'
import * as DocumentPicker from 'expo-document-picker'
import { APP_NAVIGATION } from '../../enums/navigation'
import { useNavigation } from '@react-navigation/native'
import { showFileName } from '../../helpers'
import { useClient, useToken } from '../../providers'

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: 'white',
    fontFamily: 'Montserrat',
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    fontFamily: 'Montserrat',
    marginTop: 90,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1,
    fontFamily: 'Montserrat',
  },
  loginFormTextInput: {
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
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    fontFamily: 'Montserrat',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  fbLoginButton: {
    height: 45,
    fontFamily: 'Montserrat',
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  upload: {
    flex: 0.5,
    marginLeft: 15,
    marginRight: 15,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadFileName: {
    marginLeft: 15,
    fontFamily: 'Montserrat',
  },
})

const initialValues = {
  login: '',
  email: '',
  description: '',
  password: '',
}

export const Register = () => {
  const validationSchema = object().shape({
    login: string().required(),
    password: string().required(),
    email: string().email(),
    description: string(),
  })

  const { reset } = useNavigation()

  const [avatar, setAvatar] = useState<(DocumentPicker.DocumentResult & { name?: string }) | null>(
    null,
  )

  const [repeatedPassword, setRepeatedPassword] = useState<string>('')
  const client = useClient()
  const { setToken } = useToken()

  const onSubmit = async (values: any) => {
    if (values.password != repeatedPassword) {
      Alert.alert("Passwords don't match")
      return
    }
    const { ok } = await client.register({ login: values.login, password: values.password })
    if (ok) {
      const data = await client.auth({ login: values.login, password: values.password })
      if (data.ok) {
        setToken(data.access)
        void (await client.createProfile(values, data.access))
        reset({ index: 0, routes: [{ name: APP_NAVIGATION.MAIN_SCREEN }] })
      } else Alert.alert('Something went wrong')
    } else Alert.alert('Something went wrong')
  }

  const { field, submitProps } = useForm({
    validationSchema,
    initialValues,
    onSubmit: onSubmit,
  })

  const onFileUpload = async () =>
    setAvatar(await DocumentPicker.getDocumentAsync({ type: 'image/*' }))

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Register</Text>
            <TextInput
              placeholder="Username*"
              placeholderTextColor="#c4c3cb"
              style={styles.loginFormTextInput}
              {...field('login')}
            />
            <TextInput
              placeholder="Email*"
              {...field('email')}
              placeholderTextColor="#c4c3cb"
              style={styles.loginFormTextInput}
            />
            <TextInput
              placeholder="Description"
              placeholderTextColor="#c4c3cb"
              {...field('description')}
              style={styles.loginFormTextInput}
            />
            <TextInput
              placeholder="Password*"
              placeholderTextColor="#c4c3cb"
              {...field('password')}
              style={styles.loginFormTextInput}
              secureTextEntry={true}
            />
            <TextInput
              placeholder="Repeat password*"
              placeholderTextColor="#c4c3cb"
              value={repeatedPassword}
              onChangeText={(value) => setRepeatedPassword(value)}
              style={styles.loginFormTextInput}
              secureTextEntry={true}
            />
            <View style={styles.upload}>
              <Button onPress={onFileUpload} icon={{ name: 'camera' }} type="outline" />
              <Text style={styles.uploadFileName}>{showFileName(avatar?.name)}</Text>
            </View>
            <Button buttonStyle={styles.loginButton} title="Register" {...submitProps} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
