import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native'
import PullDown from './Pulldown'
import ButtonLarge from './ButtonLarge'
import getStylesheet from '../Theme/ApplicationStyles'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'
import { PropTypes } from 'prop-types'

export default function ModalContentCreateShare(props) {
  const { onShareRecipe, darkMode, createSharedRecipeIsLoading } = props

  const styles = getStylesheet(darkMode)
  const modalStyles = getModalStylesheet(darkMode)

  // Max height for modal
  const { height, width } = Dimensions.get('window')
  const maxHeightModal = {
    maxHeight: height * 0.75,
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <View style={[modalStyles.content, maxHeightModal]}>
        <PullDown />
        <Text style={modalStyles.title}>{'Share Recipe'}</Text>
        <Text style={modalStyles.description}>
          {
            'To share a recipe, we will generate a link that can be sent. Anyone who has the link can access your shared recipe.'
          }
        </Text>
        <View style={styles.divider} />
        <View style={modalStyles.saveContainer}>
          <ButtonLarge
            disabled={createSharedRecipeIsLoading}
            onButtonClick={onShareRecipe}
            title="Create Share Link"
            margin={[0, 16, 0, 16]}
            buttonWidth={width - 32}
            isPrimary
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

ModalContentCreateShare.propTypes = {
  onShareRecipe: PropTypes.func,
  createSharedRecipeIsLoading: PropTypes.bool,
  darkMode: PropTypes.bool,
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
    saveContainer: {
      alignItems: 'center',
      marginBottom: 8,
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
