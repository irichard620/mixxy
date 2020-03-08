import React from 'react'
import { View, Dimensions, Alert, Keyboard } from 'react-native'
import { connect } from 'react-redux'
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
      modalText: ''
    };
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

  onModalPressItem = (item) => {
    const { steps } = this.state;
    // Open modal if necessary or add step to screen
    if (item === constants.STEP_STIR) {
      // These require text inputs - open up modal
      this.setState({ visibleModal: true, modalType: item });
    } else if (item === constants.STEP_ADD_INGREDIENTS) {
      this.onModalCloseClick()
      NavigationService.navigate('IngredientsScreen')
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

  onModalChangeText = (text) => {
    this.setState({
      modalText: text
    });
  };

  onModalSave = (item) => {
    const {
      modalType, modalText, steps, drinkType
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

  }

  onStepPressDelete = (stepIdx) => {
    const { steps, selectedStep } = this.state;
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

    return (
      <View style={styles.outerContainer}>
        <SafeAreaView style={styles.outerContainer}>
          <TopHeader title={headerTitle} onClose={this.onBackScreenClick} showSeparator={false} darkMode={darkMode} />
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
)(NavigationService.screenWithDarkMode(BuilderScreen))
