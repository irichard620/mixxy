import React from 'react'
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import ButtonLarge from './ButtonLarge'
import { PropTypes } from 'prop-types'
import ListItem from './ListItem'
import Textbox from './Textbox'
import ModalBottomOutline from './ModalBottomOutline'
import ImageListItem from './ImageListItem'
import MultiSelectListItem from './MultiselectListItem'

export default function ModalContentBottom(props) {
  const {
    modalText,
    textPlaceholder,
    onPressItem,
    onChangeText,
    onModalSave,
    isListModal,
    isImageListModal,
    isMultiSelectModal,
    options,
    title,
    charLimit,
    hasSave,
    darkMode,
  } = props

  // Elems with atleast one text
  const isTextInput = !isListModal && !isImageListModal && !isMultiSelectModal

  // Max height for modal
  const { width } = Dimensions.get('window')

  const listPadding = {
    paddingBottom: 8,
  }
  if (isListModal && !hasSave) {
    listPadding.paddingBottom = 0
  }

  const imageListStyle = {
    marginTop: 8,
    height: options ? 56 * options.length : 0,
  }

  return (
    <ModalBottomOutline title={title} darkMode={darkMode}>
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
        <ScrollView style={listPadding} showsVerticalScrollIndicator={false}>
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
      {isImageListModal && (
        <View style={imageListStyle}>
          {options.map((option) => (
            <ImageListItem
              key={option.title}
              title={option.title}
              onClick={onPressItem}
              selected={option.selected}
              darkMode={darkMode}
            />
          ))}
        </View>
      )}
      {isMultiSelectModal && (
        <ScrollView style={listPadding} showsVerticalScrollIndicator={false}>
          {options.map((option, idx) => (
            <MultiSelectListItem
              key={`${option.title}`}
              title={option.title}
              onClick={(title) => onPressItem(title, idx)}
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
            title={isMultiSelectModal ? 'Insert Ingredients' : 'Save'}
            margin={[0, 16, 0, 16]}
            buttonWidth={width - 32}
            isPrimary
          />
        </View>
      )}
    </ModalBottomOutline>
  )
}

ModalContentBottom.propTypes = {
  modalText: PropTypes.string,
  textPlaceholder: PropTypes.string,
  onPressItem: PropTypes.func,
  onChangeText: PropTypes.func,
  onModalSave: PropTypes.func,
  isListModal: PropTypes.bool,
  isImageListModal: PropTypes.bool,
  options: PropTypes.array,
  title: PropTypes.string,
  charLimit: PropTypes.number,
  hasSave: PropTypes.bool,
  darkMode: PropTypes.bool,
  isMultiSelectModal: PropTypes.bool,
}

const modalStyles = StyleSheet.create({
  saveContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
})
