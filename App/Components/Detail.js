import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import * as constants from '../Config/constants'
import { PropTypes } from 'prop-types'
import Colors from '../Theme/Colors'
import Images from '../Theme/Images'
import Fonts from '../Theme/Fonts'
import getStylesheet from '../Theme/ApplicationStyles'

export default function Detail(props) {
  const { onDetailClick, disabled, title, value, showArrow, showSeparator, darkMode } = props
  const detailStyles = getDetailStylesheet(darkMode)
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

  return (
    <TouchableOpacity onPress={() => onDetailClick(title)} disabled={disabled}>
      <View style={detailStyles.outline}>
        <Text style={detailStyles.title}>{title}</Text>
        <View style={detailStyles.rightView}>
          {descriptionValue !== '' && (
            <Text style={detailStyles.description}>{descriptionValue}</Text>
          )}
          {showArrow && <Image style={detailStyles.icon} source={Images.detailArrow} />}
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

function getDetailStylesheet(darkMode) {
  return StyleSheet.create({
    description: {
      color: Colors.blue1,
      ...Fonts.body2,
      marginRight: 12,
    },
    icon: {
      height: 18,
      resizeMode: 'contain',
    },
    outline: {
      alignItems: 'center',
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      flexDirection: 'row',
      flexWrap: 'nowrap',
      height: 48,
      justifyContent: 'space-between',
      paddingLeft: 16,
      paddingRight: 16,
    },
    rightView: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
    },
    title: {
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      ...Fonts.body2,
    },
  })
}
