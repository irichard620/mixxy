import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Colors from '../Theme/Colors'
import Fonts from '../Theme/Fonts'
import { PropTypes } from 'prop-types'

export default function ButtonLarge(props) {
  const {
    onButtonClick,
    title,
    margin,
    disabled,
    buttonWidth,
    buttonHeight,
    isPrimary,
    darkMode,
  } = props

  // Base button style
  const buttonStyles = getButtonLargeStylesheet(darkMode)
  let baseStyle = buttonStyles.primaryButton
  if (!isPrimary) {
    baseStyle = buttonStyles.secondaryButton
  } else if (disabled) {
    baseStyle = buttonStyles.disabledButton
  }

  // Custom button styles
  const customStyle = {
    marginTop: margin[0],
    marginRight: margin[1],
    marginBottom: margin[2],
    marginLeft: margin[3],
  }
  if (buttonWidth) {
    customStyle.width = buttonWidth
  }
  if (buttonHeight) {
    customStyle.height = buttonHeight
  }

  // Text style
  let textStyle = buttonStyles.primaryText
  if (!isPrimary) {
    textStyle = buttonStyles.secondaryText
  }

  return (
    <TouchableOpacity style={[baseStyle, customStyle]} onPress={onButtonClick} disabled={disabled}>
      <View>
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

ButtonLarge.propTypes = {
  margin: PropTypes.array,
  title: PropTypes.string,
  onButtonClick: PropTypes.func,
  darkMode: PropTypes.bool,
  disabled: PropTypes.bool,
  buttonWidth: PropTypes.number,
  buttonHeight: PropTypes.number,
  isPrimary: PropTypes.bool,
}

const baseButtonStyle = {
  height: 48,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
}

function getButtonLargeStylesheet(darkMode) {
  return StyleSheet.create({
    disabledButton: {
      ...baseButtonStyle,
      backgroundColor: darkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
    },
    primaryButton: {
      ...baseButtonStyle,
      backgroundColor: Colors.blue1,
    },
    primaryText: {
      ...Fonts.buttonText,
      color: Colors.white,
    },
    secondaryButton: {
      ...baseButtonStyle,
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      borderColor: darkMode ? Colors.darkFill1Dark : Colors.darkFill1Light,
      borderWidth: 0.5,
    },
    secondaryText: {
      ...Fonts.buttonText,
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
    },
  })
}
