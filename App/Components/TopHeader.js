
import React from 'react';
import {
  SafeAreaView, Text, Image, TouchableOpacity,
  Dimensions, View
} from 'react-native';
import { DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode'
import DynamicStyles from '../Theme/ApplicationStyles'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'
import Images from '../Theme/Images'

export default function TopHeader(props) {
  const {
    title, onClose, showSeparator, useArrow
  } = props;

  const styles = useDynamicStyleSheet(DynamicStyles)
  const headerStyles = useDynamicStyleSheet(HeaderStyles)

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

const HeaderStyles = new DynamicStyleSheet({
  header: {
    paddingLeft: 8,
    paddingRight: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    width: '100%',
    backgroundColor: new DynamicValue(Colors.backgroundColorLight, Colors.backgroundColorDark)
  },
  title: {
    ...Fonts.h1,
    color: new DynamicValue(Colors.text1Light, Colors.text1Dark),
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
});
