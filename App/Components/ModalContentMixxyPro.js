import React from 'react'
import { Image, Text, StyleSheet } from 'react-native'
import Colors from '../Theme/Colors'
import { PropTypes } from 'prop-types'
import ModalBottomOutline from './ModalBottomOutline'
import Images from '../Theme/Images'
import ButtonLarge from './ButtonLarge'
import getComponentStylesheet from './ComponentStyle'

export default function ModalContentMixxyPro(props) {
  const { darkMode, onMixxyProClick, onRestoreClick } = props

  const componentStyles = getComponentStylesheet(darkMode)

  return (
    <ModalBottomOutline title={'Mixxy Pro Feature'} darkMode={darkMode}>
      <Image source={Images.proModalBadge} style={modalProStyles.image} />
      <Text style={componentStyles.modalProDescription}>
        {
          'Mixxy Pro unlocks recipe creation, editing and an unlimited library. Any future Pro features are included too, all in a one-time purchase.'
        }
      </Text>
      <ButtonLarge
        title={'Get Mixxy Pro ($4.99)'}
        margin={[0, 16, 2, 16]}
        isPrimary={true}
        onButtonClick={onMixxyProClick}
        colorOverride={Colors.mixxyProYellow}
        darkMode={darkMode}
      />
      <ButtonLarge
        title={'Restore Previous Purchase'}
        margin={[0, 16, 2, 16]}
        isPrimary={false}
        onButtonClick={onRestoreClick}
        textColorOverride={darkMode ? Colors.text2Dark : Colors.text2Light}
        hideBorder={true}
        darkMode={darkMode}
      />
    </ModalBottomOutline>
  )
}

ModalContentMixxyPro.propTypes = {
  darkMode: PropTypes.bool,
  onMixxyProClick: PropTypes.func,
  onRestoreClick: PropTypes.func,
}

const modalProStyles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    height: 144,
    marginBottom: 24,
    marginTop: 24,
    resizeMode: 'contain',
  },
})
