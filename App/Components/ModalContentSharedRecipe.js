import React from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native'
import PullDown from './Pulldown'
import getStylesheet from '../Theme/ApplicationStyles'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'
import { PropTypes } from 'prop-types'
import RecipeCard from './RecipeCard'

export default function ModalContentSharedRecipe(props) {
  const { sharedRecipe, darkMode, fetchSharedRecipeIsLoading, onCardClick } = props

  const styles = getStylesheet(darkMode)
  const modalStyles = getModalStylesheet(darkMode)

  // Max height for modal
  const { height } = Dimensions.get('window')
  const maxHeightModal = {
    maxHeight: height * 0.75,
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <View style={[modalStyles.content, maxHeightModal]}>
        <PullDown />
        <Text style={modalStyles.title}>{'Shared Recipe'}</Text>
        {fetchSharedRecipeIsLoading && <Text style={modalStyles.description}>{'Loading...'}</Text>}
        <View style={styles.divider} />
        {sharedRecipe && (
          <RecipeCard
            recipeName={sharedRecipe.recipeName}
            recipeType={sharedRecipe.recipeType}
            servingGlass={sharedRecipe.servingGlass}
            darkMode={darkMode}
            onCardClick={onCardClick}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  )
}

ModalContentSharedRecipe.propTypes = {
  sharedRecipe: PropTypes.object,
  fetchSharedRecipeIsLoading: PropTypes.bool,
  darkMode: PropTypes.bool,
  onCardClick: PropTypes.func,
}

function getModalStylesheet(darkMode) {
  return StyleSheet.create({
    content: {
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: 32,
      paddingTop: 8,
    },
    title: {
      alignSelf: 'flex-start',
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      ...Fonts.cardSelectionTitle,
      marginBottom: 8,
      marginLeft: 16,
      marginTop: 36,
    },
    description: {
      alignSelf: 'flex-start',
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      ...Fonts.body1,
      marginLeft: 16,
      marginRight: 16,
      marginTop: 8,
      marginBottom: 16,
    },
  })
}
