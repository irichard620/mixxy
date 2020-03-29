import React from 'react'
import { ScrollView, Text } from 'react-native'
import { PropTypes } from 'prop-types'
import getBuilderStylesheet from './BuilderScreenStyle'
import CardSelection from '../../Components/CardSelection'
import * as constants from '../../Config/constants'

export default function BuilderDrinkType(props) {
  const { darkMode, selectedDrinkType, onCardClick } = props
  const builderStyles = getBuilderStylesheet(darkMode)
  return (
    <ScrollView style={builderStyles.scrollView}>
      <Text style={builderStyles.selectionHeader}>Create a New Recipe</Text>
      <Text style={builderStyles.selectionSubtitle}>What type of drink are you making?</Text>
      {constants.drinkTypes.map((drinkType) => (
        <CardSelection
          key={drinkType}
          title={drinkType}
          description={constants.drinkTypeDescriptions[drinkType]}
          onCardClick={() => onCardClick(drinkType)}
          darkMode={darkMode}
          selected={selectedDrinkType === drinkType}
        />
      ))}
    </ScrollView>
  )
}

BuilderDrinkType.propTypes = {
  darkMode: PropTypes.bool,
  selectedDrinkType: PropTypes.string,
  onCardClick: PropTypes.func,
}
