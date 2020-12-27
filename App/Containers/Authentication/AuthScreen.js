import React from 'react'
import { SafeAreaView, Text, Alert, View, Linking } from 'react-native'
import { connect } from 'react-redux'
import auth from '@react-native-firebase/auth'
import { NavigationActions } from 'react-navigation'
import { appleAuth } from '@invertase/react-native-apple-authentication'
import { GoogleSignin } from '@react-native-community/google-signin'
import NavigationService from '../../Services/NavigationService'
import getStylesheet from '../../Theme/ApplicationStyles'
import getAuthStylesheet from './AuthStyle'
import { PropTypes } from 'prop-types'
import TopHeader from '../../Components/TopHeader'
import UserActions from '../../Stores/User/Actions'
import ButtonLarge from '../../Components/ButtonLarge'
import Colors from '../../Theme/Colors'
import Helpers from '../../Theme/Helpers'

const APPLE_PROVIDER_ID = 'apple.com'
const GOOGLE_PROVIDER_ID = 'google.com'

class AuthScreen extends React.Component {
  authListener = null

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loading: false,
      authUser: null,
    }
  }

  componentDidMount() {
    // Auth listener
    this.authListener = auth().onAuthStateChanged((user) => {
      if (user && !this.state.authUser) {
        let displayName = null
        const email = user.email
        let providerId = null
        if (user.providerData && user.providerData.length) {
          providerId = user.providerData[0].providerId
        }
        if (providerId === APPLE_PROVIDER_ID || providerId === GOOGLE_PROVIDER_ID) {
          displayName = user.displayName
          user.getIdToken().then((token) => {
            this.props.updateAndFetchRemoteUser(email, displayName, token)
          })
        }
        this.setState({ authUser: user })
      }
    })
  }

  componentDidUpdate(prevProps) {
    const {
      updateAndFetchRemoteUserIsLoading,
      updateAndFetchRemoteUserErrorMessage,
      navigation,
    } = this.props
    if (prevProps.updateAndFetchRemoteUserIsLoading && !updateAndFetchRemoteUserIsLoading) {
      if (updateAndFetchRemoteUserErrorMessage) {
        Alert.alert('Error', 'An unexpected error occurred authenticated. Please try again.', [
          {
            text: 'Ok',
          },
        ])
      } else {
        Alert.alert('Success!', 'You have successfully authenticated with Mixxy.', [
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

  componentWillUnmount() {
    if (this.authListener) {
      this.authListener = null
    }
  }

  onSignInClick = () => {
    NavigationService.navigate('Login')
  }

  onEmailSignUpClick = () => {
    NavigationService.navigate('SignUp')
  }

  onBackScreenClick = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  onTermsOfServiceClick = () => {
    const url = 'https://mixxyapp.com/privacy/'
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url)
      } else {
        console.log("Don't know how to open URI: " + url)
      }
    })
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

  render() {
    const { darkMode } = this.props
    const styles = getStylesheet(darkMode)
    const authStyles = getAuthStylesheet(darkMode)
    return (
      <SafeAreaView style={styles.outerContainer}>
        <TopHeader onClose={this.onBackScreenClick} showSeparator={false} darkMode={darkMode} />
        <Text style={authStyles.authHeading}>Mixxy</Text>
        <Text style={authStyles.authSubheading}>Ultimate guide to home bartending.</Text>
        <Text style={authStyles.noAccountText}>Get started by creating your account.</Text>
        <View style={Helpers.crossCenter}>
          <ButtonLarge
            onButtonClick={this.onAppleButtonPress}
            title="Sign up with Apple"
            margin={[16, 0, 16, 0]}
            buttonWidth={250}
            buttonHeight={45}
            colorOverride={darkMode ? '#FFFFFF' : '#000000'}
            textColorOverride={darkMode ? '#000000' : '#FFFFFF'}
          />
          <ButtonLarge
            onButtonClick={this.onGoogleButtonPress}
            title="Sign up with Google"
            margin={[0, 0, 16, 0]}
            buttonWidth={250}
            buttonHeight={45}
            colorOverride={darkMode ? '#FFFFFF' : '#000000'}
            textColorOverride={darkMode ? '#000000' : '#FFFFFF'}
          />
          <ButtonLarge
            onButtonClick={this.onEmailSignUpClick}
            title="Sign up with Email"
            margin={[0, 0, 16, 0]}
            buttonWidth={250}
            buttonHeight={45}
            colorOverride={darkMode ? '#FFFFFF' : '#000000'}
            textColorOverride={darkMode ? '#000000' : '#FFFFFF'}
          />
        </View>
        <View style={Helpers.rowMain}>
          <Text style={authStyles.noAccountText}>{'Already have an account? '}</Text>
          <Text
            style={[authStyles.noAccountText, { color: Colors.blue1 }]}
            onPress={this.onSignInClick}
          >
            Sign in
          </Text>
        </View>

        <View style={authStyles.termsOfServiceContainer}>
          <Text style={authStyles.noAccountText}>By creating an account, I accept Mixxys</Text>
          <Text
            style={[authStyles.noAccountText, { color: Colors.blue1 }]}
            onPress={this.onTermsOfServiceClick}
          >
            Terms of service
          </Text>
        </View>
      </SafeAreaView>
    )
  }
}

AuthScreen.propTypes = {
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
  updateAndFetchRemoteUser: (email, displayName, firebaseToken) =>
    dispatch(UserActions.updateAndFetchRemoteUser(email, displayName, firebaseToken)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(AuthScreen))
