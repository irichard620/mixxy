import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { PropTypes } from 'prop-types'
import getBuilderStylesheet from './BuilderScreenStyle'
import * as constants from '../../Config/constants'
import ListItem from '../../Components/ListItem'
import Images from '../../Theme/Images'

export default function BuilderBaseSpirit(props) {
  const { darkMode, selectedBaseSpirit, onClick } = props
  const builderStyles = getBuilderStylesheet(darkMode)
  return (
    <ScrollView style={builderStyles.scrollView}>
      <View style={builderStyles.iconView}>
        <Image style={builderStyles.icon} source={Images.logo} />
      </View>
      <Text style={builderStyles.selectionHeader}>Choose a Base Spirit</Text>
      <Text style={builderStyles.selectionSubtitle}>
        What main spirit is the base of your drink?
      </Text>
      {constants.baseSpirits.map((baseSpirit) => (
        <ListItem
          key={baseSpirit}
          title={baseSpirit}
          selected={selectedBaseSpirit === baseSpirit}
          onClick={() => onClick(baseSpirit)}
          darkMode={darkMode}
        />
      ))}
    </ScrollView>
  )
}

BuilderBaseSpirit.propTypes = {
  darkMode: PropTypes.bool,
  selectedBaseSpirit: PropTypes.string,
  onClick: PropTypes.func,
}
