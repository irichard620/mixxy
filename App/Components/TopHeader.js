import React from 'react'
import { SafeAreaView, Text, Image, TouchableOpacity, View, StyleSheet, Button } from 'react-native'
import getStylesheet from '../Theme/ApplicationStyles'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'
import Images from '../Theme/Images'
import { PropTypes } from 'prop-types'

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
  } = props

  const styles = getStylesheet(darkMode)
  const headerStyles = getTopHeaderStylesheet(darkMode)

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
      <View style={headerStyles.header}>
        <TouchableOpacity style={headerStyles.touchable} onPress={onClose}>
          <Image style={headerStyles.close} source={imageToUse} />
        </TouchableOpacity>
        <Text style={headerStyles.title}>{title}</Text>
        {rightButtonTitle !== undefined && rightButtonTitle !== '' && (
          <Button
            styles={headerStyles.rightButton}
            title={rightButtonTitle}
            onPress={onRightButtonPress}
          />
        )}
        {showDots && (
          <View style={headerStyles.rightDotsView}>
            <TouchableOpacity onPress={onDotsClick}>
              <Image
                style={headerStyles.dots}
                source={darkMode ? Images.topHeaderDotsDark : Images.topHeaderDotsLight}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onFavoriteClick}>
              <Image
                style={headerStyles.favorite}
                source={favoriteImageToUse}
              />
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
}

function getTopHeaderStylesheet(darkMode) {
  return StyleSheet.create({
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
      height: 20,
      resizeMode: 'contain',
    },
    header: {
      alignItems: 'center',
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 5,
      paddingLeft: 8,
      paddingRight: 16,
      paddingTop: 5,
      width: '100%',
    },
    rightDotsView: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    rightButton: {
      alignSelf: 'center',
      justifyContent: 'center',
      width: 20,
    },
    title: {
      ...Fonts.navHeader,
      alignSelf: 'center',
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      justifyContent: 'center',
      marginLeft: 15,
      textAlign: 'center',
    },
    touchable: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
    },
  })
}
