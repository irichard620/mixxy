import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import getStylesheet from '../Theme/ApplicationStyles'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'
import { PropTypes } from 'prop-types'
import Images from '../Theme/Images'
import * as constants from '../Config/constants'

export default function ImageListItem(props) {
  const { title, onClick, darkMode, disabled } = props

  const styles = getStylesheet(darkMode)
  const listItemStyles = getListItemStylesheet(darkMode)

  // Conditional styles
  const titleColorStyle = {}
  if (title === constants.RECIPE_MENU_DELETE) {
    titleColorStyle.color = Colors.red1
  }

  let imageToUse = null
  if (title === constants.RECIPE_MENU_EDIT) {
    imageToUse = darkMode ? Images.modalEditDark : Images.modalEditLight
  } else if (title === constants.RECIPE_MENU_SHARE) {
    imageToUse = darkMode ? Images.modalShareDark : Images.modalShareLight
  } else if (title === constants.RECIPE_MENU_DELETE) {
    imageToUse = Images.modalTrash
  } else if (title === constants.RECIPE_MENU_CANCEL) {
    imageToUse = Images.modalNo
  } else if (title === constants.RECIPE_MENU_VIEW) {
    imageToUse = darkMode ? Images.modalViewDark : Images.modalViewLight
  }

  return (
    <TouchableOpacity
      style={listItemStyles.container}
      onPress={() => onClick(title)}
      disabled={disabled}
    >
      <View style={listItemStyles.textContainer}>
        {imageToUse && <Image source={imageToUse} style={listItemStyles.icon} />}
        <Text style={[listItemStyles.titleStyle, titleColorStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

ImageListItem.propTypes = {
  darkMode: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string,
  disabled: PropTypes.bool,
}

function getListItemStylesheet(darkMode) {
  return StyleSheet.create({
    container: {
      flex: 1,
      height: 56,
      paddingLeft: 16,
    },
    textContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingRight: 16,
      height: '100%',
    },
    titleStyle: {
      ...Fonts.modalImageTitle,
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
    },
    icon: {
      height: 22,
      marginRight: 16,
      width: 22,
    },
  })
}
