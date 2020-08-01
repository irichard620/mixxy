import React, { Component } from 'react'
import { View, Image, Text, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native'
import Images from '../../Theme/Images'
import getTutorialStylesheet from './TutorialScreenStyle'
import getStylesheet from '../../Theme/ApplicationStyles'
import * as constants from '../../Config/constants'
import * as ingredientModel from '../../Storage/Ingredient'
import ListItem from '../../Components/ListItem'
import Step from './Step'
import Colors from '../../Theme/Colors'

class TutorialHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
    }
  }

  getDrinkIcon = (iconStyle) => {
    const { recipe } = this.props
    if (recipe.servingGlass === constants.SERVING_GLASS_PITCHER) {
      return <Image style={iconStyle} source={Images.glassPitcher} />
    }
    if (recipe.servingGlass === constants.SERVING_GLASS_SHOT) {
      return <Image style={iconStyle} source={Images.glassShot} />
    }
    if (recipe.servingGlass === constants.SERVING_GLASS_MARGARITA) {
      return <Image style={iconStyle} source={Images.glassMarg} />
    }
    if (recipe.servingGlass === constants.SERVING_GLASS_FLUTE) {
      return <Image style={iconStyle} source={Images.glassFlute} />
    }
    if (recipe.servingGlass === constants.SERVING_GLASS_TALL) {
      return <Image style={iconStyle} source={Images.glassTall} />
    }
    if (recipe.servingGlass === constants.SERVING_GLASS_COCKTAIL) {
      return <Image style={iconStyle} source={Images.glassMartini} />
    }
    if (recipe.servingGlass === constants.SERVING_GLASS_PINT) {
      return <Image style={iconStyle} source={Images.glassPint} />
    }
    if (recipe.servingGlass === constants.SERVING_GLASS_WINE) {
      return <Image style={iconStyle} source={Images.glassWine} />
    }
    if (recipe.servingGlass === constants.SERVING_GLASS_COUPE) {
      return <Image style={iconStyle} source={Images.glassCoupe} />
    }
    if (recipe.servingGlass === constants.SERVING_GLASS_COPPER_MUG) {
      return <Image style={iconStyle} source={Images.glassCopperMug} />
    }
    return <Image style={iconStyle} source={Images.glassShort} />
  }

  onItemClick = (index) => {
    this.setState({
      selected: index,
    })
  }

  render() {
    const {
      recipe,
      darkMode,
      drinkAmount,
      reduceDrinkQuantity,
      increaseDrinkQuantity,
      useMetric,
    } = this.props
    const styles = getStylesheet(darkMode)
    const tutorialStyles = getTutorialStylesheet(darkMode)

    const isDescription = 'recipeDescription' in recipe && recipe.recipeDescription !== ''

    let qtyNegativeSource
    let minusBackgroundColor
    if (drinkAmount > 1) {
      qtyNegativeSource = Images.quantityMinus
      minusBackgroundColor = darkMode ? Colors.blue1TransparentDark : Colors.blue1TransparentLight
    } else {
      qtyNegativeSource = darkMode
        ? Images.quantityMinusInactiveDark
        : Images.quantityMinusInactiveLight
      minusBackgroundColor = darkMode ? Colors.darkFill3Dark : Colors.darkFill3Light
    }
    let qtyPositiveSource
    let plusBackgroundColor
    if (drinkAmount < 10) {
      qtyPositiveSource = Images.quantityPlus
      plusBackgroundColor = darkMode ? Colors.blue1TransparentDark : Colors.blue1TransparentLight
    } else {
      qtyPositiveSource = darkMode
        ? Images.quantityPlusInactiveDark
        : Images.quantityPlusInactiveLight
      plusBackgroundColor = darkMode ? Colors.darkFill3Dark : Colors.darkFill3Light
    }

    let stickyHeaderIndices = [
      5,
      5 + 2 + (recipe.ingredients !== undefined ? recipe.ingredients.length : 0),
    ]
    if (isDescription) {
      stickyHeaderIndices = [
        6,
        6 + 2 + (recipe.ingredients !== undefined ? recipe.ingredients.length : 0),
      ]
    }

    return (
      <ScrollView style={tutorialStyles.scrollView} stickyHeaderIndices={stickyHeaderIndices}>
        <View style={tutorialStyles.iconView}>{this.getDrinkIcon(tutorialStyles.icon)}</View>
        <Text style={tutorialStyles.recipeTitle}>{recipe.recipeName}</Text>
        {isDescription && (
          <Text style={tutorialStyles.descriptionText}>{recipe.recipeDescription}</Text>
        )}
        <View style={styles.thickDivider} />
        <View style={tutorialStyles.servingsContainer}>
          <Text style={tutorialStyles.sectionHeader}>Servings</Text>
          <View style={tutorialStyles.drinkAmountView}>
            <TouchableWithoutFeedback onPress={reduceDrinkQuantity}>
              <View
                style={[
                  tutorialStyles.drinkAmountCircle,
                  { backgroundColor: minusBackgroundColor },
                ]}
              >
                <Image source={qtyNegativeSource} style={tutorialStyles.drinkAmountIcon} />
              </View>
            </TouchableWithoutFeedback>
            <Text style={tutorialStyles.drinkAmountText}>{`${drinkAmount} drink${
              drinkAmount > 1 ? 's' : ''
            }`}</Text>
            <TouchableWithoutFeedback onPress={increaseDrinkQuantity}>
              <View
                style={[tutorialStyles.drinkAmountCircle, { backgroundColor: plusBackgroundColor }]}
              >
                <Image source={qtyPositiveSource} style={tutorialStyles.drinkAmountIcon} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.thickDivider} />
        <View>
          <View style={tutorialStyles.sectionHeaderContainer}>
            <Text style={tutorialStyles.sectionHeader}>Ingredients</Text>
          </View>
          <View style={styles.divider} />
        </View>
        {Object.keys(recipe).length !== 0 &&
          recipe.ingredients.map((ingredient) => (
            <ListItem
              key={ingredient.ingredientId}
              title={ingredientModel.getIngredientShortDescription(
                ingredient,
                drinkAmount,
                false,
                useMetric
              )}
              darkMode={darkMode}
              disabled
            />
          ))}
        <View style={styles.thickDivider} />
        <View>
          <View style={tutorialStyles.sectionHeaderContainer}>
            <Text style={tutorialStyles.sectionHeader}>Steps</Text>
          </View>
          <View style={styles.divider} />
        </View>
        <View style={[tutorialStyles.stepsContainer]}>
          {Object.keys(recipe).length !== 0 &&
            recipe.steps.map((step, idx) => (
              <Step
                key={`step${idx}`}
                step={step}
                isFirst={idx === 0}
                isLast={idx === recipe.steps.length - 1}
                darkMode={darkMode}
              />
            ))}
        </View>
        <View style={tutorialStyles.bufferView} />
      </ScrollView>
    )
  }
}

export default TutorialHome
