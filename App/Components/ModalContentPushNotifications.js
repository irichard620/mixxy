import React from 'react'
import { Image, Text, StyleSheet, Dimensions } from 'react-native'
import { PropTypes } from 'prop-types'
import ModalCenterOutline from './ModalCenterOutline'
import Images from '../Theme/Images'
import ButtonLarge from './ButtonLarge'
import getComponentStylesheet from './ComponentStyle'

export default function ModalContentPushNotifications(props) {
  const { darkMode, onButtonClick, onClose } = props

  const componentStyles = getComponentStylesheet(darkMode)

  const { width } = Dimensions.get('window')
  const fullButtonWidth = width - 48 - 32

  return (
    <ModalCenterOutline title={'Get Notifications'} darkMode={darkMode} onClose={onClose}>
      <Image source={Images.notificationsBadge} style={modalNotificationStyles.image} />
      <Text style={componentStyles.modalProDescription}>
        {
          'We keep Mixxy updated by adding new cocktail recipes from our team and partners each week. Turn on push notifications and we’ll let you know when new recipe lists are available. Happy hour just got a little happier.'
        }
      </Text>
      <ButtonLarge
        onButtonClick={onButtonClick}
        title={'Got It!'}
        margin={[0, 16, 0, 16]}
        buttonWidth={fullButtonWidth}
        darkMode={darkMode}
        isPrimary
      />
    </ModalCenterOutline>
  )
}

ModalContentPushNotifications.propTypes = {
  darkMode: PropTypes.bool,
  onButtonClick: PropTypes.func,
  onClose: PropTypes.func,
}

const modalNotificationStyles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    height: 144,
    marginBottom: 32,
    marginTop: 24,
    resizeMode: 'contain',
  },
})
