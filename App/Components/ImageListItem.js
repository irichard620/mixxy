import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Colors from '../Theme/Colors'
import { PropTypes } from 'prop-types'
import Images from '../Theme/Images'
import * as constants from '../Config/constants'
import getComponentStylesheet from './ComponentStyle'

export default function ImageListItem(props) {
  const { title, onClick, darkMode, disabled, disabledText } = props

  const componentStyles = getComponentStylesheet(darkMode)

  // Conditional styles
  const titleColorStyle = {}
  if (title === constants.RECIPE_MENU_DELETE) {
    titleColorStyle.color = Colors.red1
  } else if (disabled) {
    titleColorStyle.color = darkMode ? Colors.text2Dark : Colors.text2Light
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
  } else if (title === constants.BUILDER_MENU_BASIC_DETAILS) {
    imageToUse = darkMode ? Images.modalEditDark : Images.modalEditLight
  } else if (title === constants.BUILDER_MENU_INGREDIENTS) {
    imageToUse = darkMode ? Images.modalEditDark : Images.modalEditLight
  } else if (title === constants.RECIPE_MENU_FAVORITE) {
    imageToUse = darkMode ? Images.modalFavoriteDark : Images.modalFavoriteLight
  } else if (title === constants.RECIPE_MENU_UNFAVORITE) {
    imageToUse = darkMode ? Images.modalUnfavoriteDark : Images.modalUnfavoriteLight
  }

  let titleToShow = title
  if (disabled && disabledText) {
    titleToShow = disabledText
  }

  return (
    <TouchableOpacity
      style={imageListItemStyles.container}
      onPress={() => onClick(title)}
      disabled={disabled}
    >
      <View style={imageListItemStyles.textContainer}>
        {imageToUse && <Image source={imageToUse} style={imageListItemStyles.icon} />}
        <Text style={[componentStyles.imageListItemTitleStyle, titleColorStyle]}>
          {titleToShow}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

ImageListItem.propTypes = {
  darkMode: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  disabledText: PropTypes.string,
}

const imageListItemStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: 56,
    paddingLeft: 16,
  },
  icon: {
    height: 22,
    marginRight: 16,
    width: 22,
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
})
