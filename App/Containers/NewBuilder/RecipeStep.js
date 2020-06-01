import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import React from 'react'
import Colors from '../../Theme/Colors'
import { PropTypes } from 'prop-types'
import Fonts from '../../Theme/Fonts'

export default function RecipeStep(props) {
  const { step, stepIdx, darkMode, onChangeText, onContentSizeChange } = props
  const textStyles = getTextboxStylesheet(darkMode)

  const { width } = Dimensions.get('window')
  const outlineStyle = {
    width: width - 32,
  }
  const inputStyle = {
    width: width - 64,
  }
  let textStyle = {
    color: darkMode ? Colors.text1Dark : Colors.text1Light,
  }

  return (
    <View style={[textStyles.textContainer, outlineStyle]}>
      <Text style={textStyles.title}>{`STEP ${stepIdx}`}</Text>
      <TextInput
        onChangeText={(text) => onChangeText(text)}
        placeholder={'Write out the step here...'}
        placeholderTextColor={darkMode ? Colors.text2Dark : Colors.text2Light}
        style={[textStyles.textInput, inputStyle]}
        maxLength={1000}
        multiline={true}
        onContentSizeChange={onContentSizeChange}
      >
        <Text style={textStyle} key={`step${stepIdx}`}>
          {step.title}
        </Text>
      </TextInput>
    </View>
  )
}

RecipeStep.propTypes = {
  step: PropTypes.object,
  stepIdx: PropTypes.number,
  onChangeText: PropTypes.func,
  darkMode: PropTypes.bool,
  onContentSizeChange: PropTypes.func,
}

function getTextboxStylesheet(darkMode) {
  return StyleSheet.create({
    textContainer: {
      backgroundColor: darkMode ? Colors.cardColorDark : Colors.cardColorLight,
      borderRadius: 15,
      shadowColor: '#000000',
      shadowOpacity: 0.14,
      shadowRadius: 12,
    },
    textInput: {
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      fontSize: 17,
      marginBottom: 16,
      marginLeft: 16,
    },
    title: {
      ...Fonts.uppercaseBold,
      color: darkMode ? Colors.text3Dark : Colors.text3Light,
      marginBottom: 12,
      marginLeft: 16,
      marginTop: 16,
    },
  })
}
