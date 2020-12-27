import React from 'react'
import { View, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationActions } from 'react-navigation'
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

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      displayName: '',
      loading: false,
      authUser: null,
    }
  }

  onBackScreenClick = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  inputValid = () => {
    const { email, password, displayName } = this.state

    if (email.trim() === '') return false
    if (password.trim().length < 6) return false
    if (displayName.trim() === '') return false
    return true
  }

  onSignUp = () => {
    const { email, password, displayName } = this.state
    this.setState({
      loading: true,
    })
    // Authenticate
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const authUser = auth().currentUser
        // Get token
        authUser.getIdToken().then((token) => {
          // Make api call
          this.props.updateAndFetchRemoteUser(email, displayName, token)
        })
      })
      .catch((error) => {
        // TODO: add popups if error
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!')
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!')
        }

        console.error(error)
      })
  }

  render() {
    const { darkMode } = this.props
    const { email, password, displayName, loading } = this.state
    const styles = getStylesheet(darkMode)
    const authStyles = getAuthStylesheet(darkMode)

    return (
      <View style={styles.outerContainer}>
        <TopHeader
          onClose={this.onBackScreenClick}
          showSeparator
          darkMode={darkMode}
          title="Sign Up"
          useArrow
        />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraScrollHeight={30}
          style={authStyles.scrollView}
        >
          <Text style={authStyles.headingDescription}>
            {
              'Sign up for a Mixxy account to get the most out of your experience, including cloud backups and community content'
            }
          </Text>
          <Text style={authStyles.sectionHeading}>{'What is your name?'}</Text>
          <Textbox
            onChangeText={(text) => this.setState({ displayName: text })}
            modalText={displayName}
            textPlaceholder={'Name'}
            charLimit={100}
            darkMode={darkMode}
          />
          <Text style={authStyles.sectionHeading}>{'What is your email?'}</Text>
          <Textbox
            onChangeText={(text) => this.setState({ email: text })}
            modalText={email}
            textPlaceholder={'Email'}
            charLimit={100}
            darkMode={darkMode}
          />
          <Text style={authStyles.sectionHeading}>{'Set a password'}</Text>
          <Textbox
            onChangeText={(text) => this.setState({ password: text })}
            modalText={password}
            textPlaceholder={'Password'}
            charLimit={100}
            darkMode={darkMode}
            secureTextEntry
          />
          <View style={authStyles.buffer} />
        </KeyboardAwareScrollView>
        <BottomBar
          buttonTitle="Sign up"
          disabled={!this.inputValid() || loading}
          darkMode={darkMode}
          onButtonClick={this.onSignUp}
        />
      </View>
    )
  }
}

SignUpScreen.propTypes = {
  darkMode: PropTypes.bool,
  navigation: PropTypes.object,
  createRemoteUser: PropTypes.func,
  createRemoteUserIsLoading: PropTypes.bool,
  createRemoteUserErrorMessage: PropTypes.string,
  updateAndFetchRemoteUser: PropTypes.func,
  updateAndFetchRemoteUserIsLoading: PropTypes.bool,
  updateAndFetchRemoteUserErrorMessage: PropTypes.string,
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  createRemoteUserIsLoading: state.user.createRemoteUserIsLoading,
  createRemoteUserErrorMessage: state.user.createRemoteUserErrorMessage,
  updateAndFetchRemoteUserIsLoading: state.user.updateAndFetchRemoteUserIsLoading,
  updateAndFetchRemoteUserErrorMessage: state.user.updateAndFetchRemoteUserErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  createRemoteUser: (email, displayName) =>
    dispatch(UserActions.createRemoteUser(email, displayName)),
  updateAndFetchRemoteUser: (email, displayName, firebaseToken) =>
    dispatch(UserActions.updateAndFetchRemoteUser(email, displayName, firebaseToken)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(SignUpScreen))
