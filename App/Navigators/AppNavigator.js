import { createAppContainer, createStackNavigator } from 'react-navigation'

import HomeScreen from 'App/Containers/Home/HomeScreen'
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'

const StackNavigator = createStackNavigator(
  {
    SplashScreen: SplashScreen,
    HomeScreen: HomeScreen,
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
  }
)

export default createAppContainer(StackNavigator)
