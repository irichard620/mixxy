import { StyleSheet } from 'react-native'
import Fonts from '../../Theme/Fonts'
import Colors from '../../Theme/Colors'

export default function getIngredientsStylesheet(useDarkMode) {
  return StyleSheet.create({
    brandSubtitle: {
      textAlign: 'left',
      ...Fonts.body2,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginLeft: 16,
      marginTop: 20,
    },
    bufferView: {
      height: 24,
    },
    buttonView: {
      alignSelf: 'center',
      marginBottom: 16,
    },
    gradientContainer: {
      backgroundColor: Colors.backgroundColorDarkTransparent,
      height: 24,
      marginTop: -24,
      width: '100%',
    },
    horizontalScroll: {
      marginBottom: 8,
      maxHeight: 52,
      paddingBottom: 8,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
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
    ingredientListOutline: {
      width: '100%',
    },
    pickerOutline: {
      flexDirection: 'row',
      height: 200,
      marginBottom: 20,
    },
    scrollView: {
      flex: 1,
      paddingBottom: 16,
    },
    selectionHeader: {
      ...Fonts.h1,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginBottom: 4,
      marginLeft: 16,
      marginRight: 16,
      textAlign: 'center',
    },
    selectionSubtitle: {
      ...Fonts.body2,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginBottom: 24,
      marginLeft: 16,
      marginRight: 16,
      textAlign: 'center',
    },
    textInput: {
      backgroundColor: useDarkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
      borderRadius: 10,
      fontSize: 16,
      marginBottom: 24,
      marginLeft: 16,
      marginRight: 16,
      marginTop: 16,
      padding: 16,
    },
  })
}
