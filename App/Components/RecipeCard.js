import React from 'react'
import { View, Image, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native'
import { PropTypes } from 'prop-types'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'
import Helpers from '../Theme/Helpers'
import Images from '../Theme/Images'
import { useDarkMode } from 'react-native-dark-mode'

export default function RecipeCard(props) {
  const { recipeName, recipeType, disabled, onCardClick, darkMode } = props
  const cardStyles = getCardStylesheet(darkMode)
  return (
    <TouchableWithoutFeedback onPress={onCardClick} disabled={disabled}>
      <View style={cardStyles.cardOutline}>
        <View style={Helpers.rowStart}>
          <Image style={cardStyles.image} source={Images.logo} />
          <View style={Helpers.fillColLeft}>
            <Text style={cardStyles.recipeName}>{recipeName}</Text>
            <Text style={cardStyles.recipeType}>{recipeType}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

RecipeCard.propTypes = {
  recipeName: PropTypes.string,
  recipeType: PropTypes.string,
  index: PropTypes.number,
  disabled: PropTypes.bool,
  onCardClick: PropTypes.func,
}

function getCardStylesheet(darkMode) {
  return StyleSheet.create({
    cardOutline: {
      backgroundColor: darkMode ? Colors.cardColorDark : Colors.cardColorLight,
      borderRadius: 10,
      marginLeft: 16,
      marginRight: 16,
      paddingBottom: 18,
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 18,
      shadowColor: '#000000',
      shadowOpacity: 0.14,
      shadowRadius: 12,
    },
    image: {
      borderRadius: 10,
      height: 48,
      marginRight: 14,
      resizeMode: 'contain',
      width: 48,
    },
    recipeName: {
      ...Fonts.body1,
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      marginBottom: 2,
      textAlign: 'left',
    },
    recipeType: {
      ...Fonts.body3,
      color: darkMode ? Colors.text2Dark : Colors.text2Light,
      textAlign: 'left',
    },
  })
}
