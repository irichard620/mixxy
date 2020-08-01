import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native'
import React from 'react'
import Colors from '../../Theme/Colors'
import { PropTypes } from 'prop-types'
import Fonts from '../../Theme/Fonts'
import Images from '../../Theme/Images'

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
  const textStyles = getTextboxStylesheet(darkMode)

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
    <View style={[textStyles.textContainer, outlineStyle]}>
      <View style={textStyles.stepHeader}>
        <Text style={textStyles.title}>{`STEP ${stepIdx}`}</Text>
        <TouchableWithoutFeedback
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          onPress={onDeletePress}
        >
          <View style={textStyles.deleteOutline}>
            <Image source={Images.builderDeleteStep} style={textStyles.deleteIcon} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {!isFocused && (
        <Text style={[textStyles.textInput, editModeStyle]}>{editModeTextToDisplay}</Text>
      )}
      {isFocused && (
        <TextInput
          ref={passRef}
          onBlur={onBlur}
          onChangeText={(text) => onChangeText(text)}
          placeholder={'Write out the step here...'}
          placeholderTextColor={darkMode ? Colors.text2Dark : Colors.text2Light}
          style={[textStyles.textInput, inputStyle]}
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

function getTextboxStylesheet(darkMode) {
  return StyleSheet.create({
    textContainer: {
      backgroundColor: darkMode ? Colors.cardColorDark : Colors.cardColorLight,
      borderRadius: 15,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    },
    textInput: {
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      fontSize: 17,
      marginBottom: 16,
      marginLeft: 16,
    },
    title: {
      ...Fonts.uppercaseBold,
      color: darkMode ? Colors.text3Dark : Colors.text3Light,
      marginTop: 16,
    },
    stepHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
      marginLeft: 16,
    },
    deleteIcon: {
      height: 8,
      resizeMode: 'contain',
    },
    deleteOutline: {
      backgroundColor: darkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
      borderRadius: 10,
      height: 20,
      width: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 12,
      marginRight: 12,
    },
    touchable: {
      padding: 8,
    },
  })
}
