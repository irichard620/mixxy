import React from 'react'
import { Text, ScrollView, KeyboardAvoidingView } from 'react-native'
import getBuilderStylesheet from './BuilderStyles'
import { PropTypes } from 'prop-types'
import AddButton from '../../Components/AddButton'
import IngredientTextbox from './IngredientTextbox'

export default function BuilderIngredients(props) {
  const { darkMode, ingredients, onAddIngredientClick, onUnitClick, onChangeText } = props
  const builderStyles = getBuilderStylesheet(darkMode)
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
      <ScrollView style={builderStyles.scrollView}>
        <Text style={builderStyles.heading}>{'Ingredients'}</Text>
        <Text style={builderStyles.headingDescription}>
          {
            'List out all the ingredients and their amounts here. If you’re using an ingredient to rim or garnish your drink, you can indicate that with the respective units.'
          }
        </Text>
        {ingredients.map((ingredient, idx) => (
          <IngredientTextbox
            key={`ingredient${idx}`}
            unitText={'99 Oz'}
            onUnitClick={() => onUnitClick(idx)}
            ingredientText={ingredient.title}
            onChangeText={(text) => onChangeText(text, idx)}
            darkMode={darkMode}
          />
        ))}
        <AddButton onPress={onAddIngredientClick} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

BuilderIngredients.propTypes = {
  darkMode: PropTypes.bool,
  onAddIngredientClick: PropTypes.func,
  ingredients: PropTypes.array,
  onUnitClick: PropTypes.func,
  onChangeText: PropTypes.func,
}
