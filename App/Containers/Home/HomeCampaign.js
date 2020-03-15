import { TouchableWithoutFeedback, View, Text, Dimensions } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import getHomeStylesheet from './HomeScreenStyle'
import { PropTypes } from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import HomeTags from './HomeTag'

export default function HomeCampaign(props) {
  const { campaign, disabled, onCampaignClick, darkMode } = props
  const { campaignName, campaignShortDescription, campaignImageLink, tags } = campaign
  const { width } = Dimensions.get('window')
  const cardWidth = {
    width: width - 32,
  }

  const homeStyles = getHomeStylesheet(darkMode)
  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={() => onCampaignClick(campaign)}>
      <View style={homeStyles.campaignOutline}>
        {campaignImageLink !== '' && (
          <FastImage
            style={[homeStyles.campaignImage, cardWidth]}
            source={{
              uri: campaignImageLink,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
        <HomeTags tags={tags} darkMode={darkMode} />
        <View style={homeStyles.sponsorCardDescriptionContainer}>
          <Text style={homeStyles.campaignTitle}>{campaignName}</Text>
          <Text style={homeStyles.campaignDescription}>{campaignShortDescription}</Text>
        </View>
        <View style={homeStyles.campaignBottomGradientContainer}>
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

HomeCampaign.propTypes = {
  campaign: PropTypes.object,
  disabled: PropTypes.bool,
  onCampaignClick: PropTypes.func,
  darkMode: PropTypes.bool,
}
