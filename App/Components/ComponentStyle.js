import { StyleSheet } from 'react-native'
import Colors from '../Theme/Colors'
import Fonts from '../Theme/Fonts'

const baseButtonLargeStyle = {
  height: 48,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
}

export default function getComponentStylesheet(darkMode) {
  return StyleSheet.create({
    clickableTextboxTextContainer: {
      alignItems: 'center',
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      borderColor: darkMode ? Colors.darkFill1Dark : Colors.darkFill1Light,
      borderRadius: 10,
      borderWidth: 0.5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
      marginLeft: 16,
      marginRight: 16,
      padding: 14,
    },
    detailOutline: {
      alignItems: 'center',
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      flexDirection: 'row',
      flexWrap: 'nowrap',
      height: 48,
      justifyContent: 'space-between',
      paddingLeft: 16,
      paddingRight: 16,
    },
    detailTitle: {
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      ...Fonts.body2,
    },
    disabledButtonLarge: {
      ...baseButtonLargeStyle,
      backgroundColor: darkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
    },
    imageListItemTitleStyle: {
      ...Fonts.modalImageTitle,
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
    },
    listItemSubtitleStyle: {
      ...Fonts.body1,
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
    },
    listItemTitleStyle: {
      ...Fonts.body1,
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
    },
    modalBarCartDescription: {
      alignSelf: 'flex-start',
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      ...Fonts.body1,
      marginBottom: 16,
      marginLeft: 16,
      marginRight: 16,
      marginTop: 24,
    },
    modalBottomOutlineContent: {
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: 32,
      paddingTop: 8,
    },
    modalBottomOutlineTitle: {
      alignSelf: 'center',
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      ...Fonts.navHeader,
    },
    modalCenterOutlineContent: {
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      borderRadius: 20,
      paddingBottom: 16,
    },
    modalProDescription: {
      alignSelf: 'flex-start',
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      ...Fonts.body1,
      marginBottom: 32,
      marginLeft: 16,
      marginRight: 16,
    },
    modalShareDescription: {
      alignSelf: 'flex-start',
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      ...Fonts.body1,
      marginBottom: 16,
      marginLeft: 16,
      marginRight: 16,
      marginTop: 16,
    },
    primaryButtonLarge: {
      ...baseButtonLargeStyle,
      backgroundColor: Colors.blue1,
    },
    recipeCardImageContainer: {
      alignItems: 'center',
      backgroundColor: darkMode ? Colors.blue1TransparentDark : Colors.blue1TransparentLight,
      borderRadius: 10,
      height: 48,
      justifyContent: 'center',
      marginRight: 14,
      width: 48,
    },
    recipeCardName: {
      ...Fonts.body1,
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      marginBottom: 2,
      textAlign: 'left',
    },
    recipeCardOutline: {
      backgroundColor: darkMode ? Colors.cardColorDark : Colors.cardColorLight,
      borderRadius: 10,
      marginBottom: 12,
      marginLeft: 16,
      marginRight: 16,
      paddingBottom: 18,
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 18,
      shadowColor: Colors.backgroundColorDark,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    },
    recipeCardType: {
      ...Fonts.body3,
      color: darkMode ? Colors.text2Dark : Colors.text2Light,
      textAlign: 'left',
    },
    secondaryButtonLarge: {
      ...baseButtonLargeStyle,
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      borderColor: darkMode ? Colors.darkFill1Dark : Colors.darkFill1Light,
      borderWidth: 0.5,
    },
    secondaryTextButtonLarge: {
      ...Fonts.buttonText,
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
    },
    selectedItemOutline: {
      alignItems: 'center',
      backgroundColor: darkMode ? Colors.blue1TransparentDark : Colors.blue1TransparentLight,
      borderRadius: 18,
      flexDirection: 'row',
      flexWrap: 'nowrap',
      height: 36,
      justifyContent: 'center',
      marginBottom: 8,
      marginRight: 8,
      paddingLeft: 16,
      paddingRight: 16,
    },
    textboxContainer: {
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      borderColor: darkMode ? Colors.darkFill1Dark : Colors.darkFill1Light,
      borderRadius: 10,
      borderWidth: 0.5,
      marginBottom: 24,
      marginLeft: 16,
      marginRight: 16,
      padding: 14,
    },
    textboxInput: {
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      fontSize: 16,
      width: '100%',
    },
    topHeaderOutline: {
      alignItems: 'center',
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingRight: 16,
      paddingTop: 5,
      width: '100%',
    },
    topHeaderTitle: {
      ...Fonts.navHeader,
      alignSelf: 'center',
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      justifyContent: 'center',
      textAlign: 'center',
    },
  })
}
