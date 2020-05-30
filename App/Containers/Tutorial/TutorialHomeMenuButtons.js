import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback, Dimensions } from 'react-native'
import Colors from '../../Theme/Colors'
import Fonts from '../../Theme/Fonts'
import getTutorialStylesheet from './TutorialScreenStyle'

export default function TutorialHomeMenuButtons(props) {
  const { selected, onItemClick, isDescription, darkMode } = props

  const tutorialStyles = getTutorialStylesheet(darkMode)

  let renderOrder = [0, 1]
  if (!isDescription) {
    renderOrder = [0]
  }
  const { width } = Dimensions.get('window')
  const buttonWidth = {
    width: width / renderOrder.length,
  }
  const selectedButtonStyle = {
    width: buttonWidth.width,
    left: 0,
  }
  selectedButtonStyle.left += selected * buttonWidth.width

  return (
    <View style={tutorialStyles.menuButtonsOutline}>
      {renderOrder.map((item) => {
        // style of button
        let titleStyle = {
          color: darkMode ? Colors.text2Dark : Colors.text2Light,
        }
        if (selected === item) {
          titleStyle = {
            color: Colors.blue1,
          }
        }

        // Title of button
        let title = ''
        if (item === 0 && isDescription) {
          title = 'Description'
        } else if ((item === 0 && !isDescription) || (item === 1 && isDescription)) {
          title = 'Ingredients'
        }
        return (
          <TouchableWithoutFeedback onPress={() => onItemClick(item)} key={title}>
            <View style={[menuStyle.buttonOutline, buttonWidth]}>
              <Text style={[menuStyle.title, titleStyle]}>{title}</Text>
            </View>
          </TouchableWithoutFeedback>
        )
      })}
      <View style={[menuStyle.selectedButtonOutline, selectedButtonStyle]} />
    </View>
  )
}

const menuStyle = StyleSheet.create({
  buttonOutline: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  selectedButtonOutline: {
    backgroundColor: Colors.blue1,
    bottom: 0,
    height: 2,
    position: 'absolute',
    zIndex: 1,
  },
  title: {
    ...Fonts.cardHeader,
    marginBottom: 12,
    textAlign: 'center',
  },
})
