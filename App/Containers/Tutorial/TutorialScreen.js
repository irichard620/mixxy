import React from 'react'
import { View, Dimensions, Alert } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions, SafeAreaView } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient';
import getStylesheet from '../../Theme/ApplicationStyles'
import TopHeader from '../../Components/TopHeader'
import getTutorialStylesheet from './TutorialScreenStyle'
import ButtonLarge from '../../Components/ButtonLarge'
import NavigationService from '../../Services/NavigationService'
import TutorialHome from './TutorialHome'
import Colors from '../../Theme/Colors'
import TutorialSteps from './TutorialSteps'
import { PropTypes } from 'prop-types'
import RecipeActions from '../../Stores/Recipe/Actions'


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

  componentDidUpdate(prevProps) {
    if (prevProps.persistRecipeIsLoading && !this.props.persistRecipeIsLoading) {
      if (this.props.persistRecipeErrorMessage) {
        Alert.alert(
          'Error saving recipe',
          `${this.props.persistRecipeErrorMessage}`,
          [
            {
              text: 'OK'
            },
          ],
        );
      }
    }
  }

  onBackScreenClick = () => {
    const { navigation } = this.props;
    navigation.dispatch(NavigationActions.back());
  }

  onFirstButtonClick = () => {
    const { step } = this.state;
    // Check step
    if (step !== -1) {
      this.setState({
        step: step - 1
      })
    }
  }

  onSecondButtonClick = () => {
    const { step, recipe } = this.state;
    // Check step
    if (step !== recipe.steps.length - 1) {
      this.setState({
        step: step + 1
      })
    } else {
      this.onBackScreenClick();
    }
  }

  onSaveClick = () => {
    // Call persist recipe
    const { recipe } = this.state
    this.props.persistRecipe(recipe)
  }

  render() {
    const { darkMode, recipes } = this.props;
    const { step, recipe, drinkAmount } = this.state;

    const styles = getStylesheet(darkMode)
    const tutorialStyles = getTutorialStylesheet(darkMode)

    let headerTitle = '';
    if (step >= 0 && 'recipeName' in recipe) {
      headerTitle = recipe.recipeName
    }

    // Is it in our library?
    let recipeSaved = false
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].recipeId === recipe.recipeId) {
        recipeSaved = true
      }
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
    const fullButtonWidth = (width - 32)

    return (
      <View style={styles.outerContainer}>
        <SafeAreaView style={styles.outerContainer}>
          <TopHeader title={headerTitle} onClose={this.onBackScreenClick} showSeparator={false} darkMode={darkMode} />
          {step === -1 && (
            <TutorialHome recipe={recipe} darkMode={darkMode} drinkAmount={drinkAmount} />
          )}
          {step !== -1 && (
            <TutorialSteps recipe={recipe} step={step} darkMode={darkMode} />
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
            {recipeSaved && <ButtonLarge
              onButtonClick={this.onFirstButtonClick}
              title={firstButtonTitle}
              margin={[0, 9, 0, 0]}
              buttonWidth={buttonWidth}
              textColor="#000000"
              backgroundColor="#FFFFFF"
              borderColor="#D3D3D3"
              darkMode={darkMode}
            />}
            {recipeSaved && <ButtonLarge
              onButtonClick={this.onSecondButtonClick}
              title={secondButtonTitle}
              margin={[0, 0, 0, 0]}
              buttonWidth={buttonWidth}
              darkMode={darkMode}
              isPrimary
            />}
            {!recipeSaved && <ButtonLarge
              onButtonClick={this.onSaveClick}
              title={'Add to Library'}
              margin={[0, 0, 0, 0]}
              buttonWidth={fullButtonWidth}
              darkMode={darkMode}
              isPrimary
            />}
          </View>
        </SafeAreaView>
      </View>
    )
  }
}

TutorialScreen.propTypes = {
  recipes: PropTypes.array,
}

const mapStateToProps = (state) => ({
  recipes: state.recipes.recipes,
  persistRecipeIsLoading: state.recipes.persistRecipeIsLoading,
  persistRecipeErrorMessage: state.recipes.persistRecipeErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  persistRecipe: (recipeToSave) => dispatch(RecipeActions.persistRecipe(recipeToSave)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(TutorialScreen))
