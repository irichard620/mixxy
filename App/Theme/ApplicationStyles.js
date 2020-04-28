/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import Colors from './Colors'
import { StyleSheet } from 'react-native'

export default function getStylesheet(darkMode) {
  return StyleSheet.create({
    buffer24: {
      height: 24,
    },
    divider: {
      backgroundColor: darkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
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
    verticalDivider: {
      backgroundColor: darkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
      height: '100%',
      marginRight: 16,
      width: 0.5,
    },
  })
}
