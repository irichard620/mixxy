import React from 'react'
import { Text, View } from 'react-native'
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
    <KeyboardAwareScrollView
      extraScrollHeight={100}
      enableAutomaticScroll={true}
      style={builderStyles.scrollView}
    >
      <View style={builderStyles.headingContainer}>
        <Text style={builderStyles.headingWithinContainer}>{recipeName}</Text>
        <MoreButton onPress={onMorePress} />
      </View>
      <Text style={builderStyles.headingDescription}>
        {
          'Build out your recipe with clear step by step instructions on how to make your drink.'
        }
      </Text>
      {steps.map((step, idx) => (
        <View key={`step${idx}view`} style={[builderStyles.ingredientRow, leftMarginStyle]}>
          <DeleteButton onPress={() => onDeletePress(idx)} />
          <RecipeStep
            key={`step${idx}`}
            step={step}
            stepIdx={idx + 1}
            onChangeText={(text) => onChangeText(text, idx)}
            darkMode={darkMode}
          />
        </View>
      ))}
      {!isEditMode && <AddButton onPress={onAddStepClick} />}
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
  recipeName: PropTypes.string,
}
