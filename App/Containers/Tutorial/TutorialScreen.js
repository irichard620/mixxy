import React from 'react'
import { View, Dimensions } from 'react-native'
import { useDynamicStyleSheet } from 'react-native-dark-mode'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { NavigationActions, SafeAreaView } from 'react-navigation'
import DynamicStyles from 'App/Theme/ApplicationStyles'
import TopHeader from '../../Components/TopHeader'
import TutorialStyle from './TutorialScreenStyle'
import ButtonLarge from '../../Components/ButtonLarge'


class TutorialScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: -1,
      recipe: {},
      premium: false,
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
    const { step, recipe } = this.state;

    const styles = useDynamicStyleSheet(DynamicStyles)
    const tutorialStyles = useDynamicStyleSheet(TutorialStyle)

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
          <TopHeader title={headerTitle} onClose={this.onBackScreenClick} showSeparator={false} />
          <View style={tutorialStyles.buttonView}>
            <ButtonLarge
              onButtonClick={this.onFirstButtonClick}
              title={firstButtonTitle}
              margin={[0, 9, 0, 0]}
              buttonWidth={buttonWidth}
              textColor="#000000"
              backgroundColor="#FFFFFF"
              borderColor="#D3D3D3"
            />
            <ButtonLarge
              onButtonClick={this.onSecondButtonClick}
              title={secondButtonTitle}
              margin={[0, 0, 0, 0]}
              buttonWidth={buttonWidth}
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
)(TutorialScreen)
