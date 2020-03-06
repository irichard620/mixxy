import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'
import { getStepShortDescription } from '../../Storage/Step'
import * as constants from '../../Config/constants'
import { getIngredientShortDescription } from '../../Storage/Ingredient'
import { PropTypes } from 'prop-types'
import Images from '../../Theme/Images'
import getBuilderStylesheet from './BuilderScreenStyle'
import Helpers from '../../Theme/Helpers'
import Button from '../../Components/Button'

const getHighlightedText = (text, builderStyles) => (
  <Text style={builderStyles.stepDescriptionHighlight}>{text}</Text>
)

const getStepDescriptionWithHighlights = (step, builderStyles) => {
  if (step.title === constants.STEP_ADD_INGREDIENTS) {
    let ingredientDescription = ''
    for (let i = 0; i < step.ingredients.length; i++) {
      if (i > 0) {
        ingredientDescription += ', '
      }
      ingredientDescription += getIngredientShortDescription(step.ingredients[i])
    }
    return (
      <Text style={builderStyles.stepDescriptionBase}>
        {`Add ${getHighlightedText(ingredientDescription, builderStyles)} `}
        {`to a ${getHighlightedText(step.vessel, builderStyles)}.`}
      </Text>
    )
  }
  return <Text style={builderStyles.stepDescriptionBase}>{getStepShortDescription(step)}</Text>
}

export default function BuilderStep(props) {
  const {
    onStepClick,
    onPressEdit,
    onPressUp,
    onPressDown,
    onPressDelete,
    selected,
    step,
    canGoUp,
    canGoDown,
    darkMode,
  } = props

  const builderStyles = getBuilderStylesheet(darkMode)

  const { title } = step
  let canEdit = false
  if (
    title === constants.STEP_ADD_INGREDIENTS ||
    title === constants.STEP_REMOVE_INGREDIENTS ||
    title === constants.STEP_STIR
  ) {
    canEdit = true
  }

  return (
    <TouchableWithoutFeedback onPress={onStepClick}>
      <View style={builderStyles.stepOutline}>
        <View style={Helpers.colStart}>
          <Text style={builderStyles.stepTitle}>{title}</Text>
          {getStepDescriptionWithHighlights(step, builderStyles)}
        </View>
        {selected && (
          <View style={builderStyles.stepButtonView}>
            <View style={Helpers.rowStart}>
              {canGoUp && (
                <TouchableOpacity onPress={onPressUp}>
                  <Image style={builderStyles.stepIcon} source={Images.builderUp} />
                </TouchableOpacity>
              )}
              {canGoDown && (
                <TouchableOpacity onPress={onPressDown}>
                  <Image style={builderStyles.stepIcon} source={Images.builderDown} />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={onPressDelete}>
                <Image style={builderStyles.stepIcon} source={Images.builderDelete} />
              </TouchableOpacity>
              {canEdit && <Button title="Edit" onButtonClick={onPressEdit} margin={[0, 0, 0, 0]} />}
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

BuilderStep.propTypes = {
  step: PropTypes.object,
  onStepClick: PropTypes.func,
  onPressUp: PropTypes.func,
  onPressDown: PropTypes.func,
  canGoUp: PropTypes.bool,
  canGoDown: PropTypes.bool,
  onPressEdit: PropTypes.func,
  onPressDelete: PropTypes.func,
  darkMode: PropTypes.bool,
  selected: PropTypes.bool,
}
