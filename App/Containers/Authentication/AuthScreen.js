import React from 'react'
import {
  SafeAreaView,
  Text,
  Alert,
  Image,
  TouchableNativeFeedback,
  View,
  StyleSheet,
  Button,
  Linking,
} from 'react-native'
import auth from '@react-native-firebase/auth'
import { NavigationActions } from 'react-navigation'
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication'
import NavigationService from '../../Services/NavigationService'
import getStylesheet from '../../Theme/ApplicationStyles'
import getAuthStylesheet from './AuthStyle'
import TopHeader from '../../Components/TopHeader'
import ButtonLarge from '../../Components/ButtonLarge'
import Colors from '../../Theme/Colors'

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
        user.getIdToken().then((token) => {
          this.setState({ authUser: user })
          // this.props.updateAndFetchRemoteUser(user._user.email, token)
        })
      }
    })
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
        <AppleButton
          buttonStyle={darkMode ? AppleButton.Style.WHITE : AppleButton.Style.BLACK}
          buttonType={AppleButton.Type.SIGN_UP}
          style={{
            marginTop: 16,
            marginBottom: 16,
            alignSelf: 'center',
            width: 200,
            height: 45,
          }}
          onPress={() => this.onAppleButtonPress()}
        />
        <View style={{ alignItems: 'center' }}>
          <ButtonLarge
            onButtonClick={this.onEmailSignUpClick}
            title="Sign up with email"
            margin={[0, 0, 16, 0]}
            buttonWidth={200}
            buttonHeight={45}
            colorOverride={darkMode ? '#FFFFFF' : '#000000'}
            textColorOverride={darkMode ? '#000000' : '#FFFFFF'}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={authStyles.noAccountText}>{'Already have an account? '}</Text>
          <Text
            style={[authStyles.noAccountText, { color: Colors.blue1 }]}
            onPress={this.onSignInClick}
          >
            Sign in
          </Text>
        </View>

        <View style={{ position: 'absolute', bottom: 32, left: 0, right: 0, alignItems: 'center' }}>
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

export default NavigationService.screenWithDarkMode(AuthScreen)
