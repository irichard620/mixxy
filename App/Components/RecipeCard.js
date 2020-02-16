import React from 'react'
import { DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode'
import { PropTypes } from 'prop-types'
import DynamicStyles from 'App/Theme/ApplicationStyles'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'
import Helpers from '../Theme/Helpers'


export default function RecipeCard(props) {
  const { index, disabled, onCardClick } = this.props
  const styles = useDynamicStyleSheet(DynamicStyles)
  return (
    <TouchableWithoutFeedback onPress={() => onCardClick(index)} disabled={disabled}>
      <View style={cardStyles.cardOutline}>
        <View style={Helpers.rowStart}>

        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

RecipeCard.propTypes = {
  index: PropTypes.integer,
  disabled: PropTypes.bool,
  onCardClick: PropTypes.func,
}

const cardStyles = new DynamicStyleSheet({
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
    textAlign: 'left'
  },
  recipeType: {
    ...Fonts.body3,
    color: new DynamicValue(Colors.text2Light, Colors.text2Dark),
    textAlign: 'left'
  }
})

