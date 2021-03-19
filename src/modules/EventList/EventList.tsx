import React from 'react'
import { FlatList, Text, View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

export const EventList: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { key: 'First' },
          { key: 'Second' },
          { key: 'Third' },
          { key: 'Four' },
          { key: 'Five' },
        ]}
        renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  )
}
