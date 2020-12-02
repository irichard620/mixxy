import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native'
import Colors from '../Theme/Colors'
import Images from '../Theme/Images'
import { PropTypes } from 'prop-types'

export default function BottomBarV2(props) {
  const { darkMode, onButtonClick, buttonTitle, disabled } = props

  let outlineBackground = {}
  if (disabled) {
    outlineBackground.backgroundColor = darkMode ? Colors.darkFill2Dark : Colors.darkFill2Light
  }

  let icon = Images.xCampaign

  return (
    <TouchableOpacity
      style={[styles.outline, outlineBackground]}
      onPress={onButtonClick}
      disabled={disabled}
    >
      <View style={styles.innerView}>
        <Text style={styles.primaryText}>{buttonTitle}</Text>
        <Image style={styles.icon} source={icon} />
      </View>
    </TouchableOpacity>
  )
}

BottomBarV2.propTypes = {
  buttonTitle: PropTypes.string,
  onButtonClick: PropTypes.func,
  darkMode: PropTypes.bool,
  disabled: PropTypes.bool,
}

const styles = StyleSheet.create({
  icon: {
    height: 21,
    resizeMode: 'contain',
  },
  innerView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  outline: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.blue1,
    borderRadius: 27,
    bottom: 16,
    paddingBottom: 15,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 15,
    position: 'absolute',
    right: 16,
    width: 145,
  },
  primaryText: {
    color: Colors.white,
    fontSize: 19,
  },
})
