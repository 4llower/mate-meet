import { useNavigation } from '@react-navigation/native'
import React from 'react'

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
import { APP_NAVIGATION } from '../../enums/navigation'
import { useForm } from '../../hooks'
import { object, string } from 'yup'
import { useClient, useToken } from '../../providers'

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: 'white',
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 150,
    marginBottom: 30,
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1,
    fontFamily: 'Montserrat',
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    fontFamily: 'Montserrat',
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
    fontFamily: 'Montserrat',
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    fontFamily: 'Montserrat',
    backgroundColor: 'transparent',
  },
  signUpText: {
    fontSize: 18,
    marginLeft: 30,
    marginRight: 15,
    marginTop: 15,
    fontFamily: 'Montserrat',
  },
  signUpLink: {
    fontFamily: 'Montserrat',
    color: 'blue',
  },
})

const initialValues = {
  login: '',
  password: '',
}

export const Login = () => {
  const { navigate, reset } = useNavigation()

  const onSignUpPress = () => navigate(APP_NAVIGATION.REGISTER)

  const { setToken } = useToken()
  const client = useClient()

  const validationSchema = object().shape({
    login: string().required(),
    password: string().required(),
  })

  const onSubmit = async (values: any) => {
    const data = await client.auth(values)
    if (data.ok) {
      setToken(data.refresh)
      reset({ index: 0, routes: [{ name: APP_NAVIGATION.MAIN_SCREEN }] })
    } else {
      Alert.alert('Error', 'Invalid Credentials')
    }
  }

  const { field, submitProps } = useForm({
    validationSchema: validationSchema,
    initialValues: initialValues,
    onSubmit: onSubmit,
  })

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Connect to us</Text>
            <TextInput
              placeholder="Username"
              placeholderTextColor="#c4c3cb"
              style={styles.loginFormTextInput}
              {...field('login', true)}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
              {...field('password', true)}
            />
            <Button buttonStyle={styles.loginButton} title="Login" {...submitProps} />
            <Text style={styles.signUpText}>
              You don't have account?{' '}
              <Text onPress={onSignUpPress} style={styles.signUpLink}>
                Sign up
              </Text>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
