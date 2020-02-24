
import React from 'react';
import {
  SafeAreaView, Text, Image, TouchableOpacity,
  Dimensions, View, StyleSheet,
} from 'react-native'
import getStylesheet from '../Theme/ApplicationStyles'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'
import Images from '../Theme/Images'

export default function TopHeader(props) {
  const {
    title, onClose, showSeparator, useArrow, darkMode
  } = props;

  const styles = getStylesheet(darkMode)
  const headerStyles = getTopHeaderStylesheet(darkMode)

  const { width } = Dimensions.get('window');
  const titleWidth = {
    width: width - 32 - 40 - 16
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity style={headerStyles.touchable} onPress={onClose}>
          {!useArrow && <Image style={headerStyles.close} source={Images.logo} />}
          {useArrow && <Image style={headerStyles.close} source={Images.logo} />}
        </TouchableOpacity>
        <Text style={[headerStyles.title, titleWidth]}>{title}</Text>
      </View>
      {showSeparator && <View style={styles.divider} />}
    </SafeAreaView>
  );
}

function getTopHeaderStylesheet(darkMode) {
  return StyleSheet.create({
    header: {
      paddingLeft: 8,
      paddingRight: 16,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      paddingTop: 5,
      paddingBottom: 5,
      width: '100%',
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight
    },
    title: {
      ...Fonts.h1,
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      alignSelf: 'center',
      textAlign: 'center',
    },
    close: {
      height: 20,
      width: 20,
    },
    touchable: {
      padding: 8
    }
  })
}
