import { Animated, Easing, Image, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import introStyles from './IntroStyles'
import Images from '../../Theme/Images'
import { PropTypes } from 'prop-types'

export default function IntroButton(props) {
  const { onClick, isLastStep } = props
  let scaleValue = new Animated.Value(0)
  const cardScale = scaleValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.925, 0.85],
  })
  let buttonWidthStyle = {
    width: 56,
  }
  if (isLastStep) {
    buttonWidthStyle.width = 148
  }
  let transformStyle = {
    ...introStyles.buttonOutline,
    transform: [{ scale: cardScale }],
    ...buttonWidthStyle,
  }
  return (
    <TouchableWithoutFeedback
      onPress={onClick}
      onPressIn={() => {
        scaleValue.setValue(0)
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 250,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start()
      }}
      onPressOut={() => {
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start()
      }}
    >
      <Animated.View style={transformStyle}>
        {!isLastStep && <Image source={Images.introArrow} style={introStyles.arrowIcon} />}
        {isLastStep && <Text style={introStyles.buttonText}>{"Let's Go"}</Text>}
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

IntroButton.propTypes = {
  onClick: PropTypes.func,
  isLastStep: PropTypes.bool,
}
