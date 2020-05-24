import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../Theme/Colors'

export default function Button(props) {
  const { onButtonClick, title, margin, disabled, darkMode } = props

  const backgroundStyle = {
    marginTop: margin[0],
    marginRight: margin[1],
    marginBottom: margin[2],
    marginLeft: margin[3],
  }
  backgroundStyle.backgroundColor = darkMode ? Colors.blue1TransparentDark : Colors.blue1TransparentLight
  const titleStyle = {
    color: Colors.blue1,
  }
  return (
    <TouchableOpacity
      style={[styles.button, backgroundStyle]}
      onPress={onButtonClick}
      disabled={disabled}
    >
      <View style={styles.glyphContainer}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 18,
    paddingRight: 18,
    shadowColor: Colors.backgroundColorDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  glyphContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
})
