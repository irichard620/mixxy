/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import Colors from './Colors'
import { StyleSheet } from 'react-native'

export default function getStylesheet(darkMode) {
  return StyleSheet.create({
    divider: {
      backgroundColor: darkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
      flex: 1,
      height: 0.5,
      width: '100%',
    },
    outerContainer: {
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      flex: 1,
    },
    thickDivider: {
      backgroundColor: darkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
      height: 8,
      width: '100%',
    },
  })
}
