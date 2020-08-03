import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import getStylesheet from '../Theme/ApplicationStyles'
import Colors from '../Theme/Colors'
import { PropTypes } from 'prop-types'
import Images from '../Theme/Images'
import getComponentStylesheet from './ComponentStyle'

export default function ListItem(props) {
  const { title, subtitle, onClick, darkMode, selected, showArrow, disabled, enlarged } = props

  const styles = getStylesheet(darkMode)
  const componentStyles = getComponentStylesheet(darkMode)

  // Conditional styles
  const backgroundColorStyle = {}
  const titleExtraStyle = {
    color: darkMode ? Colors.text1Dark : Colors.text1Light,
  }
  const textContainerExtraStyle = {}
  if (enlarged) {
    backgroundColorStyle.paddingLeft = 0
    titleExtraStyle.fontSize = 20
    textContainerExtraStyle.height = 56
    textContainerExtraStyle.paddingRight = 0
  }
  if (selected) {
    backgroundColorStyle.backgroundColor = darkMode
      ? Colors.blue1TransparentDark
      : Colors.blue1TransparentLight
    titleExtraStyle.color = Colors.blue1
  } else if (title === 'Add Custom Ingredient') {
    titleExtraStyle.color = Colors.blue1
  }

  let arrowIcon = Images.arrowLight
  if (darkMode) {
    arrowIcon = Images.arrowDark
  }

  return (
    <TouchableOpacity
      style={[listItemStyles.container, backgroundColorStyle]}
      onPress={() => onClick(title)}
      disabled={disabled}
    >
      <View style={[listItemStyles.textContainer, textContainerExtraStyle]}>
        <Text style={[componentStyles.listItemTitleStyle, titleExtraStyle]}>{title}</Text>
        {subtitle && subtitle !== '' && (
          <Text style={componentStyles.listItemSubtitleStyle}>{subtitle}</Text>
        )}
        {showArrow && <Image style={listItemStyles.icon} source={arrowIcon} />}
      </View>
      <View style={styles.divider} />
    </TouchableOpacity>
  )
}

ListItem.propTypes = {
  darkMode: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  showArrow: PropTypes.bool,
  disabled: PropTypes.bool,
  enlarged: PropTypes.bool,
}

const listItemStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
  },
  icon: {
    height: 18,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
    height: 48,
  },
})
