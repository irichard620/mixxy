import { StyleSheet } from 'react-native'
import Colors from 'App/Theme/Colors'

export default function getSplashStylesheet(darkMode) {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      flex: 1,
    },
    logo: {
      height: '18%',
      marginBottom: 50,
      resizeMode: 'contain',
    },
  })
}
