import { TouchableWithoutFeedback, View, Text, Dimensions } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import getHomeStylesheet from './HomeScreenStyle'
import { PropTypes } from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'

export default function HomeMasterList(props) {
  const { masterList, disabled, onMasterListClick, darkMode, addRightPadding } = props
  const { name, imageLink } = masterList
  const { width } = Dimensions.get('window')
  const cardWidth = {
    width: (width - 48) / 2,
  }
  const marginStyle = {}
  if (addRightPadding) {
    marginStyle.marginRight = 16
  }

  const homeStyles = getHomeStylesheet(darkMode)
  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={() => onMasterListClick(masterList)}>
      <View style={[homeStyles.masterListOutline, marginStyle]}>
        {imageLink !== '' && (
          <FastImage
            style={[homeStyles.masterListImage, cardWidth]}
            source={{
              uri: imageLink,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
        <Text style={homeStyles.masterListTitle}>{name}</Text>
        <View style={homeStyles.masterListBottomGradientContainer}>
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

HomeMasterList.propTypes = {
  masterList: PropTypes.object,
  disabled: PropTypes.bool,
  onMasterListClick: PropTypes.func,
  darkMode: PropTypes.bool,
  addRightPadding: PropTypes.bool,
}
