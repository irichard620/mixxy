import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Colors from '../Theme/Colors'
import Fonts from '../Theme/Fonts'
import { PropTypes } from 'prop-types'
import getComponentStylesheet from './ComponentStyle'

export default function ButtonLarge(props) {
  const {
    onButtonClick,
    title,
    margin,
    disabled,
    buttonWidth,
    buttonHeight,
    isPrimary,
    colorOverride,
    textColorOverride,
    hideBorder,
    darkMode,
  } = props

  // Base button style
  const componentStyles = getComponentStylesheet(darkMode)
  let baseStyle = componentStyles.primaryButtonLarge
  if (!isPrimary) {
    baseStyle = componentStyles.secondaryButtonLarge
  } else if (disabled) {
    baseStyle = componentStyles.disabledButtonLarge
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
  if (colorOverride) {
    customStyle.backgroundColor = colorOverride
  }
  if (hideBorder) {
    customStyle.borderWidth = 0
  }

  // Text style
  let textStyle = buttonLargeStyles.primaryText
  if (!isPrimary) {
    textStyle = componentStyles.secondaryTextButtonLarge
  }
  let customTextStyle = {}
  if (textColorOverride) {
    customTextStyle.color = textColorOverride
  }

  return (
    <TouchableOpacity style={[baseStyle, customStyle]} onPress={onButtonClick} disabled={disabled}>
      <View>
        <Text style={[textStyle, customTextStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

ButtonLarge.propTypes = {
  margin: PropTypes.array,
  title: PropTypes.string,
  colorOverride: PropTypes.string,
  textColorOverride: PropTypes.string,
  onButtonClick: PropTypes.func,
  darkMode: PropTypes.bool,
  disabled: PropTypes.bool,
  hideBorder: PropTypes.bool,
  buttonWidth: PropTypes.number,
  buttonHeight: PropTypes.number,
  isPrimary: PropTypes.bool,
}

const buttonLargeStyles = StyleSheet.create({
  primaryText: {
    ...Fonts.buttonText,
    color: Colors.white,
  },
})
