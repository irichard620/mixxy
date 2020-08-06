import getHomeStylesheet from './HomeScreenStyle'
import { Image, Text, TouchableWithoutFeedback, View, ScrollView } from 'react-native'
import React from 'react'
import getStylesheet from '../../Theme/ApplicationStyles'
import Colors from '../../Theme/Colors'
import Images from '../../Theme/Images'
import { PropTypes } from 'prop-types'

export default function HomeLibraryMenuButtons(props) {
  const { darkMode, onNewRecipeClick, onSectionClick, selected, options } = props
  const styles = getStylesheet(darkMode)
  const homeStyles = getHomeStylesheet(darkMode)

  return (
    <View style={homeStyles.libraryMenuOutline}>
      <TouchableWithoutFeedback onPress={onNewRecipeClick}>
        <View style={homeStyles.libraryAddButton}>
          <Image source={Images.newRecipe} style={homeStyles.libraryAddIcon} />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.verticalDivider} />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
