import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../../Theme/Colors'
import Fonts from '../../Theme/Fonts'
import { getStepDescriptionWithHighlights } from '../../Storage/Step'
import { PropTypes } from 'prop-types'

export default function Step(props) {
  const { step, activeStep, darkMode } = props

  const stepStyle = getStepStylesheet(darkMode)
  const titleColor = {
    color: '#2D8CD3',
  }
  if (!activeStep) {
    titleColor.color = '#898989'
  }

  return (
    <View style={stepStyle.outline}>
      <Text style={[stepStyle.title, titleColor]}>{step.title}</Text>
      {activeStep && getStepDescriptionWithHighlights(step, stepStyle)}
      <View style={stepStyle.mainSeparator} />
    </View>
  )
}

Step.propTypes = {
  step: PropTypes.object,
  activeStep: PropTypes.bool,
  darkMode: PropTypes.bool,
}

function getStepStylesheet(useDarkMode) {
  return StyleSheet.create({
    description: {
      color: Colors.text1Light,
      fontSize: 16,
      marginTop: 4,
      textAlign: 'center',
    },
    mainSeparator: {
      backgroundColor: '#F1F3F6',
      height: 1,
      marginTop: 16,
      width: '100%',
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
