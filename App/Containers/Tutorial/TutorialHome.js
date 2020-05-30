
import React, { Component } from 'react';
import {
  View, Image, Text, ScrollView, TouchableWithoutFeedback, FlatList,
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
    const { recipe } = this.props
    if (recipe.servingGlass === constants.SERVING_GLASS_PITCHER) {
      return (<Image style={iconStyle} source={Images.glassPitcher} />)
    } if (recipe.servingGlass === constants.SERVING_GLASS_SHOT) {
      return (<Image style={iconStyle} source={Images.glassShot} />)
    } if (recipe.servingGlass === constants.SERVING_GLASS_MARGARITA) {
      return (<Image style={iconStyle} source={Images.glassMarg} />)
    } if (recipe.servingGlass === constants.SERVING_GLASS_FLUTE) {
      return (<Image style={iconStyle} source={Images.glassFlute} />)
    } if (recipe.servingGlass === constants.SERVING_GLASS_TALL) {
      return (<Image style={iconStyle} source={Images.glassTall} />)
    } if (recipe.servingGlass === constants.SERVING_GLASS_COCKTAIL) {
      return (<Image style={iconStyle} source={Images.glassMartini} />)
    }
    return (<Image style={iconStyle} source={Images.glassShort} />)
  }

  onItemClick = (index) => {
    this.setState({
      selected: index,
    });
  };

  getIngredients = (recipe) => {
    const { drinkAmount } = this.props
    if (!recipe || !('ingredients' in recipe)) {
      return [];
    }
    const options = [];
    for (let i = 0; i < recipe.ingredients.length; i++) {
      const ingredient = recipe.ingredients[i];
      options.push({
        title: ingredientModel.getIngredientAmount(ingredient, drinkAmount),
        subtitle: ingredient.title,
      })
    }
    return options;
  }

  render() {
    const { selected } = this.state;
    const { recipe, darkMode, drinkAmount, reduceDrinkQuantity, increaseDrinkQuantity, recipeSaved } = this.props;
    const styles = getStylesheet(darkMode)
    const tutorialStyles = getTutorialStylesheet(darkMode)

    const isDescription = 'recipeDescription' in recipe && recipe.recipeDescription !== ''
    const isIngredients = (selected === 1 && isDescription) || (selected === 0 && !isDescription);

    const options = this.getIngredients(recipe)

    let qtyNegativeSource = ''
    if (drinkAmount > 1) {
      qtyNegativeSource = Images.quantityMinus
    } else {
      qtyNegativeSource = darkMode ? Images.quantityMinusInactiveDark : Images.quantityMinusInactiveLight
    }
    let qtyPositiveSource = ''
    if (drinkAmount < 10) {
      qtyPositiveSource = Images.quantityPlus
    } else {
      qtyPositiveSource = darkMode ? Images.quantityPlusInactiveDark : Images.quantityPlusInactiveLight
    }

    // Total recipe amount
    const totalRecipeOunces = Math.round(recipe.totalOunces * drinkAmount * 10) / 10

    const dividerStyle = {
      marginTop: -16.5,
      marginBottom: 16,
    }

    return (
      <ScrollView style={tutorialStyles.scrollView} stickyHeaderIndices={[5]}>
        <View style={tutorialStyles.iconView}>
          {this.getDrinkIcon(tutorialStyles.icon)}
        </View>
        <Text style={tutorialStyles.recipeTitle}>{recipe.recipeName}</Text>
        {recipeSaved && <View style={tutorialStyles.drinkAmountView}>
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
              <Image source={qtyPositiveSource} style={tutorialStyles.drinkAmountIcon} />
            </View>
          </TouchableWithoutFeedback>
        </View>}
        <View style={styles.thickDivider} />
        <View style={tutorialStyles.menuButtonSeparator} />
        <TutorialHomeMenuButtons selected={selected} darkMode={darkMode} onItemClick={this.onItemClick} isDescription={isDescription} />
        <View style={[styles.divider, dividerStyle]} />
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
        <View style={tutorialStyles.bufferView} />
      </ScrollView>
    );
  }
}

export default TutorialHome;
