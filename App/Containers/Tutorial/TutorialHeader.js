import React from 'react'
import {
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
  Platform,
  StatusBar,
} from 'react-native'
import Images from '../../Theme/Images'
import { PropTypes } from 'prop-types'
import getTutorialStylesheet from './TutorialScreenStyle'

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView)

export default function TopHeader(props) {
  const {
    onClose,
    darkMode,
    onDotsClick,
    onFavoriteClick,
    isFavorited,
    onShareClick,
    backgroundColor,
    dividerBackgroundColor,
    showDots,
    useAbsolutePosition,
  } = props

  const tutorialStyles = getTutorialStylesheet(darkMode)

  let favoriteImageToUse
  if (isFavorited) {
    favoriteImageToUse = darkMode ? Images.topHeaderUnfavoriteDark : Images.topHeaderUnfavoriteLight
  } else {
    favoriteImageToUse = darkMode ? Images.topHeaderFavoriteDark : Images.topHeaderFavoriteLight
  }

  const backgroundColorStyle = {
    backgroundColor: backgroundColor,
    position: useAbsolutePosition ? 'absolute' : 'relative',
    top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    left: 0,
    right: 0,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }
  const dividerBackgroundColorStyle = {
    backgroundColor: dividerBackgroundColor,
    height: 0.5,
    width: '100%',
  }

  return (
    <AnimatedSafeAreaView style={backgroundColorStyle}>
      <Animated.View style={tutorialStyles.topHeaderOutline}>
        <TouchableOpacity style={headerStyles.touchable} onPress={onClose}>
          <View style={tutorialStyles.topHeaderBubble}>
            <Image
              style={headerStyles.close}
              source={darkMode ? Images.topHeaderXDark : Images.topHeaderXLight}
            />
          </View>
        </TouchableOpacity>
        {showDots && (
          <View style={headerStyles.rightDotsView}>
            <TouchableOpacity onPress={onDotsClick}>
              <View style={[tutorialStyles.topHeaderBubble, headerStyles.marginRight]}>
                <Image
                  style={headerStyles.dots}
                  source={darkMode ? Images.topHeaderDotsDark : Images.topHeaderDotsLight}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onShareClick}>
              <View style={[tutorialStyles.topHeaderBubble, headerStyles.marginRight]}>
                <Image
                  style={headerStyles.share}
                  source={darkMode ? Images.topHeaderShareDark : Images.topHeaderShareLight}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onFavoriteClick}>
              <View style={tutorialStyles.topHeaderBubble}>
                <Image style={headerStyles.favorite} source={favoriteImageToUse} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
      <Animated.View style={dividerBackgroundColorStyle} />
    </AnimatedSafeAreaView>
  )
}

TopHeader.propTypes = {
  onClose: PropTypes.func,
  darkMode: PropTypes.bool,
  onDotsClick: PropTypes.func,
  onFavoriteClick: PropTypes.func,
  isFavorited: PropTypes.bool,
  onShareClick: PropTypes.func,
  backgroundColor: PropTypes.string,
  dividerBackgroundColor: PropTypes.string,
  showDots: PropTypes.bool,
  useAbsolutePosition: PropTypes.bool,
}

const headerStyles = StyleSheet.create({
  close: {
    height: 36,
    width: 36,
  },
  dots: {
    height: 36,
    resizeMode: 'contain',
  },
  favorite: {
    height: 36,
    resizeMode: 'contain',
  },
  marginRight: {
    marginRight: 12,
  },
  rightDotsView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  share: {
    height: 36,
    resizeMode: 'contain',
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
