import getHomeStylesheet from './HomeScreenStyle'
import { Text, TouchableWithoutFeedback, View, ScrollView } from 'react-native'
import React from 'react'
import Colors from '../../Theme/Colors'
import { PropTypes } from 'prop-types'

export default function HomeLibraryMenuButtons(props) {
  const { darkMode, onSectionClick, selected, options } = props
  const homeStyles = getHomeStylesheet(darkMode)

  return (
    <View style={homeStyles.libraryMenuOutline}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={homeStyles.libraryMenuScrollOutline}
        automaticallyAdjustContentInsets={false}
      >
        {options.map((item) => {
          // style of button
          let titleStyle = {
            color: darkMode ? Colors.stepTextDark : Colors.stepTextLight,
          }
          if (selected === item) {
            titleStyle = {
              color: Colors.white,
            }
          }
          let backgroundStyle = {
            borderWidth: 0.5,
            borderColor: darkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
          }
          if (selected === item) {
            backgroundStyle = {
              backgroundColor: Colors.blue1,
            }
          }
          return (
            <TouchableWithoutFeedback onPress={() => onSectionClick(item)} key={item}>
              <View style={[homeStyles.libraryMenuItemOutline, backgroundStyle]}>
                <Text style={[homeStyles.libraryMenuItemTitle, titleStyle]}>{item}</Text>
              </View>
            </TouchableWithoutFeedback>
          )
        })}
      </ScrollView>
    </View>
  )
}

HomeLibraryMenuButtons.propTypes = {
  darkMode: PropTypes.bool,
  onNewRecipeClick: PropTypes.func,
  onSectionClick: PropTypes.func,
  selected: PropTypes.string,
  options: PropTypes.array,
}
