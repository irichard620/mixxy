import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import getStylesheet from '../Theme/ApplicationStyles'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'
import { PropTypes } from 'prop-types'
import Images from '../Theme/Images'

export default function ListItem(props) {
  const { title, subtitle, onClick, darkMode, selected, showArrow, disabled } = props

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
  } else if (title === 'Add Custom Ingredient') {
    titleColorStyle.color = Colors.blue1
  }

  let arrowIcon = Images.arrowLight
  if (darkMode) {
    arrowIcon = Images.arrowDark
  }

  return (
    <TouchableOpacity
      style={[listItemStyles.container, backgroundColorStyle]}
      onPress={() => onClick(title)}
      disabled={disabled}
    >
      <View style={listItemStyles.textContainer}>
        <Text style={[listItemStyles.titleStyle, titleColorStyle]}>{title}</Text>
        {subtitle && subtitle !== '' && (
          <Text style={listItemStyles.subtitleStyle}>{subtitle}</Text>
        )}
        {showArrow && <Image style={listItemStyles.icon} source={arrowIcon} />}
      </View>
      <View style={styles.divider} />
    </TouchableOpacity>
  )
}

ListItem.propTypes = {
  darkMode: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  showArrow: PropTypes.bool,
  disabled: PropTypes.bool,
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
      height: 48,
    },
    titleStyle: {
      ...Fonts.body1,
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
    },
    icon: {
      height: 18,
      resizeMode: 'contain',
    },
  })
}
