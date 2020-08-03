import { StyleSheet } from 'react-native'
import Fonts from '../../Theme/Fonts'
import Colors from '../../Theme/Colors'

export default function getBuilderStylesheet(useDarkMode) {
  return StyleSheet.create({
    buffer: {
      height: 24,
    },
    heading: {
      alignSelf: 'flex-start',
      marginBottom: 18,
      marginLeft: 16,
      marginRight: 16,
      marginTop: 8,
      textAlign: 'left',
      ...Fonts.top,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
    },
    headingContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 18,
      marginTop: 8,
      paddingLeft: 16,
      paddingRight: 16,
    },
    headingDescription: {
      alignSelf: 'flex-start',
      marginBottom: 18,
      marginLeft: 16,
      marginRight: 16,
      textAlign: 'left',
      ...Fonts.body1,
      color: useDarkMode ? Colors.text2Dark : Colors.text2Light,
    },
    headingWithinContainer: {
      alignSelf: 'flex-start',
      textAlign: 'left',
      ...Fonts.top,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
    },
    ingredientRow: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 12,
      marginLeft: 16,
    },
    ingredientTextboxContainer: {
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      borderColor: useDarkMode ? Colors.darkFill1Dark : Colors.darkFill1Light,
      borderRadius: 10,
      borderWidth: 0.5,
      flexDirection: 'row',
    },
    ingredientTextboxIcon: {
      height: 12,
      resizeMode: 'contain',
    },
    ingredientTextboxInput: {
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      fontSize: 16,
      marginLeft: 12,
      marginRight: 12,
      width: '100%',
    },
    ingredientTextboxUnitContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      marginRight: 12,
      paddingBottom: 14,
      paddingLeft: 12,
      paddingTop: 14,
    },
    ingredientTextboxVerticalDivider: {
      backgroundColor: useDarkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
      marginBottom: 8,
      marginTop: 8,
      width: 0.5,
    },
    keyboardSpacer: {
      bottom: 0,
      left: 0,
      right: 0,
    },
    recipeStepDeleteIcon: {
      height: 8,
      resizeMode: 'contain',
    },
    recipeStepDeleteOutline: {
      alignItems: 'center',
      backgroundColor: useDarkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
      borderRadius: 10,
      height: 20,
      justifyContent: 'center',
      marginRight: 12,
      marginTop: 12,
      width: 20,
    },
    recipeStepHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
      marginLeft: 16,
    },
    recipeStepTextContainer: {
      backgroundColor: useDarkMode ? Colors.cardColorDark : Colors.cardColorLight,
      borderRadius: 15,
      shadowColor: Colors.backgroundColorDark,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    },
    recipeStepTextInput: {
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      fontSize: 17,
      marginBottom: 16,
      marginLeft: 16,
    },
    recipeStepTitle: {
      ...Fonts.uppercaseBold,
      color: useDarkMode ? Colors.text3Dark : Colors.text3Light,
      marginTop: 16,
    },
    recipeStepTouchable: {
      padding: 8,
    },
    scrollView: {
      flex: 1,
    },
    sectionHeading: {
      alignSelf: 'flex-start',
      marginBottom: 12,
      marginLeft: 16,
      textAlign: 'left',
      ...Fonts.body1,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
    },
  })
}
