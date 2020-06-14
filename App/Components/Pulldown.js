import React from 'react'
import { View } from 'react-native'
import Colors from '../Theme/Colors'
import { PropTypes } from 'prop-types'

export default function PullDown(props) {
  const { darkMode } = props
  const pulldownStyle = {
    alignSelf: 'center',
    backgroundColor: darkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
    borderRadius: 3,
    height: 6,
    width: 40,
  }
  return <View style={pulldownStyle} />
}

PullDown.propTypes = {
  darkMode: PropTypes.bool,
}
