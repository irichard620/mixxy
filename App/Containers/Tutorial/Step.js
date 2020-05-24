import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../../Theme/Colors'
import { getStepDescriptionWithHighlights } from '../../Storage/Step'
import { PropTypes } from 'prop-types'
import getStylesheet from '../../Theme/ApplicationStyles'

export default function Step(props) {
  const { step, activeStep, darkMode, drinkAmount, ingredientDict } = props
  const styles = getStylesheet(darkMode)
  const stepStyle = getStepStylesheet(darkMode)
  const marginTopStyle = {
    marginTop: 16,
  }

  return (
    <View style={stepStyle.outline}>
      <Text>
        {getStepDescriptionWithHighlights(step, stepStyle, drinkAmount, ingredientDict, activeStep)}
      </Text>
      <View style={[marginTopStyle, styles.divider]} />
    </View>
  )
}

Step.propTypes = {
  step: PropTypes.object,
  activeStep: PropTypes.bool,
  darkMode: PropTypes.bool,
  drinkAmount: PropTypes.number,
  ingredientDict: PropTypes.object,
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
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
      width: '100%',
    },
    stepDescriptionBase: {
      color: useDarkMode ? Colors.stepTextDark : Colors.stepTextLight,
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
    },
    stepDescriptionHighlight: {
      color: useDarkMode ? Colors.stepTextDark : Colors.stepTextLight,
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
    },
    stepDescriptionActive: {
      color: Colors.blue1,
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
    },
  })
}
