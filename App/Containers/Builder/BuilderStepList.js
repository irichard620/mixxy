import React from 'react'
import { View } from 'react-native'
import BuilderStep from './BuilderStep'
import { PropTypes } from 'prop-types'
import getStylesheet from '../../Theme/ApplicationStyles'
import getBuilderStylesheet from './BuilderScreenStyle'

export default function BuilderStepList(props) {
  const {
    onPressEdit,
    onPressDelete,
    onPressUp,
    onPressDown,
    onStepClick,
    steps,
    selectedStep,
    darkMode,
  } = props

  const styles = getStylesheet(darkMode)
  const builderStyles = getBuilderStylesheet(darkMode)

  return (
    <View style={builderStyles.stepListOutline}>
      {steps.map((step, idx) => {
        // Check if can go up and down
        let canGoUp = true
        let canGoDown = true
        if (idx === 0) {
          canGoUp = false
        }
        if (idx === steps.length - 1) {
          canGoDown = false
        }
        return (
          <React.Fragment key={`step${idx}`}>
            <BuilderStep
              step={step}
              canGoUp={canGoUp}
              canGoDown={canGoDown}
              selected={selectedStep === idx}
              onPressEdit={() => onPressEdit(idx, step.title)}
              onPressDelete={() => onPressDelete(idx)}
              onPressUp={() => onPressUp(idx)}
              onPressDown={() => onPressDown(idx)}
              onStepClick={() => onStepClick(idx)}
              margin={[0, 0, 0, 0]}
              darkMode={darkMode}
            />
            <View style={styles.divider} />
          </React.Fragment>
        )
      })}
    </View>
  )
}

BuilderStepList.propTypes = {
  steps: PropTypes.array,
  onStepClick: PropTypes.func,
  onPressUp: PropTypes.func,
  onPressDown: PropTypes.func,
  onPressEdit: PropTypes.func,
  onPressDelete: PropTypes.func,
  darkMode: PropTypes.bool,
  selectedStep: PropTypes.number,
}
