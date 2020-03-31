import { createAppContainer, createStackNavigator } from 'react-navigation'

import HomeScreen from '../Containers/Home/HomeScreen'
import SplashScreen from '../Containers/SplashScreen/SplashScreen'
import TutorialScreen from '../Containers/Tutorial/TutorialScreen'
import BuilderScreen from '../Containers/Builder/BuilderScreen'
import IngredientsScreen from '../Containers/Ingredients/IngredientsScreen'
import CampaignScreen from '../Containers/Campaign/CampaignScreen'
import SponsorScreen from '../Containers/Sponsor/SponsorScreen'

const StackNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    TutorialScreen: {
      screen: TutorialScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    BuilderScreen: {
      screen: BuilderScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    IngredientsScreen: {
      screen: IngredientsScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    CampaignScreen: {
      screen: CampaignScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    SponsorScreen: {
      screen: SponsorScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
    mode: 'modal',
  }
)

export default createAppContainer(StackNavigator)
