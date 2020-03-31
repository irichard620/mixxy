import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
} from 'react-native'
import PullDown from './Pulldown'
import ButtonLarge from './ButtonLarge'
import getStylesheet from '../Theme/ApplicationStyles'
import Fonts from '../Theme/Fonts'
import Colors from '../Theme/Colors'
import { PropTypes } from 'prop-types'
import ListItem from './ListItem'
import Textbox from './Textbox'

export default function ModalContentBottom(props) {
  const {
    modalText,
    textPlaceholder,
    onPressItem,
    onChangeText,
    onModalSave,
    isListModal,
    options,
    title,
    charLimit,
    hasSave,
    darkMode,
  } = props

  const styles = getStylesheet(darkMode)
  const modalStyles = getModalStylesheet(darkMode)

  // Elems with atleast one text
  const isTextInput = !isListModal

  // Max height for modal
  const { height, width } = Dimensions.get('window')
  const maxHeightModal = {
    maxHeight: height * 0.75,
  }

  const listPadding = {
    paddingTop: 16,
    paddingBottom: 24,
  }
  if (isListModal && !hasSave) {
    listPadding.paddingTop = 0
    listPadding.paddingBottom = 0
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <View style={[modalStyles.content, maxHeightModal]}>
        <PullDown />
        <Text style={modalStyles.title}>{title}</Text>
        <View style={styles.divider} />
        {isTextInput && (
          <Textbox
            onChangeText={onChangeText}
            modalText={modalText}
            textPlaceholder={textPlaceholder}
            charLimit={charLimit}
            darkMode={darkMode}
          />
        )}
        {isListModal && (
          <ScrollView style={listPadding}>
            {options.map((option) => (
              <ListItem
                key={`${option.title}${option.subtitle}`}
                title={option.title}
                subtitle={option.subtitle}
                onClick={onPressItem}
                selected={option.selected}
                darkMode={darkMode}
              />
            ))}
          </ScrollView>
        )}
        {hasSave && (
          <View style={modalStyles.saveContainer}>
            <ButtonLarge
              onButtonClick={onModalSave}
              title="Save"
              margin={[0, 16, 0, 16]}
              buttonWidth={width - 32}
              isPrimary
            />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  )
}

ModalContentBottom.propTypes = {
  modalText: PropTypes.string,
  textPlaceholder: PropTypes.string,
  onPressItem: PropTypes.func,
  onChangeText: PropTypes.func,
  onModalSave: PropTypes.func,
  isListModal: PropTypes.bool,
  options: PropTypes.array,
  title: PropTypes.string,
  charLimit: PropTypes.number,
  hasSave: PropTypes.bool,
  darkMode: PropTypes.bool,
}

function getModalStylesheet(darkMode) {
  return StyleSheet.create({
    content: {
      backgroundColor: darkMode ? Colors.cardColorDark : Colors.backgroundColorLight,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: 32,
      paddingTop: 8,
    },
    saveContainer: {
      alignItems: 'center',
      marginBottom: 8,
    },
    textInput: {
      backgroundColor: darkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
      borderRadius: 10,
      fontSize: 16,
      marginBottom: 24,
      marginLeft: 16,
      marginRight: 16,
      marginTop: 16,
      padding: 16,
    },
    title: {
      alignSelf: 'flex-start',
      color: darkMode ? Colors.text1Dark : Colors.text1Light,
      ...Fonts.cardSelectionTitle,
      marginBottom: 8,
      marginLeft: 16,
      marginTop: 36,
    },
  })
}
