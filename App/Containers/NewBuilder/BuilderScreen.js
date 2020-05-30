import React from 'react'
import { View, Dimensions, Alert, LayoutAnimation, Keyboard } from 'react-native'
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
      isEditModeSteps: false,
      cursorLocation: -1,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const recipe = navigation.getParam('recipe', {});
    if (Object.keys(recipe).length !== 0) {
      // add ingredient descriptions back into step titles
      const updatedSteps = this.addIngredientsToStepTitles([ ... recipe.steps ], recipe.ingredients)
      this.setState({
        step: 2,
        recipeId: recipe.recipeId,
        recipeName: recipe.recipeName,
        recipeDescription: recipe.recipeDescription,
        favorited: recipe.favorited,
        drinkType: recipe.recipeType,
        baseSpirit: recipe.baseSpirit,
        servingGlass: recipe.servingGlass,
        steps: updatedSteps,
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
    const { step, isEditMode, isEditModeSteps } = this.state
    LayoutAnimation.configureNext(constants.CustomLayoutEaseIn);
    if (step === 1) {
      // Show delete buttons for ingredients
      this.setState({
        isEditMode: !isEditMode
      })
    } else if (step === 2) {
      this.setState({
        isEditModeSteps: !isEditModeSteps
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
        isEditModeSteps: false,
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
        currentIngredient.amountType === '' || currentIngredient.title === ''
      ) {
        Alert.alert(
          'Ingredients Error',
          'One or more of your ingredients is missing a name or unit.',
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
      if (currentStep.title === '' && currentStep.startLocation === -1) {
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
    const { step, recipeId, recipeName, recipeDescription, drinkType, baseSpirit, servingGlass, steps, ingredients } = this.state;
    // Check step
    if (step !== 2) {
      if (step === 1) {
        // Validate ingredients
        const valid = this.validateIngredients()
        if (!valid) {
          return
        }
        // Refresh ingredients
        this.refreshStepIngredients()
      } else {
        this.setState({
          step: step + 1
        })
      }
    } else {
      const valid = this.validateSteps()
      if (!valid) {
        return
      }
      // Clear ingredient text out of steps before saving
      const clearedSteps = this.clearIngredientsFromStepTitles(steps)
      // Save recipe here
      const newRecipe = recipeModel.Recipe({
        recipeId: recipeId,
        recipeName: recipeName,
        recipeDescription: recipeDescription,
        recipeType: drinkType,
        baseSpirit: baseSpirit,
        servingGlass: servingGlass,
        totalOunces: 0,
        steps: clearedSteps,
        ingredients: ingredients,
      })
      newRecipe.totalOunces = recipeModel.getTotalOuncesForRecipe(newRecipe)
      persistRecipe(newRecipe)
    }
  }

  onModalSave = (item, modalIdx, amount, fractionalAmount, amountType, ingredientOptions) => {
    const {
      modalType, drinkType, ingredients, steps, cursorLocation
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
        modalType: '',
        modalIdx: -1,
      });
    } else if (modalType === constants.MODAL_SELECT_INGREDIENTS) {
      // Track an ingredients list
      const ingredientsList = []
      const ingredientDict = ingredientModel.createIngredientDic(ingredients)

      // Add ingredients to step with correct start and end indexes
      let ingredientDescription = ''
      for (let i = 0; i < ingredientOptions.length; i++) {
        if (ingredientOptions[i].selected) {
          // Get display of ingredient so we can get end index
          if (ingredientsList.length) {
            ingredientDescription += ', '
          }
          ingredientDescription += ingredientModel.getIngredientShortDescription(ingredientDict[ingredientOptions[i].ingredientId], 1, true)
          ingredientsList.push(ingredientOptions[i].ingredientId)
        }
      }

      // Sort ingredients by start
      const oldTitle = steps[modalIdx].title
      const addition = oldTitle.substring(cursorLocation).length ? '' : ' '
      const newTitle = oldTitle.substring(0, cursorLocation) + ingredientDescription + oldTitle.substring(cursorLocation) + addition
      this.setState({
        steps: update(steps, {
          [modalIdx]: {
            title: {
              $set: newTitle
            },
            ingredients: {
              $set: ingredientsList
            },
            startLocation: {
              $set: cursorLocation
            },
            endLocation: {
              $set: cursorLocation + ingredientDescription.length,
            },
          }
        }),
        visibleModal: false,
        modalType: '',
        modalIdx: -1,
      })
    }
  };

  clearIngredientsFromStepTitles = (steps) => {
    const copiedSteps = [ ...steps ]
    // Go through each step
    for (let i = 0; i < steps.length; i++) {
      const copiedStep = { ...steps[i] }
      // 1) Remove ingredient text
      if (!(copiedStep.startLocation === -1 && copiedStep.endLocation === -1)) {
        copiedStep.title =
          copiedStep.title.substring(0, copiedStep.startLocation) + copiedStep.title.substring(copiedStep.endLocation, copiedStep.title.length)
      }
      copiedSteps[i] = copiedStep
    }
    return copiedSteps
  }

  addIngredientsToStepTitles = (steps, ingredients) => {
    // Ingredient dict
    const ingredientDict = ingredientModel.createIngredientDic(ingredients)
    for (let i = 0; i < steps.length; i++) {
      const copiedStep = {  ...steps[i] }
      // Create updated ingredient description
      let ingredientDescription = ''
      for (let j = 0; j < copiedStep.ingredients.length; j++) {
        // Get display of ingredient so we can get end index
        if (j > 0) {
          ingredientDescription += ', '
        }
        ingredientDescription += ingredientModel.getIngredientShortDescription(ingredientDict[copiedStep.ingredients[j]], 1, true)
      }
      // Update variables
      const diff = ingredientDescription.length - (copiedStep.endLocation - copiedStep.startLocation)
      const addition = !copiedStep.title.substring(copiedStep.startLocation).length && ingredientDescription.length ? ' ' : ''
      copiedStep.title = copiedStep.title.substring(0, copiedStep.startLocation) + ingredientDescription + copiedStep.title.substring(copiedStep.startLocation) + addition
      copiedStep.endLocation += diff
      steps[i] = copiedStep
    }
    return steps
  }

  refreshStepIngredients = () => {
    const { steps, ingredients } = this.state
    // Clear ingredient data
    let copiedSteps = this.clearIngredientsFromStepTitles(steps)

    // Add back ingredient data
    copiedSteps = this.addIngredientsToStepTitles(copiedSteps, ingredients)
    this.setState({
      steps: copiedSteps,
      step: 2
    })
  }

  onModalPressItem = (item, idx) => {
    const { modalType } = this.state
    if (modalType === constants.MODAL_BUILDER_NAV) {
      let step = item === constants.BUILDER_MENU_BASIC_DETAILS ? 0 : 1
      this.setState({
        step: step,
        visibleModal: false,
        modalType: '',
        isEditMode: false,
        isEditModeSteps: false,
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

  onChangeStepText = (text, selection, idx) => {
    const { steps } = this.state
    const currentStep = steps[idx]
    let ingredientsToSet = [ ...currentStep.ingredients ]
    let startToSet = currentStep.startLocation
    let endToSet = currentStep.endLocation
    const diff = text.length - currentStep.title.length
    console.log(diff)
    console.log(currentStep.startLocation)
    console.log(currentStep.endLocation)
    console.log(`${selection.start} ${selection.end}`)
    // 3 cases - delete exact selection, delete plus whitespace prior, delete and replace with char
    // New case - delete last char
    if (diff < 0 && (selection.start === currentStep.startLocation && selection.end === currentStep.startLocation)) {
      if (diff === -1) {
        // Only deleted last char - need to remove from text
        text = text.substring(0, currentStep.startLocation) + text.substring(currentStep.endLocation - 1)
      }
      // Clear ingredients
      ingredientsToSet = []
      startToSet = -1
      endToSet = -1
    } else if (
      (
        diff === (currentStep.startLocation - currentStep.endLocation)
        && (selection.start === currentStep.startLocation && selection.end === currentStep.startLocation)
      )
      ||
      (
        diff === (currentStep.startLocation - currentStep.endLocation - 1)
        && (selection.start === currentStep.startLocation - 1 && selection.end === currentStep.startLocation - 1)
      )
      ||
      (
        diff === (currentStep.startLocation - currentStep.endLocation + 1)
        && (selection.start === currentStep.startLocation && selection.end === currentStep.endLocation)
      )
    ) {
      // Clear ingredients
      ingredientsToSet = []
      startToSet = -1
      endToSet = -1
    } else if (selection.start < currentStep.startLocation) {
      // Check if need to push ingredient back{
      const diff = text.length - currentStep.title.length
      startToSet += diff
      endToSet += diff
    }
    this.setState({
      steps: update(steps, {
        [idx]: {
          title: {
            $set: text
          },
          ingredients: {
            $set: ingredientsToSet
          },
          startLocation: {
            $set: startToSet
          },
          endLocation: {
            $set: endToSet
          }
        }
      }),
    });
  }

  onDeleteStepPress = (idx) => {
    const { steps } = this.state
    // make a separate copy of the array
    const array = [...steps];
    // Find index
    if (idx !== -1) {
      array.splice(idx, 1);
      this.setState({
        steps: array,
      });
    }
  }

  onAddIngredientToStep = (idx, cursor, ingredientOptions) => {
    if (ingredientOptions.length === 0) {
      Alert.alert(
        'No Ingredients',
        'Your ingredients are all used in other steps. When calling an ingredient for the second time, you can just type it in normally.',
        [
          {
            text: 'OK'
          },
        ],
      );
      return
    }
    Keyboard.dismiss()
    this.setState({
      visibleModal: true,
      modalType: constants.MODAL_SELECT_INGREDIENTS,
      modalIdx: idx,
      cursorLocation: cursor,
    })
  }

  onMorePress = () => {
    this.setState({
      visibleModal: true,
      modalType: constants.MODAL_BUILDER_NAV,
    })
  }

  getIngredientOptions = () => {
    const { steps, ingredients } = this.state

    // Compare full list of ingredients against what's already in steps
    // First, create full dictionary with all ingredients
    const ingredientDict = ingredientModel.createIngredientDic(ingredients)

    // Now, go through each step and remove used items
    for (let i = 0; i < steps.length; i++) {
      for (let j = 0; j < steps[i].ingredients.length; j++) {
        let currentIngredientId = steps[i].ingredients[j]
        if (currentIngredientId in ingredientDict) {
          delete ingredientDict[currentIngredientId]
        }
      }
    }

    // Whatever is left is our options
    const finalOptions = []
    const keys = Object.keys(ingredientDict)
    for (let i = 0; i < keys.length; i++) {
      finalOptions.push({
        ingredientId: keys[i],
        title: ingredientModel.getIngredientShortDescription(ingredientDict[keys[i]]),
        selected: false,
      })
    }
    return finalOptions
  }

  render() {
    const { darkMode } = this.props;
    const { step, recipeName, recipeDescription, drinkType, baseSpirit, servingGlass, steps, ingredients, visibleModal, modalType, modalIdx, isEditMode, isEditModeSteps } = this.state;

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
    if ((step === 1 && isEditMode) || (step === 2 && isEditModeSteps)) {
      rightButtonTitle = 'Done'
    } else if ((step === 1 && !isEditMode) || (step === 2 && !isEditModeSteps)) {
      rightButtonTitle = 'Edit'
    }

    // Ingredient options
    const ingredientOptions = this.getIngredientOptions()

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
            onChangeText={this.onChangeStepText}
            isEditMode={isEditModeSteps}
            onDeletePress={this.onDeleteStepPress}
            onMorePress={this.onMorePress}
            onAddIngredient={(idx, cursor) => this.onAddIngredientToStep(idx, cursor, ingredientOptions)}
            ingredients={ingredients}
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
          onPressItem={this.onModalPressItem}
          darkMode={darkMode}
          amount={amount}
          fractionalAmount={fractionalAmount}
          amountType={amountType}
          ingredientOptions={ingredientOptions}
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
