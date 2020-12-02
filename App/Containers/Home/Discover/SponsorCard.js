import { TouchableWithoutFeedback, View, Text, Dimensions, Animated, Easing } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import getDiscoverStylesheet from './DiscoverStyle'
import { PropTypes } from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import HomeTags from './Tags'

export default function HomeSponsorCard(props) {
  const { sponsorCard, disabled, onSponsorCardClick, darkMode } = props
  const { cardTitle, cardImageLink, tags, tagColor } = sponsorCard
  const { width } = Dimensions.get('window')
  const cardWidth = {
    width: width - 32,
  }

  const discoverStyles = getDiscoverStylesheet(darkMode)
  let scaleValue = new Animated.Value(0)
  const cardScale = scaleValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.98, 0.96],
  })
  let transformStyle = { ...discoverStyles.sponsorCardOutline, transform: [{ scale: cardScale }] }

  return (
    <TouchableWithoutFeedback
      disabled={disabled}
      onPress={() => onSponsorCardClick(sponsorCard)}
      onPressIn={() => {
        scaleValue.setValue(0)
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 250,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start()
      }}
      onPressOut={() => {
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start()
      }}
    >
      <Animated.View style={transformStyle}>
        {cardImageLink !== '' && (
          <FastImage
            style={[discoverStyles.sponsorCardImage, cardWidth]}
            source={{
              uri: cardImageLink,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
        <HomeTags tags={tags} darkMode={darkMode} tagColor={tagColor} />
        <View style={discoverStyles.cardBottomContentContainer}>
          <Text style={discoverStyles.cardTitle}>{cardTitle}</Text>
        </View>
        <View style={discoverStyles.cardTopGradientContainer}>
          <LinearGradient
            colors={['#00000015', '#00000000']}
            style={discoverStyles.linearGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        </View>
        <View style={discoverStyles.sponsorCardBottomGradientContainer}>
          <LinearGradient
            colors={['#00000080', '#00000000']}
            style={discoverStyles.linearGradient}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
          />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

HomeSponsorCard.propTypes = {
  sponsorCard: PropTypes.object,
  disabled: PropTypes.bool,
  onSponsorCardClick: PropTypes.func,
  darkMode: PropTypes.bool,
}
