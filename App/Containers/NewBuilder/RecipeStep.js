import { Dimensions, Text, TextInput, TouchableWithoutFeedback, View, Image } from 'react-native'
import React from 'react'
import Colors from '../../Theme/Colors'
import { PropTypes } from 'prop-types'
import Images from '../../Theme/Images'
import getBuilderStylesheet from './BuilderStyles'

export default function RecipeStep(props) {
  const {
    step,
    stepIdx,
    darkMode,
    onChangeText,
    onContentSizeChange,
    passRef,
    isFocused,
    onDeletePress,
    onBlur,
  } = props
  const builderStyles = getBuilderStylesheet(darkMode)

  const { width } = Dimensions.get('window')
  const outlineStyle = {
    width: width - 32,
  }
  const inputStyle = {
    width: width - 64,
  }
  let textStyle = {
    color: darkMode ? Colors.text1Dark : Colors.text1Light,
  }

  let editModeTextToDisplay = step.title
  let editModeStyle = {
    paddingTop: 5,
    width: width - 64,
  }

  if (!isFocused && step.title === '') {
    editModeTextToDisplay = 'Write out the step here...'
    editModeStyle.color = darkMode ? Colors.text2Dark : Colors.text2Light
  }

  return (
    <View style={[builderStyles.recipeStepTextContainer, outlineStyle]}>
      <View style={builderStyles.recipeStepHeader}>
        <Text style={builderStyles.recipeStepTitle}>{`STEP ${stepIdx}`}</Text>
        <TouchableWithoutFeedback
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          onPress={onDeletePress}
        >
          <View style={builderStyles.recipeStepDeleteOutline}>
            <Image source={Images.builderDeleteStep} style={builderStyles.recipeStepDeleteIcon} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {!isFocused && (
        <Text style={[builderStyles.recipeStepTextInput, editModeStyle]}>
          {editModeTextToDisplay}
        </Text>
      )}
      {isFocused && (
        <TextInput
          ref={passRef}
          onBlur={onBlur}
          onChangeText={(text) => onChangeText(text)}
          placeholder={'Write out the step here...'}
          placeholderTextColor={darkMode ? Colors.text2Dark : Colors.text2Light}
          style={[builderStyles.recipeStepTextInput, inputStyle]}
          maxLength={1000}
          multiline={true}
          onContentSizeChange={onContentSizeChange}
        >
          <Text style={textStyle} key={`step${stepIdx}`}>
            {step.title}
          </Text>
        </TextInput>
      )}
    </View>
  )
}

RecipeStep.propTypes = {
  step: PropTypes.object,
  stepIdx: PropTypes.number,
  onChangeText: PropTypes.func,
  darkMode: PropTypes.bool,
  onContentSizeChange: PropTypes.func,
  onBlur: PropTypes.func,
  passRef: PropTypes.func,
  onDeletePress: PropTypes.func,
  isFocused: PropTypes.bool,
}
