import React from 'react'
import { NavigationActions, SafeAreaView } from 'react-navigation'
import getStylesheet from '../../Theme/ApplicationStyles'
import getBuilderStylesheet from '../Builder/BuilderScreenStyle'
import { Dimensions, View } from 'react-native'
import TopHeader from '../../Components/TopHeader'
import LinearGradient from "react-native-linear-gradient"
import Colors from '../../Theme/Colors'
import ButtonLarge from '../../Components/ButtonLarge'
import IngredientActions from '../../Stores/Ingredient/Actions'
import { connect } from 'react-redux'
import NavigationService from '../../Services/NavigationService'
import IngredientsVessel from './IngredientsVessel'
import IngredientsHome from './IngredientsHome'
import { PropTypes } from 'prop-types'

class IngredientsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0, // 0=vessel, 1=ingredients
      selectedIngredients: [],
      selectedVessel: '',
    }
  }

  onBackScreenClick = () => {
    const { navigation } = this.props;
    navigation.dispatch(NavigationActions.back());
  }

  onButtonClick = () => {
    const { step } = this.state;
    // Check step
    if (step === 0) {
      // Dispatch ingredients load
      this.props.fetchIngredients()
      this.setState({
        step: step + 1
      })
    } else {
      // What to do here?
    }
  }

  onIngredientVesselClick = (vessel) => {
    this.setState({
      selectedVessel: vessel
    })
  }

  onListItemClicked = (idx) => {

  }

  render() {
    const { darkMode, stepType, ingredients } = this.props;
    const { step, selectedVessel } = this.state;

    const styles = getStylesheet(darkMode)
    const builderStyles = getBuilderStylesheet(darkMode)

    const { width } = Dimensions.get('window');
    const buttonWidth = (width - 16 - 16);

    return (
      <View style={styles.outerContainer}>
        <SafeAreaView style={styles.outerContainer}>
          <TopHeader title={'Add Ingredients'} onClose={this.onBackScreenClick} showSeparator={false} darkMode={darkMode} />
          {step === 0 && (
            <IngredientsVessel darkMode={darkMode} onCardClick={this.onIngredientVesselClick} selectedVessel={selectedVessel} />
          )}
          {step === 1 && (
            <IngredientsHome darkMode={darkMode} options={ingredients} onClick={this.onListItemClicked} />
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
              title={'Add Ingredients'}
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
