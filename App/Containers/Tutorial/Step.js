import React from 'react'
import { View, Text } from 'react-native'
import { PropTypes } from 'prop-types'
import getTutorialStylesheet from './TutorialScreenStyle'

export default function Step(props) {
  const { step, darkMode, isFirst, isLast } = props
  const tutorialStyles = getTutorialStylesheet(darkMode)
  let topLineStyle = {
    top: 0,
    height: 16,
  }
  let bottomLineStyle = {
    bottom: 0,
    top: 28,
  }
  return (
    <View>
      <View style={tutorialStyles.stepContainer}>
        <View style={tutorialStyles.stepCircle} />
        <Text style={tutorialStyles.stepText}>{step.title}</Text>
      </View>
      {!isFirst && <View style={[tutorialStyles.stepLine, topLineStyle]} />}
      {!isLast && <View style={[tutorialStyles.stepLine, bottomLineStyle]} />}
    </View>
  )
}

Step.propTypes = {
  step: PropTypes.object,
  darkMode: PropTypes.bool,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
}
