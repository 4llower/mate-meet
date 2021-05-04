import React, { useEffect, useState } from 'react'

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
import { showFileName } from '../../helpers'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
// import { useNavigation } from '@react-navigation/native'

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
    marginTop: 60,
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
  picker: {
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    borderWidth: 1,
    marginLeft: 15,
    marginTop: 10,
    marginRight: 15,
    padding: 10,
  },
  upload: {
    flex: 0.5,
    marginLeft: 15,
    marginRight: 15,
    height: 50,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadFileName: {
    marginLeft: 15,
    fontFamily: 'Montserrat',
  },
})

const initialValues = {
  title: '',
  description: '',
  address: '',
  date: '',
}

export const CreateEvent = () => {
  const validationSchema = object().shape({
    title: string().required(),
    description: string().required(),
    address: string().email(),
    date: string(),
    eventPhoto: string(),
  })

  // const { reset } = useNavigation()

  const [eventPhoto, setEventPhoto] = useState<
    (DocumentPicker.DocumentResult & { name?: string }) | null
  >(null)

  const onSubmit = async (values: any) => {
    console.log(values)
  }

  const { field, submitProps } = useForm({
    validationSchema,
    initialValues,
    onSubmit: onSubmit,
  })

  const onFileUpload = async () =>
    setEventPhoto(await DocumentPicker.getDocumentAsync({ type: 'image/*' }))

  const [time, setTime] = useState(moment())
  const [date, setDate] = useState(moment())

  const [showDate, setShowDate] = useState(false)
  const [showTime, setShowTime] = useState(false)

  const handleShowDate = () => setShowDate(true)
  const handleShowTime = () => setShowTime(true)

  useEffect(() => {
    field('date').onChangeText(date.format('MMMM Do YYYY') + ' ' + time.format('h:mm:ss'))
  }, [date, time])

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>New Event</Text>
            <TextInput
              placeholder="Title"
              placeholderTextColor="#c4c3cb"
              style={styles.loginFormTextInput}
              {...field('title')}
            />
            <TextInput
              placeholder="Description"
              numberOfLines={3}
              {...field('description')}
              placeholderTextColor="#c4c3cb"
              style={styles.loginFormTextInput}
            />
            <TextInput
              placeholder="Address"
              placeholderTextColor="#c4c3cb"
              {...field('address')}
              style={styles.loginFormTextInput}
            />
            <Text style={styles.picker} onPress={handleShowDate}>
              {date.format('MMMM Do YYYY')}
            </Text>
            <Text style={styles.picker} onPress={handleShowTime}>
              {time.format('h:mm')}
            </Text>
            {showDate && (
              <DateTimePicker
                testID="datePicker"
                value={moment(date).toDate()}
                is24Hour={true}
                display="default"
                mode="date"
                onChange={(event, value) => {
                  setShowDate(event.nativeEvent.returnValue)
                  if (value) setDate(moment(value))
                }}
              />
            )}
            {showTime && (
              <DateTimePicker
                testID="timePicker"
                value={moment(time).toDate()}
                is24Hour={true}
                display="default"
                mode="time"
                onChange={(event, value) => {
                  setShowTime(event.nativeEvent.returnValue)
                  if (value) setTime(moment(value))
                }}
              />
            )}
            <View style={styles.upload}>
              <Button onPress={onFileUpload} icon={{ name: 'camera' }} type="outline" />
              <Text style={styles.uploadFileName}>
                {showFileName(eventPhoto?.name, 'Choose event photo')}
              </Text>
            </View>
            <Button buttonStyle={styles.loginButton} title="Create New Event" {...submitProps} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
