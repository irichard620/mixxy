import React from 'react'
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native'
import Images from '../../Theme/Images'
import getTutorialStylesheet from './TutorialScreenStyle'
import Colors from '../../Theme/Colors'
import { PropTypes } from 'prop-types'

export default function TutorialDrinkQuantity(props) {
  const { darkMode, drinkAmount, reduceDrinkQuantity, increaseDrinkQuantity } = props

  const tutorialStyles = getTutorialStylesheet(darkMode)

  let qtyNegativeSource
  let minusBackgroundColor
  if (drinkAmount > 1) {
    qtyNegativeSource = Images.quantityMinus
    minusBackgroundColor = darkMode ? Colors.blue1TransparentDark : Colors.blue1TransparentLight
  } else {
    qtyNegativeSource = darkMode
      ? Images.quantityMinusInactiveDark
      : Images.quantityMinusInactiveLight
    minusBackgroundColor = darkMode ? Colors.darkFill3Dark : Colors.darkFill3Light
  }
  let qtyPositiveSource
  let plusBackgroundColor
  if (drinkAmount < 10) {
    qtyPositiveSource = Images.quantityPlus
    plusBackgroundColor = darkMode ? Colors.blue1TransparentDark : Colors.blue1TransparentLight
  } else {
    qtyPositiveSource = darkMode
      ? Images.quantityPlusInactiveDark
      : Images.quantityPlusInactiveLight
    plusBackgroundColor = darkMode ? Colors.darkFill3Dark : Colors.darkFill3Light
  }

  return (
    <View style={tutorialStyles.servingsContainer}>
      <View style={tutorialStyles.drinkAmountView}>
        <TouchableWithoutFeedback onPress={reduceDrinkQuantity}>
          <View
            style={[tutorialStyles.drinkAmountCircle, { backgroundColor: minusBackgroundColor }]}
          >
            <Image source={qtyNegativeSource} style={tutorialStyles.drinkAmountIcon} />
          </View>
        </TouchableWithoutFeedback>
        <Text style={tutorialStyles.drinkAmountText}>{`${drinkAmount} drink${
          drinkAmount > 1 ? 's' : ''
        }`}</Text>
        <TouchableWithoutFeedback onPress={increaseDrinkQuantity}>
          <View
            style={[tutorialStyles.drinkAmountCircle, { backgroundColor: plusBackgroundColor }]}
          >
            <Image source={qtyPositiveSource} style={tutorialStyles.drinkAmountIcon} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

TutorialDrinkQuantity.propTypes = {
  darkMode: PropTypes.bool,
  drinkAmount: PropTypes.number,
  reduceDrinkQuantity: PropTypes.func,
  increaseDrinkQuantity: PropTypes.func,
}
