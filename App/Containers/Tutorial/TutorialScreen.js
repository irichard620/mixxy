import React from 'react'
import { View, Dimensions, Image, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { NavigationActions, SafeAreaView } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient';
import getStylesheet from 'App/Theme/ApplicationStyles'
import TopHeader from '../../Components/TopHeader'
import getTutorialStylesheet from './TutorialScreenStyle'
import ButtonLarge from '../../Components/ButtonLarge'
import NavigationService from '../../Services/NavigationService'
import TutorialHome from './TutorialHome'
import Colors from '../../Theme/Colors'


class TutorialScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: -1,
      recipe: {},
      premium: false,
      drinkAmount: 1,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const recipe = navigation.getParam('recipe', {});
    const premium = navigation.getParam('premium', false);
    this.setState({ recipe, premium });
  }

  onBackScreenClick = () => {
    const { navigation } = this.props;
    navigation.dispatch(NavigationActions.back());
  }

  onFirstButtonClick = () => {

  }

  onSecondButtonClick = () => {

  }

  render() {
    const { darkMode } = this.props;
    const { step, recipe, drinkAmount } = this.state;

    const styles = getStylesheet(darkMode)
    const tutorialStyles = getTutorialStylesheet(darkMode)

    let headerTitle = '';
    if (step >= 0 && 'recipeName' in recipe) {
      headerTitle = recipe.recipeName
    }

    // Button style
    let firstButtonTitle = 'Settings';
    let secondButtonTitle = 'Start';
    if (!('steps' in recipe)) {
      firstButtonTitle = 'Loading...';
      secondButtonTitle = 'Loading...';
    } else if (step >= 0 && step < recipe.steps.length - 1) {
      firstButtonTitle = 'Previous';
      secondButtonTitle = 'Next Step';
    } else if (step === recipe.steps.length - 1) {
      firstButtonTitle = 'Previous';
      secondButtonTitle = 'Finish';
    }
    const { width } = Dimensions.get('window');
    const buttonWidth = (width - 16 - 16 - 9) / 2;

    return (
      <View style={styles.outerContainer}>
        <SafeAreaView style={styles.outerContainer}>
          <TopHeader title={headerTitle} onClose={this.onBackScreenClick} showSeparator={false} darkMode={darkMode} />
          {step === -1 && (
            <TutorialHome recipe={recipe} darkMode={darkMode} drinkAmount={drinkAmount} />
          )}
          <View style={tutorialStyles.gradientContainer}>
            <LinearGradient
              colors={darkMode ? [Colors.backgroundColorDark, Colors.backgroundColorDarkTransparent] : [Colors.backgroundColorLight, Colors.backgroundColorLightTransparent]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
            />
          </View>
          <View style={tutorialStyles.buttonView}>
            <ButtonLarge
              onButtonClick={this.onFirstButtonClick}
              title={firstButtonTitle}
              margin={[0, 9, 0, 0]}
              buttonWidth={buttonWidth}
              textColor="#000000"
              backgroundColor="#FFFFFF"
              borderColor="#D3D3D3"
              darkMode={darkMode}
            />
            <ButtonLarge
              onButtonClick={this.onSecondButtonClick}
              title={secondButtonTitle}
              margin={[0, 0, 0, 0]}
              buttonWidth={buttonWidth}
              darkMode={darkMode}
              isPrimary
            />
          </View>
        </SafeAreaView>
      </View>
    )
  }
}

TutorialScreen.propTypes = {
  // user: PropTypes.object,
  // userIsLoading: PropTypes.bool,
  // userErrorMessage: PropTypes.string,
}

const mapStateToProps = (state) => ({
  // user: state.example.user,
  // userIsLoading: state.example.userIsLoading,
  // userErrorMessage: state.example.userErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  // fetchUser: () => dispatch(UserActions.fetchUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(TutorialScreen))
