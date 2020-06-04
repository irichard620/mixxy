import { createAppContainer, createStackNavigator } from 'react-navigation'
import React from 'react'

import HomeScreen from '../Containers/Home/HomeScreen'
import SplashScreen from '../Containers/SplashScreen/SplashScreen'
import TutorialScreen from '../Containers/Tutorial/TutorialScreen'
import BuilderScreen from '../Containers/NewBuilder/BuilderScreen'
import CampaignScreen from '../Containers/Campaign/CampaignScreen'
import SponsorScreen from '../Containers/Sponsor/SponsorScreen'
import { useDarkModeContext } from 'react-native-dark-mode'

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

const defaultGetStateForAction = StackNavigator.router.getStateForAction;
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
