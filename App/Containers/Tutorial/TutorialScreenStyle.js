import { StyleSheet } from 'react-native'
import Fonts from '../../Theme/Fonts'
import Colors from '../../Theme/Colors'


export default function getTutorialStylesheet(useDarkMode) {
  return StyleSheet.create({
    buttonView: {
      alignSelf: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      marginBottom: 16
    },
    scrollView: {
      flex: 1,
      paddingBottom: 16,
    },
    drinkAmountView: {
      width: 144 + 48 + 48,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'row',
      marginBottom: 32,
    },
    drinkAmountCircle: {
      width: 48,
      height: 48,
      borderRadius: 24,
      borderWidth: 0.5,
      borderColor: useDarkMode ? Colors.darkFill2Dark : Colors.darkFill2Light
    },
    drinkAmountText: {
      ...Fonts.h3,
      width: 144,
      textAlign: 'center',
      alignSelf: 'center',
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
    },
    iconView: {
      height: 184,
      marginBottom: 4,
      alignSelf: 'center'
    },
    icon: {
      height: '100%',
      resizeMode: 'contain'
    },
    recipeTitle: {
      ...Fonts.h1,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      textAlign: 'center',
      marginBottom: 32
    },
    bufferView: {
      height: 24,
    },
    descriptionText: {
      ...Fonts.body2,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      paddingLeft: 16,
      paddingRight: 16,
      textAlign: 'left',
    },
    gradientContainer: {
      marginTop: -24,
      height: 24,
      backgroundColor: 'transparent',
      width: '100%'
    },
  })
}
