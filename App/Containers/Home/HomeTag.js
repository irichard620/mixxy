import { Text, View } from 'react-native'
import React from 'react'
import getHomeStylesheet from './HomeScreenStyle'

export default function HomeTags(props) {
  const { tags, darkMode } = props
  const homeStyles = getHomeStylesheet(darkMode)
  return (
    <View style={homeStyles.tagsContainer}>
      {tags.map((tag) => (
        <View style={homeStyles.tagContainer}>
          <Text style={homeStyles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>
  )
}
