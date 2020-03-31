import React from 'react'
import { NavigationActions, SafeAreaView } from 'react-navigation'
import getStylesheet from '../../Theme/ApplicationStyles'
import { Alert, Dimensions, Keyboard, ScrollView, View } from 'react-native'
import TopHeader from '../../Components/TopHeader'
import ButtonLarge from '../../Components/ButtonLarge'
import IngredientActions from '../../Stores/Ingredient/Actions'
import { connect } from 'react-redux'
import NavigationService from '../../Services/NavigationService'
import IngredientsVessel from './IngredientsVessel'
import IngredientsHome from './IngredientsHome'
import IngredientSelect from './IngredientSelect'
import { PropTypes } from 'prop-types'
import getIngredientsStylesheet from './IngredientsScreenStyle'
import * as ingredientModel from '../../Storage/Ingredient'
import SelectedItem from '../../Components/SelectedItem'
import * as constants from '../../Config/constants'
import ModalContentBottom from '../../Components/ModalContentBottom'
import CustomModal from '../../Components/CustomModal'
import LinearGradient from "react-native-linear-gradient"
import Colors from '../../Theme/Colors'

class IngredientsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0, // 0=vessel, 1=ingredients
      selectedIngredients: [],
      selectedIngredient: {},
      selectedVessel: '',
      // Ingredient select
      wholeAmount: '0',
      fractionAmount: '0',
      amountType: 'Ounces',
      brand: '',
      // Modal for custom
      visibleModal: false,
      modalText: '',
    }
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    // Handle step passed in
    let selectedVessel = ''
    let selectedIngredients = []
    if (Object.keys(params.step).length > 0) {
      const passedStep = params.step
      selectedVessel = passedStep.vessel
      selectedIngredients = passedStep.ingredients
    }

    // Fetch ingredients if needed
    if (this.isServingGlassStep(params.stepType)) {
      this.props.fetchIngredients()
    }

    // Get step to set
    let stepToUse = 0
    if (this.useExistingIngredients(params.stepType) || this.isServingGlassStep(params.stepType)) {
      stepToUse = 1
    }

    this.setState({
      step: stepToUse,
      selectedVessel: selectedVessel,
      selectedIngredients: selectedIngredients,
    })
  }

  isServingGlassStep = (stepType) => {
    return stepType === constants.STEP_RIM_GLASS || stepType === constants.STEP_GARNISH
  }

  useExistingIngredients = (stepType) => {
    return stepType === constants.STEP_REMOVE_INGREDIENTS
      || stepType === constants.STEP_MUDDLE
  }

  onBackScreenClick = () => {
    const { navigation } = this.props;
    const { step } = this.state
    if (step === 2) {
      this.setState({
        step: 1,
        wholeAmount: '0',
        fractionAmount: '0',
        amountType: 'Ounces',
        brand: '',
      })
    } else {
      navigation.dispatch(NavigationActions.back());
    }
  }

  onButtonClick = () => {
    const { params } = this.props.navigation.state;
    const { step, selectedIngredient, selectedIngredients, wholeAmount, fractionAmount, amountType, brand, selectedVessel } = this.state;
    // Check step
    if (step === 0) {
      if (params.stepType === constants.STEP_STRAIN) {
        params.ingredientSaveCallback(params.stepType, selectedVessel, selectedIngredients, params.stepIdx)
        this.onBackScreenClick()
      } else {
        // Dispatch ingredients load
        this.props.fetchIngredients()
        this.setState({
          step: step + 1
        })
      }
    } else if (step === 1) {
      params.ingredientSaveCallback(params.stepType, selectedVessel, selectedIngredients, params.stepIdx)
      this.onBackScreenClick()
    } else {
      // Add to list of selected ingredients - saved item
      const newIngredient = ingredientModel.Ingredient({
        amount: wholeAmount,
        fractionalAmount: fractionAmount,
        amountType: amountType,
        brand: brand,
        title: selectedIngredient.title,
        ingredientId: selectedIngredient.ingredientId,
      })
      selectedIngredients.push(newIngredient)
      this.setState({
        step: 1,
        selectedIngredients: selectedIngredients,
        wholeAmount: '0',
        fractionAmount: '0',
        amountType: 'Ounces',
        brand: '',
      })
    }
  }

  onIngredientVesselClick = (vessel) => {
    this.setState({
      selectedVessel: vessel
    })
  }

  onListItemClicked = (ingredient) => {
    const { params } = this.props.navigation.state
    const { selectedIngredients } = this.state
    if (this.useExistingIngredients(params.stepType)) {
      selectedIngredients.push(ingredient)
      this.setState({
        selectedIngredients: selectedIngredients,
      })
    } else if (this.isServingGlassStep(params.stepType)) {
      if (ingredient.title === constants.ADD_CUSTOM_INGREDIENT && ingredient.ingredientId === '') {
        this.setState({
          visibleModal: true
        })
      } else {
        const newIngredient = ingredientModel.Ingredient({
          title: ingredient.title,
          ingredientId: ingredient.ingredientId,
        })
        selectedIngredients.push(newIngredient)
        this.setState({
          selectedIngredients: selectedIngredients,
        })
      }
    } else {
      if (ingredient.title === constants.ADD_CUSTOM_INGREDIENT && ingredient.ingredientId === '') {
        this.setState({
          visibleModal: true
        })
      } else {
        this.setState({
          selectedIngredient: ingredient,
          step: 2,
        })
      }
    }
  }

  onPickerUpdate = (item, type) => {
    if (type === 0) {
      this.setState({ wholeAmount: item })
    } else if (type === 1) {
      this.setState({ fractionAmount: item })
    } else {
      this.setState({ amountType: item })
    }
  }

  onBrandUpdate = (text) => {
    this.setState({ brand: text })
  }

  onSelectedIngredientClick = (index) => {
    const { selectedIngredients } = this.state;
    // make a separate copy of the array
    const array = [...selectedIngredients];
    // Find index
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({
        selectedIngredients: array,
      });
    }
  }

  onModalTextChange = (text) => {
    this.setState({
      modalText: text
    })
  }

  onModalCloseClick = () => {
    // Close and clear modal
    this.setState({
      visibleModal: false,
      modalText: '',
    });
  }

  onModalSave = () => {
    const { params } = this.props.navigation.state
    const { modalText, selectedIngredients } = this.state
    if (modalText === '') {
      Alert.alert('No ingredient name', 'Must specify name for custom ingredient.', [
        {
          text: 'OK',
        },
      ])
      return
    }

    // Dismiss keyboard for modal
    Keyboard.dismiss();

    if (this.isServingGlassStep(params.stepType)) {
      // Add to selected ingredients immediately
      const newIngredient = ingredientModel.Ingredient({
        title: modalText,
        ingredientId: '',
      })
      selectedIngredients.push(newIngredient)
      this.setState({
        visibleModal: false,
        modalText: '',
        selectedIngredients: selectedIngredients,
      })
    } else {
      this.setState({
        selectedIngredient: {
          title: modalText,
          description: '',
          classification: '',
          ingredientId: '',
        },
        visibleModal: false,
        modalText: '',
        step: 2,
      })
    }
  }

  render() {
    const { params } = this.props.navigation.state;
    const { darkMode, ingredients } = this.props;
    const { step, selectedVessel, selectedIngredient, selectedIngredients, wholeAmount, fractionAmount, brand, amountType, visibleModal } = this.state;

    const styles = getStylesheet(darkMode)
    const ingredientStyles = getIngredientsStylesheet(darkMode)

    const { width } = Dimensions.get('window');
    const buttonWidth = (width - 16 - 16);

    const headerText = step !== 2 ? params.stepType : ''
    const buttonText = step !== 2 ? params.stepType : 'Add Ingredient'

    let ingredientsToUse = ingredients
    if (this.useExistingIngredients(params.stepType)) {
      ingredientsToUse = params.recipeIngredients
    }

    return (
      <SafeAreaView style={styles.outerContainer}>
        <TopHeader title={headerText} onClose={this.onBackScreenClick} showSeparator={false} darkMode={darkMode} useArrow={step === 2} />
        {step === 0 && (
          <IngredientsVessel darkMode={darkMode} onCardClick={this.onIngredientVesselClick} selectedVessel={selectedVessel} />
        )}
        {step === 1 && (
          <IngredientsHome
            useExisting={this.useExistingIngredients(params.stepType)}
            darkMode={darkMode}
            options={ingredientsToUse}
            onClick={this.onListItemClicked}
          />
        )}
        {step === 2 && (
          <IngredientSelect
            darkMode={darkMode}
            ingredient={selectedIngredient}
            onBrandUpdate={this.onBrandUpdate}
            onPickerUpdate={this.onPickerUpdate}
            wholeAmount={wholeAmount}
            fractionAmount={fractionAmount}
            amountType={amountType}
            brand={brand}
          />
        )}
        <View style={ingredientStyles.gradientContainer}>
          <LinearGradient
            colors={darkMode ? [Colors.backgroundColorDark, Colors.backgroundColorDarkTransparent] : [Colors.backgroundColorLight, Colors.backgroundColorLightTransparent]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
          />
        </View>
        {step === 1 && selectedIngredients.length > 0 && (
          <ScrollView
            horizontal={true}
            style={ingredientStyles.horizontalScroll}
          >
            {selectedIngredients.map((ingredient, index) => (
              <SelectedItem key={`selected${index}`} title={ingredient.title} darkMode={darkMode} onClick={() => this.onSelectedIngredientClick(index)} />
            ))}
          </ScrollView>
        )}
        <View style={ingredientStyles.buttonView}>
          <ButtonLarge
            onButtonClick={this.onButtonClick}
            title={buttonText}
            margin={[0, 16, 0, 16]}
            buttonWidth={buttonWidth}
            isPrimary
            disabled={false}
            darkMode={darkMode}
          />
        </View>
        <CustomModal
          visibleModal={visibleModal}
          onCloseClick={this.onModalCloseClick}
          type={constants.MODAL_TYPE_BOTTOM}
        >
          <ModalContentBottom
            title={constants.ADD_CUSTOM_INGREDIENT}
            textPlaceholder={'What is name of ingredient?'}
            onChangeText={this.onModalTextChange}
            onModalSave={this.onModalSave}
            darkMode={darkMode}
            charLimit={100}
            hasSave
          />
        </CustomModal>
      </SafeAreaView>
    )
  }
}

IngredientsScreen.propTypes = {
  fetchIngredients: PropTypes.func,
}

const mapStateToProps = (state) => ({
  ingredients: state.ingredients.ingredients,
  ingredientsIsLoading: state.ingredients.ingredientsIsLoading,
  ingredientsErrorMessage: state.ingredients.ingredientsErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchIngredients: () => dispatch(IngredientActions.fetchIngredients()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(IngredientsScreen))
