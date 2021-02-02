import { StyleSheet } from 'react-native'
import Fonts from '../../Theme/Fonts'
import Colors from '../../Theme/Colors'

export default function getAuthStylesheet(useDarkMode) {
  return StyleSheet.create({
    appleButton: {
      alignSelf: 'center',
      height: 45,
      marginBottom: 16,
      marginTop: 16,
      width: 200,
    },
    authHeading: {
      ...Fonts.h1New,
      color: Colors.orange2,
      marginBottom: 16,
      textAlign: 'center',
    },
    authSubheading: {
      ...Fonts.body1,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginBottom: 60,
      marginHorizontal: 16,
      textAlign: 'center',
    },
    buffer: {
      height: 24,
    },
    emailButton: {
      alignSelf: 'center',
      backgroundColor: Colors.text1Light,
      height: 45,
      width: 200,
    },
    forgotPasswordText: {
      ...Fonts.body2,
      alignSelf: 'center',
      color: Colors.blue1,
      marginBottom: 24,
      textAlign: 'center',
    },
    heading: {
      alignSelf: 'flex-start',
      marginLeft: 16,
      marginRight: 16,
      marginTop: 4,
      textAlign: 'left',
      ...Fonts.h1New,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
    },
    headingDescription: {
      alignSelf: 'flex-start',
      marginBottom: 32,
      marginLeft: 16,
      marginRight: 16,
      marginTop: 8,
      textAlign: 'left',
      ...Fonts.body1,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
    },
    loginSeparator: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 16,
      marginVertical: 24,
    },
    noAccountText: {
      alignSelf: 'center',
      textAlign: 'center',
      ...Fonts.body4,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
    },
    scrollView: {
      flex: 1,
    },
    sectionHeading: {
      alignSelf: 'flex-start',
      marginBottom: 12,
      marginLeft: 16,
      textAlign: 'left',
      ...Fonts.body1,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
    },
    termsOfServiceContainer: {
      alignItems: 'center',
      bottom: 24,
      left: 0,
      position: 'absolute',
      right: 0,
    },
    textboxSubtext: {
      alignSelf: 'flex-start',
      marginBottom: 24,
      marginLeft: 16,
      textAlign: 'left',
      ...Fonts.body1,
      color: useDarkMode ? Colors.text2Dark : Colors.text2Light,
    },
    topHeader: {
      ...Fonts.h1New,
      marginBottom: 8,
      marginLeft: 16,
      textAlign: 'left',
    },
  })
}
