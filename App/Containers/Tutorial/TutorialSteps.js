import React, { Component } from 'react';
import {
  View, Image, ScrollView, Dimensions
} from 'react-native';
import Pagination from '../../Components/Pagination';
import Images from '../../Theme/Images'
import Step from './Step'
import getStylesheet from '../../Theme/ApplicationStyles'
import Colors from '../../Theme/Colors'
import * as constants from '../../Config/constants'
import getTutorialStylesheet from './TutorialScreenStyle'
import * as ingredientModel from '../../Storage/Ingredient'

class TutorialSteps extends Component {
  getIcon = (recipe, styles) => {
    if (recipe.servingGlass === constants.SERVING_GLASS_PITCHER) {
      return (<Image style={styles.icon} source={Images.glassPitcher} />)
    } if (recipe.servingGlass === constants.SERVING_GLASS_SHOT) {
      return (<Image style={styles.icon} source={Images.glassShot} />)
    } if (recipe.servingGlass === constants.SERVING_GLASS_MARGARITA) {
      return (<Image style={styles.icon} source={Images.glassMarg} />)
    } if (recipe.servingGlass === constants.SERVING_GLASS_FLUTE) {
      return (<Image style={styles.icon} source={Images.glassFlute} />)
    } if (recipe.servingGlass === constants.SERVING_GLASS_TALL) {
      return (<Image style={styles.icon} source={Images.glassTall} />)
    } if (recipe.servingGlass === constants.SERVING_GLASS_COCKTAIL) {
      return (<Image style={styles.icon} source={Images.glassMartini} />)
    }
    return (<Image style={styles.icon} source={Images.glassShort} />)
  };

  renderStep = (stepObj, idx, ingredientDict) => {
    const { step, darkMode, drinkAmount } = this.props;

    return (
      <Step
        step={stepObj}
        activeStep={(step === idx)}
        key={idx}
        darkMode={darkMode}
        drinkAmount={drinkAmount}
        ingredientDict={ingredientDict}
      />
    );
  };

  renderSteps = (styles) => {
    const { recipe, step } = this.props;
    const { steps, ingredients } = recipe;

    const stepsToUse = steps.slice(step);

    const ingredientDict = ingredientModel.createIngredientDic(ingredients)

    return (
      <View style={styles.stepContainer}>
        {stepsToUse.map((stepObj, idx) => (
          this.renderStep(stepObj, idx + step, ingredientDict)
        ))}
      </View>
    );
  };

  render() {
    const { recipe, step, darkMode } = this.props;
    const { steps } = recipe;

    const styles = getStylesheet(darkMode)
    const tutorialStyles = getTutorialStylesheet(darkMode)

    const { height, width } = Dimensions.get('window');
    const iconHeight = {
      height: height * 0.32,
    };

    const marginTopStyle = {
      marginTop: 32,
      width: width - 32
    }

    return (
      <ScrollView
        style={tutorialStyles.scrollView}
        contentContainerStyle={tutorialStyles.scrollViewContent}
        scrollEnabled={false}
      >
        <View style={[tutorialStyles.iconView, iconHeight]}>
          {this.getIcon(recipe, tutorialStyles)}
        </View>
        <Pagination
          total={steps.length}
          index={step}
          activeColor={Colors.blue1}
          darkMode={darkMode}
        />
        <View style={[styles.divider, marginTopStyle]} />
        {steps && steps.length > 0 && this.renderSteps(tutorialStyles)}
      </ScrollView>
    );
  }
}

export default TutorialSteps;
