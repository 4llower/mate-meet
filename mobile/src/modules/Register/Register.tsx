import React, { useEffect, useState } from 'react'

import {
  Keyboard,
  Text,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from 'react-native'

import { Button } from 'react-native-elements'
import { useForm } from '../../hooks'
import { object, string } from 'yup'
// import * as DocumentPicker from 'expo-document-picker'
import { APP_NAVIGATION } from '../../enums/navigation'
import { useNavigation } from '@react-navigation/native'
// import { showFileName } from '../../helpers'
import { useClient, useToken } from '../../providers'
import { TextInput } from '../../components'

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

const validationSchema = object().shape({
  login: string().required(),
  password: string().required(),
  email: string().email(),
  description: string(),
})

export const Register = () => {
  const { reset } = useNavigation()
  // const [avatar, setAvatar] = useState<(DocumentPicker.DocumentResult & { name?: string }) | null>(
  //   null,
  // )
  const [repeatedPassword, setRepeatedPassword] = useState<string>('')
  const client = useClient()
  const { setToken } = useToken()
  const [passwordRules, setPasswordRules] = useState<{
    minLength?: boolean
    hasUpperCaseAndLowerCase?: boolean
    hasSymbolOrDigit?: boolean
  }>({})

  const onSubmit = async (values: any) => {
    let isPasswordCorrect = true
    Object.entries(passwordRules).forEach(([, value]) => {
      if (!isPasswordCorrect) return
      if (!value) isPasswordCorrect = false
    })
    if (!isPasswordCorrect) {
      Alert.alert('Error', "Password doesn't fit the condition")
      return
    }
    if (values.password != repeatedPassword) {
      Alert.alert('Error', "Passwords don't match")
      return
    }
    const { ok } = await client.register({ login: values.login, password: values.password })
    if (ok) {
      const data = await client.auth({ login: values.login, password: values.password })
      if (data.ok) {
        setToken(data.access)
        void (await client.createProfile(values, data.access))
        reset({ index: 0, routes: [{ name: APP_NAVIGATION.MAIN_SCREEN }] })
      } else Alert.alert('Error', 'Something went wrong')
    } else Alert.alert('Error', 'Something went wrong')
  }

  // const onFileUpload = async () =>
  //   setAvatar(await DocumentPicker.getDocumentAsync({ type: 'image/*' }))

  const { field, submitProps, formik } = useForm({
    validationSchema,
    initialValues,
    onSubmit: onSubmit,
  })

  useEffect(() => {
    const password = String(formik.values.password)
    if (password) {
      const rules = {
        minLength: false,
        hasSymbolOrDigit: false,
        hasUpperCaseAndLowerCase: false,
      }
      if (password.length >= 8) {
        rules.minLength = true
      }
      const lowerCaseAndUpperCase = {
        lowerCase: false,
        upperCase: false,
      }
      new Array(password.length).forEach((_, index) => {
        const char = password.charAt(index)
        if (char >= '0' && char <= '9') rules.hasSymbolOrDigit = true
        if ('!$%^&*()_+|~-=`{}[]:";\'<>?,./'.includes(char)) rules.hasSymbolOrDigit = true
        if (char >= 'a' && char <= 'z') lowerCaseAndUpperCase.lowerCase = true
        if (char >= 'A' && char <= 'Z') lowerCaseAndUpperCase.upperCase = true
      })
      if (lowerCaseAndUpperCase['lowerCase'] && lowerCaseAndUpperCase['upperCase'])
        rules.hasUpperCaseAndLowerCase = true
      setPasswordRules(rules)
    }
  }, [formik.values, setPasswordRules])

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
            {/*<View style={styles.upload}>*/}
            {/*  <Button onPress={onFileUpload} icon={{ name: 'camera' }} type="outline" />*/}
            {/*  <Text style={styles.uploadFileName}>{showFileName(avatar?.name)}</Text>*/}
            {/*</View>*/}
            <Button buttonStyle={styles.loginButton} title="Register" {...submitProps} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
