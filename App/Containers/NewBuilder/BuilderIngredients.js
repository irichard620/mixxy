import React from 'react'
import { Text, View } from 'react-native'
import getBuilderStylesheet from './BuilderStyles'
import { PropTypes } from 'prop-types'
import AddButton from '../../Components/AddButton'
import IngredientTextbox from './IngredientTextbox'
import * as ingredientModel from '../../Storage/Ingredient'
import DeleteButton from '../../Components/DeleteButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function BuilderIngredients(props) {
  const {
    darkMode,
    ingredients,
    onAddIngredientClick,
    onUnitClick,
    onChangeText,
    onDeletePress,
    isEditMode,
  } = props
  const builderStyles = getBuilderStylesheet(darkMode)
  let leftMargin = -30
  if (isEditMode) {
    leftMargin = 16
  }
  const leftMarginStyle = {
    marginLeft: leftMargin,
  }
  return (
    <KeyboardAwareScrollView extraScrollHeight={30} style={builderStyles.scrollView}>
      <Text style={builderStyles.heading}>{'Ingredients'}</Text>
      <Text style={builderStyles.headingDescription}>
        {
          'List out all the ingredients and their amounts here. If you’re using an ingredient to rim or garnish your drink, you can indicate that with the respective units.'
        }
      </Text>
      {ingredients.map((ingredient, idx) => (
        <View key={`ingredient${idx}view`} style={[builderStyles.ingredientRow, leftMarginStyle]}>
          <DeleteButton onPress={() => onDeletePress(idx)} />
          <IngredientTextbox
            key={`ingredient${idx}`}
            unitText={ingredientModel.getIngredientAmount(ingredient, 1, false, false)}
            onUnitClick={() => onUnitClick(idx)}
            ingredientText={ingredient.title}
            onChangeText={(text) => onChangeText(text, idx)}
            darkMode={darkMode}
          />
        </View>
      ))}
      {!isEditMode && <AddButton onPress={onAddIngredientClick} />}
      <View style={builderStyles.buffer} />
    </KeyboardAwareScrollView>
  )
}

BuilderIngredients.propTypes = {
  darkMode: PropTypes.bool,
  isEditMode: PropTypes.bool,
  onAddIngredientClick: PropTypes.func,
  ingredients: PropTypes.array,
  onUnitClick: PropTypes.func,
  onChangeText: PropTypes.func,
  onDeletePress: PropTypes.func,
}
