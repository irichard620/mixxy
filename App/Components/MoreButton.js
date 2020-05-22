import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Colors from '../Theme/Colors'
import Images from '../Theme/Images'
import { PropTypes } from 'prop-types'

export default function MoreButton(props) {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.outline}>
        <Image style={styles.image} source={Images.builderMoreDetails} />
      </View>
    </TouchableWithoutFeedback>
  )
}

MoreButton.propTypes = {
  onPress: PropTypes.func,
}

const styles = StyleSheet.create({
  image: {
    height: 5,
    resizeMode: 'contain',
  },
  outline: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.blue1,
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
})
