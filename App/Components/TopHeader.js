import React from 'react'
import { SafeAreaView, Text, Image, TouchableOpacity, View, StyleSheet, Button } from 'react-native'
import getStylesheet from '../Theme/ApplicationStyles'
import Images from '../Theme/Images'
import Colors from '../Theme/Colors'
import { PropTypes } from 'prop-types'
import getComponentStylesheet from './ComponentStyle'

export default function TopHeader(props) {
  const {
    title,
    onClose,
    showSeparator,
    useArrow,
    darkMode,
    rightButtonTitle,
    onRightButtonPress,
    useTransparent,
  } = props

  const styles = getStylesheet(darkMode)
  const componentStyles = getComponentStylesheet(darkMode)

  let imageToUse
  if (!useArrow) {
    imageToUse = darkMode ? Images.topHeaderXDark : Images.topHeaderXLight
  } else {
    imageToUse = darkMode ? Images.topHeaderBackDark : Images.topHeaderBackLight
  }

  const transparentStyle = {}
  if (useTransparent) {
    transparentStyle.backgroundColor = Colors.transparent
  }

  return (
    <SafeAreaView>
      <View style={[componentStyles.topHeaderOutline, transparentStyle]}>
        <TouchableOpacity style={headerStyles.touchable} onPress={onClose}>
          <Image style={headerStyles.close} source={imageToUse} />
        </TouchableOpacity>
        <Text style={componentStyles.topHeaderTitle}>{title}</Text>
        {!!rightButtonTitle && rightButtonTitle !== '' && (
          <Button
            styles={headerStyles.rightButton}
            title={rightButtonTitle}
            onPress={onRightButtonPress}
          />
        )}
        {!!title && title !== '' && !rightButtonTitle && (
          <View style={headerStyles.rightPlaceholder} />
        )}
      </View>
      {showSeparator && <View style={styles.divider} />}
    </SafeAreaView>
  )
}

TopHeader.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  showSeparator: PropTypes.bool,
  useArrow: PropTypes.bool,
  darkMode: PropTypes.bool,
  rightButtonTitle: PropTypes.string,
  onRightButtonPress: PropTypes.func,
}

const headerStyles = StyleSheet.create({
  close: {
    height: 36,
    width: 36,
  },
  rightButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 20,
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
