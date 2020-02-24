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
      flex: 1,
      height: 0.5,
      width: '100%',
      backgroundColor: darkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
    },
    thickDivider: {
      height: 8,
      width: '100%',
      backgroundColor: darkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
    },
    outerContainer: {
      flex: 1,
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight
    },
  })
}
