import React from 'react'
import { ScrollView, Text } from 'react-native'
import { PropTypes } from 'prop-types'
import getIngredientsStylesheet from './IngredientsScreenStyle'
import CardSelection from '../../Components/CardSelection'
import * as constants from '../../Config/constants'

export default function IngredientsVessel(props) {
  const { darkMode, selectedVessel, onCardClick } = props
  const ingredientStyles = getIngredientsStylesheet(darkMode)
  return (
    <ScrollView style={ingredientStyles.scrollContainer}>
      <Text style={ingredientStyles.selectionSubtitle}>
        What are you adding your ingredients to?
      </Text>
      {constants.ingredientsVessels.map((ingredientsVessel) => (
        <CardSelection
          key={ingredientsVessel}
          title={ingredientsVessel}
          description={constants.ingredientsVesselDescriptions[ingredientsVessel]}
          onCardClick={() => onCardClick(ingredientsVessel)}
          darkMode={darkMode}
          selected={selectedVessel === ingredientsVessel}
        />
      ))}
    </ScrollView>
  )
}

IngredientsVessel.propTypes = {
  darkMode: PropTypes.bool,
  selectedVessel: PropTypes.string,
  onCardClick: PropTypes.func,
}
