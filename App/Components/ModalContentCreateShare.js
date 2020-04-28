import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import getStylesheet from '../Theme/ApplicationStyles'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'
import { PropTypes } from 'prop-types'
import ModalBottomOutline from './ModalBottomOutline'
import RecipeCard from './RecipeCard'
import ImageListItem from './ImageListItem'
import * as constants from '../Config/constants'

export default function ModalContentCreateShare(props) {
  const {
    onShareRecipe,
    sharedRecipe,
    darkMode,
    onCancelClick,
    createSharedRecipeIsLoading,
    isNew,
  } = props

  const styles = getStylesheet(darkMode)
  const modalStyles = getModalStylesheet(darkMode)

  let textToUse =
    'You’ve already shared this recipe. Do you want to overwrite the existing link with this recipe?'
  if (isNew) {
    textToUse =
      'To share a recipe, we will generate a link that can be sent. Anyone who has the link can access your shared recipe. Do you want to proceed?'
  }

  const marginTopStyle = {
    marginTop: 12,
  }
  const paddingStyle = {
    height: 24,
  }

  return (
    <ModalBottomOutline title={'Share Recipe'} darkMode={darkMode}>
      <View style={paddingStyle} />
      <RecipeCard
        recipeName={sharedRecipe.recipeName}
        recipeType={sharedRecipe.recipeType}
        servingGlass={sharedRecipe.servingGlass}
        darkMode={darkMode}
        disabled
      />
      <View style={[styles.divider, marginTopStyle]} />
      <Text style={modalStyles.description}>{textToUse}</Text>
      <View style={modalStyles.itemsOutline}>
        <ImageListItem
          darkMode={darkMode}
          title={constants.RECIPE_MENU_SHARE}
          onClick={onShareRecipe}
          disabled={createSharedRecipeIsLoading}
        />
        <ImageListItem
          darkMode={darkMode}
          title={constants.RECIPE_MENU_CANCEL}
          onClick={onCancelClick}
          disabled={createSharedRecipeIsLoading}
        />
      </View>
    </ModalBottomOutline>
  )
}

ModalContentCreateShare.propTypes = {
  onShareRecipe: PropTypes.func,
  onCancelClick: PropTypes.func,
  createSharedRecipeIsLoading: PropTypes.bool,
  darkMode: PropTypes.bool,
  isNew: PropTypes.bool,
  sharedRecipe: PropTypes.object,
}

function getModalStylesheet(darkMode) {
  return StyleSheet.create({
    description: {
      alignSelf: 'flex-start',
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      ...Fonts.body1,
      marginLeft: 16,
      marginRight: 16,
      marginTop: 16,
      marginBottom: 16,
    },
    itemsOutline: {
      height: 112,
    },
  })
}
