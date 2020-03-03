
import React, { Component } from 'react';
import {
  View, Image, Text, FlatList,
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

  getHeader = () => {
    const { selected } = this.state;
    const { recipe, darkMode, drinkAmount } = this.props;
    const styles = getStylesheet(darkMode)
    const tutorialStyles = getTutorialStylesheet(darkMode)

    const isDescription = 'recipeDescription' in recipe && recipe.recipeDescription !== ''

    return (
      <React.Fragment>
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
      </React.Fragment>
    )
  }

  getFooter = () => {
    const { darkMode } = this.props;
    const tutorialStyles = getTutorialStylesheet(darkMode)
    return <View style={tutorialStyles.bufferView} />
  }

  renderItem = ({ item }) => {
    const { darkMode } = this.props;
    const tutorialStyles = getTutorialStylesheet(darkMode)
    if (!item.isDescription) {
      return (
        <ListItem
          title={item.title}
          subtitle={item.subtitle}
        />
      );
    } else {
      return <Text style={tutorialStyles.descriptionText}>{item.title}</Text>
    }
  };

  keyExtractor = item => item.title + item.subtitle;

  renderList = (options) => {
    return (
      <FlatList
        data={options}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        style={{ width: '100%' }}
        ListHeaderComponent={this.getHeader}
        ListFooterComponent={this.getFooter}
      />
    );
  }

  render() {
    const { selected } = this.state;
    const { recipe, darkMode } = this.props;

    const tutorialStyles = getTutorialStylesheet(darkMode)

    const isDescription = 'recipeDescription' in recipe && recipe.recipeDescription !== ''
    const isIngredients = (selected === 1 && isDescription) || (selected === 0 && !isDescription);
    const isEquipment = (selected === 1 && !isDescription) || (selected === 2 && isDescription);

    const options = this.getIngredients(recipe)
    const equipmentOptions = this.getEquipment(recipe)

    return (
      <View style={tutorialStyles.scrollView}>
        {selected === 0 && isDescription && this.renderList([{ "title": recipe.recipeDescription, isDescription }])}
        {isIngredients && this.renderList(options)}
        {isEquipment && this.renderList(equipmentOptions)}
      </View>
    );
  }
}

export default TutorialHome;
