import React from 'react'
import { TextInputProps, TextInput as RNTextInput, StyleSheet } from 'react-native'

interface Props extends TextInputProps {
  error?: string
}

const errorStyles = StyleSheet.create({
  error: {
    borderColor: 'red',
  },
})

export const TextInput: React.FC<Props> = ({ error, style, ...props }) => {
  return <RNTextInput {...props} style={StyleSheet.compose(style, !!error && errorStyles.error)} />
}
