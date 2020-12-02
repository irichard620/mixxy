import React from 'react'
import { SafeAreaView, StyleSheet, Animated, View, TouchableOpacity, Image } from 'react-native'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'
import Images from '../Theme/Images'
import { PropTypes } from 'prop-types'
import NavigationService from '../Services/NavigationService'

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView)

export default function AnimatedHeader(props) {
  const { title, darkMode, dividerBackgroundColor, textColor, addSearch } = props

  const backgroundColorStyle = {
    backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
  }
  const dividerBackgroundColorStyle = {
    backgroundColor: dividerBackgroundColor,
    height: 0.5,
    width: '100%',
  }
  const textStyle = {
    ...Fonts.navHeader,
    color: textColor,
  }
  const imageToUse = darkMode ? Images.navBartenderDark : Images.navBartenderLight

  return (
    <AnimatedSafeAreaView style={backgroundColorStyle}>
      <Animated.View style={headerStyles.topHeaderOutline}>
        <View style={headerStyles.rightPlaceholder} />
        <Animated.Text style={textStyle}>{title}</Animated.Text>
        {addSearch ? (
          <TouchableOpacity
            style={headerStyles.touchable}
            onPress={() => {
              NavigationService.navigate('AllRecipesScreen', { focusSearchBar: true })
            }}
          >
            <Image style={headerStyles.icon} source={imageToUse} />
          </TouchableOpacity>
        ) : (
          <View style={headerStyles.rightPlaceholder} />
        )}
      </Animated.View>
      <Animated.View style={dividerBackgroundColorStyle} />
    </AnimatedSafeAreaView>
  )
}

AnimatedHeader.propTypes = {
  title: PropTypes.string,
  darkMode: PropTypes.bool,
  dividerBackgroundColor: PropTypes.object,
  textColor: PropTypes.object,
  addSearch: PropTypes.bool,
}

const headerStyles = StyleSheet.create({
  icon: {
    height: 18,
    width: 18,
  },
  rightPlaceholder: {
    height: 0,
    width: 18,
  },
  topHeaderOutline: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 48,
    justifyContent: 'space-between',
    paddingRight: 8,
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
