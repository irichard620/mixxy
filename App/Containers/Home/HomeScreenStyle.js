import { DynamicStyleSheet, DynamicValue } from 'react-native-dark-mode'
import Colors from '../../Theme/Colors'
import Fonts from '../../Theme/Fonts';

export default new DynamicStyleSheet({
  scrollContainer: {
    flex: 1,
    backgroundColor: new DynamicValue(Colors.backgroundColorLight, Colors.backgroundColorDark),
    paddingTop: 8,
  },
  topHeader: {
    ...Fonts.h1,
    color: new DynamicValue(Colors.text1Light, Colors.text1Dark),
    textAlign: 'left'
  },
  sectionHeader: {
    ...Fonts.h2,
    color: new DynamicValue(Colors.text1Light, Colors.text1Dark),
    textAlign: 'left'
  }
})
