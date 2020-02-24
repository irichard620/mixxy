import React from 'react'
import {
  View, Image, TouchableWithoutFeedback, Text, StyleSheet
} from 'react-native';
import { PropTypes } from 'prop-types'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'
import Helpers from '../Theme/Helpers'
import Images from '../Theme/Images'


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
      marginLeft: 16,
      marginRight: 16,
      borderRadius: 10,
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 18,
      paddingBottom: 18,
      backgroundColor: darkMode ? Colors.cardColorDark : Colors.cardColorLight,
      shadowColor: '#000000',
      shadowRadius: 12,
      shadowOpacity: 0.14,
    },
    recipeName: {
      ...Fonts.body1,
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      textAlign: 'left',
      marginBottom: 2,
    },
    recipeType: {
      ...Fonts.body3,
      color: darkMode ? Colors.text2Dark : Colors.text2Light,
      textAlign: 'left'
    },
    image: {
      height: 48,
      width: 48,
      borderRadius: 10,
      resizeMode: 'contain',
      marginRight: 14,
    }
  })
}
