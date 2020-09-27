import Colors from '../../Theme/Colors'
import Fonts from '../../Theme/Fonts'
import { StyleSheet } from 'react-native'

export default function getBartenderStylesheet(useDarkMode) {
  return StyleSheet.create({
    sectionHeader: {
      color: useDarkMode ? Colors.stepTextDark : Colors.stepTextLight,
      ...Fonts.uppercaseBold,
      marginBottom: 12,
      marginTop: 16,
    },
  })
}
