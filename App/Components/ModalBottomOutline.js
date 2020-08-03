import React from 'react'
import { View, Text, KeyboardAvoidingView, Dimensions } from 'react-native'
import PullDown from './Pulldown'
import getStylesheet from '../Theme/ApplicationStyles'
import { PropTypes } from 'prop-types'
import getComponentStylesheet from './ComponentStyle'

export default function ModalBottomOutline(props) {
  const { title, darkMode, children } = props

  const styles = getStylesheet(darkMode)
  const componentStyles = getComponentStylesheet(darkMode)

  // Max height for modal
  const { height, width } = Dimensions.get('window')
  const maxHeightModal = {
    maxHeight: height * 0.75,
    width: width,
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <View style={[componentStyles.modalBottomOutlineContent, maxHeightModal]}>
        <PullDown darkMode={darkMode} />
        <Text style={componentStyles.modalBottomOutlineTitle}>{title}</Text>
        <View style={styles.divider} />
        {children}
      </View>
    </KeyboardAvoidingView>
  )
}

ModalBottomOutline.propTypes = {
  title: PropTypes.string,
  darkMode: PropTypes.bool,
  children: PropTypes.node,
}
