import React, { useEffect, useState } from 'react'
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import getBuilderStylesheet from './BuilderStyles'
import { PropTypes } from 'prop-types'
import AddButton from '../../Components/AddButton'
import RecipeStep from './RecipeStep'
import MoreButton from '../../Components/MoreButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function BuilderSteps(props) {
  const {
    darkMode,
    recipeName,
    steps,
    onAddStepClick,
    onDeletePress,
    onChangeText,
    onMorePress,
    onDragEnd,
  } = props
  const builderStyles = getBuilderStylesheet(darkMode)

  const inputs = {}
  const initialFocusState = []
  for (let i = 0; i < steps.length; i++) {
    initialFocusState.push(false)
  }
  const [isFocused, setIsFocused] = useState(initialFocusState)
  const [scrollOffsetTable, setScrollOffsetTable] = useState(0)

  const listHeader = (
    <View>
      <View style={builderStyles.headingContainer}>
        <Text style={builderStyles.headingWithinContainer}>{recipeName}</Text>
        <MoreButton onPress={onMorePress} />
      </View>
      <Text style={builderStyles.headingDescription}>
        {
          'Build out your recipe with clear step by step instructions. To change the position of a step, hold and drag to reorder.'
        }
      </Text>
    </View>
  )

  const listFooter = (
    <View>
      <AddButton onPress={onAddStepClick} />
      <View style={{ height: 24 }} />
    </View>
  )

  useEffect(() => {
    for (let i = 0; i < isFocused.length; i++) {
      if (isFocused[i]) {
        inputs[i] && inputs[i].focus()
      }
    }
  }, [isFocused])

  const onFocus = (index) => {
    const newIsFocused = [...isFocused]
    newIsFocused[index] = true
    setIsFocused(newIsFocused)
  }

  const onBlur = (index) => {
    const newIsFocused = [...isFocused]
    newIsFocused[index] = false
    setIsFocused(newIsFocused)
  }

  let isAnyInputFocused = false
  for (let i = 0; i < isFocused.length; i++) {
    if (isFocused[i]) {
      isAnyInputFocused = true
    }
  }
  if (!isAnyInputFocused) {
    return (
      <View style={builderStyles.scrollView}>
        <DraggableFlatList
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ width: '100%' }}
          data={steps}
          contentOffset={{ x: 0, y: scrollOffsetTable }}
          onScrollEndDrag={(event) => {
            setScrollOffsetTable(event.nativeEvent.contentOffset.y)
          }}
          renderItem={({ item, index, drag }) => (
            <TouchableOpacity
              style={builderStyles.ingredientRow}
              onLongPress={drag}
              onPress={() => onFocus(index)}
              onStartShouldSetResponderCapture={(e) => true}
            >
              <RecipeStep
                key={`step${index}input`}
                step={item}
                stepIdx={index + 1}
                onChangeText={(text) => onChangeText(text, index)}
                darkMode={darkMode}
                passRef={(ref) => {
                  inputs[index] = ref
                }}
                onDeletePress={() => onDeletePress(index)}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => `step${item.title}${index}`}
          ListHeaderComponent={listHeader}
          ListFooterComponent={listFooter}
          onDragEnd={({ data }) => onDragEnd(data)}
        />
      </View>
    )
  } else {
    return (
      <KeyboardAwareScrollView
        extraScrollHeight={100}
        enableAutomaticScroll={true}
        style={builderStyles.scrollView}
        contentOffset={{ x: 0, y: scrollOffsetTable }}
        onScrollEndDrag={(event) => {
          setScrollOffsetTable(event.nativeEvent.contentOffset.y)
        }}
      >
        {listHeader}
        {steps.map((step, idx) => (
          <View key={`step${idx}view`} style={builderStyles.ingredientRow}>
            <RecipeStep
              onBlur={() => onBlur(idx)}
              key={`step${idx}`}
              step={step}
              stepIdx={idx + 1}
              onChangeText={(text) => onChangeText(text, idx)}
              darkMode={darkMode}
              isFocused={isFocused[idx]}
              passRef={(ref) => {
                inputs[idx] = ref
              }}
              onDeletePress={() => onDeletePress(idx)}
            />
          </View>
        ))}
        {listFooter}
      </KeyboardAwareScrollView>
    )
  }
}

BuilderSteps.propTypes = {
  darkMode: PropTypes.bool,
  isEditMode: PropTypes.bool,
  onAddStepClick: PropTypes.func,
  steps: PropTypes.array,
  onDeletePress: PropTypes.func,
  onChangeText: PropTypes.func,
  onMorePress: PropTypes.func,
  onDragEnd: PropTypes.func,
  recipeName: PropTypes.string,
}
