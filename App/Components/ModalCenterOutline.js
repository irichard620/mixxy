import React from 'react'
import { View, Dimensions, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import { PropTypes } from 'prop-types'
import getComponentStylesheet from './ComponentStyle'
import Images from '../Theme/Images'

export default function ModalCenterOutline(props) {
  const { onClose, darkMode, children, title } = props

  const componentStyles = getComponentStylesheet(darkMode)

  // Max height for modal
  const { height, width } = Dimensions.get('window')
  const maxHeightModal = {
    maxHeight: height * 0.75,
    width: width - 48,
  }

  return (
    <View style={[componentStyles.modalCenterOutlineContent, maxHeightModal]}>
      <View style={componentStyles.topHeaderOutline}>
        <TouchableOpacity style={headerStyles.touchable} onPress={onClose}>
          <Image
            style={headerStyles.close}
            source={darkMode ? Images.topHeaderXDark : Images.topHeaderXLight}
          />
        </TouchableOpacity>
        <Text style={componentStyles.topHeaderTitle}>{title}</Text>
        <View style={headerStyles.rightPlaceholder} />
      </View>
      {children}
    </View>
  )
}

ModalCenterOutline.propTypes = {
  title: PropTypes.string,
  darkMode: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func,
}

const headerStyles = StyleSheet.create({
  close: {
    height: 36,
    width: 36,
  },
  rightPlaceholder: {
    height: 0,
    width: 36,
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 5,
  },
})
