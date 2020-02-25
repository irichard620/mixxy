
import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import getStylesheet from '../Theme/ApplicationStyles'
import { useDarkMode } from 'react-native-dark-mode'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'

export default function ListItem(props) {
  const {
    title, subtitle
  } = props;

  const darkMode = useDarkMode()
  const styles = getStylesheet(darkMode)
  const listItemStyles = getListItemStylesheet(darkMode)

  return (
    <TouchableOpacity style={listItemStyles.container}>
      <View style={listItemStyles.textContainer}>
        <Text style={listItemStyles.titleStyle}>{title}</Text>
        <Text style={listItemStyles.subtitleStyle}>{subtitle}</Text>
      </View>
      <View style={styles.divider} />
    </TouchableOpacity>
  );
}

function getListItemStylesheet(darkMode) {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: 16,
    },
    textContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 16,
      paddingTop: 8,
      paddingBottom: 8
    },
    titleStyle: {
      ...Fonts.body1,
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
    },
    subtitleStyle: {
      ...Fonts.body1,
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
    }
  });
}
