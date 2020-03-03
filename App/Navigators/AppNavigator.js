import { createAppContainer, createStackNavigator } from 'react-navigation'

import HomeScreen from 'App/Containers/Home/HomeScreen'
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'
import TutorialScreen from '../Containers/Tutorial/TutorialScreen'
import BuilderScreen from '../Containers/Builder/BuilderScreen'

const StackNavigator = createStackNavigator(
  {
    SplashScreen: SplashScreen,
    HomeScreen: HomeScreen,
    TutorialScreen: TutorialScreen,
    BuilderScreen: BuilderScreen,
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
  }
)

export default createAppContainer(StackNavigator)
