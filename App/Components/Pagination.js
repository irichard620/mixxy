import React from 'react'
import { View, StyleSheet } from 'react-native'
import { PropTypes } from 'prop-types'
import Colors from '../Theme/Colors'

export default function Pagination(props) {
  const { total, index, activeColor, darkMode } = props

  const styles = getPaginationStylesheet(darkMode)
  const items = []
  for (let i = 0; i < total; i += 1) {
    let marginToUse = 0
    if (i < total - 1) {
      marginToUse = 6
    }
    const marginStyle = {
      marginRight: marginToUse,
    }
    if (i === index) {
      const activeStyle = {
        backgroundColor: activeColor,
      }
      items.push(<View key={i} style={[styles.activeDot, activeStyle, marginStyle]} />)
    } else {
      items.push(<View key={i} style={[styles.inactiveDot, marginStyle]} />)
    }
  }

  return <View style={styles.outline}>{items}</View>
}

Pagination.propTypes = {
  total: PropTypes.number,
  index: PropTypes.number,
  activeColor: PropTypes.string,
  darkMode: PropTypes.bool,
}

function getPaginationStylesheet(darkMode) {
  return StyleSheet.create({
    activeDot: {
      borderRadius: 3,
      height: 6,
      width: 6,
    },
    inactiveDot: {
      backgroundColor: darkMode ? Colors.cardColorDark : '#E3E3E3',
      borderRadius: 3,
      height: 6,
      width: 6,
    },
    outline: {
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 5,
      paddingTop: 5,
    },
  })
}
