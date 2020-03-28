import React from 'react'
import { ScrollView, View } from 'react-native'
import { PropTypes } from 'prop-types'
import getBuilderStylesheet from './BuilderScreenStyle'
import BuilderDetailsList from './BuilderDetailsList'
import BuilderStepList from './BuilderStepList'
import getStylesheet from '../../Theme/ApplicationStyles'

export default function BuilderHome(props) {
  const {
    darkMode,
    details,
    onDetailClick,
    steps,
    selectedStep,
    onPressEdit,
    onPressDelete,
    onPressUp,
    onPressDown,
    onStepClick,
  } = props
  const styles = getStylesheet(darkMode)
  const builderStyles = getBuilderStylesheet(darkMode)
  return (
    <ScrollView style={builderStyles.scrollView}>
      <BuilderDetailsList details={details} onDetailClick={onDetailClick} darkMode={darkMode} />
      <View style={styles.thickDivider} />
      <BuilderStepList
        steps={steps}
        selectedStep={selectedStep}
        darkMode={darkMode}
        onPressEdit={onPressEdit}
        onPressDelete={onPressDelete}
        onPressUp={onPressUp}
        onPressDown={onPressDown}
        onStepClick={onStepClick}
      />
    </ScrollView>
  )
}

BuilderHome.propTypes = {
  darkMode: PropTypes.bool,
  details: PropTypes.array,
  onDetailClick: PropTypes.func,
  steps: PropTypes.array,
  selectedStep: PropTypes.number,
  onPressEdit: PropTypes.func,
  onPressDelete: PropTypes.func,
  onPressUp: PropTypes.func,
  onPressDown: PropTypes.func,
  onStepClick: PropTypes.func,
}
