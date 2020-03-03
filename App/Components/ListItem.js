import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import getStylesheet from '../Theme/ApplicationStyles'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'

export default function ListItem(props) {
  const { title, subtitle, onClick, darkMode, selected } = props

  const styles = getStylesheet(darkMode)
  const listItemStyles = getListItemStylesheet(darkMode)

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
    <TouchableOpacity style={[listItemStyles.container, backgroundColorStyle]} onPress={onClick}>
      <View style={listItemStyles.textContainer}>
        <Text style={[listItemStyles.titleStyle, titleColorStyle]}>{title}</Text>
        <Text style={listItemStyles.subtitleStyle}>{subtitle}</Text>
      </View>
      <View style={styles.divider} />
    </TouchableOpacity>
  )
}

function getListItemStylesheet(darkMode) {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: 16,
    },
    subtitleStyle: {
      ...Fonts.body1,
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
    },
    textContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 16,
      paddingTop: 15,
      paddingBottom: 15,
    },
    titleStyle: {
      ...Fonts.body1,
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
    },
  })
}
