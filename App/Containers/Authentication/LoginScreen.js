import React from 'react'
import { View, Text, Button, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
import getStylesheet from '../../Theme/ApplicationStyles'

class LoginScreen extends React.Component {
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
          this.props.updateAndFetchRemoteUser(user._user.email, token)
        })
      }
    })
  }

  componentWillUnmount() {
    if (this.authListener) {
      this.authListener = null
    }
  }

  componentDidUpdate(prevProps) {
    const {
      updateAndFetchRemoteUserIsLoading,
      updateAndFetchRemoteUserErrorMessage,
      navigation,
    } = this.props
    if (prevProps.updateAndFetchRemoteUserIsLoading && !updateAndFetchRemoteUserIsLoading) {
      if (updateAndFetchRemoteUserErrorMessage) {
        Alert.alert('Error', 'An unexpected error occurred logging in. Please try again.', [
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
        console.log('Success')
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
    NavigationService.navigate('SignUp', { keyLoginScreen: this.props.navigation.state.key })
  }

  render() {
    const { darkMode } = this.props
    const { email, password, loading } = this.state
    const styles = getStylesheet(darkMode)
    const authStyles = getAuthStylesheet(darkMode)
    return (
      <View style={styles.outerContainer}>
        <TopHeader onClose={this.onBackScreenClick} showSeparator={false} darkMode={darkMode} />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraScrollHeight={30}
          style={authStyles.scrollView}
        >
          <Text style={authStyles.heading}>Login</Text>
          <Text style={authStyles.headingDescription}>
            {'Login to your Mixxy account to access the best Mixxy has to offer.'}
          </Text>
          <Text style={authStyles.sectionHeading}>{'Email'}</Text>
          <Textbox
            onChangeText={(text) => this.setState({ email: text })}
            modalText={email}
            textPlaceholder={'Email'}
            charLimit={100}
            darkMode={darkMode}
          />
          <Text style={authStyles.sectionHeading}>{'Password'}</Text>
          <Textbox
            onChangeText={(text) => this.setState({ password: text })}
            modalText={password}
            textPlaceholder={'Password'}
            charLimit={100}
            darkMode={darkMode}
            secureTextEntry
          />
          <Text style={authStyles.noAccountText}>Don‘t have an account?</Text>
          <Button title="Register" onPress={this.onRegisterClick} />
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
    dispatch(UserActions.updateAndFetchRemoteUser(email, firebaseToken)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(LoginScreen))
