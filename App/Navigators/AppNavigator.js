import { createAppContainer, createStackNavigator } from 'react-navigation'
import React from 'react'

import HomeScreen from '../Containers/Home/HomeScreen'
import IntroScreen from '../Containers/Intro/IntroScreen'
import SplashScreen from '../Containers/SplashScreen/SplashScreen'
import TutorialScreen from '../Containers/Tutorial/TutorialScreen'
import BuilderScreen from '../Containers/NewBuilder/BuilderScreen'
import CampaignScreen from '../Containers/Campaign/CampaignScreen'
import SponsorScreen from '../Containers/Sponsor/SponsorScreen'
import AllRecipesScreen from '../Containers/AllRecipes/AllRecipesScreen'
import { useDarkModeContext } from 'react-native-dark-mode'
import IngredientsScreen from '../Containers/Bartender/IngredientsScreen'

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
        gesturesEnabled: true,
      },
    },
    BuilderScreen: {
      screen: BuilderScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    CampaignScreen: {
      screen: CampaignScreen,
      navigationOptions: {
        gesturesEnabled: true,
      },
    },
    SponsorScreen: {
      screen: SponsorScreen,
      navigationOptions: {
        gesturesEnabled: true,
      },
    },
    AllRecipesScreen: {
      screen: AllRecipesScreen,
      navigationOptions: {
        gesturesEnabled: true,
      },
    },
    IngredientsScreen: {
      screen: IngredientsScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    IntroScreen: {
      screen: IntroScreen,
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

const defaultGetStateForAction = StackNavigator.router.getStateForAction
StackNavigator.router.getStateForAction = (action, state) => {
  if (state && action.type === 'GoToRoute') {
    let index = state.routes.findIndex((item) => {
      return item.routeName === action.routeName
    })
    const routes = state.routes.slice(0, index + 1)
    return {
      routes,
      index,
    }
  }
  return defaultGetStateForAction(action, state)
}

const Container = createAppContainer(StackNavigator)

const AppNavigator = (props, ref) => {
  const mode = useDarkModeContext()
  return <Container theme={mode} ref={ref} />
}

export default React.forwardRef(AppNavigator)
