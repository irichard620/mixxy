import React from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native'
import PullDown from './Pulldown'
import getStylesheet from '../Theme/ApplicationStyles'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'
import { PropTypes } from 'prop-types'

export default function ModalBottomOutline(props) {
  const { title, darkMode, children } = props

  const styles = getStylesheet(darkMode)
  const modalStyles = getModalStylesheet(darkMode)

  // Max height for modal
  const { height, width } = Dimensions.get('window')
  const maxHeightModal = {
    maxHeight: height * 0.75,
    width: width,
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <View style={[modalStyles.content, maxHeightModal]}>
        <PullDown darkMode={darkMode} />
        <Text style={modalStyles.title}>{title}</Text>
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

function getModalStylesheet(darkMode) {
  return StyleSheet.create({
    content: {
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: 32,
      paddingTop: 8,
    },
    title: {
      alignSelf: 'center',
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      ...Fonts.navHeader,
      marginBottom: 14,
      marginTop: 22,
    },
  })
}
