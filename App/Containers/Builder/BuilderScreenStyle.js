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
      backgroundColor: Colors.backgroundColorDarkTransparent,
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
    // Step styles
    stepButtonView: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'flex-end',
      marginTop: 20,
      width: '100%',
    },
    stepDescriptionBase: {
      color: useDarkMode ? Colors.stepTextDark : Colors.stepTextLight,
      ...Fonts.stepTitle,
    },
    stepDescriptionHighlight: {
      color: Colors.blue1,
      ...Fonts.stepTitle,
    },
    stepIcon: {
      height: 40,
      marginRight: 15,
      width: 40,
    },
    stepListOutline: {
      paddingLeft: 16,
      paddingRight: 16,
    },
    stepOutline: {
      alignItems: 'flex-start',
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      paddingBottom: 15,
      paddingTop: 15,
    },
    stepTitle: {
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      ...Fonts.stepTitle,
      marginBottom: 4,
    },
  })
}
