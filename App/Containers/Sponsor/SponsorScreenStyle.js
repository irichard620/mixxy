import { StyleSheet } from 'react-native'
import Colors from '../../Theme/Colors'
import Fonts from '../../Theme/Fonts'

export default function getSponsorStylesheet(useDarkMode) {
  return StyleSheet.create({
    backContainer: {
      position: 'absolute',
      right: 16,
      top: 56,
    },
    bufferView: {
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      height: 20,
      marginTop: -20,
      width: '100%',
    },
    contentContainer: {
      marginBottom: 24,
      paddingLeft: 16,
      paddingRight: 16,
    },
    description: {
      ...Fonts.body1,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginBottom: 24,
      marginTop: 24,
    },
    linearGradient: {
      flex: 1,
    },
    scrollContainer: {
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      flex: 1,
    },
    sponsorBottomGradientContainer: {
      backgroundColor: 'transparent',
      bottom: 0,
      height: 144,
      left: 0,
      position: 'absolute',
      right: 0,
      zIndex: 1,
    },
    title: {
      ...Fonts.h1Semibold,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      alignSelf: 'center',
      marginBottom: 8,
    },
    topImage: {
      height: 251,
    },
    logoOutline: {
      width: 168,
      height: 168,
      alignSelf: 'center',
      marginTop: -104,
      marginBottom: 16,
    },
    logoImage: {
      width: 168,
      height: 168,
      borderRadius: 84,
    },
    topImageOutline: {
      alignSelf: 'center',
      backgroundColor: useDarkMode ? Colors.darkFill1Dark : Colors.darkFill1Light,
      height: 251,
    },
    sponsorTypeOutline: {
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginBottom: 24,
    },
    sponsorTypeText: {
      ...Fonts.body1,
      color: useDarkMode ? Colors.stepTextDark : Colors.stepTextLight,
    },
    sponsorTypeIcon: {
      width: 16,
      height: 16,
      marginRight: 6,
    }
  })
}
