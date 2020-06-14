import { TouchableWithoutFeedback, View, Text, Dimensions, Animated, Easing } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import getHomeStylesheet from './HomeScreenStyle'
import { PropTypes } from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import HomeTags from './HomeTag'

export default function HomeCampaign(props) {
  const { campaign, disabled, onCampaignClick, darkMode } = props
  const { name, shortDescription, imageLink, tags, tagColor } = campaign
  const { width } = Dimensions.get('window')
  const cardWidth = {
    width: width - 32,
  }

  const homeStyles = getHomeStylesheet(darkMode)
  let scaleValue = new Animated.Value(0)
  const cardScale = scaleValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.95, 0.9],
  })
  let transformStyle = { ...homeStyles.campaignOutline, transform: [{ scale: cardScale }] }

  return (
    <TouchableWithoutFeedback
      disabled={disabled}
      onPress={() => onCampaignClick(campaign)}
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
        {imageLink !== '' && (
          <FastImage
            style={[homeStyles.campaignImage, cardWidth]}
            source={{
              uri: imageLink,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
        <HomeTags tags={tags} darkMode={darkMode} tagColor={tagColor} />
        <View style={homeStyles.sponsorCardDescriptionContainer}>
          <Text style={homeStyles.campaignTitle}>{name}</Text>
          <Text style={homeStyles.campaignDescription}>{shortDescription}</Text>
        </View>
        <View style={homeStyles.campaignTopGradientContainer}>
          <LinearGradient
            colors={['#00000015', '#00000000']}
            style={homeStyles.linearGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        </View>
        <View style={homeStyles.campaignBottomGradientContainer}>
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

HomeCampaign.propTypes = {
  campaign: PropTypes.object,
  disabled: PropTypes.bool,
  onCampaignClick: PropTypes.func,
  darkMode: PropTypes.bool,
}
