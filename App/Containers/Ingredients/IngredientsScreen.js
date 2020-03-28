import React from 'react'
import { NavigationActions, SafeAreaView } from 'react-navigation'
import getStylesheet from '../../Theme/ApplicationStyles'
import { Dimensions, ScrollView, View } from 'react-native'
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
        ingredientId: selectedIngredient.ingredient_id,
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
      const newIngredient = ingredientModel.Ingredient({
        title: ingredient.title,
        ingredientId: ingredient.ingredient_id,
      })
      selectedIngredients.push(newIngredient)
      this.setState({
        selectedIngredients: selectedIngredients,
      })
    } else {
      this.setState({
        selectedIngredient: ingredient,
        step: 2,
      })
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

  render() {
    const { params } = this.props.navigation.state;
    const { darkMode, ingredients } = this.props;
    const { step, selectedVessel, selectedIngredient, selectedIngredients, wholeAmount, fractionAmount, brand, amountType } = this.state;

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
      <View style={styles.outerContainer}>
        <SafeAreaView style={styles.outerContainer}>
          <TopHeader title={headerText} onClose={this.onBackScreenClick} showSeparator={false} darkMode={darkMode} useArrow={step === 2} />
          {step === 0 && (
            <IngredientsVessel darkMode={darkMode} onCardClick={this.onIngredientVesselClick} selectedVessel={selectedVessel} />
          )}
          {step === 1 && (
            <IngredientsHome darkMode={darkMode} options={ingredientsToUse} onClick={this.onListItemClicked} />
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
          {step === 1 && selectedIngredients.length > 0 && (
            <ScrollView
              horizontal={true}
              style={ingredientStyles.horizontalScroll}
            >
              {selectedIngredients.map((ingredient, index) => (
                <SelectedItem title={ingredient.title} darkMode={darkMode} onClick={() => this.onSelectedIngredientClick(index)} />
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
        </SafeAreaView>
      </View>
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
