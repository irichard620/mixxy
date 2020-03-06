import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function PullDown() {
  return <View style={styles.pulldown} />
}

const styles = StyleSheet.create({
  pulldown: {
    alignSelf: 'center',
    backgroundColor: '#E3E3E3',
    borderRadius: 3,
    height: 6,
    width: 40,
  },
})
