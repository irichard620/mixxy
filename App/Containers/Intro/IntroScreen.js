import { NavigationActions } from 'react-navigation'
import getStylesheet from '../../Theme/ApplicationStyles'
import React, { useState } from 'react'
import IntroButton from './IntroButton'
import { Image, View, Text, SafeAreaView, Dimensions, ScrollView } from 'react-native'
import introStyles from './IntroStyles'
import Images from '../../Theme/Images'
import { PropTypes } from 'prop-types'
import NavigationService from '../../Services/NavigationService'

export default function IntroScreen(props) {
  const styles = getStylesheet(false)

  const carousel = React.useRef()
  const { width } = Dimensions.get('window')
  const carouselLeftBuffer = width / 2 - 56

  const [step, setStep] = useState(0)
  let titleToDisplay = 'Welcome to Mixxy'
  if (step === 1) {
    titleToDisplay = 'Discover'
  } else if (step === 2) {
    titleToDisplay = 'Library'
  } else if (step === 3) {
    titleToDisplay = 'Bartender'
  } else if (step === 4) {
    titleToDisplay = 'Settings'
  }

  let descriptionToDisplay =
    'Here’s everything you need to know before embarking on this new mixology journey with us.'
  if (step === 1) {
    descriptionToDisplay =
      'Discover new cocktails each week from lists curated by our team and featured partners.'
  } else if (step === 2) {
    descriptionToDisplay =
      'Collect and sort drink recipes in your library. Share recipes with your friends to grow your collections together.'
  } else if (step === 3) {
    descriptionToDisplay =
      'Get recipe recommendations based off the ingredients you already have, with little to no extra shopping required.'
  } else if (step === 4) {
    descriptionToDisplay =
      'Configure your Mixxy settings. Want to share your feedback with us? Send us a message anytime!'
  }

  const onButtonClick = () => {
    if (step < 4) {
      carousel.current.scrollTo({ x: 112 * (step + 1), animated: true })
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

  const renderItem = (index) => {
    const isSelected = index === step
    const opacityStyle = { opacity: isSelected ? 1 : 0.25 }
    let imageToDisplay
    let imageStyle = introStyles.navIcon
    if (index === 1) {
      imageToDisplay = isSelected ? Images.navDiscoverSelected : Images.navDiscoverLight
    } else if (index === 2) {
      imageToDisplay = isSelected ? Images.navLibrarySelected : Images.navLibraryLight
    } else if (index === 3) {
      imageToDisplay = isSelected ? Images.navBartenderSelected : Images.navBartenderLight
    } else if (index === 4) {
      imageToDisplay = isSelected ? Images.navSettingsSelected : Images.navSettingsLight
    } else {
      imageToDisplay = Images.logo
      imageStyle = { height: 48, resizeMode: 'contain' }
    }
    return (
      <View style={[introStyles.introItemOutline, opacityStyle]} key={`icon${index}`}>
        <Image source={imageToDisplay} style={imageStyle} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.outerContainer}>
        <View style={introStyles.iconViewBuffer} />
        <View>
          <ScrollView
            ref={carousel}
            horizontal
            data={[0, 1, 2, 3, 4]}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: carouselLeftBuffer }}
          >
            <View style={{ width: carouselLeftBuffer }} />
            {[0, 1, 2, 3, 4].map((val) => renderItem(val))}
          </ScrollView>
        </View>
        <Text style={introStyles.title}>{titleToDisplay}</Text>
        <Text style={introStyles.description}>{descriptionToDisplay}</Text>
        <IntroButton onClick={onButtonClick} isLastStep={step === 4} />
      </View>
    </SafeAreaView>
  )
}

IntroScreen.propTypes = {
  navigation: PropTypes.object,
}
