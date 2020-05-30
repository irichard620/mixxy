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
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
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
      borderColor: useDarkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
      borderRadius: 24,
      borderWidth: 0.5,
      height: 48,
      justifyContent: 'center',
      width: 48,
    },
    drinkAmountIcon: {
      height: 16,
      resizeMode: 'contain',
    },
    drinkAmountOuncesText: {
      ...Fonts.body1,
      alignSelf: 'center',
      color: Colors.orange1,
      textAlign: 'center',
    },
    drinkAmountText: {
      ...Fonts.h3,
      alignSelf: 'center',
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      textAlign: 'center',
      width: 144,
    },
    drinkAmountView: {
      alignItems: 'flex-start',
      alignSelf: 'center',
      flexDirection: 'row',
      height: 48,
      justifyContent: 'center',
      marginBottom: 32,
      width: 144 + 48 + 48,
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
      marginBottom: 4,
    },
    recipeTitle: {
      ...Fonts.h1,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginBottom: 32,
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
    stepContainer: {
      marginLeft: 16,
      marginRight: 16,
      width: '100%',
    },
    menuButtonsOutline: {
      alignItems: 'center',
      alignSelf: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
      width: '100%',
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight
    },
    menuButtonSeparator: {
      height: 24,
    },
  })
}
