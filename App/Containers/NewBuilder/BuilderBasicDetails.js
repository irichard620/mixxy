import React from 'react'
import { Text } from 'react-native'
import getBuilderStylesheet from './BuilderStyles'
import { PropTypes } from 'prop-types'
import Textbox from '../../Components/Textbox'
import ClickableTextbox from '../../Components/ClickableTextbox'
import * as constants from '../../Config/constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function BuilderBasicDetails(props) {
  const {
    darkMode,
    recipeName,
    recipeDescription,
    drinkType,
    baseSpirit,
    servingGlass,
    onRecipeNameUpdate,
    onRecipeDescriptionUpdate,
    onDrinkTypeClick,
    onServingGlassClick,
    onBaseSpiritClick,
  } = props
  const builderStyles = getBuilderStylesheet(darkMode)
  return (
    <KeyboardAwareScrollView extraScrollHeight={30} style={builderStyles.scrollView}>
      <Text style={builderStyles.heading}>{'New Recipe'}</Text>
      <Text style={builderStyles.headingDescription}>
        {'Let’s get the basics about this drink recipe before getting into the steps.'}
      </Text>
      <Text style={builderStyles.sectionHeading}>{'What is the name of this drink?'}</Text>
      <Textbox
        onChangeText={onRecipeNameUpdate}
        modalText={recipeName}
        textPlaceholder={'Recipe Name'}
        charLimit={50}
        darkMode={darkMode}
      />
      <Text style={builderStyles.sectionHeading}>{'Describe this drink a little better.'}</Text>
      <Textbox
        onChangeText={onRecipeDescriptionUpdate}
        modalText={recipeDescription}
        textPlaceholder={'Recipe Description'}
        charLimit={1000}
        darkMode={darkMode}
      />
      <Text style={builderStyles.sectionHeading}>{'What type of drink is it?'}</Text>
      <ClickableTextbox
        modalText={drinkType}
        textPlaceholder={'Drink Type'}
        onClick={onDrinkTypeClick}
        darkMode={darkMode}
      />
      {drinkType === constants.DRINK_TYPE_COCKTAIL && (
        <Text style={builderStyles.sectionHeading}>{'What is the base spirit?'}</Text>
      )}
      {drinkType === constants.DRINK_TYPE_COCKTAIL && (
        <ClickableTextbox
          modalText={baseSpirit}
          textPlaceholder={'Base Spirit'}
          onClick={onBaseSpiritClick}
          darkMode={darkMode}
        />
      )}
      <Text style={builderStyles.sectionHeading}>{'What glass do you serve this in?'}</Text>
      <ClickableTextbox
        modalText={servingGlass}
        textPlaceholder={'Serving Glass'}
        onClick={onServingGlassClick}
        darkMode={darkMode}
      />
    </KeyboardAwareScrollView>
  )
}

BuilderBasicDetails.propTypes = {
  darkMode: PropTypes.bool,
  recipeName: PropTypes.string,
  recipeDescription: PropTypes.string,
  drinkType: PropTypes.string,
  baseSpirit: PropTypes.string,
  servingGlass: PropTypes.string,
  onRecipeNameUpdate: PropTypes.func,
  onRecipeDescriptionUpdate: PropTypes.func,
  onDrinkTypeClick: PropTypes.func,
  onServingGlassClick: PropTypes.func,
  onBaseSpiritClick: PropTypes.func,
}
