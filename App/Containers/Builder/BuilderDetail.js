import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import * as constants from '../../Config/constants'
import { PropTypes } from 'prop-types'
import Colors from '../../Theme/Colors'
import Images from '../../Theme/Images'

export default function BuilderDetail(props) {
  const { onDetailClick, disabled, title, value, showArrow, showSeparator, darkMode } = props

  let descriptionValue = value
  if (
    (title === constants.BUILDER_DESCRIPTION_DETAIL ||
      title === constants.BUILDER_RECIPE_NAME_DETAIL) &&
    descriptionValue &&
    descriptionValue.length > 22
  ) {
    descriptionValue = `${value.slice(0, 22)}...`
  }

  return (
    <TouchableOpacity onPress={() => onDetailClick(title)} disabled={disabled}>
      <View style={styles.outline}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.rightView}>
          {descriptionValue !== '' && <Text style={styles.description}>{descriptionValue}</Text>}
          {showArrow && <Image style={styles.icon} source={Images.detailArrow} />}
        </View>
      </View>
      {showSeparator && <View style={styles.separator} />}
    </TouchableOpacity>
  )
}

BuilderDetail.propTypes = {
  disabled: PropTypes.bool,
  onDetailClick: PropTypes.func,
  darkMode: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.string,
  showArrow: PropTypes.bool,
  showSeparator: PropTypes.bool,
}

const styles = StyleSheet.create({
  description: {
    color: Colors.blue1,
    fontSize: 16,
    marginRight: 12,
  },
  icon: {
    height: 18,
    resizeMode: 'contain',
  },
  outline: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
  separator: {
    backgroundColor: '#F1F3F6',
    height: 1,
    marginLeft: 16,
  },
  title: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
  },
})
