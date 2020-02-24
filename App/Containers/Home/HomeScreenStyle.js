import Colors from '../../Theme/Colors'
import Fonts from '../../Theme/Fonts';
import { StyleSheet } from 'react-native'

export default function getHomeStylesheet(useDarkMode) {
  return StyleSheet.create({
    scrollContainer: {
      flex: 1,
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      paddingTop: 8,
    },
    topHeader: {
      ...Fonts.h1,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      textAlign: 'left',
      marginLeft: 16,
      marginBottom: 12
    },
    sectionHeader: {
      ...Fonts.h2,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      textAlign: 'left',
      marginLeft: 16,
      marginBottom: 12,
      marginTop: 24,
    },
    sponsor: {
      height: 216,
      backgroundColor: Colors.darkFill2Light
    }
  })
}
