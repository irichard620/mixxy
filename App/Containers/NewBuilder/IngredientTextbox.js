import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React from 'react'
import Colors from '../../Theme/Colors'
import { PropTypes } from 'prop-types'

export default function IngredientTextbox(props) {
  const { unitText, onUnitClick, ingredientText, onChangeText, darkMode } = props
  const textStyles = getTextboxStylesheet(darkMode)

  let textColor = darkMode ? Colors.text1Dark : Colors.text1Light
  let unitTextToShow = unitText
  if (unitText === '') {
    textColor = darkMode ? Colors.text2Dark : Colors.text2Light
    unitTextToShow = 'Unit'
  }
  const textStyle = {
    color: textColor,
    fontSize: 16,
    width: '100%',
  }

  const { width } = Dimensions.get('window')
  const outlineStyle = {
    width: width - 32,
  }

  return (
    <View style={[textStyles.textContainer, outlineStyle]}>
      <TouchableWithoutFeedback onPress={onUnitClick}>
        <View style={textStyles.unitContainer}>
          <Text style={textStyle}>{unitTextToShow}</Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={textStyles.verticalDivider} />
      <TextInput
        onChangeText={(text) => onChangeText(text)}
        value={ingredientText}
        placeholder={'Ingredient'}
        placeholderTextColor={darkMode ? Colors.text2Dark : Colors.text2Light}
        style={textStyles.textInput}
        maxLength={100}
        multiline={false}
      />
    </View>
  )
}

IngredientTextbox.propTypes = {
  unitText: PropTypes.string,
  ingredientText: PropTypes.string,
  onUnitClick: PropTypes.func,
  onChangeText: PropTypes.func,
  darkMode: PropTypes.bool,
}

function getTextboxStylesheet(darkMode) {
  return StyleSheet.create({
    textContainer: {
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      borderColor: darkMode ? Colors.darkFill1Dark : Colors.darkFill1Light,
      borderRadius: 10,
      borderWidth: 0.5,
      flexDirection: 'row',
    },
    textInput: {
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      fontSize: 16,
      marginLeft: 12,
      marginRight: 12,
      width: '100%',
    },
    unitContainer: {
      marginRight: 12,
      paddingLeft: 12,
      paddingTop: 14,
      paddingBottom: 14,
    },
    verticalDivider: {
      backgroundColor: darkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
      marginBottom: 8,
      marginTop: 8,
      width: 0.5,
    },
  })
}
