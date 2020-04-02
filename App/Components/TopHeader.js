import React from 'react'
import {
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  View,
  StyleSheet,
  Button,
} from 'react-native'
import getStylesheet from '../Theme/ApplicationStyles'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'
import Images from '../Theme/Images'

export default function TopHeader(props) {
  const {
    title,
    onClose,
    showSeparator,
    useArrow,
    darkMode,
    rightButtonTitle,
    onRightButtonPress,
    showFavorited,
    favorited,
    onFavoriteClick,
  } = props

  const styles = getStylesheet(darkMode)
  const headerStyles = getTopHeaderStylesheet(darkMode)

  const { width } = Dimensions.get('window')
  const titleWidth = {
    width: width - 32 - 70 - 16,
  }
  let imageToUse = ''
  if (!useArrow) {
    imageToUse = darkMode ? Images.topHeaderXDark : Images.topHeaderXLight
  } else {
    imageToUse = darkMode ? Images.topHeaderBackDark : Images.topHeaderBackLight
  }

  return (
    <SafeAreaView>
      <View style={headerStyles.header}>
        <TouchableOpacity style={headerStyles.touchable} onPress={onClose}>
          <Image style={headerStyles.close} source={imageToUse} />
        </TouchableOpacity>
        <Text style={[headerStyles.title, titleWidth]}>{title}</Text>
        {rightButtonTitle !== undefined && rightButtonTitle !== '' && (
          <Button
            styles={headerStyles.rightButton}
            title={rightButtonTitle}
            onPress={onRightButtonPress}
          />
        )}
        {showFavorited && (
          <TouchableOpacity style={headerStyles.favoriteOutline} onPress={onFavoriteClick}>
            {favorited && <Image style={headerStyles.favorite} source={Images.favoriteFull} />}
            {!favorited && <Image style={headerStyles.favorite} source={Images.favoriteEmpty} />}
          </TouchableOpacity>
        )}
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
    favorite: {
      height: 15,
      resizeMode: 'contain',
    },
    favoriteOutline: {
      alignItems: 'center',
      borderColor: darkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
      borderRadius: 18,
      borderWidth: 0.5,
      height: 36,
      justifyContent: 'center',
      width: 36,
    },
    header: {
      alignItems: 'center',
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingBottom: 5,
      paddingLeft: 8,
      paddingRight: 16,
      paddingTop: 5,
      width: '100%',
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
