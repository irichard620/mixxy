import { TouchableWithoutFeedback, View, Text, Dimensions, Animated, Easing } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import getDiscoverStylesheet from './DiscoverStyle'
import { PropTypes } from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import HomeTags from './Tags'

export default function CampaignCard(props) {
  const { campaign, disabled, onCampaignClick, darkMode } = props
  const { name, shortDescription, imageLink, tags, tagColor } = campaign
  const { width } = Dimensions.get('window')
  const widthToUse = width - 64
  const cardDimensions = {
    width: width - 64,
    height: (widthToUse * 4) / 3,
  }

  const discoverStyles = getDiscoverStylesheet(darkMode)
  let scaleValue = new Animated.Value(0)
  const cardScale = scaleValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.98, 0.96],
  })
  let transformStyle = {
    ...discoverStyles.cardOutline,
    ...cardDimensions,
    transform: [{ scale: cardScale }],
  }

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
            style={[discoverStyles.cardImage, cardDimensions]}
            source={{
              uri: imageLink,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
        <HomeTags tags={tags} darkMode={darkMode} tagColor={tagColor} />
        <View style={discoverStyles.cardBottomContentContainer}>
          <Text style={discoverStyles.cardTitle}>{name}</Text>
          <Text style={discoverStyles.cardDescription}>{shortDescription}</Text>
        </View>
        <View style={discoverStyles.cardTopGradientContainer}>
          <LinearGradient
            colors={['#00000015', '#00000000']}
            style={discoverStyles.linearGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        </View>
        <View style={discoverStyles.cardBottomGradientContainer}>
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

CampaignCard.propTypes = {
  campaign: PropTypes.object,
  disabled: PropTypes.bool,
  onCampaignClick: PropTypes.func,
  darkMode: PropTypes.bool,
}
