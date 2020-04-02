
import React, { Component } from 'react';
import {
  View, Image, Text, ScrollView, TouchableWithoutFeedback,
} from 'react-native'
import Images from '../../Theme/Images'
import getTutorialStylesheet from './TutorialScreenStyle'
import getStylesheet from '../../Theme/ApplicationStyles'
import TutorialHomeMenuButtons from './TutorialHomeMenuButtons'
import * as constants from '../../Config/constants';
import * as ingredientModel from '../../Storage/Ingredient';
import ListItem from '../../Components/ListItem'

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
    const { drinkAmount } = this.props
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
            title: ingredientModel.getIngredientAmount(ingredient, drinkAmount),
            subtitle: ingredient.title,
          })
        }
      }
    }
    return options;
  }

  getEquipment = (recipe) => {
    if (!recipe || !('steps' in recipe)) {
      return [];
    }
    const equipment = new Set();
    for (let i = 0; i < recipe.steps.length; i++) {
      const step = recipe.steps[i];
      if (step.title === constants.STEP_ADD_INGREDIENTS) {
        equipment.add({
          title: step.vessel
        });
      } else if (step.title === constants.STEP_STRAIN) {
        equipment.add({
          title: step.vessel
        });
      }
    }
    equipment.add({
      title: recipe.servingGlass
    });
    return Array.from(equipment);
  }

  render() {
    const { selected } = this.state;
    const { recipe, darkMode, drinkAmount, reduceDrinkQuantity, increaseDrinkQuantity } = this.props;
    const styles = getStylesheet(darkMode)
    const tutorialStyles = getTutorialStylesheet(darkMode)

    const isDescription = 'recipeDescription' in recipe && recipe.recipeDescription !== ''
    const isIngredients = (selected === 1 && isDescription) || (selected === 0 && !isDescription);
    const isEquipment = (selected === 1 && !isDescription) || (selected === 2 && isDescription);

    const options = this.getIngredients(recipe)
    const equipmentOptions = this.getEquipment(recipe)

    let qtyNegativeSource = ''
    if (drinkAmount > 1) {
      qtyNegativeSource = Images.quantityMinus
    } else {
      qtyNegativeSource = darkMode ? Images.quantityMinusInactiveDark : Images.quantityMinusInactiveLight
    }

    // Total recipe amount
    const totalRecipeOunces = Math.round(recipe.totalOunces * drinkAmount * 10) / 10

    return (
      <ScrollView style={tutorialStyles.scrollView}>
        <View style={tutorialStyles.iconView}>
          {this.getDrinkIcon(tutorialStyles.icon)}
        </View>
        <Text style={tutorialStyles.recipeTitle}>{recipe.recipeName}</Text>
        <View style={tutorialStyles.drinkAmountView}>
          <TouchableWithoutFeedback onPress={reduceDrinkQuantity}>
            <View style={tutorialStyles.drinkAmountCircle}>
              <Image source={qtyNegativeSource} style={tutorialStyles.drinkAmountIcon} />
            </View>
          </TouchableWithoutFeedback>
          <View style={tutorialStyles.drinkAmountCenterView}>
            <Text style={tutorialStyles.drinkAmountText}>{`${drinkAmount} drink${drinkAmount > 1 ? 's' : ''}`}</Text>
            {drinkAmount > 1 && <Text style={tutorialStyles.drinkAmountOuncesText}>{`${totalRecipeOunces} oz`}</Text>}
          </View>
          <TouchableWithoutFeedback onPress={increaseDrinkQuantity}>
            <View style={tutorialStyles.drinkAmountCircle}>
              <Image source={Images.quantityPlus} style={tutorialStyles.drinkAmountIcon} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.thickDivider} />
        <TutorialHomeMenuButtons selected={selected} darkMode={darkMode} onItemClick={this.onItemClick} isDescription={isDescription} />
        {selected === 0 && isDescription && <Text style={tutorialStyles.descriptionText}>{recipe.recipeDescription}</Text>}
        {isIngredients && options.map((option) => (
          <ListItem
            key={option.title + option.subtitle}
            title={option.title}
            subtitle={option.subtitle}
            darkMode={darkMode}
            disabled
          />
        ))}
        {isEquipment && equipmentOptions.map((equipment) => (
          <ListItem
            key={equipment.title + equipment.subtitle}
            title={equipment.title}
            subtitle={equipment.subtitle}
            darkMode={darkMode}
            disabled
          />
        ))}
        <View style={tutorialStyles.bufferView} />
      </ScrollView>
    );
  }
}

export default TutorialHome;
