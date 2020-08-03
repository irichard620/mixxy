import React from 'react'
import { View, Image, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native'
import { PropTypes } from 'prop-types'
import Helpers from '../Theme/Helpers'
import Images from '../Theme/Images'
import * as constants from '../Config/constants'
import getComponentStylesheet from './ComponentStyle'

export default function RecipeCard(props) {
  const { recipeName, recipeType, disabled, onCardClick, darkMode, servingGlass } = props
  const componentStyles = getComponentStylesheet(darkMode)

  const getDrinkIcon = () => {
    if (servingGlass === constants.SERVING_GLASS_PITCHER) {
      return Images.iconPitcher
    } else if (servingGlass === constants.SERVING_GLASS_SHOT) {
      return Images.iconShot
    } else if (servingGlass === constants.SERVING_GLASS_MARGARITA) {
      return Images.iconMarg
    } else if (servingGlass === constants.SERVING_GLASS_FLUTE) {
      return Images.iconFlute
    } else if (servingGlass === constants.SERVING_GLASS_TALL) {
      return Images.iconTall
    } else if (servingGlass === constants.SERVING_GLASS_COCKTAIL) {
      return Images.iconMartini
    } else if (servingGlass === constants.SERVING_GLASS_PINT) {
      return Images.iconPint
    } else if (servingGlass === constants.SERVING_GLASS_WINE) {
      return Images.iconWine
    } else if (servingGlass === constants.SERVING_GLASS_COUPE) {
      return Images.iconCoupe
    } else if (servingGlass === constants.SERVING_GLASS_COPPER_MUG) {
      return Images.iconCopperMug
    }
    return Images.iconShort
  }

  return (
    <TouchableWithoutFeedback onPress={onCardClick} disabled={disabled}>
      <View style={componentStyles.recipeCardOutline}>
        <View style={Helpers.rowStart}>
          <View style={componentStyles.recipeCardImageContainer}>
            <Image style={recipeCardStyles.image} source={getDrinkIcon()} />
          </View>
          <View style={Helpers.fillColLeft}>
            <Text style={componentStyles.recipeCardName}>{recipeName}</Text>
            <Text style={componentStyles.recipeCardType}>
              {recipeType ? constants.drinkTypeDisplay[recipeType] : ''}
            </Text>
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
  darkMode: PropTypes.bool,
  servingGlass: PropTypes.string,
}

const recipeCardStyles = StyleSheet.create({
  image: {
    borderRadius: 10,
    height: 48,
    width: 48,
  },
})
