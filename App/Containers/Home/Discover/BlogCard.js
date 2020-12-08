import { TouchableWithoutFeedback, View, Text, Dimensions, Animated, Easing } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import getDiscoverStylesheet from './DiscoverStyle'
import { PropTypes } from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import HomeTags from './Tags'

export default function BlogCard(props) {
  const { blog, disabled, onBlogClick, darkMode } = props
  const { title, cardText, heroImageLink, tags, tagColor, author, sponsorCard } = blog
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

  // Profile image to use
  let profileImage = null
  if (author) {
    profileImage = author.profileImageLink
  } else if (sponsorCard) {
    profileImage = sponsorCard.logoLink
  }
  return (
    <TouchableWithoutFeedback
      disabled={disabled}
      onPress={() => onBlogClick(blog)}
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
        {heroImageLink !== '' && (
          <FastImage
            style={[discoverStyles.cardImage, cardDimensions]}
            source={{
              uri: heroImageLink,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
        <HomeTags tags={tags} darkMode={darkMode} tagColor={tagColor} />
        <View style={discoverStyles.cardBottomContentContainer}>
          {profileImage && (
            <FastImage
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: 'white',
              }}
              source={{
                uri: profileImage,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
          <Text style={discoverStyles.cardTitle}>{title}</Text>
          <Text style={discoverStyles.cardDescription}>{cardText}</Text>
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

BlogCard.propTypes = {
  blog: PropTypes.object,
  disabled: PropTypes.bool,
  onBlogClick: PropTypes.func,
  darkMode: PropTypes.bool,
}
