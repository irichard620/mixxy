import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, Keyboard, Dimensions } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import getBuilderStylesheet from './BuilderStyles'
import { PropTypes } from 'prop-types'
import AddButton from '../../Components/AddButton'
import DeleteButton from '../../Components/DeleteButton'
import RecipeStep from './RecipeStep'
import MoreButton from '../../Components/MoreButton'

export default function BuilderSteps(props) {
  const {
    darkMode,
    recipeName,
    steps,
    onAddStepClick,
    isEditMode,
    onDeletePress,
    onChangeText,
    onMorePress,
    onDragEnd,
  } = props
  const builderStyles = getBuilderStylesheet(darkMode)
  let leftMargin = -30
  if (isEditMode) {
    leftMargin = 16
  }
  const leftMarginStyle = {
    marginLeft: leftMargin,
  }

  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  const listHeader = (
    <View>
      <View style={builderStyles.headingContainer}>
        <Text style={builderStyles.headingWithinContainer}>{recipeName}</Text>
        <MoreButton onPress={onMorePress} />
      </View>
      <Text style={builderStyles.headingDescription}>
        {
          'Build out your recipe with clear step by step instructions. To change the position of a step, tap Edit, then drag to reorder.'
        }
      </Text>
    </View>
  )

  const onKeyboardWillShow = (e) => {
    const screenHeight = Dimensions.get('window').height
    setKeyboardHeight(screenHeight - e.endCoordinates.screenY)
  }

  const onKeyboardWillHide = () => {
    setKeyboardHeight(0)
  }

  const listFooter = (
    <View>
      {!isEditMode && <AddButton onPress={onAddStepClick} />}
      <View style={builderStyles.buffer} />
    </View>
  )

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', onKeyboardWillShow)
    Keyboard.addListener('keyboardWillHide', onKeyboardWillHide)

    return () => {
      Keyboard.removeListener('keyboardWillShow', onKeyboardWillShow)
      Keyboard.removeListener('keyboardWillHide', onKeyboardWillHide)
    }
  }, [])

  return (
    <View style={builderStyles.scrollView}>
      <DraggableFlatList
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ width: '100%' }}
        data={steps}
        onScroll={(e) => {
          setScrollY(e.nativeEvent.contentOffset.y)
        }}
        onScrollEndDrag={(e) => {
          setScrollY(e.nativeEvent.contentOffset.y)
        }}
        renderItem={({ item, index, drag, isActive }) => (
          <TouchableOpacity
            style={[builderStyles.ingredientRow, leftMarginStyle]}
            onLongPress={drag}
          >
            <DeleteButton onPress={() => onDeletePress(index)} />
            <RecipeStep
              key={`step${index}`}
              step={item}
              stepIdx={index + 1}
              onChangeText={(text) => onChangeText(text, index)}
              darkMode={darkMode}
              isEditMode={isEditMode}
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
  // } else {
  //   return (
  //     <KeyboardAwareScrollView
  //       extraScrollHeight={100}
  //       enableAutomaticScroll={true}
  //       style={builderStyles.scrollView}
  //     >
  //       {listHeader}
  //       {steps.map((step, idx) => (
  //         <View key={`step${idx}view`} style={[builderStyles.ingredientRow, leftMarginStyle]}>
  //           <DeleteButton onPress={() => onDeletePress(idx)} />
  //           <RecipeStep
  //             key={`step${idx}`}
  //             step={step}
  //             stepIdx={idx + 1}
  //             onChangeText={(text) => onChangeText(text, idx)}
  //             darkMode={darkMode}
  //           />
  //         </View>
  //       ))}
  //       {listFooter}
  //     </KeyboardAwareScrollView>
  //   )
  // }
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
