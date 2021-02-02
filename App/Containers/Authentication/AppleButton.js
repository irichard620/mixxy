import React from 'react'
import { Dimensions } from 'react-native'
import { PropTypes } from 'prop-types'
import ButtonLarge from '../../Components/ButtonLarge'

export default function GoogleButton(props) {
  const { onAppleButtonPress } = props
  const { width } = Dimensions.get('window')
  return (
    <ButtonLarge
      onButtonClick={onAppleButtonPress}
      title="Apple"
      margin={[0, 16, 16, 16]}
      buttonWidth={(width - 48) / 2}
    />
  )
}

GoogleButton.propTypes = {
  onAppleButtonPress: PropTypes.func,
}
