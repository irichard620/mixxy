import { Alert, ScrollView, Text, View, Linking, Image, TouchableOpacity } from 'react-native'
import getStylesheet from '../../Theme/ApplicationStyles'
import React from 'react'
import { PropTypes } from 'prop-types'
import getHomeStylesheet from './HomeScreenStyle'
import { useDarkMode } from 'react-native-dark-mode'
import { connect } from 'react-redux'
import * as constants from '../../Config/constants'
import Detail from '../../Components/Detail'
import Images from '../../Theme/Images'
import NavigationService from '../../Services/NavigationService'

function HomeSettingsTab(props) {
  const { user, onMixxyProClick, onRestoreClick, onVolumeUnitsClick } = props
  const darkMode = useDarkMode()
  const styles = getStylesheet(darkMode)
  const homeStyles = getHomeStylesheet(darkMode)
  const extraPadding = {
    marginLeft: 16,
    marginRight: 16,
  }

  const onSettingsOptionClick = (option) => {
    if (option === constants.OPTION_VOLUME_UNITS) {
      onVolumeUnitsClick()
    } else if (option === constants.OPTION_REPLAY_TUTORIAL) {
      NavigationService.navigate('IntroScreen', { fromSettings: true })
    } else if (option === constants.OPTION_CONTACT_US || option === constants.OPTION_JOIN_BETA) {
      // Pull up email
      let emailLink = 'mailto:info@mixxyapp.com'
      if (option === constants.OPTION_JOIN_BETA) {
        emailLink = `${emailLink}?subject=Request to join Mixxy Beta`
      }
      Linking.canOpenURL(emailLink).then((supported) => {
        if (supported) {
          Linking.openURL(emailLink)
        } else {
          // Open error alert
          Alert.alert('Error Occurred', 'The Email could not be opened.', [
            {
              text: 'OK',
            },
          ])
        }
      })
    } else if (option === constants.OPTION_INSTAGRAM) {
      const instaLink = 'https://www.instagram.com/drinkmixxy/'
      Linking.canOpenURL(instaLink).then((supported) => {
        if (supported) {
          Linking.openURL(instaLink)
        } else {
          // Open error alert
          Alert.alert('Error Occurred', 'Could not open Instagram.', [
            {
              text: 'OK',
            },
          ])
        }
      })
    }
  }

  const renderOption = (option) => {
    return (
      <Detail
        key={option}
        value={''}
        title={option}
        onDetailClick={() => onSettingsOptionClick(option)}
        showArrow
        showSeparator
        darkMode={darkMode}
      />
    )
  }

  const renderSection = (section, idx) => {
    return (
      <View key={section} style={homeStyles.settingsSectionContainer}>
        <Text style={homeStyles.settingsSectionHeader}>{section}</Text>
        {constants.settingsOptions[section].map((option) => renderOption(option))}
      </View>
    )
  }

  let proText = 'Thanks for being a Mixxy Pro user and supporting our team.'
  if (!user.premium) {
    proText =
      'Unlimited recipe storage, recipe editing, and custom drink creation. (And all our future Pro features, too.) Mixxy Pro is a one-time purchase that also supports our two person team.'
  }

  return (
    <ScrollView style={styles.outerContainer}>
      <Text style={homeStyles.topHeaderLibrary}>Settings</Text>
      <View style={homeStyles.settingsProOutline}>
        <Image source={Images.proBadge} style={homeStyles.settingsProImage} />
        <Text style={homeStyles.settingsProTitle}>{'Mixxy Pro'}</Text>
        <Text style={homeStyles.settingsProText}>{proText}</Text>
        {!user.premium && <View style={styles.divider} />}
        {!user.premium && (
          <TouchableOpacity
            style={homeStyles.settingsProButtonOutline}
            onPress={onMixxyProClick}
          >
            <Text style={homeStyles.settingsProButton1Text}>{'Get Mixxy Pro'}</Text>
          </TouchableOpacity>
        )}
        {!user.premium && <View style={styles.divider} />}
        {!user.premium && (
          <TouchableOpacity
            style={homeStyles.settingsProButtonOutline}
            onPress={onRestoreClick}
          >
            <Text style={homeStyles.settingsProButton2Text}>{'Restore Purchase'}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={[styles.divider, extraPadding]} />
      {constants.settingsSections.map((section, idx) => renderSection(section, idx))}
      <Text style={homeStyles.settingsVersionText}>Mixxy V1.0.2</Text>
    </ScrollView>
  )
}

HomeSettingsTab.propTypes = {
  user: PropTypes.object,
  onMixxyProClick: PropTypes.func,
  onRestoreClick: PropTypes.func,
  onVolumeUnitsClick: PropTypes.func,
}

const mapStateToProps = (state) => ({
  user: state.user.user,
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(HomeSettingsTab)
