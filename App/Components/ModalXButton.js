import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Colors from '../Theme/Colors'
import Images from '../Theme/Images'
import { PropTypes } from 'prop-types'

export default function ModalXButton(props) {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.outline}>
        <Image style={styles.image} source={Images.xCampaign} />
      </View>
    </TouchableWithoutFeedback>
  )
}

ModalXButton.propTypes = {
  onPress: PropTypes.func,
}

const styles = StyleSheet.create({
  image: {
    height: 15,
    resizeMode: 'contain',
  },
  outline: {
    alignItems: 'center',
    backgroundColor: Colors.backgroundColorDark,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
})
