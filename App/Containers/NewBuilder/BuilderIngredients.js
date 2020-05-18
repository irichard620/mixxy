import React from 'react'
import { Text, ScrollView, KeyboardAvoidingView } from 'react-native'
import getBuilderStylesheet from './BuilderStyles'
import { PropTypes } from 'prop-types'
import Textbox from '../../Components/Textbox'
import ClickableTextbox from '../../Components/ClickableTextbox'
import * as constants from '../../Config/constants'

export default function BuilderIngredients(props) {
  const { darkMode } = props
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
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

BuilderIngredients.propTypes = {
  darkMode: PropTypes.bool,
}
