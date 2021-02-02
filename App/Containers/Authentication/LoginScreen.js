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
      .then(() => {
        const authUser = auth().currentUser
        // Get token
        authUser.getIdToken().then((token) => {
          console.log(token)
          this.props.updateAndFetchRemoteUser(email, token)
        })
      })
      .catch((error) => {
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
        <TopHeader onClose={this.onBackScreenClick} darkMode={darkMode} useArrow />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraScrollHeight={30}
          style={authStyles.scrollView}
        >
          <Text style={authStyles.heading}>Welcome back.</Text>
          <Text style={authStyles.headingDescription}>
            {'Get right back to mixing your favorite drinks. Sign in to your Mixxy account.'}
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
          <Text style={authStyles.forgotPasswordText} onPress={this.onForgotPasswordClick}>
            Forgot your password?
          </Text>
          <ButtonLarge
            title="Sign In"
            isPrimary
            margin={[0, 16, 0, 16]}
            onButtonClick={this.onLogin}
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

LoginScreen.propTypes = {
  darkMode: PropTypes.bool,
  navigation: PropTypes.object,
  updateAndFetchRemoteUser: PropTypes.func,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  updateAndFetchRemoteUser: (email, firebaseToken) =>
    dispatch(UserActions.updateAndFetchRemoteUser(email, null, firebaseToken)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(LoginScreen))
