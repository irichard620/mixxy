import { Text, View } from 'react-native'
import React from 'react'
import { PropTypes } from 'prop-types'
import getDiscoverStylesheet from './DiscoverStyle'

export default function Tags(props) {
  const { tags, darkMode, tagColor } = props
  const discoverStyles = getDiscoverStylesheet(darkMode)

  const backgroundStyle = {}
  if (tagColor && tagColor !== '') {
    backgroundStyle.backgroundColor = tagColor
  }
  return (
    <View style={discoverStyles.tagsContainer}>
      {tags.map((tag, idx) => (
        <View style={[discoverStyles.tagContainer, backgroundStyle]} key={`${tag}${idx}`}>
          <Text style={discoverStyles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>
  )
}

Tags.propTypes = {
  tags: PropTypes.array,
  darkMode: PropTypes.bool,
  tagColor: PropTypes.string,
}
