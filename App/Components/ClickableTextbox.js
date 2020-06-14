import { StyleSheet, Text, TouchableWithoutFeedback, View, Image, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../Theme/Colors'
import { PropTypes } from 'prop-types'
import Images from '../Theme/Images'

export default function ClickableTextbox(props) {
  const { modalText, textPlaceholder, onClick, darkMode } = props
  const textStyles = getTextboxStylesheet(darkMode)

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
      <View style={textStyles.textContainer}>
        <Text style={textStyle}>{textToShow}</Text>
        <Image
          style={textStyles.icon}
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

function getTextboxStylesheet(darkMode) {
  return StyleSheet.create({
    icon: {
      height: 12,
      resizeMode: 'contain',
    },
    textContainer: {
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      borderColor: darkMode ? Colors.darkFill1Dark : Colors.darkFill1Light,
      borderRadius: 10,
      borderWidth: 0.5,
      marginBottom: 24,
      marginLeft: 16,
      marginRight: 16,
      padding: 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  })
}
