import Colors from '../../Theme/Colors'
import Fonts from '../../Theme/Fonts'
import { StyleSheet } from 'react-native'

export default function getHomeStylesheet(useDarkMode) {
  return StyleSheet.create({
    scrollContainer: {
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      flex: 1,
      paddingTop: 8,
    },
    sectionHeader: {
      ...Fonts.h2,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginBottom: 12,
      marginLeft: 16,
      marginTop: 24,
      textAlign: 'left',
    },
    sponsor: {
      backgroundColor: Colors.darkFill2Light,
      height: 216,
    },
    topHeader: {
      ...Fonts.h1,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginBottom: 12,
      marginLeft: 16,
      textAlign: 'left',
    },
  })
}
