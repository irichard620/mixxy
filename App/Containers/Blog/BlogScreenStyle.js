import { StyleSheet } from 'react-native'
import Colors from '../../Theme/Colors'
import Fonts from '../../Theme/Fonts'

export default function getBlogStylesheet(useDarkMode) {
  return StyleSheet.create({
    authorName: {
      ...Fonts.body3,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginLeft: 8,
    },
    backContainer: {
      left: 16,
      position: 'absolute',
      top: 56,
    },
    bodyTextOutline: {
      marginBottom: 18,
      marginTop: 18,
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
      backgroundColor: Colors.transparent,
      bottom: 0,
      height: 144,
      left: 0,
      position: 'absolute',
      right: 0,
      zIndex: 1,
    },
    contentContainer: {
      paddingLeft: 16,
      paddingRight: 16,
    },
    dateText: {
      ...Fonts.body3,
      color: useDarkMode ? Colors.stepTextDark : Colors.stepTextLight,
    },
    description: {
      ...Fonts.body3,
      color: useDarkMode ? Colors.stepTextDark : Colors.stepTextLight,
      marginBottom: 8,
    },
    linearGradient: {
      flex: 1,
    },
    recipesContainer: {
      marginBottom: 24,
      marginTop: 16,
    },
    recipesMentionedText: {
      ...Fonts.h4New,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginTop: 24,
    },
    scrollContainer: {
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      flex: 1,
    },
    title: {
      ...Fonts.h3New,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginBottom: 8,
      marginTop: 4,
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
