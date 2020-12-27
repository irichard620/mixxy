import React from 'react'
import { View, Text, Alert, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { appleAuth } from '@invertase/react-native-apple-authentication'
import { GoogleSignin } from '@react-native-community/google-signin'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import auth from '@react-native-firebase/auth'
import getAuthStylesheet from './AuthStyle'
import { PropTypes } from 'prop-types'
import NavigationService from '../../Services/NavigationService'
import Textbox from '../../Components/Textbox'
import UserActions from '../../Stores/User/Actions'
import BottomBar from '../../Components/BottomBar'
import TopHeader from '../../Components/TopHeader'
import ButtonLarge from '../../Components/ButtonLarge'
import getStylesheet from '../../Theme/ApplicationStyles'
import Colors from '../../Theme/Colors'
import Helpers from '../../Theme/Helpers'

class LoginScreen extends React.Component {
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

  onLogin = () => {
    const { email, password } = this.state
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        const authUser = auth().currentUser
        // Get token
        authUser.getIdToken().then((token) => {
          this.props.updateAndFetchRemoteUser(email, token)
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

  onRegisterClick = () => {
    NavigationService.navigate('SignUp')
  }

  onAppleButtonPress = async () => {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    })

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      Alert.alert('Error', 'Apple login failed - please try again later.', [
        {
          text: 'Ok',
        },
      ])
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)

    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential)
  }

  onGoogleButtonPress = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn()

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential)
  }

  onForgotPasswordClick = () => {
    Alert.prompt('Enter email', 'Enter your email so we can send a reset password link', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: (email) => {
          auth().sendPasswordResetEmail(email)
        },
      },
    ])
  }

  render() {
    const { darkMode } = this.props
    const { email, password, loading } = this.state
    const styles = getStylesheet(darkMode)
    const authStyles = getAuthStylesheet(darkMode)
    const { width } = Dimensions.get('window')
    return (
      <View style={styles.outerContainer}>
        <TopHeader
          onClose={this.onBackScreenClick}
          showSeparator
          darkMode={darkMode}
          title="Log in"
          useArrow
        />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraScrollHeight={30}
          style={authStyles.scrollView}
        >
          <Text style={authStyles.headingDescription}>
            {'Login to your Mixxy account to access the best Mixxy has to offer.'}
          </Text>
          <View style={Helpers.crossCenter}>
            <ButtonLarge
              onButtonClick={this.onAppleButtonPress}
              title="Continue with Apple"
              margin={[0, 0, 16, 0]}
              buttonWidth={250}
              buttonHeight={45}
              colorOverride={darkMode ? '#FFFFFF' : '#000000'}
              textColorOverride={darkMode ? '#000000' : '#FFFFFF'}
            />
            <ButtonLarge
              onButtonClick={this.onGoogleButtonPress}
              title="Continue with Google"
              margin={[0, 0, 16, 0]}
              buttonWidth={250}
              buttonHeight={45}
              colorOverride={darkMode ? '#FFFFFF' : '#000000'}
              textColorOverride={darkMode ? '#000000' : '#FFFFFF'}
            />
          </View>
          <View style={authStyles.loginSeparator}>
            <View style={{ ...styles.divider, width: (width - 64) / 2 }} />
            <Text>OR</Text>
            <View style={{ ...styles.divider, width: (width - 64) / 2 }} />
          </View>
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
          <Text
            style={[authStyles.noAccountText, { color: Colors.blue1 }]}
            onPress={this.onForgotPasswordClick}
          >
            Forgot password?
          </Text>
          <View style={authStyles.buffer} />
        </KeyboardAwareScrollView>
        <BottomBar
          buttonTitle="Login"
          disabled={!this.inputValid() || loading}
          darkMode={darkMode}
          onButtonClick={this.onLogin}
        />
      </View>
    )
  }
}

LoginScreen.propTypes = {
  darkMode: PropTypes.bool,
  navigation: PropTypes.object,
  updateAndFetchRemoteUser: PropTypes.func,
  updateAndFetchRemoteUserIsLoading: PropTypes.bool,
  updateAndFetchRemoteUserErrorMessage: PropTypes.string,
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  updateAndFetchRemoteUserIsLoading: state.user.updateAndFetchRemoteUserIsLoading,
  updateAndFetchRemoteUserErrorMessage: state.user.updateAndFetchRemoteUserErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  updateAndFetchRemoteUser: (email, firebaseToken) =>
    dispatch(UserActions.updateAndFetchRemoteUser(email, null, firebaseToken)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(LoginScreen))
