import React from 'react'
import { Image, View, Dimensions } from 'react-native'
import getSplashStylesheet from './SplashScreenStyle'
import Images from '../../Theme/Images'
import NavigationService from '../../Services/NavigationService'

class SplashScreen extends React.Component {
  render() {
    const { darkMode } = this.props
    const splashStyles = getSplashStylesheet(darkMode)
    const { height } = Dimensions.get('window')
    const imageContainerMargin = {
      marginTop: height * 0.35,
    }

    return (
      <View style={splashStyles.container}>
        <Image style={[splashStyles.logo, imageContainerMargin]} source={Images.logo} />
      </View>
    )
  }
}

export default NavigationService.screenWithDarkMode(SplashScreen)
