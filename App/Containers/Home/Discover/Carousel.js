import { ScrollView, Dimensions, View } from 'react-native'
import React from 'react'
import { PropTypes } from 'prop-types'
import CampaignCard from './CampaignCard'
import BlogCard from './BlogCard'
import NavigationService from '../../../Services/NavigationService'

export default function Carousel(props) {
  const { items, darkMode, isCampaigns } = props

  if (!items.length) return null

  const { width } = Dimensions.get('window')

  const offsets = [...Array(items.length)].map((_x, i) => i * (width - 64) + (i - 1) * 16)
  const paddingLeftStyle = { paddingLeft: 16 }
  const widthStyle = { width: 16 }
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={paddingLeftStyle}
      snapToOffsets={offsets}
      decelerationRate={'fast'}
    >
      {items.map((item) => {
        if (isCampaigns) {
          return (
            <CampaignCard
              key={item.campaignId}
              campaign={item}
              disabled={false}
              onCampaignClick={(campaign) => {
                NavigationService.navigate('CampaignScreen', {
                  campaign: campaign,
                })
              }}
              darkMode={darkMode}
            />
          )
        } else {
          return (
            <BlogCard
              key={item.blogId}
              blog={item}
              disabled={false}
              onBlogClick={(blog) => {
                NavigationService.navigate('BlogScreen', {
                  blog: blog,
                })
              }}
              darkMode={darkMode}
            />
          )
        }
      })}
      <View style={widthStyle} />
    </ScrollView>
  )
}

Carousel.propTypes = {
  items: PropTypes.array,
  darkMode: PropTypes.bool,
  isCampaigns: PropTypes.bool,
}
