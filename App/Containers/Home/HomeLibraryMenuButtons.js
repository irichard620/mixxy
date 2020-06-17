import getHomeStylesheet from './HomeScreenStyle'
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import getStylesheet from '../../Theme/ApplicationStyles'
import Colors from '../../Theme/Colors'
import Images from '../../Theme/Images'

export default function HomeLibraryMenuButtons(props) {
  const { darkMode, onNewRecipeClick, onSectionClick, selected } = props
  const styles = getStylesheet(darkMode)
  const homeStyles = getHomeStylesheet(darkMode)

  const menuItems = ['Favorites', 'All Recipes']
  return (
    <View style={homeStyles.libraryMenuOutline}>
      <TouchableWithoutFeedback onPress={onNewRecipeClick}>
        <View style={homeStyles.libraryAddButton}>
          <Image source={Images.newRecipe} style={homeStyles.libraryAddIcon} />
        </View>
      </TouchableWithoutFeedback>
      <View style={[styles.verticalDivider, { height: 36, marginTop: 16, marginBottom: 16 }]} />
      {menuItems.map((item, idx) => {
        // style of button
        let titleStyle = {
          color: darkMode ? Colors.stepTextDark : Colors.stepTextLight,
        }
        if (selected === idx) {
          titleStyle = {
            color: Colors.white,
          }
        }
        let backgroundStyle = {
          borderWidth: 0.5,
          borderColor: darkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
        }
        if (selected === idx) {
          backgroundStyle = {
            backgroundColor: Colors.blue1,
          }
        }
        return (
          <TouchableWithoutFeedback onPress={() => onSectionClick(idx)} key={item}>
            <View style={[homeStyles.libraryMenuItemOutline, backgroundStyle]}>
              <Text style={[homeStyles.libraryMenuItemTitle, titleStyle]}>{item}</Text>
            </View>
          </TouchableWithoutFeedback>
        )
      })}
    </View>
  )
}
