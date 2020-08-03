import { StyleSheet, Text, TouchableWithoutFeedback, View, Image, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../Theme/Colors'
import { PropTypes } from 'prop-types'
import Images from '../Theme/Images'
import getComponentStylesheet from './ComponentStyle'

export default function ClickableTextbox(props) {
  const { modalText, textPlaceholder, onClick, darkMode } = props
  const componentStyles = getComponentStylesheet(darkMode)

  let textColor = darkMode ? Colors.text1Dark : Colors.text1Light
  let textToShow = modalText
  if (modalText === '') {
    textColor = darkMode ? Colors.text2Dark : Colors.text2Light
    textToShow = textPlaceholder
  }
  const { width } = Dimensions.get('window')
  const textStyle = {
    color: textColor,
    fontSize: 16,
    width: width - 32 - 14 - 14 - 10,
  }
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={componentStyles.clickableTextboxTextContainer}>
        <Text style={textStyle}>{textToShow}</Text>
        <Image
          style={clickableTextboxStyles.icon}
          source={darkMode ? Images.builderUnitArrowDark : Images.builderUnitArrowLight}
        />
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

const clickableTextboxStyles = StyleSheet.create({
  icon: {
    height: 12,
    resizeMode: 'contain',
  },
})
