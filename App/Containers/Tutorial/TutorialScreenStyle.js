import { StyleSheet } from 'react-native'
import Fonts from '../../Theme/Fonts'
import Colors from '../../Theme/Colors'

export default function getTutorialStylesheet(useDarkMode) {
  return StyleSheet.create({
    bufferView: {
      height: 32,
    },
    buttonView: {
      alignSelf: 'center',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    descriptionText: {
      ...Fonts.body1,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginTop: 16,
      paddingLeft: 16,
      paddingRight: 16,
      textAlign: 'left',
    },
    drinkAmountCenterView: {
      flexDirection: 'column',
      height: 48,
      justifyContent: 'center',
      width: 144,
    },
    drinkAmountCircle: {
      alignItems: 'center',
      borderRadius: 8,
      height: 24,
      justifyContent: 'center',
      marginTop: 14,
      width: 24,
    },
    drinkAmountIcon: {
      resizeMode: 'contain',
      width: 12,
    },
    drinkAmountText: {
      ...Fonts.body1,
      alignSelf: 'center',
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginLeft: 18,
      marginRight: 18,
      textAlign: 'center',
    },
    drinkAmountView: {
      alignItems: 'flex-start',
      alignSelf: 'center',
      flexDirection: 'row',
      height: 52,
      justifyContent: 'space-between',
      width: 164,
    },
    gradientContainer: {
      backgroundColor: Colors.backgroundColorDarkTransparent,
      height: 24,
      marginTop: -24,
      width: '100%',
    },
    icon: {
      height: '100%',
      resizeMode: 'contain',
    },
    iconView: {
      alignSelf: 'center',
      height: 184,
      marginBottom: 24,
    },
    menuButtonSeparator: {
      height: 24,
    },
    menuButtonsOutline: {
      alignItems: 'center',
      alignSelf: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
      width: '100%',
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
    },
    readMoreOutline: {
      alignSelf: 'flex-end',
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      marginRight: 16,
      marginTop: -22,
    },
    readMoreText: {
      ...Fonts.buttonText,
      color: Colors.blue1,
      paddingLeft: 10,
      paddingRight: 10,
      textAlign: 'center',
    },
    recipeTitle: {
      ...Fonts.h1,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginLeft: 16,
      marginRight: 16,
      textAlign: 'center',
    },
    scrollView: {
      paddingBottom: 16,
    },
    scrollViewContent: {
      alignItems: 'center',
    },
    sectionHeader: {
      ...Fonts.h3Semibold,
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      height: 24,
      marginBottom: 13,
      marginTop: 13,
      textAlign: 'left',
    },
    sectionHeaderContainer: {
      alignItems: 'flex-start',
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      height: 50,
      justifyContent: 'center',
      paddingLeft: 16,
      paddingRight: 16,
    },
    servingsContainer: {
      alignItems: 'center',
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      height: 52,
    },
    stepCircle: {
      backgroundColor: useDarkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
      borderRadius: 6,
      height: 12,
      marginRight: 12,
      marginTop: 16,
      width: 12,
    },
    stepContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    stepLine: {
      backgroundColor: useDarkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
      left: 6,
      position: 'absolute',
      width: 1,
    },
    stepText: {
      ...Fonts.body1,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginBottom: 12,
      marginTop: 12,
    },
    stepsContainer: {
      marginLeft: 16,
    },
    topHeaderBubble: {
      alignItems: 'center',
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      borderRadius: 18,
      height: 36,
      justifyContent: 'center',
      width: 36,
    },
    topHeaderOutline: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingRight: 8,
    },
  })
}
