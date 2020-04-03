import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../../Theme/Colors'
import Fonts from '../../Theme/Fonts'
import { getStepDescriptionWithHighlights } from '../../Storage/Step'
import { PropTypes } from 'prop-types'
import getStylesheet from '../../Theme/ApplicationStyles'

export default function Step(props) {
  const { step, activeStep, darkMode, drinkAmount } = props
  const styles = getStylesheet(darkMode)
  const stepStyle = getStepStylesheet(darkMode)
  const titleColor = {
    color: Colors.blue1,
  }
  if (!activeStep) {
    titleColor.color = darkMode ? Colors.text2Dark : Colors.text2Light
  }
  const marginTopStyle = {
    marginTop: 16
  }

  return (
    <View style={stepStyle.outline}>
      <Text style={[stepStyle.title, titleColor]}>{step.title}</Text>
      {activeStep && getStepDescriptionWithHighlights(step, stepStyle, drinkAmount)}
      <View style={[marginTopStyle, styles.divider]} />
    </View>
  )
}

Step.propTypes = {
  step: PropTypes.object,
  activeStep: PropTypes.bool,
  darkMode: PropTypes.bool,
  drinkAmount: PropTypes.number,
}

function getStepStylesheet(useDarkMode) {
  return StyleSheet.create({
    description: {
      color: Colors.text1Light,
      fontSize: 16,
      marginTop: 4,
      textAlign: 'center',
    },
    outline: {
      alignItems: 'center',
      paddingTop: 16,
      width: '100%',
    },
    stepDescriptionBase: {
      color: useDarkMode ? Colors.stepTextDark : Colors.stepTextLight,
      ...Fonts.stepTitle,
      textAlign: 'center',
    },
    stepDescriptionHighlight: {
      color: useDarkMode ? Colors.stepTextDark : Colors.stepTextLight,
      ...Fonts.stepTitle,
      textAlign: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
    },
  })
}
