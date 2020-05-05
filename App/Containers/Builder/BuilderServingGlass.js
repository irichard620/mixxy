import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { PropTypes } from 'prop-types'
import getBuilderStylesheet from './BuilderScreenStyle'
import CardSelection from '../../Components/CardSelection'
import * as constants from '../../Config/constants'
import Images from '../../Theme/Images'

export default function BuilderServingGlass(props) {
  const { darkMode, selectedServingGlass, onCardClick } = props
  const builderStyles = getBuilderStylesheet(darkMode)
  return (
    <ScrollView style={builderStyles.scrollView}>
      <View style={builderStyles.iconView}>
        <Image style={builderStyles.icon} source={Images.builderDrinkType} />
      </View>
      <Text style={builderStyles.selectionHeader}>Choose a Serving Glass</Text>
      <Text style={builderStyles.selectionSubtitle}>
        What kind of glass is your drink served in?
      </Text>
      {constants.servingGlasses.map((servingGlass) => (
        <CardSelection
          key={servingGlass}
          title={servingGlass}
          description={constants.servingGlassDescriptions[servingGlass]}
          onCardClick={() => onCardClick(servingGlass)}
          darkMode={darkMode}
          selected={selectedServingGlass === servingGlass}
        />
      ))}
    </ScrollView>
  )
}

BuilderServingGlass.propTypes = {
  darkMode: PropTypes.bool,
  selectedServingGlass: PropTypes.string,
  onCardClick: PropTypes.func,
}
