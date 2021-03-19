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
} from 'react-native'

import { Button } from 'react-native-elements'
import { APP_NAVIGATION } from '../../enums/navigation'
import { useForm } from '../../hooks'
import { object, string } from 'yup'

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
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
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  signUpText: {
    fontSize: 20,
    marginLeft: 30,
    marginRight: 15,
    marginTop: 15,
  },
  signUpLink: {
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

  const validationSchema = object().shape({
    login: string().required(),
    password: string().required(),
  })

  const onSubmit = async (values: any) => {
    console.log(values)
    // TO DO: Api integration
    reset({ index: 0, routes: [{ name: APP_NAVIGATION.EVENTLIST }] }) // if login was success
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
