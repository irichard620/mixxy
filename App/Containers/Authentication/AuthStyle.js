import { StyleSheet } from 'react-native'
import Fonts from '../../Theme/Fonts'
import Colors from '../../Theme/Colors'

export default function getAuthStylesheet(useDarkMode) {
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
    headingDescription: {
      alignSelf: 'flex-start',
      marginBottom: 18,
      marginLeft: 16,
      marginRight: 16,
      textAlign: 'left',
      ...Fonts.body1,
      color: useDarkMode ? Colors.text2Dark : Colors.text2Light,
    },
    noAccountText: {
      alignSelf: 'center',
      textAlign: 'center',
      ...Fonts.body2,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
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
    }
  })
}
