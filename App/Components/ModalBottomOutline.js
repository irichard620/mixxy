import React from 'react'
import { View, Text, KeyboardAvoidingView, Dimensions, Button, StyleSheet } from 'react-native'
import PullDown from './Pulldown'
import getStylesheet from '../Theme/ApplicationStyles'
import { PropTypes } from 'prop-types'
import getComponentStylesheet from './ComponentStyle'
import Colors from '../Theme/Colors'

export default function ModalBottomOutline(props) {
  const { title, darkMode, children, onRightButtonClick, rightButtonTitle } = props

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
        <View style={modalStyles.content}>
          <Button title={rightButtonTitle || ''} color={Colors.transparent} />
          <Text style={componentStyles.modalBottomOutlineTitle}>{title}</Text>
          <Button
            title={rightButtonTitle || ''}
            color={Colors.blue1}
            onPress={onRightButtonClick}
          />
        </View>
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
  onRightButtonClick: PropTypes.func,
  rightButtonTitle: PropTypes.string,
}

const modalStyles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
  },
})
