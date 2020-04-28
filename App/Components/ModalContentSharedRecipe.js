import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import getStylesheet from '../Theme/ApplicationStyles'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'
import { PropTypes } from 'prop-types'
import RecipeCard from './RecipeCard'
import ModalBottomOutline from './ModalBottomOutline'
import ImageListItem from './ImageListItem'
import * as constants from '../Config/constants'

export default function ModalContentSharedRecipe(props) {
  const { sharedRecipe, darkMode, fetchSharedRecipeIsLoading, onViewClick, onCancelClick } = props

  const styles = getStylesheet(darkMode)
  const modalStyles = getModalStylesheet(darkMode)

  const paddingStyle = {
    height: 24,
  }

  return (
    <ModalBottomOutline title={'Shared Recipe'} darkMode={darkMode}>
      {sharedRecipe && <View style={paddingStyle} />}
      {fetchSharedRecipeIsLoading && <Text style={modalStyles.description}>{'Loading...'}</Text>}
      {sharedRecipe && (
        <RecipeCard
          recipeName={sharedRecipe.recipeName}
          recipeType={sharedRecipe.recipeType}
          servingGlass={sharedRecipe.servingGlass}
          darkMode={darkMode}
          disabled
        />
      )}
      {sharedRecipe && (
        <View style={modalStyles.bottomContainer}>
          <View style={styles.divider} />
          <Text style={modalStyles.description}>
            {'Someone shared this recipe with you. Do you want to add it to your library?'}
          </Text>
          <View style={modalStyles.itemsOutline}>
            <ImageListItem
              darkMode={darkMode}
              title={constants.RECIPE_MENU_VIEW}
              onClick={onViewClick}
            />
            <ImageListItem
              darkMode={darkMode}
              title={constants.RECIPE_MENU_CANCEL}
              onClick={onCancelClick}
            />
          </View>
        </View>
      )}
    </ModalBottomOutline>
  )
}

ModalContentSharedRecipe.propTypes = {
  sharedRecipe: PropTypes.object,
  fetchSharedRecipeIsLoading: PropTypes.bool,
  darkMode: PropTypes.bool,
  onViewClick: PropTypes.func,
  onCancelClick: PropTypes.func,
}

function getModalStylesheet(darkMode) {
  return StyleSheet.create({
    description: {
      alignSelf: 'flex-start',
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      ...Fonts.body1,
      marginBottom: 16,
      marginLeft: 16,
      marginRight: 16,
      marginTop: 16,
    },
    bottomContainer: {
      marginTop: 12,
      paddingBottom: 8,
    },
    itemsOutline: {
      height: 112,
    },
  })
}
