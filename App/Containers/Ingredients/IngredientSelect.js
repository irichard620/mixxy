import React from 'react'
import { ScrollView, Text } from 'react-native'
import getIngredientsStylesheet from './IngredientsScreenStyle'
import { PropTypes } from 'prop-types'

class IngredientSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wholeAmount: 0,
      fractionAmount: 0,
      amountType: '',
      brand: '',
    }
  }

  render() {
    const { darkMode, ingredient } = this.props
    const ingredientStyles = getIngredientsStylesheet(darkMode)
    return (
      <ScrollView>
        <Text style={ingredientStyles.selectionHeader}>{ingredient.title}</Text>
        <Text style={ingredientStyles.selectionSubtitle}>{ingredient.description}</Text>
      </ScrollView>
    )
  }
}

IngredientSelect.propTypes = {
  darkMode: PropTypes.bool,
  ingredient: PropTypes.object,
}
