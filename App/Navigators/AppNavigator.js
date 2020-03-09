import { createAppContainer, createStackNavigator } from 'react-navigation'

import HomeScreen from '../Containers/Home/HomeScreen'
import SplashScreen from '../Containers/SplashScreen/SplashScreen'
import TutorialScreen from '../Containers/Tutorial/TutorialScreen'
import BuilderScreen from '../Containers/Builder/BuilderScreen'
import IngredientsScreen from '../Containers/Ingredients/IngredientsScreen'

const StackNavigator = createStackNavigator(
  {
    SplashScreen: SplashScreen,
    HomeScreen: HomeScreen,
    TutorialScreen: TutorialScreen,
    BuilderScreen: BuilderScreen,
    IngredientsScreen: IngredientsScreen,
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
    mode: 'modal',
  }
)

export default createAppContainer(StackNavigator)
