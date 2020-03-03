import React from 'react'
import { View, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native'
import { PropTypes } from 'prop-types'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'

export default function CardSelection(props) {
  const { title, description, onCardClick, darkMode, selected } = props
  const cardStyles = getCardStylesheet(darkMode)

  // Conditional styles
  const backgroundColorStyle = {}
  const titleColorStyle = {
    color: darkMode ? Colors.text1Dark : Colors.text1Light,
  }
  if (selected) {
    backgroundColorStyle.backgroundColor = darkMode
      ? Colors.blue1TransparentDark
      : Colors.blue1TransparentLight
    titleColorStyle.color = Colors.blue1
  }
  return (
    <TouchableWithoutFeedback onPress={onCardClick}>
      <View style={[cardStyles.cardOutline, backgroundColorStyle]}>
        <Text style={[cardStyles.title, titleColorStyle]}>{title}</Text>
        <Text style={cardStyles.description}>{description}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

CardSelection.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onCardClick: PropTypes.func,
  darkMode: PropTypes.bool,
}

function getCardStylesheet(darkMode) {
  return StyleSheet.create({
    cardOutline: {
      borderColor: darkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
      borderRadius: 10,
      borderWidth: 0.5,
      marginBottom: 8,
      marginLeft: 16,
      marginRight: 16,
      padding: 16,
    },
    description: {
      ...Fonts.body2,
      color: darkMode ? Colors.text2Dark : Colors.text2Light,
      textAlign: 'left',
    },
    title: {
      ...Fonts.cardSelectionTitle,
      marginBottom: 4,
      textAlign: 'left',
    },
  })
}
