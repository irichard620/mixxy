import React from 'react'
import { Image, Text, StyleSheet } from 'react-native'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'
import { PropTypes } from 'prop-types'
import ModalBottomOutline from './ModalBottomOutline'
import Images from '../Theme/Images'
import ButtonLarge from './ButtonLarge'

export default function ModalContentMixxyPro(props) {
  const { darkMode, onMixxyProClick } = props

  const modalStyles = getModalStylesheet(darkMode)

  return (
    <ModalBottomOutline title={'Mixxy Pro Feature'} darkMode={darkMode}>
      <Image source={Images.proModalBadge} style={modalStyles.image} />
      <Text style={modalStyles.description}>
        {
          'Mixxy Pro unlocks recipe creation, editing and an unlimited library. Any future Pro features are included too, all in a one-time purchase.'
        }
      </Text>
      <ButtonLarge
        title={'Get Mixxy Pro'}
        margin={[0, 16, 0, 16]}
        isPrimary={true}
        onButtonClick={onMixxyProClick}
      />
    </ModalBottomOutline>
  )
}

ModalContentMixxyPro.propTypes = {
  darkMode: PropTypes.bool,
  onMixxyProClick: PropTypes.func,
}

function getModalStylesheet(darkMode) {
  return StyleSheet.create({
    description: {
      alignSelf: 'flex-start',
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      ...Fonts.body1,
      marginBottom: 16,
      marginLeft: 16,
      marginRight: 16,
    },
    image: {
      height: 144,
      marginBottom: 24,
      marginTop: 24,
      resizeMode: 'contain',
    },
  })
}