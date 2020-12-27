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
      ...Fonts.h3New,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginBottom: 32,
      textAlign: 'center',
    },
    authSubheading: {
      ...Fonts.h2New,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      fontWeight: '500',
      marginBottom: 24,
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
    heading: {
      alignSelf: 'flex-start',
      marginBottom: 18,
      marginLeft: 16,
      marginRight: 16,
      marginTop: 8,
      textAlign: 'left',
      ...Fonts.top,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
    },
    headingDescription: {
      alignSelf: 'flex-start',
      marginBottom: 18,
      marginLeft: 16,
      marginRight: 16,
      marginTop: 16,
      textAlign: 'center',
      ...Fonts.body1,
      color: useDarkMode ? Colors.text2Dark : Colors.text2Light,
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
      ...Fonts.body2,
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
      bottom: 32,
      left: 0,
      position: 'absolute',
      right: 0,
    },
  })
}
