import { TouchableWithoutFeedback, View, Text, Dimensions } from 'react-native'
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
  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={() => onSponsorCardClick(sponsorCard)}>
      <View style={homeStyles.sponsorCardOutline}>
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
        <View style={homeStyles.sponsorBottomGradientContainer}>
          <LinearGradient
            colors={['#00000080', '#00000000']}
            style={homeStyles.linearGradient}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

HomeSponsorCard.propTypes = {
  sponsorCard: PropTypes.object,
  disabled: PropTypes.bool,
  onSponsorCardClick: PropTypes.func,
  darkMode: PropTypes.bool,
}
