import React from 'react'
import { View, Dimensions, Alert, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import update from 'immutability-helper';
import { NavigationActions, SafeAreaView } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient';
import getStylesheet from '../../Theme/ApplicationStyles'
import TopHeader from '../../Components/TopHeader'
import getBuilderStylesheet from './BuilderScreenStyle'
import ButtonLarge from '../../Components/ButtonLarge'
import NavigationService from '../../Services/NavigationService'
import Colors from '../../Theme/Colors'
import BuilderDrinkType from './BuilderDrinkType'
import BuilderBaseSpirit from './BuilderBaseSpirit'
import BuilderServingGlass from './BuilderServingGlass'
import BuilderHome from './BuilderHome'
import * as constants from '../../Config/constants'
import BuilderModal from './BuilderModal'
import * as stepModel from '../../Storage/Step';
import * as recipeModel from '../../Storage/Recipe'
import RecipeActions from '../../Stores/Recipe/Actions'

class BuilderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0, // 0=drink type, 1=base spirit, 2=serving glass
      // Recipe stuff
      recipeId: '',
      recipeName: 'New Recipe',
      recipeDescription: '',
      favorited: false,
      drinkType: '',
      baseSpirit: '',
      servingGlass: '',
      steps: [],
      selectedStep: -1,
      visibleModal: false,
      modalType: '',
      modalText: '',
      modalIdx: -1
    };
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
        this.onBackScreenClick()
      }
    }
  }

  onBackScreenClick = () => {
    const { navigation } = this.props;
    navigation.dispatch(NavigationActions.back());
  }

  onButtonClick = () => {
    const { step } = this.state;
    // Check step
    if (step !== 3) {
      this.setState({
        step: step + 1
      })
    } else {
      // Pull up add menu
      this.setState({ visibleModal: true, modalType: constants.MODAL_ADD_STEP });
    }
  }

  onDrinkTypeClick = (drinkType) => {
    this.setState({
      drinkType: drinkType
    });
  }

  onBaseSpiritClick = (baseSpirit) => {
    this.setState({
      baseSpirit: baseSpirit
    });
  }

  onServingGlassClick = (servingGlass) => {
    this.setState({
      servingGlass: servingGlass
    });
  }

  onDetailClick = (detail) => {
    // Pull up modal
    const { recipeName, recipeDescription } = this.state;
    if (detail === constants.BUILDER_RECIPE_NAME_DETAIL) {
      // Recipe edit modal with name prepopulated
      this.setState({ visibleModal: true, modalType: detail, modalText: recipeName });
    } else if (detail === constants.BUILDER_DESCRIPTION_DETAIL) {
      // Recipe edit modal with name prepopulated
      this.setState({ visibleModal: true, modalType: detail, modalText: recipeDescription });
    } else {
      // Pull up modify menu
      this.setState({ visibleModal: true, modalType: detail });
    }
  }

  onModalCloseClick = () => {
    // Close and clear modal
    this.setState({
      visibleModal: false,
      modalType: '',
      modalText: '',
    });
  };

  getIngredientsFromRecipe = () => {
    const { steps } = this.state
    const allIngredients = []
    for (let i = 0; i < steps.length; i++) {
      if (steps[i].title === constants.STEP_ADD_INGREDIENTS) {
        allIngredients.push(...steps[i].ingredients)
      }
    }
    return allIngredients
  }

  onModalPressItem = (item) => {
    const { steps } = this.state;
    // Open modal if necessary or add step to screen
    if (
      item === constants.STEP_STIR
      || item === constants.STEP_BLEND
      || item === constants.STEP_SHAKE
    ) {
      // These require text inputs - open up modal
      this.setState({ visibleModal: true, modalType: item });
    } else if (
      item === constants.STEP_ADD_INGREDIENTS
      || item === constants.STEP_REMOVE_INGREDIENTS
      || item === constants.STEP_MUDDLE
      || item === constants.STEP_STRAIN
      || item === constants.STEP_GARNISH
      || item === constants.STEP_RIM_GLASS
    ) {
      const recipeIngredients = this.getIngredientsFromRecipe()
      if (recipeIngredients.length === 0 && (item === constants.STEP_REMOVE_INGREDIENTS || item === constants.STEP_MUDDLE)) {
        Alert.alert(
          'No Ingredients Added',
          'You must add ingredients before performing this step.',
          [
            {
              text: 'OK'
            },
          ],
        );
      } else {
        this.onModalCloseClick()
        NavigationService.navigate(
          'IngredientsScreen',
          {
            ingredientSaveCallback: this.ingredientSaveCallback,
            stepType: item,
            step: {},
            stepIdx: -1,
            recipeIngredients: recipeIngredients,
          }
        )
      }
    } else {
      // Add new step
      const newStep = stepModel.Step({
        title: item,
      });
      this.setState({
        visibleModal: false,
        modalType: '',
        steps: [
          ...steps,
          newStep
        ],
      });
    }
  };

  ingredientSaveCallback = (stepType, selectedVessel, selectedIngredients, stepIdx) => {
    const { steps } = this.state;
    if (stepIdx === -1) {
      const newStep = stepModel.Step({
        title: stepType,
        ingredients: selectedIngredients,
        vessel: selectedVessel
      })
      this.setState({
        steps: [
          ...steps,
          newStep
        ],
      });
    } else {
      steps[stepIdx].vessel = selectedVessel
      steps[stepIdx].ingredients = selectedIngredients
      this.setState({
        visibleModal: false,
        modalType: '',
        modalText: '',
        modalIdx: -1,
        steps: steps,
      });
      this.setState({
        steps: [...steps],
      });
    }
  }

  onModalChangeText = (text) => {
    this.setState({
      modalText: text
    });
  };

  onModalSave = (item) => {
    const {
      modalType, modalText, steps, drinkType, modalIdx
    } = this.state;

    // Dismiss keyboard for modal
    Keyboard.dismiss();

    // If modal was for recipe name, just update that
    if (modalType === constants.BUILDER_RECIPE_NAME_DETAIL) {
      this.setState({
        recipeName: modalText,
        visibleModal: false,
        modalType: '',
        modalText: ''
      });
    } else if (modalType === constants.BUILDER_DRINK_TYPE_DETAIL) {
      // If same type, return
      if (drinkType === item) {
        return;
      }
      // If no type, update
      if (drinkType === '' || steps.length === 0) {
        this.changeDrinkType(item);
        return;
      }
      // Send alert that this resets steps
      Alert.alert(
        'Are you sure?',
        'Changing the drink type will clear all current steps.',
        [
          {
            text: 'OK',
            onPress: () => {
              this.changeDrinkType(item);
            }
          },
          {
            text: 'Cancel'
          },
        ],
      );
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
    } else if (modalType === constants.BUILDER_DESCRIPTION_DETAIL) {
      // Update description
      this.setState({
        recipeDescription: modalText,
        visibleModal: false,
        modalType: '',
        modalText: ''
      });
    } else {
      if (modalIdx === -1) {
        // Add new step and update state
        const newStep = stepModel.Step({
          title: modalType,
          properties: stepModel.getStepProperties(modalType, modalText)
        });
        const newRecipeSteps = [...steps, newStep];
        // Get new coffee/water ratio
        this.setState({
          visibleModal: false,
          modalType: '',
          modalText: '',
          modalIdx: -1,
          steps: newRecipeSteps,
        });
      } else {
        this.setState({
          visibleModal: false,
          modalType: '',
          modalText: '',
          modalIdx: -1,
          steps: update(steps, {
            [modalIdx]: {
              properties: {
                $set: stepModel.getStepProperties(modalType, modalText)
              },
            }
          }),
        });
      }
    }
  };

  changeDrinkType = (drinkType) => {
    this.setState({
      drinkType: drinkType,
      baseSpirit: '',
      servingGlass: '',
      visibleModal: false,
      modalType: '',
      steps: []
    });
  };

  onStepPressEdit = (stepIdx, title) => {
    const { steps } = this.state;
    if (stepIdx === -1) {
      return
    }
    const currentStep = steps[stepIdx];
    if (currentStep.title === constants.STEP_SHAKE || currentStep.title === constants.STEP_BLEND || currentStep.title === constants.STEP_STIR) {
      this.setState({
        visibleModal: true,
        modalType: title,
        modalIdx: stepIdx,
        modalText: stepModel.getModalTextProperty(currentStep),
      });
    } else {
      const recipeIngredients = this.getIngredientsFromRecipe()
      this.onModalCloseClick()
      NavigationService.navigate(
        'IngredientsScreen',
        {
          ingredientSaveCallback: this.ingredientSaveCallback,
          stepType: currentStep.title,
          step: currentStep,
          stepIdx: stepIdx,
          recipeIngredients: recipeIngredients,
        }
      )
    }
  }

  onStepPressDelete = (stepIdx) => {
    const { steps } = this.state;
    // make a separate copy of the array
    const array = [...steps];
    // Find index
    if (stepIdx !== -1) {
      array.splice(stepIdx, 1);
      this.setState({
        steps: array,
        selectedStep: -1,
      });
    }
  }

  swapInArray = (array, idx1, idx2) => {
    // Helper function used when we switch step up or down
    const arrayCopy = [...array];
    const temp = arrayCopy[idx2];
    arrayCopy[idx2] = arrayCopy[idx1];
    arrayCopy[idx1] = temp;
    return arrayCopy;
  };

  onStepPressUp = (stepIdx) => {
    const { steps, selectedStep } = this.state;
    // make a separate copy of the array
    let array = [...steps];
    // New selected
    let newSelected = selectedStep;
    if (selectedStep === stepIdx) {
      newSelected = selectedStep - 1
    } else if (selectedStep === stepIdx - 1) {
      newSelected = selectedStep
    }
    // Find index
    if (stepIdx !== -1) {
      array = this.swapInArray(array, stepIdx - 1, stepIdx);
      this.setState({
        steps: array,
        selectedStep: newSelected,
      });
    }
  }

  onStepPressDown = (stepIdx) => {
    const { steps, selectedStep } = this.state;
    // make a separate copy of the array
    let array = [...steps];
    // New selected
    let newSelected = selectedStep;
    if (selectedStep === stepIdx) {
      newSelected = selectedStep + 1
    } else if (selectedStep === stepIdx + 1) {
      newSelected = selectedStep
    }
    // Find index
    if (stepIdx !== -1) {
      array = this.swapInArray(array, stepIdx, stepIdx + 1);
      this.setState({
        steps: array,
        selectedStep: newSelected,
      });
    }
  }

  onStepClick = (stepIdx) => {
    const { selectedStep } = this.state
    const stepToSet = selectedStep === stepIdx ? -1 : stepIdx
    this.setState({
      selectedStep: stepToSet
    })
  }

  getDetailsList = () => {
    const {
      recipeName, drinkType, baseSpirit, servingGlass,
      recipeDescription
    } = this.state;
    const arrToUse = [];
    constants.details.forEach((detail) => {
      let detailValue = '';
      if (detail === constants.BUILDER_RECIPE_NAME_DETAIL) {
        detailValue = recipeName;
      } else if (detail === constants.BUILDER_DRINK_TYPE_DETAIL) {
        detailValue = drinkType;
      } else if (detail === constants.BUILDER_BASE_SPIRIT_DETAIL) {
        detailValue = baseSpirit;
      } else if (detail === constants.BUILDER_SERVING_GLASS_DETAIL) {
        detailValue = servingGlass;
      } else if (detail === constants.BUILDER_DESCRIPTION_DETAIL) {
        detailValue = recipeDescription;
      }
      arrToUse.push({
        title: detail,
        value: detailValue,
        disabled: false,
        showArrow: true,
      });
    });
    return arrToUse;
  };

  onRightButtonPress = () => {
    const { persistRecipe } = this.props
    const { step, recipeName, recipeDescription, drinkType, baseSpirit, servingGlass, steps } = this.state
    if (step === 2) {
      this.setState({ step: 3 })
    } else {
      if (steps.length === 0) {
        Alert.alert(
          'Error saving recipe',
          'Your recipe must have at least one step',
          [
            {
              text: 'OK'
            },
          ],
        );
      } else {
        // Save recipe
        const newRecipe = recipeModel.Recipe({
          recipeName: recipeName,
          recipeDescription: recipeDescription,
          recipeType: drinkType,
          baseSpirit: baseSpirit,
          servingGlass: servingGlass,
          totalOunces: 0,  // TODO: fix this
          steps: steps,
        })
        persistRecipe(newRecipe)
      }
    }
  }

  render() {
    const { darkMode } = this.props;
    const { step, recipeName, drinkType, baseSpirit, servingGlass, steps, selectedStep, visibleModal, modalType, modalText } = this.state;

    const styles = getStylesheet(darkMode)
    const builderStyles = getBuilderStylesheet(darkMode)

    let headerTitle = '';
    if (step !== 0) {
      headerTitle = recipeName
    }

    // Button style
    let buttonTitle = 'Continue';
    if (step === 3) {
      buttonTitle = 'Add Step';
    }
    const { width } = Dimensions.get('window');
    const buttonWidth = (width - 16 - 16);
    const buttonDisabled = (
      (step === 0 && drinkType === '')
      || (step === 1 && baseSpirit === '')
    )

    // Top right button
    let topRightTitle = '';
    if (step === 2) {
      topRightTitle = 'Skip';
    } else if (step === 3) {
      topRightTitle = 'Save';
    }
    return (
      <View style={styles.outerContainer}>
        <SafeAreaView style={styles.outerContainer}>
          <TopHeader title={headerTitle} rightButtonTitle={topRightTitle} onRightButtonPress={this.onRightButtonPress} onClose={this.onBackScreenClick} showSeparator={false} darkMode={darkMode} />
          {step === 0 && (
            <BuilderDrinkType darkMode={darkMode} onCardClick={this.onDrinkTypeClick} selectedDrinkType={drinkType} />
          )}
          {step === 1 && (
            <BuilderBaseSpirit darkMode={darkMode} onClick={this.onBaseSpiritClick} selectedBaseSpirit={baseSpirit} />
          )}
          {step === 2 && (
            <BuilderServingGlass darkMode={darkMode} onCardClick={this.onServingGlassClick} selectedServingGlass={servingGlass} />
          )}
          {step === 3 && (
            <BuilderHome
              darkMode={darkMode}
              onDetailClick={this.onDetailClick}
              details={this.getDetailsList()}
              steps={steps}
              selectedStep={selectedStep}
              onPressEdit={this.onStepPressEdit}
              onPressDelete={this.onStepPressDelete}
              onPressUp={this.onStepPressUp}
              onPressDown={this.onStepPressDown}
              onStepClick={this.onStepClick}
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
            modalText={modalText}
            drinkType={drinkType}
            baseSpirit={baseSpirit}
            servingGlass={servingGlass}
            onCloseClick={this.onModalCloseClick}
            onPressItem={this.onModalPressItem}
            onChangeText={this.onModalChangeText}
            onModalSave={this.onModalSave}
            darkMode={darkMode}
          />
        </SafeAreaView>
      </View>
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
