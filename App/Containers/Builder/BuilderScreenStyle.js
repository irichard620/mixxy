import { StyleSheet } from 'react-native'
import Fonts from '../../Theme/Fonts'
import Colors from '../../Theme/Colors'

export default function getBuilderStylesheet(useDarkMode) {
  return StyleSheet.create({
    bufferView: {
      height: 24,
    },
    buttonView: {
      alignSelf: 'center',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    gradientContainer: {
      backgroundColor: 'transparent',
      height: 24,
      marginTop: -24,
      width: '100%',
    },
    icon: {
      height: '100%',
      resizeMode: 'contain',
    },
    iconView: {
      alignSelf: 'center',
      height: 184,
      marginBottom: 4,
    },
    scrollView: {
      flex: 1,
      paddingBottom: 16,
    },
    selectionHeader: {
      ...Fonts.h1,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginBottom: 4,
      textAlign: 'center',
    },
    selectionSubtitle: {
      ...Fonts.body2,
      color: useDarkMode ? Colors.text2Dark : Colors.text2Light,
      marginBottom: 24,
      textAlign: 'center',
    },
  })
}
