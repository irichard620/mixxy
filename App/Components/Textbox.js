import { TextInput, View } from 'react-native'
import React from 'react'
import Colors from '../Theme/Colors'
import { PropTypes } from 'prop-types'
import getComponentStylesheet from './ComponentStyle'

export default function Textbox(props) {
  const { modalText, textPlaceholder, charLimit, onChangeText, darkMode } = props
  const componentStyles = getComponentStylesheet(darkMode)
  return (
    <View style={componentStyles.textboxContainer}>
      <TextInput
        onChangeText={(text) => onChangeText(text)}
        value={modalText}
        placeholder={textPlaceholder}
        placeholderTextColor={darkMode ? Colors.text2Dark : Colors.text2Light}
        style={componentStyles.textboxInput}
        maxLength={charLimit}
        multiline={false}
      />
    </View>
  )
}

Textbox.propTypes = {
  modalText: PropTypes.string,
  textPlaceholder: PropTypes.string,
  charLimit: PropTypes.number,
  onChangeText: PropTypes.func,
  darkMode: PropTypes.bool,
}
