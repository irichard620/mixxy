import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Colors from '../Theme/Colors'
import { PropTypes } from 'prop-types'

export default function ClickableTextbox(props) {
  const { modalText, textPlaceholder, onClick, darkMode } = props
  const textStyles = getTextboxStylesheet(darkMode)

  let textColor = darkMode ? Colors.text1Dark : Colors.text1Light
  let textToShow = modalText
  if (modalText === '') {
    textColor = darkMode ? Colors.text2Dark : Colors.text2Light
    textToShow = textPlaceholder
  }
  const textStyle = {
    color: textColor,
    fontSize: 16,
    width: '100%',
  }
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={textStyles.textContainer}>
        <Text style={textStyle}>{textToShow}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

ClickableTextbox.propTypes = {
  modalText: PropTypes.string,
  textPlaceholder: PropTypes.string,
  onClick: PropTypes.func,
  darkMode: PropTypes.bool,
}

function getTextboxStylesheet(darkMode) {
  return StyleSheet.create({
    textContainer: {
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      borderColor: darkMode ? Colors.darkFill1Dark : Colors.darkFill1Light,
      borderRadius: 10,
      borderWidth: 0.5,
      marginBottom: 24,
      marginLeft: 16,
      marginRight: 16,
      padding: 14,
    },
    textInput: {
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      fontSize: 16,
      width: '100%',
    },
  })
}
