import React from 'react'
import { View, StyleSheet, Dimensions, Picker } from 'react-native'
import ButtonLarge from '../../Components/ButtonLarge'
import Colors from '../../Theme/Colors'
import { PropTypes } from 'prop-types'
import ModalBottomOutline from '../../Components/ModalBottomOutline'
import * as constants from '../../Config/constants'

export default function IngredientUnitModal(props) {
  const { wholeAmount, fractionAmount, amountType, onModalSave, onPickerUpdate, darkMode } = props

  const modalStyles = getModalStylesheet(darkMode)

  // Max height for modal
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
  const amountTypeOptions = constants.classificationToAmountTypes['']

  return (
    <ModalBottomOutline title={'Select ingredient units'} darkMode={darkMode}>
      <View style={modalStyles.pickerOutline}>
        <Picker
          selectedValue={wholeAmount}
          onValueChange={(itemValue) => onPickerUpdate(itemValue, 0)}
          style={pickerStyle}
          itemStyle={pickerItemStyle}
        >
          {[...Array(99).keys()].map((item) => {
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
          {amountTypeOptions.map((item) => (
            <Picker.Item key={item} label={item} value={item} color={itemColor} />
          ))}
        </Picker>
      </View>
      <View style={modalStyles.saveContainer}>
        <ButtonLarge
          onButtonClick={onModalSave}
          title="Save"
          margin={[0, 16, 0, 16]}
          buttonWidth={width - 32}
          isPrimary
        />
      </View>
    </ModalBottomOutline>
  )
}

IngredientUnitModal.propTypes = {
  onModalSave: PropTypes.func,
  darkMode: PropTypes.bool,
  wholeAmount: PropTypes.string,
  fractionAmount: PropTypes.string,
  amountType: PropTypes.string,
  onPickerUpdate: PropTypes.func,
}

function getModalStylesheet(darkMode) {
  return StyleSheet.create({
    saveContainer: {
      alignItems: 'center',
      marginBottom: 8,
    },
    pickerOutline: {
      flexDirection: 'row',
      height: 200,
      marginBottom: 20,
    },
  })
}
