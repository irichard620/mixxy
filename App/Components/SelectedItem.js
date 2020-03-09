import { StyleSheet, View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import Colors from '../Theme/Colors'
import Fonts from '../Theme/Fonts'
import React from 'react'
import { PropTypes } from 'prop-types'
import Images from '../Theme/Images'

export default function SelectedItem(props) {
  const { darkMode, title, onClick } = props
  const selectedItemStyles = getSelectedItemStylesheet(darkMode)
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={selectedItemStyles.outline}>
        <Text style={selectedItemStyles.text}>{title}</Text>
        <Image style={selectedItemStyles.icon} source={Images.xButton} />
      </View>
    </TouchableWithoutFeedback>
  )
}

SelectedItem.propTypes = {
  darkMode: PropTypes.bool,
  title: PropTypes.string,
  onClick: PropTypes.func,
}

function getSelectedItemStylesheet(darkMode) {
  return StyleSheet.create({
    outline: {
      alignItems: 'center',
      backgroundColor: darkMode ? Colors.blue1TransparentDark : Colors.blue1TransparentLight,
      borderRadius: 18,
      flexDirection: 'row',
      flexWrap: 'nowrap',
      height: 36,
      justifyContent: 'center',
      marginRight: 8,
      paddingBottom: 8,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
    },
    text: {
      ...Fonts.body1,
      color: Colors.blue1,
      marginRight: 8,
    },
    icon: {
      height: 8,
      width: 8,
    },
  })
}
