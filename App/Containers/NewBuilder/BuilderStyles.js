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
    },
    keyboardSpacer: {
      bottom: 0,
      left: 0,
      right: 0,
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
