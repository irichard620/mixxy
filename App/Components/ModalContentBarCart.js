import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { PropTypes } from 'prop-types'
import ModalBottomOutline from './ModalBottomOutline'
import ButtonLarge from './ButtonLarge'
import SelectedItem from './SelectedItem'

import getComponentStylesheet from './ComponentStyle'

export default function ModalContentBarCart(props) {
  const { darkMode, onSearchDrinksClick, ingredients, onAddIngredientClick, setIngredients } = props

  const componentStyles = getComponentStylesheet(darkMode)

  return (
    <ModalBottomOutline
      title={'My Bar Cart'}
      darkMode={darkMode}
      rightButtonTitle={'Add'}
      onRightButtonClick={onAddIngredientClick}
    >
      <Text style={componentStyles.modalBarCartDescription}>
        {`There are ${ingredients.length} ingredients in your bar cart`}
      </Text>
      <View style={modalBarCartStyles.ingredientOutline}>
        {ingredients.map((ingredient, idx) => (
          <SelectedItem
            key={ingredient.ingredientId}
            title={ingredient.name}
            darkMode={darkMode}
            onClick={() => {
              const array = [...ingredients]
              array.splice(idx, 1)
              setIngredients(array)
            }}
          />
        ))}
      </View>
      <ButtonLarge
        title={'Search Drinks'}
        margin={[0, 16, 2, 16]}
        isPrimary={true}
        onButtonClick={onSearchDrinksClick}
        hideBorder={true}
        darkMode={darkMode}
      />
    </ModalBottomOutline>
  )
}

ModalContentBarCart.propTypes = {
  darkMode: PropTypes.bool,
  onSearchDrinksClick: PropTypes.func,
  ingredients: PropTypes.array,
  onAddIngredientClick: PropTypes.func,
  setIngredients: PropTypes.func,
}

const modalBarCartStyles = StyleSheet.create({
  ingredientOutline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
})
