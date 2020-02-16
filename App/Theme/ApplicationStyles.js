/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import Colors from './Colors'
import { DynamicStyleSheet, DynamicValue } from 'react-native-dark-mode'

const baseDividerStyle = {
  height: 0.5,
  width: '100%',
}

export default new DynamicStyleSheet({
  divider: {
    ...baseDividerStyle,
    backgroundColor: new DynamicValue(Colors.darkFill2Light, Colors.darkFill2Dark),
  },
  outerContainer: {
    flex: 1,
    backgroundColor: new DynamicValue(Colors.backgroundColorLight, Colors.backgroundColorDark),
  },
})
