import { Dimensions, Image, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Colors from '../../Theme/Colors'
import { PropTypes } from 'prop-types'
import Images from '../../Theme/Images'
import getBuilderStylesheet from './BuilderStyles'

export default function IngredientTextbox(props) {
  const { unitText, onUnitClick, ingredientText, onChangeText, darkMode } = props
  const builderStyles = getBuilderStylesheet(darkMode)

  let textColor = darkMode ? Colors.text1Dark : Colors.text1Light
  let unitTextToShow = unitText
  if (unitText === '') {
    textColor = darkMode ? Colors.text2Dark : Colors.text2Light
    unitTextToShow = 'Unit'
  }

  const { width } = Dimensions.get('window')
  const outlineStyle = {
    width: width - 32,
  }

  const textStyle = {
    color: textColor,
    fontSize: 16,
    marginRight: 12,
  }

  return (
    <View style={[builderStyles.ingredientTextboxContainer, outlineStyle]}>
      <TouchableWithoutFeedback onPress={onUnitClick}>
        <View style={builderStyles.ingredientTextboxUnitContainer}>
          <Text style={textStyle}>{unitTextToShow}</Text>
          <Image
            style={builderStyles.ingredientTextboxIcon}
            source={darkMode ? Images.builderUnitArrowDark : Images.builderUnitArrowLight}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={builderStyles.ingredientTextboxVerticalDivider} />
      <TextInput
        onChangeText={(text) => onChangeText(text)}
        value={ingredientText}
        placeholder={'Ingredient'}
        placeholderTextColor={darkMode ? Colors.text2Dark : Colors.text2Light}
        style={builderStyles.ingredientTextboxInput}
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
