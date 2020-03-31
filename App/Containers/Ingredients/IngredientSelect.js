import React from 'react'
import { ScrollView, Text, View, Picker, Dimensions, KeyboardAvoidingView } from 'react-native'
import getIngredientsStylesheet from './IngredientsScreenStyle'
import { PropTypes } from 'prop-types'
import getStylesheet from '../../Theme/ApplicationStyles'
import * as constants from '../../Config/constants'
import Colors from '../../Theme/Colors'
import Textbox from '../../Components/Textbox'

export default function IngredientSelect(props) {
  const {
    darkMode,
    ingredient,
    onPickerUpdate,
    onBrandUpdate,
    wholeAmount,
    fractionAmount,
    amountType,
    brand,
  } = props
  const styles = getStylesheet(darkMode)
  const ingredientStyles = getIngredientsStylesheet(darkMode)

  // Picker style
  const { width } = Dimensions.get('window')
  const pickerWidth = width / 3
  const pickerStyle = {
    width: pickerWidth,
    height: 200,
  }
  const pickerItemStyle = {
    height: 200,
  }
  const itemColor = darkMode ? Colors.text1Dark : Colors.text1Light
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
      <ScrollView style={ingredientStyles.scrollView}>
        <Text style={ingredientStyles.selectionHeader}>{ingredient.title}</Text>
        <Text style={ingredientStyles.selectionSubtitle}>{ingredient.description}</Text>
        <View style={styles.thickDivider} />
        <View style={ingredientStyles.pickerOutline}>
          <Picker
            selectedValue={wholeAmount}
            onValueChange={(itemValue) => onPickerUpdate(itemValue, 0)}
            style={pickerStyle}
            itemStyle={pickerItemStyle}
          >
            {[...Array(5).keys()].map((item) => {
              item = item.toString()
              return <Picker.Item key={item} label={item} value={item} color={itemColor} />
            })}
          </Picker>
          <Picker
            selectedValue={fractionAmount}
            onValueChange={(itemValue) => onPickerUpdate(itemValue, 1)}
            style={pickerStyle}
            itemStyle={pickerItemStyle}
          >
            {constants.fractionAmounts.map((item) => (
              <Picker.Item key={item} label={item} value={item} color={itemColor} />
            ))}
          </Picker>
          <Picker
            selectedValue={amountType}
            onValueChange={(itemValue) => onPickerUpdate(itemValue, 2)}
            style={pickerStyle}
            itemStyle={pickerItemStyle}
          >
            {constants.amountTypes.map((item) => (
              <Picker.Item key={item} label={item} value={item} color={itemColor} />
            ))}
          </Picker>
        </View>
        <View style={styles.divider} />
        <Text style={ingredientStyles.brandSubtitle}>Do you recommend a specific brand?</Text>
        <Textbox
          onChangeText={onBrandUpdate}
          modalText={brand}
          textPlaceholder={'Brand Recommendation'}
          charLimit={100}
          darkMode={darkMode}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

IngredientSelect.propTypes = {
  darkMode: PropTypes.bool,
  ingredient: PropTypes.object,
  onPickerUpdate: PropTypes.func,
  onBrandUpdate: PropTypes.func,
  wholeAmount: PropTypes.string,
  fractionAmount: PropTypes.string,
  amountType: PropTypes.string,
  brand: PropTypes.string,
}
