import React from 'react'

import { Text, StyleSheet } from 'react-native'

interface Props {
  correct?: boolean
}

const styles = StyleSheet.create({
  correct: {
    color: 'green',
  },
  default: {
    marginTop: 2,
    fontFamily: 'Montserrat',
    color: 'red',
    fontWeight: '500',
  },
})

export const PasswordRule: React.FC<Props> = ({ correct, children }) => {
  return (
    <Text style={StyleSheet.compose(styles.default, correct && styles.correct)}>
      {children} {correct ? '[+]' : '[x]'}
    </Text>
  )
}
