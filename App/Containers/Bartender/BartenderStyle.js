import Colors from '../../Theme/Colors'
import Fonts from '../../Theme/Fonts'
import { StyleSheet } from 'react-native'

export default function getBartenderStylesheet(useDarkMode) {
  return StyleSheet.create({
    emptyContainer: {
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center',
      margin: 10,
      marginTop: '45%',
    },
    emptyText: {
      ...Fonts.body1,
      color: useDarkMode ? Colors.text2Dark : Colors.text2Light,
      textAlign: 'center',
    },
    sectionHeader: {
      color: useDarkMode ? Colors.stepTextDark : Colors.stepTextLight,
      ...Fonts.uppercaseBold,
      marginBottom: 12,
      marginLeft: 16,
      marginTop: 16,
    },
  })
}
