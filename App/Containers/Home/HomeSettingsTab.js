import { Alert, ScrollView, Text, View, Linking, Image } from 'react-native'
import getStylesheet from '../../Theme/ApplicationStyles'
import React from 'react'
import getHomeStylesheet from './HomeScreenStyle'
import { useDarkMode } from 'react-native-dark-mode'
import { connect } from 'react-redux'
import * as constants from '../../Config/constants'
import Detail from '../../Components/Detail'
import Images from '../../Theme/Images'

function HomeSettingsTab(props) {
  const darkMode = useDarkMode()
  const styles = getStylesheet(darkMode)
  const homeStyles = getHomeStylesheet(darkMode)
  const extraPadding = {
    marginLeft: 16,
    marginRight: 16,
  }

  const onSettingsOptionClick = (option) => {
    if (option === constants.OPTION_VOLUME_UNITS) {
      Alert.alert('Feature Coming Soon', 'The ability to change volume units is coming soon.', [
        {
          text: 'OK',
        },
      ])
    } else if (option === constants.OPTION_CONTACT_US || option === constants.OPTION_JOIN_BETA) {
      // Pull up email
      let emailLink = 'mailto:drippyapp@gmail.com'
      if (option === constants.OPTION_JOIN_BETA) {
        emailLink = `${emailLink}?subject=Request to join Drippy Beta`
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
      const instaLink = 'https://www.instagram.com/drippyapp/'
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
    );
  }

  const renderSection = (section, idx) => {
    return (
      <View key={section} style={homeStyles.settingsSectionContainer}>
        <Text style={homeStyles.settingsSectionHeader}>{section}</Text>
        {constants.settingsOptions[section].map((option) => renderOption(option))}
      </View>
    )
  }

  return (
    <ScrollView style={styles.outerContainer}>
      <Text style={homeStyles.topHeaderLibrary}>Settings</Text>
      <View style={homeStyles.settingsProOutline}>
        <Image source={Images.proBadge} style={homeStyles.settingsProImage} />
        <Text style={homeStyles.settingsProTitle}>{'Mixxy Pro'}</Text>
        <Text style={homeStyles.settingsProText}>
          {'Thanks for being a Mixxy Pro user and supporting our team.'}
        </Text>
      </View>
      <View style={[styles.divider, extraPadding]} />
      {constants.settingsSections.map((section, idx) => renderSection(section, idx))}
      <Text style={homeStyles.settingsVersionText}>Mixxy V1.0.0</Text>
    </ScrollView>
  )
}

HomeSettingsTab.propTypes = {
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(HomeSettingsTab)
