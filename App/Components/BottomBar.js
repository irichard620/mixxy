import ButtonLarge from './ButtonLarge'
import React from 'react'
import { Dimensions, StyleSheet, View, SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Colors from '../Theme/Colors'
import { PropTypes } from 'prop-types'

export default function BottomBar(props) {
  const { darkMode, onButtonClick, buttonTitle, disabled } = props
  const { width } = Dimensions.get('window')
  const fullButtonWidth = width - 32
  return (
    <SafeAreaView>
      <View style={styles.gradientContainer}>
        <LinearGradient
          colors={
            darkMode
              ? [Colors.backgroundColorDark, Colors.backgroundColorDarkTransparent]
              : [Colors.backgroundColorLight, Colors.backgroundColorLightTransparent]
          }
          style={styles.gradient}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        />
      </View>
      <ButtonLarge
        onButtonClick={onButtonClick}
        title={buttonTitle}
        margin={[16, 16, 8, 16]}
        buttonWidth={fullButtonWidth}
        darkMode={darkMode}
        isPrimary
        disabled={disabled}
      />
    </SafeAreaView>
  )
}

BottomBar.propTypes = {
  buttonTitle: PropTypes.string,
  onButtonClick: PropTypes.func,
  darkMode: PropTypes.bool,
  disabled: PropTypes.bool,
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  gradientContainer: {
    backgroundColor: Colors.backgroundColorDarkTransparent,
    height: 32,
    marginTop: -32,
    width: '100%',
  },
})