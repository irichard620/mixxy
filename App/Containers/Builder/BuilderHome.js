import React from 'react'
import { ScrollView } from 'react-native'
import { PropTypes } from 'prop-types'
import getBuilderStylesheet from './BuilderScreenStyle'
import BuilderDetailsList from './BuilderDetailsList'
import BuilderStepList from './BuilderStepList'

export default function BuilderHome(props) {
  const { darkMode, details, onDetailClick, steps, selectedStep } = props
  const builderStyles = getBuilderStylesheet(darkMode)
  return (
    <ScrollView style={builderStyles.scrollView}>
      <BuilderDetailsList details={details} onDetailClick={onDetailClick} />
      <BuilderStepList steps={steps} selectedStep={selectedStep} />
    </ScrollView>
  )
}

BuilderHome.propTypes = {
  darkMode: PropTypes.bool,
  details: PropTypes.array,
  onDetailClick: PropTypes.func,
  steps: PropTypes.array,
  selectedStep: PropTypes.integer,
}
