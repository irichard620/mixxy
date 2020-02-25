import { StyleSheet } from 'react-native'
import Colors from 'App/Theme/Colors'

export default function getSplashStylesheet(darkMode) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      alignItems: 'center'
    },
    logo: {
      height: '18%',
      resizeMode: 'contain',
      marginBottom: 50
    },
  })
}
