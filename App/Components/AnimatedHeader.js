import React from 'react'
import { SafeAreaView, StyleSheet, Animated, View, Button } from 'react-native'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'
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
  const searchTextStyle = {
    color: Colors.blue1,
    ...Fonts.body1,
  }

  return (
    <AnimatedSafeAreaView style={backgroundColorStyle}>
      <Animated.View style={headerStyles.topHeaderOutline}>
        <View style={headerStyles.rightPlaceholder} />
        <Animated.Text style={textStyle}>{title}</Animated.Text>
        {addSearch ? (
          <Button
            styles={[headerStyles.rightButton, searchTextStyle]}
            title="Search"
            onPress={() => {
              NavigationService.navigate('AllRecipesScreen', { focusSearchBar: true })
            }}
          />
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
  rightPlaceholder: {
    height: 0,
    width: 80,
  },
  rightButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 80,
  },
  topHeaderOutline: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 48,
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
  },
})
