import React from 'react'
import { View, Text, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import auth from '@react-native-firebase/auth'
import getAuthStylesheet from './AuthStyle'
import { PropTypes } from 'prop-types'
import NavigationService from '../../Services/NavigationService'
import Textbox from '../../Components/Textbox'
import BottomBar from '../../Components/BottomBar'
import UserActions from '../../Stores/User/Actions'
import TopHeader from '../../Components/TopHeader'
import getStylesheet from '../../Theme/ApplicationStyles'

class UsernameScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: '',
      loading: false,
    }
  }

  componentDidUpdate(prevProps) {
    const { updateDisplayNameIsLoading, updateDisplayNameErrorMessage, navigation } = this.props
    if (prevProps.updateDisplayNameIsLoading && !updateDisplayNameIsLoading) {
      if (updateDisplayNameErrorMessage) {
        // TODO: check for display name or profanity
        console.log(updateDisplayNameErrorMessage)
        if (updateDisplayNameErrorMessage === 'Display name conflict') {
          Alert.alert('Error', 'This display name is already in use. Please try again.', [
            {
              text: 'Ok',
            },
          ])
        } else if (updateDisplayNameErrorMessage === 'Profanity') {
          Alert.alert(
            'Error',
            'You are not permitted to use profanity in username. Please try again.',
            [
              {
                text: 'Ok',
              },
            ]
          )
        } else {
          Alert.alert(
            'Error',
            'An unexpected error occurred when setting display name. Please try again.',
            [
              {
                text: 'Ok',
              },
            ]
          )
        }
        this.setState({ loading: false })
      } else {
        Alert.alert('Success!', 'Username has been set.', [
          {
            text: 'Ok',
            onPress: () => {
              navigation.popToTop()
              navigation.goBack(null)
            },
          },
        ])
      }
    }
  }

  onBackScreenClick = () => {
    const { navigation } = this.props
    navigation.popToTop()
    navigation.goBack(null)
  }

  inputValid = () => {
    const { displayName } = this.state

    if (displayName.trim() === '') return false
    return true
  }

  onUpdateDisplayName = () => {
    const { displayName } = this.state
    this.setState({
      loading: true,
    })
    const authUser = auth().currentUser
    // Get token
    authUser.getIdToken().then((token) => {
      this.props.updateDisplayName(displayName, token)
    })
  }

  render() {
    const { darkMode } = this.props
    const { displayName, loading } = this.state
    const styles = getStylesheet(darkMode)
    const authStyles = getAuthStylesheet(darkMode)

    return (
      <View style={styles.outerContainer}>
        <TopHeader
          onClose={this.onBackScreenClick}
          showSeparator
          darkMode={darkMode}
          title="Username"
        />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraScrollHeight={30}
          style={authStyles.scrollView}
        >
          <Text style={authStyles.headingDescription}>
            {'Set a unique username for your Mixxy account'}
          </Text>
          <Textbox
            onChangeText={(text) => this.setState({ displayName: text })}
            modalText={displayName}
            textPlaceholder={'Username'}
            charLimit={100}
            darkMode={darkMode}
          />
          <View style={authStyles.buffer} />
        </KeyboardAwareScrollView>
        <BottomBar
          buttonTitle="Set display name"
          disabled={!this.inputValid() || loading}
          darkMode={darkMode}
          onButtonClick={this.onUpdateDisplayName}
        />
      </View>
    )
  }
}

UsernameScreen.propTypes = {
  darkMode: PropTypes.bool,
  navigation: PropTypes.object,
  updateDisplayName: PropTypes.func,
  updateDisplayNameIsLoading: PropTypes.bool,
  updateDisplayNameErrorMessage: PropTypes.string,
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  updateDisplayNameIsLoading: state.user.updateDisplayNameIsLoading,
  updateDisplayNameErrorMessage: state.user.updateDisplayNameErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  updateDisplayName: (displayName, firebaseToken) =>
    dispatch(UserActions.updateDisplayName(displayName, firebaseToken)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(UsernameScreen))
