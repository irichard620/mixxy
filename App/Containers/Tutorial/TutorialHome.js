
import React, { Component } from 'react';
import {
  View, Image, ScrollView, Text
} from 'react-native';
import Images from '../../Theme/Images'
import getTutorialStylesheet from './TutorialScreenStyle'
import getStylesheet from '../../Theme/ApplicationStyles'
import TutorialHomeMenuButtons from './TutorialHomeMenuButtons'
import List from '../../Components/List'
import * as constants from '../../Config/constants';
import * as ingredientModel from '../../Storage/Ingredient';

class TutorialHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }

  getDrinkIcon = (iconStyle) => {
    return (<Image style={iconStyle} source={Images.logo} />);
  }

  onItemClick = (index) => {
    this.setState({
      selected: index,
    });
  };

  getIngredients = (recipe) => {
    if (!recipe || !('steps' in recipe)) {
      return [];
    }
    const options = [];
    for (let i = 0; i < recipe.steps.length; i++) {
      const step = recipe.steps[i];
      if (step.title === constants.STEP_ADD_INGREDIENTS) {
        for (let j = 0; j < step.ingredients.length; j++) {
          const ingredient = step.ingredients[j];
          options.push({
            title: ingredientModel.getIngredientAmount(ingredient),
            subtitle: ingredient.title,
          })
        }
      }
    }
    return options;
  }

  render() {
    const { selected } = this.state;
    const { recipe, darkMode, drinkAmount } = this.props;

    const styles = getStylesheet(darkMode)
    const tutorialStyles = getTutorialStylesheet(darkMode)

    const isDescription = 'recipeDescription' in recipe && recipe.recipeDescription !== ''
    const isIngredients = (selected === 1 && isDescription) || (selected === 0 && !isDescription);

    const options = this.getIngredients(recipe)

    return (
      <ScrollView style={tutorialStyles.scrollView}>
        <View style={tutorialStyles.iconView}>
          {this.getDrinkIcon(tutorialStyles.icon)}
        </View>
        <Text style={tutorialStyles.recipeTitle}>{recipe.recipeName}</Text>
        <View style={tutorialStyles.drinkAmountView}>
          <View style={tutorialStyles.drinkAmountCircle} />
          <Text style={tutorialStyles.drinkAmountText}>{drinkAmount + ' drink'}</Text>
          <View style={tutorialStyles.drinkAmountCircle} />
        </View>
        <View style={styles.thickDivider} />
        <TutorialHomeMenuButtons selected={selected} darkMode={darkMode} onItemClick={this.onItemClick} isDescription={isDescription} />
        {selected === 0 && isDescription && <Text style={tutorialStyles.descriptionText}>{recipe.recipeDescription}</Text>}
        {isIngredients && <List options={options} />}
        <View style={tutorialStyles.bufferView} />
      </ScrollView>
    );
  }
}

export default TutorialHome;
