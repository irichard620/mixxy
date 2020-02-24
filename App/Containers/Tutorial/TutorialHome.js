
import React, { Component } from 'react';
import {
  View, StyleSheet, Image, ScrollView, Text
} from 'react-native';
import Images from '../../Theme/Images'
import getTutorialStylesheet from './TutorialScreenStyle'
import getStylesheet from '../../Theme/ApplicationStyles'
import TutorialHomeMenuButtons from './TutorialHomeMenuButtons'

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

  render() {
    const { selected } = this.state;
    const { recipe, darkMode, drinkAmount } = this.props;

    const styles = getStylesheet(darkMode)
    const tutorialStyles = getTutorialStylesheet(darkMode)

    const isDescription = 'recipeDescription' in recipe && recipe.recipeDescription !== ''

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
        <View style={tutorialStyles.bufferView} />
      </ScrollView>
    );
  }
}

export default TutorialHome;
