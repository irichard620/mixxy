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
import { PropTypes } from 'prop-types'
import Images from '../../Theme/Images'
import getBuilderStylesheet from './BuilderScreenStyle'
import Helpers from '../../Theme/Helpers'
import Button from '../../Components/Button'
import * as stepModel from '../../Storage/Step'

const getHighlightedText = (text, builderStyles) => (
  <Text style={builderStyles.stepDescriptionHighlight}>{text}</Text>
)

const getStepDescriptionWithHighlights = (step, builderStyles) => {
  if (step.title === constants.STEP_ADD_INGREDIENTS) {
    let ingredientDescription = stepModel.getIngredientsList(step)
    return (
      <Text style={builderStyles.stepDescriptionBase}>
        {'Add '}
        {getHighlightedText(ingredientDescription, builderStyles)}
        {' to a '}
        {getHighlightedText(step.vessel, builderStyles)}
        {'.'}
      </Text>
    )
  } else if (step.title === constants.STEP_REMOVE_INGREDIENTS) {
    let ingredientDescription = stepModel.getIngredientsList(step)
    return (
      <Text style={builderStyles.stepDescriptionBase}>
        {'Discard '}
        {getHighlightedText(ingredientDescription, builderStyles)}
        {'.'}
      </Text>
    )
  } else if (step.title === constants.STEP_MUDDLE) {
    let ingredientDescription = stepModel.getIngredientsList(step)
    return (
      <Text style={builderStyles.stepDescriptionBase}>
        {'Muddle '}
        {getHighlightedText(ingredientDescription, builderStyles)}
        {'.'}
      </Text>
    )
  } else if (step.title === constants.STEP_STRAIN) {
    return (
      <Text style={builderStyles.stepDescriptionBase}>
        {'Pour through a strainer into '}
        {getHighlightedText(step.vessel, builderStyles)}
        {'.'}
      </Text>
    )
  } else if (step.title === constants.STEP_STIR) {
    return (
      <Text style={builderStyles.stepDescriptionBase}>
        {'Stir for '}
        {getHighlightedText(step.properties.seconds, builderStyles)}
        {' seconds.'}
      </Text>
    )
  } else if (step.title === constants.STEP_BLEND) {
    return (
      <Text style={builderStyles.stepDescriptionBase}>
        {'Blend together until a '}
        {getHighlightedText(step.properties.consistency, builderStyles)}
        {' consistency.'}
      </Text>
    )
  } else if (step.title === constants.STEP_SHAKE) {
    return (
      <Text style={builderStyles.stepDescriptionBase}>
        {'Cover and shake for '}
        {getHighlightedText(step.properties.seconds, builderStyles)}
        {' seconds.'}
      </Text>
    )
  } else if (step.title === constants.STEP_GARNISH) {
    let ingredientDescription = stepModel.getIngredientsList(step)
    return (
      <Text style={builderStyles.stepDescriptionBase}>
        {'Garnish the serving glass with '}
        {getHighlightedText(ingredientDescription, builderStyles)}
        {'.'}
      </Text>
    )
  } else if (step.title === constants.STEP_RIM_GLASS) {
    let ingredientDescription = stepModel.getIngredientsList(step)
    return (
      <Text style={builderStyles.stepDescriptionBase}>
        {'Add '}
        {getHighlightedText(ingredientDescription, builderStyles)}
        {' to a shallow dish. Moisten the rim of the glass and rotate it in the '}
        {getHighlightedText(ingredientDescription, builderStyles)}
        {' to garnish the rim.'}
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
              <Button title="Edit" onButtonClick={onPressEdit} margin={[0, 0, 0, 0]} />
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
