import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import * as constants from '../Config/constants'
import { PropTypes } from 'prop-types'
import Colors from '../Theme/Colors'
import Images from '../Theme/Images'
import Fonts from '../Theme/Fonts'
import Helpers from '../Theme/Helpers'
import getStylesheet from '../Theme/ApplicationStyles'
import getComponentStylesheet from './ComponentStyle'

export default function Detail(props) {
  const { onDetailClick, disabled, title, value, showArrow, showSeparator, darkMode } = props
  const componentStyles = getComponentStylesheet(darkMode)
  const styles = getStylesheet(darkMode)
  let descriptionValue = value
  if (
    (title === constants.BUILDER_DESCRIPTION_DETAIL ||
      title === constants.BUILDER_RECIPE_NAME_DETAIL) &&
    descriptionValue &&
    descriptionValue.length > 22
  ) {
    descriptionValue = `${value.slice(0, 22)}...`
  }
  const marginLeftStyle = {
    marginLeft: 16,
  }

  let arrowIcon = Images.arrowLight
  if (darkMode) {
    arrowIcon = Images.arrowDark
  }

  return (
    <TouchableOpacity onPress={() => onDetailClick(title)} disabled={disabled}>
      <View style={componentStyles.detailOutline}>
        <Text style={componentStyles.detailTitle}>{title}</Text>
        <View style={Helpers.rowStart}>
          {descriptionValue !== '' && (
            <Text style={detailStyles.description}>{descriptionValue}</Text>
          )}
          {showArrow && <Image style={detailStyles.icon} source={arrowIcon} />}
        </View>
      </View>
      {showSeparator && <View style={[styles.divider, marginLeftStyle]} />}
    </TouchableOpacity>
  )
}

Detail.propTypes = {
  disabled: PropTypes.bool,
  onDetailClick: PropTypes.func,
  darkMode: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.string,
  showArrow: PropTypes.bool,
  showSeparator: PropTypes.bool,
}

const detailStyles = StyleSheet.create({
  description: {
    color: Colors.blue1,
    ...Fonts.body2,
    marginRight: 12,
  },
  icon: {
    height: 18,
    resizeMode: 'contain',
  },
})
