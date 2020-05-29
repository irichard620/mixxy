import React from 'react'
import { Text, ScrollView, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import getBuilderStylesheet from './BuilderStyles'
import { PropTypes } from 'prop-types'
import AddButton from '../../Components/AddButton'
import DeleteButton from '../../Components/DeleteButton'
import RecipeStep from './RecipeStep'
import MoreButton from '../../Components/MoreButton'

export default function BuilderSteps(props) {
  const {
    darkMode,
    recipeName,
    steps,
    onAddStepClick,
    isEditMode,
    onDeletePress,
    onChangeText,
    onMorePress,
    onAddIngredient,
    ingredients,
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
    <KeyboardAwareScrollView extraScrollHeight={100} keyboardShouldPersistTaps={'handled'}>
      <ScrollView style={builderStyles.scrollView} keyboardShouldPersistTaps={'handled'}>
        <View style={builderStyles.headingContainer}>
          <Text style={builderStyles.headingWithinContainer}>{recipeName}</Text>
          <MoreButton onPress={onMorePress} />
        </View>
        <Text style={builderStyles.headingDescription}>
          {
            'Build out your recipe step by step. When you call an ingredient in a step for the first time, use "Add Ingredients" to open the list.'
          }
        </Text>
        {steps.map((step, idx) => (
          <View key={`step${idx}view`} style={[builderStyles.ingredientRow, leftMarginStyle]}>
            <DeleteButton onPress={() => onDeletePress(idx)} />
            <RecipeStep
              key={`step${idx}`}
              ingredients={ingredients}
              step={step}
              stepIdx={idx + 1}
              onChangeText={(text, selection) => onChangeText(text, selection, idx)}
              darkMode={darkMode}
              onAddIngredient={(cursor) => onAddIngredient(idx, cursor)}
            />
          </View>
        ))}
        {!isEditMode && <AddButton onPress={onAddStepClick} />}
      </ScrollView>
    </KeyboardAwareScrollView>
  )
}

BuilderSteps.propTypes = {
  darkMode: PropTypes.bool,
  isEditMode: PropTypes.bool,
  onAddStepClick: PropTypes.func,
  steps: PropTypes.array,
  onDeletePress: PropTypes.func,
  onChangeText: PropTypes.func,
  onMorePress: PropTypes.func,
  onAddIngredient: PropTypes.func,
  recipeName: PropTypes.string,
  ingredients: PropTypes.array,
}
