import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import Colors from '../Theme/Colors'

export default function Textbox(props) {
  const { modalText, textPlaceholder, charLimit, onChangeText, darkMode } = props
  const textStyles = getTextboxStylesheet(darkMode)
  return (
    <View style={textStyles.textContainer}>
      <TextInput
        onChangeText={(text) => onChangeText(text)}
        value={modalText}
        placeholder={textPlaceholder}
        placeholderTextColor={darkMode ? Colors.text2Dark : Colors.text2Light}
        style={textStyles.textInput}
        maxLength={charLimit}
        multiline={false}
      />
    </View>
  )
}

function getTextboxStylesheet(darkMode) {
  return StyleSheet.create({
    textContainer: {
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      borderColor: darkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
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
