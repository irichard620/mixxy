import { Text, View } from 'react-native'
import React from 'react'
import getHomeStylesheet from './HomeScreenStyle'
import { PropTypes } from 'prop-types'

export default function HomeTags(props) {
  const { tags, darkMode, tagColor } = props
  const homeStyles = getHomeStylesheet(darkMode)

  const backgroundStyle = {}
  if (tagColor && tagColor !== '') {
    backgroundStyle.backgroundColor = tagColor
  }
  return (
    <View style={homeStyles.tagsContainer}>
      {tags.map((tag, idx) => (
        <View style={[homeStyles.tagContainer, backgroundStyle]} key={`${tag}${idx}`}>
          <Text style={homeStyles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>
  )
}

HomeTags.propTypes = {
  tags: PropTypes.array,
  darkMode: PropTypes.bool,
  tagColor: PropTypes.string,
}
