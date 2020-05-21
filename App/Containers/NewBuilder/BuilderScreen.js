import React from 'react'
import { View, Dimensions, Alert, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import update from 'immutability-helper';
import { NavigationActions, SafeAreaView } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient';
import getStylesheet from '../../Theme/ApplicationStyles'
import TopHeader from '../../Components/TopHeader'
import getBuilderStylesheet from './BuilderStyles'
import ButtonLarge from '../../Components/ButtonLarge'
import NavigationService from '../../Services/NavigationService'
import Colors from '../../Theme/Colors'
import * as constants from '../../Config/constants'
import RecipeActions from '../../Stores/Recipe/Actions'
import BuilderBasicDetails from './BuilderBasicDetails'
import BuilderModal from './BuilderModal'
import BuilderIngredients from './BuilderIngredients'
import * as ingredientModel from '../../Storage/Ingredient'
import * as stepModel from '../../Storage/Step'
import BuilderSteps from './BuilderSteps'

class BuilderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0, // 0=basic details, 1=ingredients, 2=steps
      // Recipe stuff
      recipeId: '',
      recipeName: '',
      recipeDescription: '',
      favorited: false,
      drinkType: '',
      baseSpirit: '',
      servingGlass: '',
      steps: [],
      selectedStep: -1,
      ingredients: [],
      visibleModal: false,
      modalType: '',
      modalIdx: -1,
      isEditMode: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const recipe = navigation.getParam('recipe', {});
    if (Object.keys(recipe).length !== 0) {
      this.setState({
        step: 3,
        recipeId: recipe.recipeId,
        recipeName: recipe.recipeName,
        recipeDescription: recipe.recipeDescription,
        favorited: recipe.favorited,
        drinkType: recipe.recipeType,
        baseSpirit: recipe.baseSpirit,
        servingGlass: recipe.servingGlass,
        steps: recipe.steps,
      });
    }
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
      } else {
        this.dismissNavScreen()
      }
    }
  }

  dismissNavScreen = () => {
    const { navigation } = this.props;
    navigation.dispatch(NavigationActions.back());
  }

  onRightButtonPress = () => {
    const { step, isEditMode } = this.state
    if (step === 1) {
      // Show delete buttons for ingredients
      this.setState({
        isEditMode: !isEditMode
      })
    }
  }

  onBackScreenClick = () => {
    const { step } = this.state
    if (step === 0) {
      this.dismissNavScreen()
    } else {
      this.setState({
        step: step - 1
      })
    }
  }

  onModalCloseClick = () => {
    // Close and clear modal
    this.setState({
      visibleModal: false,
      modalType: '',
      modalIdx: -1,
    });
  };

  onButtonClick = () => {
    const { step } = this.state;
    // Check step
    if (step !== 2) {
      this.setState({
        step: step + 1
      })
    } else {
      // Save recipe here
    }
  }

  onModalSave = (item, modalIdx, amount, fractionalAmount, amountType) => {
    const {
      modalType, drinkType, ingredients
    } = this.state;

    if (modalType === constants.BUILDER_DRINK_TYPE_DETAIL) {
      // If same type, return
      if (drinkType === item) {
        return;
      }
      this.setState({
        drinkType: item,
        baseSpirit: '',
        visibleModal: false,
        modalType: ''
      });
    } else if (modalType === constants.BUILDER_BASE_SPIRIT_DETAIL) {
      // Update spirit
      this.setState({
        baseSpirit: item,
        visibleModal: false,
        modalType: ''
      });
    } else if (modalType === constants.BUILDER_SERVING_GLASS_DETAIL) {
      // Update glass
      this.setState({
        servingGlass: item,
        visibleModal: false,
        modalType: ''
      });
    } else if (modalType === constants.MODAL_INGREDIENT_UNIT) {
      // Update units for ingredient
      this.setState({
        ingredients: update(ingredients, {
          [modalIdx]: {
            amount: {
              $set: amount
            },
            fractionalAmount: {
              $set: fractionalAmount
            },
            amountType: {
              $set: amountType
            }
          }
        }),
        visibleModal: false,
        modalType: ''
      });
    }
  };

  onRecipeNameUpdate = (text) => {
    this.setState({
      recipeName: text
    })
  }

  onRecipeDescriptionUpdate = (text) => {
    this.setState({
      recipeDescription: text
    })
  }

  onDrinkTypeClick = () => {
    this.setState({
      visibleModal: true,
      modalType: constants.BUILDER_DRINK_TYPE_DETAIL
    })
  }

  onServingGlassClick = () => {
    this.setState({
      visibleModal: true,
      modalType: constants.BUILDER_SERVING_GLASS_DETAIL
    })
  }

  onBaseSpiritClick = () => {
    this.setState({
      visibleModal: true,
      modalType: constants.BUILDER_BASE_SPIRIT_DETAIL
    })
  }

  onAddIngredientClick = () => {
    const { ingredients } = this.state
    const newIngredient = ingredientModel.Ingredient({});
    this.setState({
      ingredients: [
        ...ingredients,
        newIngredient
      ],
    });
  }

  onIngredientUnitClick = (idx) => {
    this.setState({
      visibleModal: true,
      modalIdx: idx,
      modalType: constants.MODAL_INGREDIENT_UNIT
    })
  }

  onIngredientTextUpdate = (text, idx) => {
    const { ingredients } = this.state
    this.setState({
      ingredients: update(ingredients, {
        [idx]: {
          title: {
            $set: text
          },
        }
      }),
    });
  }

  onDeleteIngredientPress = (idx) => {
    const { ingredients } = this.state
    // make a separate copy of the array
    const array = [...ingredients];
    // Find index
    if (idx !== -1) {
      array.splice(idx, 1);
      this.setState({
        ingredients: array,
      });
    }
  }

  onAddStepClick = () => {
    const { steps } = this.state
    const newStep = stepModel.Step({});
    this.setState({
      steps: [
        ...steps,
        newStep
      ],
    });
  }

  render() {
    const { darkMode } = this.props;
    const { step, recipeName, recipeDescription, drinkType, baseSpirit, servingGlass, steps, ingredients, visibleModal, modalType, modalIdx, isEditMode } = this.state;

    const styles = getStylesheet(darkMode)
    const builderStyles = getBuilderStylesheet(darkMode)

    // Button style
    let buttonTitle = 'Continue';
    if (step === 2) {
      buttonTitle = 'Save Recipe';
    }
    const { width } = Dimensions.get('window');
    const buttonWidth = (width - 16 - 16);
    const buttonDisabled = (
      (step === 0 && (recipeName === '' || drinkType === ''))
      || (step === 2 && steps.length === 0)
    )

    let amount = ''
    let fractionalAmount = ''
    let amountType = ''
    if (modalIdx < ingredients.length && modalIdx >= 0) {
      amount = ingredients[modalIdx].amount
      fractionalAmount = ingredients[modalIdx].fractionalAmount
      amountType = ingredients[modalIdx].amountType
    }

    let rightButtonTitle = ''
    if (step === 1 && isEditMode) {
      rightButtonTitle = 'Done'
    } else if (step === 1 && !isEditMode) {
      rightButtonTitle = 'Edit'
    }

    return (
      <SafeAreaView style={styles.outerContainer}>
        <TopHeader
          useArrow={step !== 0}
          title={''}
          rightButtonTitle={rightButtonTitle}
          onRightButtonPress={this.onRightButtonPress}
          onClose={this.onBackScreenClick}
          showSeparator={false}
          darkMode={darkMode}
        />
        {step === 0 && (
          <BuilderBasicDetails
            darkMode={darkMode}
            recipeName={recipeName}
            recipeDescription={recipeDescription}
            drinkType={drinkType}
            baseSpirit={baseSpirit}
            servingGlass={servingGlass}
            onRecipeNameUpdate={this.onRecipeNameUpdate}
            onRecipeDescriptionUpdate={this.onRecipeDescriptionUpdate}
            onDrinkTypeClick={this.onDrinkTypeClick}
            onServingGlassClick={this.onServingGlassClick}
            onBaseSpiritClick={this.onBaseSpiritClick}
          />
        )}
        {step === 1 && (
          <BuilderIngredients
            darkMode={darkMode}
            onAddIngredientClick={this.onAddIngredientClick}
            ingredients={ingredients}
            onUnitClick={this.onIngredientUnitClick}
            onChangeText={this.onIngredientTextUpdate}
            isEditMode={isEditMode}
            onDeletePress={this.onDeleteIngredientPress}
          />
        )}
        {step === 2 && (
          <BuilderSteps
            darkMode={darkMode}
            onAddStepClick={this.onAddStepClick}
            steps={steps}
            recipeName={recipeName}
          />
        )}
        <View style={builderStyles.gradientContainer}>
          <LinearGradient
            colors={darkMode ? [Colors.backgroundColorDark, Colors.backgroundColorDarkTransparent] : [Colors.backgroundColorLight, Colors.backgroundColorLightTransparent]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
          />
        </View>
        <View style={builderStyles.buttonView}>
          <ButtonLarge
            onButtonClick={this.onButtonClick}
            title={buttonTitle}
            margin={[0, 16, 0, 16]}
            buttonWidth={buttonWidth}
            isPrimary
            disabled={buttonDisabled}
            darkMode={darkMode}
          />
        </View>
        <BuilderModal
          visibleModal={visibleModal}
          modalType={modalType}
          modalIdx={modalIdx}
          drinkType={drinkType}
          baseSpirit={baseSpirit}
          servingGlass={servingGlass}
          onCloseClick={this.onModalCloseClick}
          onModalSave={this.onModalSave}
          darkMode={darkMode}
          amount={amount}
          fractionalAmount={fractionalAmount}
          amountType={amountType}
        />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => ({
  persistRecipeIsLoading: state.recipes.persistRecipeIsLoading,
  persistRecipeErrorMessage: state.recipes.persistRecipeErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  persistRecipe: (recipeToSave) => dispatch(RecipeActions.persistRecipe(recipeToSave)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(BuilderScreen))
