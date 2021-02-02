import { Alert, Text, View, Linking, Image, TouchableOpacity } from 'react-native'
import getStylesheet from '../../Theme/ApplicationStyles'
import React from 'react'
import Rate from 'react-native-rate'
import auth from '@react-native-firebase/auth'
import { PropTypes } from 'prop-types'
import getHomeStylesheet from './HomeScreenStyle'
import { useDarkMode } from 'react-native-dark-mode'
import { connect } from 'react-redux'
import * as constants from '../../Config/constants'
import Detail from '../../Components/Detail'
import Images from '../../Theme/Images'
import NavigationService from '../../Services/NavigationService'
import HomeTabOutline from './Discover/HomeTabOutline'

function HomeSettingsTab(props) {
  const { user, onMixxyProClick, onRestoreClick, onVolumeUnitsClick, authUser } = props
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
    } else if (option === constants.OPTION_RATE_APP) {
      Rate.rate(
        {
          AppleAppID: '1503445869',
        },
        (success) => {
          if (success) {
            // this.setState({rated:true})
          }
        }
      )
    } else if (option === constants.OPTION_CONTACT_US || option === constants.OPTION_REPORT_BUG) {
      // Pull up email
      let emailLink = 'mailto:info@mixxyapp.com'
      if (option === constants.OPTION_REPORT_BUG) {
        emailLink = `${emailLink}?subject=Mixxy Bug Report`
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
    } else if (option === constants.OPTION_LOG_IN) {
      NavigationService.navigate('LoginScreen')
    } else if (option === constants.OPTION_SIGN_OUT) {
      // TODO: clear email and display name here
      Alert.alert('Logout', 'Are you sure you want to logout of Mixxy?', [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: () => {
            auth()
              .signOut()
              .then(() => console.log('User signed out!'))
          },
        },
      ])
    } else if (option === constants.OPTION_DISPLAY_NAME || option === constants.OPTION_FULL_NAME) {
      NavigationService.navigate('Username')
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
        {constants.settingsOptions[section].map((option) => {
          if (!authUser && option === constants.OPTION_SIGN_OUT) {
            return null
          } else if (authUser && option === constants.OPTION_LOG_IN) {
            return null
          }
          return renderOption(option)
        })}
      </View>
    )
  }

  const renderAccountSection = () => {
    return (
      <View key="Account" style={homeStyles.settingsSectionContainer}>
        <Text style={homeStyles.settingsSectionHeader}>Account</Text>
        {authUser && (
          <Detail
            key="email"
            value={user.email}
            title="Email"
            showSeparator
            disabled
            darkMode={darkMode}
          />
        )}
        {authUser && (
          <Detail
            key="display_name"
            value={user.displayName || 'No value'}
            title={constants.OPTION_DISPLAY_NAME}
            onDetailClick={() => onSettingsOptionClick(constants.OPTION_DISPLAY_NAME)}
            showSeparator
            darkMode={darkMode}
          />
        )}
        {authUser && (
          <Detail
            key="full_name"
            value={user.fullName || 'No value'}
            title={constants.OPTION_FULL_NAME}
            onDetailClick={() => onSettingsOptionClick(constants.OPTION_FULL_NAME)}
            showSeparator
            darkMode={darkMode}
          />
        )}
        {authUser && (
          <Detail
            key="logout"
            value={''}
            title={constants.OPTION_SIGN_OUT}
            onDetailClick={() => onSettingsOptionClick(constants.OPTION_SIGN_OUT)}
            showArrow
            showSeparator
            darkMode={darkMode}
          />
        )}
        {!authUser && (
          <Detail
            key="login"
            value={''}
            title={constants.OPTION_LOG_IN}
            onDetailClick={() => onSettingsOptionClick(constants.OPTION_LOG_IN)}
            showArrow
            showSeparator
            darkMode={darkMode}
          />
        )}
      </View>
    )
  }

  const renderCloudBackupSection = () => {
    return authUser ? (
      <View key="Cloud Backup" style={homeStyles.settingsSectionContainer}>
        <Text style={homeStyles.settingsSectionHeader}>Cloud Backup</Text>
        <Detail
          key="last_backup_at"
          value={user.lastBackupAt || 'None'}
          title="Last backup"
          showSeparator
          disabled
          darkMode={darkMode}
        />
        <Detail
          key="manual_sync"
          title={constants.OPTION_TRIGGER_MANUAL_SYNC}
          onDetailClick={() => onSettingsOptionClick(constants.OPTION_FULL_NAME)}
          showSeparator
          showArrow
          darkMode={darkMode}
        />
      </View>
    ) : null
  }

  let proText = 'Thanks for being a Mixxy Pro user and supporting our team.'
  if (!user.premium) {
    proText =
      'Unlimited recipe storage, recipe editing, and custom drink creation. (And all our future Pro features, too.) Mixxy Pro is a one-time purchase that also supports our two person team.'
  }

  return (
    <HomeTabOutline pageTitle="Settings" showRefreshControl={false} darkMode={darkMode}>
      {/* <Image
        source={darkMode ? Images.navSettingsDark : Images.navSettingsLight}
        style={homeStyles.settingsUserImage}
      />
      <Text style={homeStyles.settingsProText}>Not logged in</Text> */}
      <View style={homeStyles.settingsProOutline}>
        <Image source={Images.proBadge} style={homeStyles.settingsProImage} />
        <Text style={homeStyles.settingsProTitle}>{'Mixxy Pro'}</Text>
        <Text style={homeStyles.settingsProText}>{proText}</Text>
        {!user.premium && <View style={styles.divider} />}
        {!user.premium && (
          <TouchableOpacity style={homeStyles.settingsProButtonOutline} onPress={onMixxyProClick}>
            <Text style={homeStyles.settingsProButton1Text}>{'Get Mixxy Pro'}</Text>
          </TouchableOpacity>
        )}
        {!user.premium && <View style={styles.divider} />}
        {!user.premium && (
          <TouchableOpacity style={homeStyles.settingsProButtonOutline} onPress={onRestoreClick}>
            <Text style={homeStyles.settingsProButton2Text}>{'Restore Purchase'}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={[styles.divider, extraPadding]} />
      {renderAccountSection()}
      {renderCloudBackupSection()}
      {constants.settingsSections.map((section, idx) => renderSection(section, idx))}
      <Text style={homeStyles.settingsVersionText}>Mixxy V3.0</Text>
      <View style={homeStyles.bufferView} />
    </HomeTabOutline>
  )
}

HomeSettingsTab.propTypes = {
  user: PropTypes.object,
  onMixxyProClick: PropTypes.func,
  onRestoreClick: PropTypes.func,
  onVolumeUnitsClick: PropTypes.func,
  authUser: PropTypes.object,
}

const mapStateToProps = (state) => ({
  user: state.user.user,
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(HomeSettingsTab)
