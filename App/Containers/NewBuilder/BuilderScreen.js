import React from 'react'
import { View, Dimensions, Alert, LayoutAnimation } from 'react-native'
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
import * as recipeModel from '../../Storage/Recipe'
import BottomBar from '../../Components/BottomBar'

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
      cursorLocation: -1,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const recipe = navigation.getParam('recipe', {});
    if (Object.keys(recipe).length !== 0) {
      // add ingredient descriptions back into step titles
      this.setState({
        step: 2,
        recipeId: recipe.recipeId,
        recipeName: recipe.recipeName,
        recipeDescription: recipe.recipeDescription,
        favorited: recipe.favorited,
        drinkType: recipe.recipeType,
        baseSpirit: recipe.baseSpirit,
        servingGlass: recipe.servingGlass,
        steps: recipe.steps,
        ingredients: recipe.ingredients,
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
      LayoutAnimation.configureNext(constants.CustomLayoutEaseIn);
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
        step: step - 1,
        isEditMode: false,
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

  validateIngredients = () => {
    const { ingredients } = this.state
    for (let i = 0; i < ingredients.length; i++) {
      const currentIngredient = ingredients[i]
      if (
        currentIngredient.title === ''
      ) {
        Alert.alert(
          'Ingredients Error',
          'One or more of your ingredients is missing a name.',
          [
            {
              text: 'OK'
            },
          ],
        );
        return false
      }
    }
    return true
  }

  validateSteps = () => {
    const { steps } = this.state
    for (let i = 0; i < steps.length; i++) {
      const currentStep = steps[i]
      if (currentStep.title === '') {
        Alert.alert(
          'Recipe Error',
          "You can't save a recipe with a blank step.",
          [
            {
              text: 'OK'
            },
          ],
        );
        return false
      }
    }
    return true
  }

  onButtonClick = () => {
    const { persistRecipe } = this.props
    const { step, recipeId, recipeName, recipeDescription, drinkType, baseSpirit, servingGlass, steps, ingredients, favorited } = this.state;
    // Check step
    if (step !== 2) {
      if (step === 1) {
        // Validate ingredients
        const valid = this.validateIngredients()
        if (!valid) {
          return
        }
      }
      this.setState({
        step: step + 1
      })
    } else {
      const valid = this.validateSteps()
      if (!valid) {
        return
      }
      // Save recipe here
      const newRecipe = recipeModel.Recipe({
        recipeId: recipeId,
        recipeName: recipeName,
        recipeDescription: recipeDescription,
        recipeType: drinkType,
        baseSpirit: baseSpirit,
        servingGlass: servingGlass,
        totalOunces: 0,
        steps: steps,
        ingredients: ingredients,
        favorited: favorited,
      })
      newRecipe.totalOunces = recipeModel.getTotalOuncesForRecipe(newRecipe)
      persistRecipe(newRecipe)
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
        drinkType: constants.drinkTypeRaw[item],
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
        servingGlass: constants.servingGlassRaw[item],
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
        modalType: '',
        modalIdx: -1,
      });
    }
  };

  onModalPressItem = (item, idx) => {
    const { modalType } = this.state
    if (modalType === constants.MODAL_BUILDER_NAV) {
      let step = item === constants.BUILDER_MENU_BASIC_DETAILS ? 0 : 1
      this.setState({
        step: step,
        visibleModal: false,
        modalType: '',
        isEditMode: false,
      })
    }
  }

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

  onChangeStepText = (text, idx) => {
    const { steps } = this.state
    this.setState({
      steps: update(steps, {
        [idx]: {
          title: {
            $set: text
          },
        }
      }),
    });
  }

  onDeleteStepPress = (idx) => {
    const { steps } = this.state
    Alert.alert('Delete step', `Would you like to delete step ${idx + 1}?`, [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          // make a separate copy of the array
          const array = [...steps];
          // Find index
          if (idx !== -1) {
            array.splice(idx, 1);
            this.setState({
              steps: array,
            });
          }
        },
      },
    ])
  }

  onMorePress = () => {
    this.setState({
      visibleModal: true,
      modalType: constants.MODAL_BUILDER_NAV,
    })
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
      (step === 0 && (recipeName === '' || drinkType === '' || (drinkType === constants.DRINK_TYPE_COCKTAIL && baseSpirit === '') || servingGlass === ''))
      || (step === 1 && ingredients.length === 0)
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
    if ((step === 1 && isEditMode)) {
      rightButtonTitle = 'Done'
    } else if ((step === 1 && !isEditMode)) {
      rightButtonTitle = 'Edit'
    }

    return (
      <View style={styles.outerContainer}>
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
            onChangeText={this.onChangeStepText}
            onDeletePress={this.onDeleteStepPress}
            onMorePress={this.onMorePress}
            onDragEnd={(data) => this.setState({ steps: data })}
          />
        )}
        <BottomBar buttonTitle={buttonTitle} disabled={buttonDisabled} darkMode={darkMode} onButtonClick={this.onButtonClick} />
        <BuilderModal
          visibleModal={visibleModal}
          modalType={modalType}
          modalIdx={modalIdx}
          drinkType={drinkType}
          baseSpirit={baseSpirit}
          servingGlass={servingGlass}
          onCloseClick={this.onModalCloseClick}
          onModalSave={this.onModalSave}
          onPressItem={this.onModalPressItem}
          darkMode={darkMode}
          amount={amount}
          fractionalAmount={fractionalAmount}
          amountType={amountType}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  persistRecipeIsLoading: state.recipes.persistRecipeIsLoading,
  persistRecipeErrorMessage: state.recipes.persistRecipeErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  persistRecipe: (recipeToSave) => dispatch(RecipeActions.persistRecipe(recipeToSave, false, true)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(BuilderScreen))
