import React from 'react'
import { View, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions, SafeAreaView } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient';
import getStylesheet from 'App/Theme/ApplicationStyles'
import TopHeader from '../../Components/TopHeader'
import getBuilderStylesheet from './BuilderScreenStyle'
import ButtonLarge from '../../Components/ButtonLarge'
import NavigationService from '../../Services/NavigationService'
import Colors from '../../Theme/Colors'
import BuilderDrinkType from './BuilderDrinkType'
import BuilderBaseSpirit from './BuilderBaseSpirit'
import BuilderServingGlass from './BuilderServingGlass'


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
      recipeType: '',
      baseSpirit: '',
      servingGlass: '',
      steps: [],
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
      // TODO: show add step modal
    }
  }

  onDrinkTypeClick = (drinkType) => {
    this.setState({
      recipeType: drinkType
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

  render() {
    const { darkMode } = this.props;
    const { step, recipeName, recipeType, baseSpirit, servingGlass } = this.state;

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
      (step === 0 && recipeType === '')
      || (step === 1 && baseSpirit === '')
    )

    return (
      <View style={styles.outerContainer}>
        <SafeAreaView style={styles.outerContainer}>
          <TopHeader title={headerTitle} onClose={this.onBackScreenClick} showSeparator={false} darkMode={darkMode} />
          {step === 0 && (
            <BuilderDrinkType darkMode={darkMode} onCardClick={this.onDrinkTypeClick} selectedDrinkType={recipeType} />
          )}
          {step === 1 && (
            <BuilderBaseSpirit darkMode={darkMode} onClick={this.onBaseSpiritClick} selectedBaseSpirit={baseSpirit} />
          )}
          {step === 2 && (
            <BuilderServingGlass darkMode={darkMode} onCardClick={this.onServingGlassClick} selectedServingGlass={servingGlass} />
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
