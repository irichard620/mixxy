import React from 'react'
import {
  View, Image, TouchableWithoutFeedback, Text
} from 'react-native';
import { DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode'
import { PropTypes } from 'prop-types'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'
import Helpers from '../Theme/Helpers'
import Images from '../Theme/Images'


export default function RecipeCard(props) {
  const { index, recipeName, recipeType, disabled, onCardClick } = props
  const cardStyles = useDynamicStyleSheet(CardStyles)
  return (
    <TouchableWithoutFeedback onPress={() => onCardClick(index)} disabled={disabled}>
      <View style={cardStyles.cardOutline}>
        <View style={Helpers.rowStart}>
          <Image style={cardStyles.image} source={Images.logo} />
          <View style={Helpers.fillColCenter}>
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
  index: PropTypes.integer,
  disabled: PropTypes.bool,
  onCardClick: PropTypes.func,
}

const CardStyles = new DynamicStyleSheet({
  cardOutline: {
    borderRadius: 10,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 18,
    paddingBottom: 18,
    backgroundColor: new DynamicValue(Colors.cardColorLight, Colors.cardColorDark),
    shadowColor: '#00000008',
    shadowRadius: 12,
  },
  recipeName: {
    ...Fonts.body1,
    color: new DynamicValue(Colors.text1Light, Colors.text1Dark),
    textAlign: 'left',
    marginBottom: 2,
  },
  recipeType: {
    ...Fonts.body3,
    color: new DynamicValue(Colors.text2Light, Colors.text2Dark),
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

