
import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet
} from 'react-native';
import Colors from '../Theme/Colors'
import Fonts from '../Theme/Fonts'

export default function ButtonLarge(props) {
  const {
    onButtonClick, title, margin, disabled, buttonWidth,
    buttonHeight, isPrimary, darkMode
  } = props;

  // Base button style
  const buttonStyles = getButtonLargeStylesheet(darkMode)
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


function getButtonLargeStylesheet(darkMode) {
  return StyleSheet.create({
    primaryButton: {
      ...baseButtonStyle,
      backgroundColor: Colors.blue1,
    },
    secondaryButton: {
      ...baseButtonStyle,
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      borderWidth: 0.5,
      borderColor: darkMode ? Colors.darkFill1Dark : Colors.darkFill1Light
    },
    primaryText: {
      ...Fonts.buttonText,
      color: Colors.white,
    },
    secondaryText: {
      ...Fonts.buttonText,
      color: darkMode ? Colors.text1Dark : Colors.text1Light
    }
  })
}
