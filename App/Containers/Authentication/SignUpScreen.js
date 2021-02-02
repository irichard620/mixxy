import React from 'react'
import { View, Text, Alert, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import auth from '@react-native-firebase/auth'
import getAuthStylesheet from './AuthStyle'
import { onGoogleButtonPress, onAppleButtonPress } from './AuthScreen'
import GoogleButton from './GoogleButton'
import AppleButton from './AppleButton'
import { PropTypes } from 'prop-types'
import NavigationService from '../../Services/NavigationService'
import Textbox from '../../Components/Textbox'
import UserActions from '../../Stores/User/Actions'
import TopHeader from '../../Components/TopHeader'
import ButtonLarge from '../../Components/ButtonLarge'
import getStylesheet from '../../Theme/ApplicationStyles'
import Helpers from '../../Theme/Helpers'

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loading: false,
      authUser: null,
    }
  }

  onBackScreenClick = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  inputValid = () => {
    const { email, password } = this.state

    if (email.trim() === '') return false
    if (password.trim().length < 6) return false
    return true
  }

  onSignUp = () => {
    const { email, password } = this.state
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
          this.props.updateAndFetchRemoteUser(email, null, token)
        })
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Error', 'That email address is already in use!', [
            {
              text: 'Ok',
            },
          ])
          return
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'That email address is invalid!', [
            {
              text: 'Ok',
            },
          ])
          return
        }

        Alert.alert('Error', 'An unexpected error occurred signing up. Please try again.', [
          {
            text: 'Ok',
          },
        ])
      })
  }

  render() {
    const { darkMode } = this.props
    const { email, password, loading } = this.state
    const styles = getStylesheet(darkMode)
    const authStyles = getAuthStylesheet(darkMode)
    const { width } = Dimensions.get('window')

    return (
      <View style={styles.outerContainer}>
        <TopHeader onClose={this.onBackScreenClick} darkMode={darkMode} useArrow />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraScrollHeight={30}
          style={authStyles.scrollView}
        >
          <Text style={authStyles.heading}>Welcome to Mixxy.</Text>
          <Text style={authStyles.headingDescription}>
            Get started with features like library backup and recipe sharing.
          </Text>
          <Textbox
            onChangeText={(text) => this.setState({ email: text })}
            modalText={email}
            textPlaceholder={'Email'}
            charLimit={100}
            darkMode={darkMode}
          />
          <Textbox
            onChangeText={(text) => this.setState({ password: text })}
            modalText={password}
            textPlaceholder={'Password'}
            charLimit={100}
            darkMode={darkMode}
            secureTextEntry
          />
          <ButtonLarge
            title="Sign Up"
            isPrimary
            margin={[0, 16, 0, 16]}
            onButtonClick={this.onSignUp}
            disabled={!this.inputValid() || loading}
          />
          <View style={authStyles.loginSeparator}>
            <View style={{ ...styles.divider, width: (width - 64) / 2 }} />
            <Text>OR</Text>
            <View style={{ ...styles.divider, width: (width - 64) / 2 }} />
          </View>
          <View style={Helpers.row}>
            <AppleButton onAppleButtonPress={onAppleButtonPress} />
            <GoogleButton onGoogleButtonPress={onGoogleButtonPress} />
          </View>
          <View style={authStyles.buffer} />
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

SignUpScreen.propTypes = {
  darkMode: PropTypes.bool,
  navigation: PropTypes.object,
  updateAndFetchRemoteUser: PropTypes.func,
}

const mapStateToProps = (state) => ({
  user: state.user.user,
})

const mapDispatchToProps = (dispatch) => ({
  updateAndFetchRemoteUser: (email, displayName, firebaseToken) =>
    dispatch(UserActions.updateAndFetchRemoteUser(email, displayName, firebaseToken)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(SignUpScreen))
