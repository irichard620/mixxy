import { StyleSheet } from 'react-native'
import Fonts from '../../Theme/Fonts'
import Colors from '../../Theme/Colors'

export default function getTutorialStylesheet(useDarkMode) {
  return StyleSheet.create({
    bufferView: {
      height: 24,
    },
    buttonView: {
      alignSelf: 'center',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    descriptionText: {
      ...Fonts.body2,
      color: useDarkMode ? Colors.text2Dark : Colors.text2Light,
      marginBottom: 24,
      paddingLeft: 16,
      paddingRight: 16,
      textAlign: 'center',
    },
    drinkAmountCenterView: {
      flexDirection: 'column',
      height: 48,
      justifyContent: 'center',
      width: 144,
    },
    drinkAmountCircle: {
      alignItems: 'center',
      backgroundColor: useDarkMode ? Colors.blue1TransparentDark : Colors.blue1TransparentLight,
      borderRadius: 12,
      height: 24,
      justifyContent: 'center',
      marginTop: 13,
      width: 24,
    },
    drinkAmountIcon: {
      height: 12,
      resizeMode: 'contain',
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
      height: 50,
      justifyContent: 'center',
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
      marginBottom: 12,
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
    recipeTitle: {
      ...Fonts.h1,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginBottom: 16,
      marginLeft: 16,
      marginRight: 16,
      textAlign: 'center',
    },
    scrollView: {
      flex: 1,
      paddingBottom: 16,
    },
    scrollViewContent: {
      alignItems: 'center',
    },
    sectionHeader: {
      ...Fonts.h3Semibold,
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      textAlign: 'left',
    },
    sectionHeaderContainer: {
      alignItems: 'flex-start',
      height: 50,
      justifyContent: 'center',
      paddingLeft: 16,
      paddingRight: 16,
    },
    servingsContainer: {
      alignItems: 'center',
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      flexDirection: 'row',
      height: 50,
      justifyContent: 'space-between',
      paddingLeft: 16,
      paddingRight: 16,
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
      paddingLeft: 16,
      paddingRight: 16,
      width: '100%',
    },
    stepLine: {
      backgroundColor: useDarkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
      position: 'absolute',
      width: 1,
      left: 22,
    },
    stepText: {
      ...Fonts.body1,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginTop: 12,
      marginBottom: 12,
    },
  })
}
