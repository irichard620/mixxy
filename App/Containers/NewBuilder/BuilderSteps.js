import React from 'react'
import { Text, ScrollView, KeyboardAvoidingView } from 'react-native'
import getBuilderStylesheet from './BuilderStyles'
import { PropTypes } from 'prop-types'
import AddButton from '../../Components/AddButton'

export default function BuilderSteps(props) {
  const { darkMode, recipeName, steps, onAddStepClick, isEditMode } = props
  const builderStyles = getBuilderStylesheet(darkMode)
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
      <ScrollView style={builderStyles.scrollView}>
        <Text style={builderStyles.heading}>{recipeName}</Text>
        <Text style={builderStyles.headingDescription}>
          {
            'Build out your recipe step by step. When you want to use ingredients in a step, just tap “Add Ingredient” to open the list.'
          }
        </Text>
        <AddButton onPress={onAddStepClick} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

BuilderSteps.propTypes = {
  darkMode: PropTypes.bool,
  isEditMode: PropTypes.bool,
  onAddStepClick: PropTypes.func,
  steps: PropTypes.array,
  onDeletePress: PropTypes.func,
  recipeName: PropTypes.string,
}
