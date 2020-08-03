import React from 'react'
import { SafeAreaView, Text, Image, TouchableOpacity, View, StyleSheet, Button } from 'react-native'
import getStylesheet from '../Theme/ApplicationStyles'
import Images from '../Theme/Images'
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
    showDots,
    onDotsClick,
    onFavoriteClick,
    isFavorited,
    onShareClick,
  } = props

  const styles = getStylesheet(darkMode)
  const componentStyles = getComponentStylesheet(darkMode)

  let imageToUse
  if (!useArrow) {
    imageToUse = darkMode ? Images.topHeaderXDark : Images.topHeaderXLight
  } else {
    imageToUse = darkMode ? Images.topHeaderBackDark : Images.topHeaderBackLight
  }

  let favoriteImageToUse
  if (isFavorited) {
    favoriteImageToUse = Images.topHeaderUnfavorite
  } else {
    favoriteImageToUse = darkMode ? Images.topHeaderFavoriteDark : Images.topHeaderFavoriteLight
  }

  return (
    <SafeAreaView>
      <View style={componentStyles.topHeaderOutline}>
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
        {showDots && (
          <View style={headerStyles.rightDotsView}>
            <TouchableOpacity onPress={onDotsClick}>
              <Image
                style={headerStyles.dots}
                source={darkMode ? Images.topHeaderDotsDark : Images.topHeaderDotsLight}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onShareClick}>
              <Image
                style={headerStyles.share}
                source={darkMode ? Images.topHeaderShareDark : Images.topHeaderShareLight}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onFavoriteClick}>
              <Image style={headerStyles.favorite} source={favoriteImageToUse} />
            </TouchableOpacity>
          </View>
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
  showDots: PropTypes.bool,
  onDotsClick: PropTypes.func,
  onFavoriteClick: PropTypes.func,
  isFavorited: PropTypes.bool,
  onShareClick: PropTypes.func,
}

const headerStyles = StyleSheet.create({
  close: {
    height: 20,
    width: 20,
  },
  dots: {
    height: 20,
    marginRight: 20,
    resizeMode: 'contain',
  },
  favorite: {
    height: 22,
    resizeMode: 'contain',
  },
  rightButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 20,
  },
  rightDotsView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightPlaceholder: {
    height: 0,
    width: 20,
  },
  share: {
    height: 20,
    marginRight: 20,
    resizeMode: 'contain',
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
})
