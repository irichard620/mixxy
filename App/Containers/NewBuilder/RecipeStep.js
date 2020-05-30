import {
  Dimensions, KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useState } from 'react'
import Colors from '../../Theme/Colors'
import { PropTypes } from 'prop-types'
import Fonts from '../../Theme/Fonts'
import getStylesheet from '../../Theme/ApplicationStyles'
import * as stepModel from '../../Storage/Step'

export default function RecipeStep(props) {
  const { step, stepIdx, darkMode, onChangeText, onAddIngredient } = props
  const styles = getStylesheet(darkMode)
  const textStyles = getTextboxStylesheet(darkMode)

  // Is it being edited?
  const [isEditing, setIsEditing] = useState(false)
  const [selection, setSelection] = useState({ start: 0, end: 0 })
  const [lastStartLocation, setLastStartLocation] = useState(-1)

  const { width } = Dimensions.get('window')
  const outlineStyle = {
    width: width - 32,
  }

  // Create text sequences
  const textSequences = stepModel.getStepTextSequeunces(step)

  const handleSelectionChange = (e) => {
    // Check if selection within our ingredients
    // TODO: handle case where delete last char in item
    console.log(`Step ${step.startLocation} ${step.endLocation}`)
    console.log(`Step previous ${lastStartLocation}`)
    console.log(`Previous selection ${selection.start} ${selection.end}`)
    console.log(`New selection ${e.nativeEvent.selection.start} ${e.nativeEvent.selection.end}`)
    if (
      selection.start === step.endLocation &&
      e.nativeEvent.selection.start === step.endLocation - 1
    ) {
      console.log("Set before start and delete")
      setSelection({ start: step.startLocation, end: step.startLocation })
      setLastStartLocation(step.startLocation)
      return
    }
    if (lastStartLocation !== -1 && step.startLocation === -1) {
      console.log("Set to last start")
      setSelection({ start: lastStartLocation, end: lastStartLocation })
      setLastStartLocation(-1)
      return
    }
    // if (
    //   e.nativeEvent.selection.start > step.startLocation &&
    //   step.endLocation > e.nativeEvent.selection.start
    // ) {
    //   setSelection({ start: step.startLocation, end: step.endLocation })
    //   return
    // }
    // if (
    //   e.nativeEvent.selection.end > step.startLocation &&
    //   step.endLocation > e.nativeEvent.selection.end
    // ) {
    //   setSelection({ start: step.startLocation, end: step.endLocation })
    //   return
    // }
    setSelection(e.nativeEvent.selection)
  }

  return (
    <View style={[textStyles.textContainer, outlineStyle]}>
      <Text style={textStyles.title}>{`STEP ${stepIdx}`}</Text>
      <TextInput
        id={'hi-ian'}
        onChangeText={(text) => onChangeText(text, selection)}
        placeholder={'Write out the step here...'}
        placeholderTextColor={darkMode ? Colors.text2Dark : Colors.text2Light}
        style={textStyles.textInput}
        maxLength={1000}
        selection={selection}
        multiline={true}
        onEndEditing={() => setIsEditing(false)}
        onFocus={() => setIsEditing(true)}
        onSelectionChange={handleSelectionChange}
      >
        {textSequences.map((item, idx) => {
          let textStyle = {
            color: darkMode ? Colors.text1Dark : Colors.text1Light,
          }
          if (item.highlighted) {
            textStyle.color = Colors.blue1
            return (
              <Text style={textStyle} key={`step${stepIdx}sequence${idx}`}>
                <Text>{item.title}</Text>
              </Text>
            )
          } else {
            return (
              <Text style={textStyle} key={`step${stepIdx}sequence${idx}`}>
                {item.title}
              </Text>
            )
          }
        })}
      </TextInput>
      {isEditing && !step.ingredients.length && <View style={styles.divider} />}
      {isEditing && !step.ingredients.length && (
        <TouchableWithoutFeedback onPress={() => onAddIngredient(selection.start)}>
          <View style={textStyles.bottomButtonOutline}>
            <Text style={textStyles.bottomButtonText}>{'Add Ingredient'}</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  )
}

RecipeStep.propTypes = {
  step: PropTypes.object,
  stepIdx: PropTypes.number,
  onChangeText: PropTypes.func,
  onAddIngredient: PropTypes.func,
  darkMode: PropTypes.bool,
}

function getTextboxStylesheet(darkMode) {
  return StyleSheet.create({
    textContainer: {
      backgroundColor: darkMode ? Colors.cardColorDark : Colors.cardColorLight,
      borderRadius: 15,
      shadowColor: '#000000',
      shadowOpacity: 0.14,
      shadowRadius: 12,
    },
    textInput: {
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      fontSize: 17,
      marginBottom: 16,
      marginLeft: 16,
      width: '100%',
      paddingRight: 16,
    },
    title: {
      ...Fonts.uppercaseBold,
      color: darkMode ? Colors.text3Dark : Colors.text3Light,
      marginBottom: 12,
      marginLeft: 16,
      marginTop: 16,
    },
    bottomButtonOutline: {
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottomButtonText: {
      ...Fonts.buttonText,
      color: Colors.blue1,
    },
  })
}
