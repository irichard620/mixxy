
import React from 'react';
import {
  View, Text, TouchableOpacity
} from 'react-native';
import { DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode'
import Colors from '../Theme/Colors'
import Fonts from '../Theme/Fonts'

export default function ButtonLarge(props) {
  const {
    onButtonClick, title, margin, disabled, buttonWidth,
    buttonHeight, isPrimary
  } = props;

  // Base button style
  const buttonStyles = useDynamicStyleSheet(ButtonLargeStyles)
  let baseStyle = buttonStyles.primaryButton
  if (!isPrimary) {
    baseStyle = buttonStyles.secondaryButton
  }

  // Custom button styles
  const customStyle = {
    marginTop: margin[0],
    marginRight: margin[1],
    marginBottom: margin[2],
    marginLeft: margin[3],
  };
  if (buttonWidth) {
    customStyle.width = buttonWidth;
  }
  if (buttonHeight) {
    customStyle.height = buttonHeight;
  }

  // Text style
  let textStyle = buttonStyles.primaryText
  if (!isPrimary) {
    textStyle = buttonStyles.secondaryText
  }

  return (
    <TouchableOpacity
      style={[baseStyle, customStyle]}
      onPress={onButtonClick}
      disabled={disabled}
    >
      <View>
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const baseButtonStyle = {
  height: 48,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
}


const ButtonLargeStyles = new DynamicStyleSheet({
  primaryButton: {
    ...baseButtonStyle,
    backgroundColor: Colors.blue1,
  },
  secondaryButton: {
    ...baseButtonStyle,
    backgroundColor: new DynamicValue(Colors.darkFill2Light, Colors.darkFill2Dark),
    borderWidth: 0.5,
    borderColor: new DynamicValue(Colors.darkFill1Light, Colors.darkFill1Dark)
  },
  primaryText: {
    ...Fonts.buttonText,
    color: Colors.white,
  },
  secondaryText: {
    ...Fonts.buttonText,
    color: new DynamicValue(Colors.text1Light, Colors.text1Dark)
  }
})
