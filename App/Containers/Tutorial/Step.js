import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Step(props) {
  const { title, description, activeStep } = props

  const titleColor = {
    color: '#2D8CD3',
  }
  if (!activeStep) {
    titleColor.color = '#898989'
  }

  return (
    <View style={styles.outline}>
      <Text style={[styles.title, titleColor]}>{title}</Text>
      {activeStep && <Text style={styles.description}>{description}</Text>}
      <View style={styles.mainSeparator} />
    </View>
  )
}

const styles = StyleSheet.create({
  description: {
    color: '#000000',
    fontSize: 16,
    marginTop: 4,
    textAlign: 'center',
  },
  mainSeparator: {
    backgroundColor: '#F1F3F6',
    height: 1,
    marginTop: 16,
    width: '100%',
  },
  outline: {
    alignItems: 'center',
    paddingTop: 16,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
})
