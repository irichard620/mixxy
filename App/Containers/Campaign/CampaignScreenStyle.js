import { StyleSheet } from 'react-native'
import Colors from '../../Theme/Colors'
import Fonts from '../../Theme/Fonts'

export default function getCampaignStylesheet(useDarkMode) {
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
    campaignBottomGradientContainer: {
      backgroundColor: 'transparent',
      bottom: 0,
      height: 144,
      left: 0,
      position: 'absolute',
      right: 0,
      zIndex: 1,
    },
    contentContainer: {
      marginBottom: 24,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 4,
    },
    description: {
      ...Fonts.body1,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginBottom: 24,
    },
    linearGradient: {
      flex: 1,
    },
    scrollContainer: {
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      flex: 1,
    },
    title: {
      ...Fonts.h1Semibold,
      bottom: 36,
      color: 'white',
      left: 16,
      position: 'absolute',
      zIndex: 2,
    },
    topImage: {
      height: 440,
    },
    topImageOutline: {
      alignSelf: 'center',
      backgroundColor: useDarkMode ? Colors.darkFill1Dark : Colors.darkFill1Light,
      height: 440,
    },
  })
}
