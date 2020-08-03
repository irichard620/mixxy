import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import getStylesheet from '../Theme/ApplicationStyles'
import { PropTypes } from 'prop-types'
import RecipeCard from './RecipeCard'
import ModalBottomOutline from './ModalBottomOutline'
import ImageListItem from './ImageListItem'
import * as constants from '../Config/constants'
import getComponentStylesheet from './ComponentStyle'

export default function ModalContentSharedRecipe(props) {
  const { sharedRecipe, darkMode, fetchSharedRecipeIsLoading, onViewClick, onCancelClick } = props

  const styles = getStylesheet(darkMode)
  const componentStyles = getComponentStylesheet(darkMode)

  const paddingStyle = {
    height: 24,
  }

  return (
    <ModalBottomOutline title={'Shared Recipe'} darkMode={darkMode}>
      {sharedRecipe && <View style={paddingStyle} />}
      {fetchSharedRecipeIsLoading && (
        <Text style={componentStyles.modalShareDescription}>{'Loading...'}</Text>
      )}
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
        <View style={modalShareStyles.bottomContainer}>
          <View style={styles.divider} />
          <Text style={componentStyles.modalShareDescription}>
            {'Someone shared this recipe with you. Do you want to add it to your library?'}
          </Text>
          <View style={modalShareStyles.itemsOutline}>
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

const modalShareStyles = StyleSheet.create({
  bottomContainer: {
    marginTop: 12,
    paddingBottom: 8,
  },
  itemsOutline: {
    height: 112,
  },
})
