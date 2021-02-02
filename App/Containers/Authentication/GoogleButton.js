import React from 'react'
import { Dimensions } from 'react-native'
import { PropTypes } from 'prop-types'
import ButtonLarge from '../../Components/ButtonLarge'

export default function GoogleButton(props) {
  const { onGoogleButtonPress } = props
  const { width } = Dimensions.get('window')
  return (
    <ButtonLarge
      onButtonClick={onGoogleButtonPress}
      title="Google"
      margin={[0, 16, 16, 0]}
      buttonWidth={(width - 48) / 2}
    />
  )
}

GoogleButton.propTypes = {
  onGoogleButtonPress: PropTypes.func,
}
