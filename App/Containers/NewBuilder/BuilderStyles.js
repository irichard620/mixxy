import { StyleSheet } from 'react-native'
import Fonts from '../../Theme/Fonts'
import Colors from '../../Theme/Colors'

export default function getBuilderStylesheet(useDarkMode) {
  return StyleSheet.create({
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
    headingDescription: {
      alignSelf: 'flex-start',
      marginBottom: 18,
      marginLeft: 16,
      marginRight: 16,
      textAlign: 'left',
      ...Fonts.body1,
      color: useDarkMode ? Colors.text2Dark : Colors.text2Light,
    },
    ingredientRow: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 12,
    },
    scrollView: {
      flex: 1,
      marginBottom: 16,
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
