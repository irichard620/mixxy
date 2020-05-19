import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Colors from '../Theme/Colors'
import Images from '../Theme/Images'
import { PropTypes } from 'prop-types'

export default function AddButton(props) {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.outline}>
        <Image style={styles.image} source={Images.builderAddNew} />
      </View>
    </TouchableWithoutFeedback>
  )
}

AddButton.propTypes = {
  onPress: PropTypes.func,
}

const styles = StyleSheet.create({
  image: {
    height: 14,
    resizeMode: 'contain',
  },
  outline: {
    alignItems: 'center',
    backgroundColor: Colors.blue1,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
})
