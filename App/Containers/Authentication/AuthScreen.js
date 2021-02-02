import React from 'react'
import { SafeAreaView, Text, Alert, View, Linking, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import auth from '@react-native-firebase/auth'
import { NavigationActions } from 'react-navigation'
import { appleAuth } from '@invertase/react-native-apple-authentication'
import { GoogleSignin } from '@react-native-community/google-signin'
import NavigationService from '../../Services/NavigationService'
import getStylesheet from '../../Theme/ApplicationStyles'
import getAuthStylesheet from './AuthStyle'
import GoogleButton from './GoogleButton'
import AppleButton from './AppleButton'
import { PropTypes } from 'prop-types'
import TopHeader from '../../Components/TopHeader'
import UserActions from '../../Stores/User/Actions'
import ButtonLarge from '../../Components/ButtonLarge'
import Colors from '../../Theme/Colors'
import Images from '../../Theme/Images'
import Helpers from '../../Theme/Helpers'

const APPLE_PROVIDER_ID = 'apple.com'
const GOOGLE_PROVIDER_ID = 'google.com'

export const onAppleButtonPress = async () => {
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

export const onGoogleButtonPress = async () => {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn()

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential)
}

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
        const email = user.email
        let providerId = null
        if (user.providerData && user.providerData.length) {
          providerId = user.providerData[0].providerId
        }
        if (providerId === APPLE_PROVIDER_ID || providerId === GOOGLE_PROVIDER_ID) {
          user.getIdToken().then((token) => {
            this.props.updateAndFetchRemoteUser(email, null, token)
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
      user,
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
              // check if display name is empty and go to new page
              if (!user.displayName || user.displayName === '') {
                NavigationService.navigate('Username')
              } else {
                navigation.popToTop()
                navigation.goBack(null)
              }
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

  render() {
    const { darkMode } = this.props
    const styles = getStylesheet(darkMode)
    const authStyles = getAuthStylesheet(darkMode)

    const { width, height } = Dimensions.get('window')
    return (
      <SafeAreaView style={styles.outerContainer}>
        <TopHeader
          onClose={this.onBackScreenClick}
          showSeparator={false}
          darkMode={darkMode}
          useTransparent
        />
        <Image
          style={{
            alignSelf: 'center',
            marginTop: 60,
            marginBottom: 36,
            height: height * 0.27,
            resizeMode: 'contain',
          }}
          source={Images.auth3dMartini}
        />
        <Image
          style={{
            position: 'absolute',
            height: height * 0.45,
            zIndex: -1,
            width: width,
            top: 0,
            left: 0,
            right: 0,
          }}
          source={Images.authBlurBackground}
        />
        <Text style={authStyles.authHeading}>Join Mixxy</Text>
        <Text style={authStyles.authSubheading}>
          Mixxy is creating a community for home bartenders to learn and share recipes. Get started
          by creating an account.
        </Text>
        <ButtonLarge
          onButtonClick={this.onEmailSignUpClick}
          title="Create Account"
          margin={[0, 16, 16, 16]}
          buttonWidth={width - 32}
          isPrimary
        />
        <View style={Helpers.row}>
          <AppleButton onAppleButtonPress={onAppleButtonPress} />
          <GoogleButton onGoogleButtonPress={onGoogleButtonPress} />
        </View>
        <View style={styles.divider} />
        <ButtonLarge
          onButtonClick={this.onSignInClick}
          title="Sign In"
          margin={[16, 16, 0, 16]}
          buttonWidth={width - 32}
        />
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
  user: PropTypes.object,
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
