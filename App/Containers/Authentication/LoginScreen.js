import React from 'react'
import { View, Text, Button, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationActions } from 'react-navigation'
import auth from '@react-native-firebase/auth'
import getAuthStylesheet from './AuthStyle'
import { PropTypes } from 'prop-types'
import NavigationService from '../../Services/NavigationService'
import Textbox from '../../Components/Textbox'
import BottomBar from '../../Components/BottomBar'
import TopHeader from '../../Components/TopHeader'
import getStylesheet from '../../Theme/ApplicationStyles'

function LoginScreen(props) {
  const { darkMode, navigation } = props
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const styles = getStylesheet(darkMode)
  const authStyles = getAuthStylesheet(darkMode)

  const onBackScreenClick = () => {
    navigation.dispatch(NavigationActions.back())
  }

  const inputValid = () => {
    if (email.trim() === '') return false
    if (password.trim().length < 6) return false
    return true
  }

  const onLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Success!', 'You have successfully logged into Mixxy account.', [
          {
            text: 'Ok',
            onPress: () => {
              navigation.dispatch(NavigationActions.back())
            },
          },
        ])
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

  const onRegisterClick = () => {
    NavigationService.navigate('SignUp', { keyLoginScreen: navigation.state.key })
  }

  return (
    <View style={styles.outerContainer}>
      <TopHeader onClose={onBackScreenClick} showSeparator={false} darkMode={darkMode} />
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
          onChangeText={(text) => setEmail(text)}
          modalText={email}
          textPlaceholder={'Email'}
          charLimit={100}
          darkMode={darkMode}
        />
        <Text style={authStyles.sectionHeading}>{'Password'}</Text>
        <Textbox
          onChangeText={(text) => setPassword(text)}
          modalText={password}
          textPlaceholder={'Password'}
          charLimit={100}
          darkMode={darkMode}
          secureTextEntry
        />
        <Text style={authStyles.noAccountText}>Don‘t have an account?</Text>
        <Button title="Register" onPress={onRegisterClick} />
        <View style={authStyles.buffer} />
      </KeyboardAwareScrollView>
      <BottomBar
        buttonTitle="Login"
        disabled={!inputValid()}
        darkMode={darkMode}
        onButtonClick={onLogin}
      />
    </View>
  )
}

LoginScreen.propTypes = {
  darkMode: PropTypes.bool,
  navigation: PropTypes.object,
}

export default NavigationService.screenWithDarkMode(LoginScreen)
