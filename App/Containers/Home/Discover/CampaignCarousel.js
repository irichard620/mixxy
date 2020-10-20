import { ScrollView, Dimensions } from 'react-native'
import React from 'react'
import CampaignCard from './CampaignCard'
import NavigationService from '../../../Services/NavigationService'

export default function CampaignCarousel(props) {
  const { campaigns, darkMode } = props

  const { width } = Dimensions.get('window')

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ paddingLeft: 16 }}
      snapToOffsets={[0, width - 64, 2 * (width - 64) + 16]}
      decelerationRate={'fast'}
    >
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign.campaignId}
          campaign={campaign}
          disabled={false}
          onCampaignClick={(campaign) => {
            NavigationService.navigate('CampaignScreen', {
              campaign: campaign,
            })
          }}
          darkMode={darkMode}
        />
      ))}
    </ScrollView>
  )
}
