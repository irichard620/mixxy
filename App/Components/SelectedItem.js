import { StyleSheet, View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import Colors from '../Theme/Colors'
import Fonts from '../Theme/Fonts'
import React from 'react'
import { PropTypes } from 'prop-types'
import Images from '../Theme/Images'
import getComponentStylesheet from './ComponentStyle'

export default function SelectedItem(props) {
  const { darkMode, title, onClick } = props
  const componentStyles = getComponentStylesheet(darkMode)
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={componentStyles.selectedItemOutline}>
        <Text style={styles.text}>{title}</Text>
        <Image style={styles.icon} source={Images.ingredientX} />
      </View>
    </TouchableWithoutFeedback>
  )
}

SelectedItem.propTypes = {
  darkMode: PropTypes.bool,
  title: PropTypes.string,
  onClick: PropTypes.func,
}

const styles = StyleSheet.create({
  icon: {
    height: 8,
    marginBottom: 14,
    marginTop: 14,
    width: 8,
  },
  text: {
    ...Fonts.body1,
    alignSelf: 'center',
    color: Colors.blue1,
    height: 20,
    justifyContent: 'center',
    marginBottom: 10,
    marginRight: 8,
    marginTop: 6,
    textAlign: 'center',
  },
})
