import { NavigationActions } from 'react-navigation'
import getStylesheet from '../../Theme/ApplicationStyles'
import React, { useState } from 'react'
import IntroButton from './IntroButton'
import { Image, View, Text, SafeAreaView } from 'react-native'
import introStyles from './IntroStyles'
import Images from '../../Theme/Images'
import { PropTypes } from 'prop-types'
import NavigationService from '../../Services/NavigationService'

export default function IntroScreen(props) {
  const styles = getStylesheet(false)

  const [step, setStep] = useState(0)
  const iconViewWidth = {
    width: step === 0 ? 80 : 240,
    justifyContent: step === 0 ? 'center' : 'space-between'
  }
  let titleToDisplay = 'Welcome to Mixxy'
  if (step === 1) {
    titleToDisplay = 'Discover'
  } else if (step === 2) {
    titleToDisplay = 'Library'
  } else if (step === 3) {
    titleToDisplay = 'Settings'
  }

  let descriptionToDisplay =
    'Here’s everything you need to know to get started making your first drink.'
  if (step === 1) {
    descriptionToDisplay =
      'Discover new cocktails each week from lists curated by our team and featured partners.'
  } else if (step === 2) {
    descriptionToDisplay =
      'Collect and sort drink recipes in your library. Share recipes with your friends to grow your collections together.'
  } else if (step === 3) {
    descriptionToDisplay =
      'Configure your Mixxy settings. Want to share your feedback with us? Send us a message anytime!'
  }

  const onButtonClick = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      const fromSettings = props.navigation.getParam('fromSettings', false)
      if (fromSettings) {
        props.navigation.dispatch(NavigationActions.back())
      } else {
        NavigationService.navigateAndReset('HomeScreen')
      }
    }
  }

  const introIconView = (
    <View style={[introStyles.iconView, iconViewWidth]}>
      {step === 0 && <Image source={Images.logo} style={introStyles.icon} />}
      {step !== 0 && (
        <Image
          source={step === 1 ? Images.navDiscoverSelected : Images.navDiscoverLight}
          style={introStyles.navIcon}
        />
      )}
      {step !== 0 && (
        <Image
          source={step === 2 ? Images.navLibrarySelected : Images.navLibraryLight}
          style={introStyles.navIcon}
        />
      )}
      {step !== 0 && (
        <Image
          source={step === 3 ? Images.navSettingsSelected : Images.navSettingsLight}
          style={introStyles.navIcon}
        />
      )}
    </View>
  )

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.outerContainer}>
        <View style={introStyles.iconViewBuffer} />
        {introIconView}
        <Text style={introStyles.title}>{titleToDisplay}</Text>
        <Text style={introStyles.description}>{descriptionToDisplay}</Text>
        <IntroButton onClick={onButtonClick} isLastStep={step === 3} />
      </View>
    </SafeAreaView>
  )
}

IntroScreen.propTypes = {
  navigation: PropTypes.object,
}
