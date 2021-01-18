import React from 'react'
import { SafeAreaView, View, Text, Alert } from 'react-native'
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
import getStylesheet from '../../Theme/ApplicationStyles'

class UsernameScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: '',
      fullName: '',
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
    const { displayName, fullName } = this.state

    if (displayName.trim() === '') return false
    if (fullName.trim() === '') return false
    return true
  }

  onUpdateDisplayName = () => {
    const { displayName, fullName } = this.state
    this.setState({
      loading: true,
    })
    const authUser = auth().currentUser
    // Get token
    authUser.getIdToken().then((token) => {
      this.props.updateDisplayName(displayName, fullName, token)
    })
  }

  render() {
    const { darkMode, user } = this.props
    const { displayName, fullName, loading } = this.state
    const styles = getStylesheet(darkMode)
    const authStyles = getAuthStylesheet(darkMode)

    return (
      <SafeAreaView style={styles.outerContainer}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraScrollHeight={30}
          style={authStyles.scrollView}
        >
          <Text style={[authStyles.topHeader, { paddingTop: 48 }]}>Almost there!</Text>
          <Text style={[authStyles.sectionHeading, { paddingBottom: 12 }]}>
            We just need a few more details to complete your profile.
          </Text>
          <Text style={authStyles.sectionHeading}>Email</Text>
          <Textbox
            modalText=""
            textPlaceholder={user.email}
            charLimit={100}
            darkMode={darkMode}
            disabled
          />
          <Text style={authStyles.sectionHeading}>Username</Text>
          <Textbox
            onChangeText={(text) => this.setState({ displayName: text })}
            modalText={displayName}
            textPlaceholder={'Username'}
            charLimit={100}
            darkMode={darkMode}
            marginBottomOverride={12}
          />
          <Text style={authStyles.textboxSubtext}>
            A unique nickname to help others find your Mixxy profile and tag your recipes. Usernames
            can only contain letters, numbers, periods, and underscores.
          </Text>
          <Text style={authStyles.sectionHeading}>Name</Text>
          <Textbox
            onChangeText={(text) => this.setState({ fullName: text })}
            modalText={fullName}
            textPlaceholder={'Full name'}
            charLimit={100}
            darkMode={darkMode}
            marginBottomOverride={12}
          />
          <Text style={authStyles.textboxSubtext}>
            This is visible to other people who visit your Mixxy profile.
          </Text>
          <View style={authStyles.buffer} />
        </KeyboardAwareScrollView>
        <BottomBar
          buttonTitle="Sign Up"
          disabled={!this.inputValid() || loading}
          darkMode={darkMode}
          onButtonClick={this.onUpdateDisplayName}
        />
      </SafeAreaView>
    )
  }
}

UsernameScreen.propTypes = {
  darkMode: PropTypes.bool,
  navigation: PropTypes.object,
  updateDisplayName: PropTypes.func,
  updateDisplayNameIsLoading: PropTypes.bool,
  updateDisplayNameErrorMessage: PropTypes.string,
  user: PropTypes.object,
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  updateDisplayNameIsLoading: state.user.updateDisplayNameIsLoading,
  updateDisplayNameErrorMessage: state.user.updateDisplayNameErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  updateDisplayName: (displayName, fullName, firebaseToken) =>
    dispatch(UserActions.updateDisplayName(displayName, fullName, firebaseToken)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(UsernameScreen))
