import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import getStylesheet from '../Theme/ApplicationStyles'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'
import { PropTypes } from 'prop-types'

export default function MultiSelectListItem(props) {
  const { title, onClick, darkMode, selected } = props

  const styles = getStylesheet(darkMode)
  const listItemStyles = getListItemStylesheet(darkMode)

  // Conditional styles
  const titleColorStyle = {
    color: darkMode ? Colors.text1Dark : Colors.text1Light,
  }
  if (selected) {
    titleColorStyle.color = Colors.blue1
  }

  return (
    <View style={listItemStyles.container}>
      <View style={listItemStyles.textContainer}>
        <TouchableWithoutFeedback onPress={() => onClick(title)}>
          <View style={listItemStyles.selectOuterContainer}>
            {selected && <View style={listItemStyles.selectInnerContainer} />}
          </View>
        </TouchableWithoutFeedback>
        <Text style={[listItemStyles.titleStyle, titleColorStyle]}>{title}</Text>
      </View>
      <View style={styles.divider} />
    </View>
  )
}

MultiSelectListItem.propTypes = {
  darkMode: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string,
}

function getListItemStylesheet(darkMode) {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: 16,
    },
    selectInnerContainer: {
      backgroundColor: Colors.blue1,
      borderRadius: 6,
      height: 12,
      width: 12,
    },
    selectOuterContainer: {
      alignItems: 'center',
      borderColor: Colors.blue1,
      borderRadius: 9,
      borderWidth: 1,
      height: 18,
      justifyContent: 'center',
      marginRight: 12,
      width: 18,
    },
    textContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingRight: 16,
      height: 48,
    },
    titleStyle: {
      ...Fonts.body1,
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
    },
  })
}
