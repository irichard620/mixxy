import React from 'react'
import {
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  View,
  StyleSheet,
} from 'react-native'
import getStylesheet from '../Theme/ApplicationStyles'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'
import Images from '../Theme/Images'

export default function TopHeader(props) {
  const { title, onClose, showSeparator, useArrow, darkMode } = props

  const styles = getStylesheet(darkMode)
  const headerStyles = getTopHeaderStylesheet(darkMode)

  const { width } = Dimensions.get('window')
  const titleWidth = {
    width: width - 32 - 40 - 16,
  }

  return (
    <SafeAreaView>
      <View style={headerStyles.header}>
        <TouchableOpacity style={headerStyles.touchable} onPress={onClose}>
          {!useArrow && <Image style={headerStyles.close} source={Images.xButton} />}
          {useArrow && <Image style={headerStyles.close} source={Images.brewBack} />}
        </TouchableOpacity>
        <Text style={[headerStyles.title, titleWidth]}>{title}</Text>
      </View>
      {showSeparator && <View style={styles.divider} />}
    </SafeAreaView>
  )
}

function getTopHeaderStylesheet(darkMode) {
  return StyleSheet.create({
    close: {
      height: 20,
      width: 20,
    },
    header: {
      alignItems: 'center',
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingBottom: 14,
      paddingLeft: 8,
      paddingRight: 16,
      paddingTop: 14,
      width: '100%',
    },
    title: {
      ...Fonts.navHeader,
      alignSelf: 'center',
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      justifyContent: 'center',
      textAlign: 'center',
    },
    touchable: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
    },
  })
}
