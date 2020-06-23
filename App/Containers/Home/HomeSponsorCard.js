import { TouchableWithoutFeedback, View, Text, Dimensions, Animated, Easing } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import getHomeStylesheet from './HomeScreenStyle'
import { PropTypes } from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import HomeTags from './HomeTag'

export default function HomeSponsorCard(props) {
  const { sponsorCard, disabled, onSponsorCardClick, darkMode } = props
  const { cardTitle, cardImageLink, tags, tagColor } = sponsorCard
  const { width } = Dimensions.get('window')
  const cardWidth = {
    width: width - 32,
  }

  const homeStyles = getHomeStylesheet(darkMode)
  let scaleValue = new Animated.Value(0)
  const cardScale = scaleValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.98, 0.96],
  })
  let transformStyle = { ...homeStyles.sponsorCardOutline, transform: [{ scale: cardScale }] }

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
            style={[homeStyles.sponsorCardImage, cardWidth]}
            source={{
              uri: cardImageLink,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
        <HomeTags tags={tags} darkMode={darkMode} tagColor={tagColor} />
        <View style={homeStyles.sponsorCardDescriptionContainer}>
          <Text style={homeStyles.sponsorCardDescription}>{cardTitle}</Text>
        </View>
        <View style={homeStyles.campaignTopGradientContainer}>
          <LinearGradient
            colors={['#00000015', '#00000000']}
            style={homeStyles.linearGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        </View>
        <View style={homeStyles.sponsorBottomGradientContainer}>
          <LinearGradient
            colors={['#00000080', '#00000000']}
            style={homeStyles.linearGradient}
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
