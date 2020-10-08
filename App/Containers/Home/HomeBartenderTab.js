import {
  ScrollView,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  LayoutAnimation,
} from 'react-native'
import getStylesheet from '../../Theme/ApplicationStyles'
import React, { useState } from 'react'
import getHomeStylesheet from './HomeScreenStyle'
import { useDarkMode } from 'react-native-dark-mode'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import NavigationService from '../../Services/NavigationService'
import BottomBar from '../../Components/BottomBar'
import ClickableTextbox from '../../Components/ClickableTextbox'
import AddButton from '../../Components/AddButton'
import SelectedItem from '../../Components/SelectedItem'
import Colors from '../../Theme/Colors'
import Images from '../../Theme/Images'
import Helpers from '../../Theme/Helpers'
import { CustomLayoutEaseIn, NONE_SPIRIT } from '../../Config/constants'
import Fonts from '../../Theme/Fonts'

const HomeBartenderSection = (props) => {
  const { title, number, onClick, open, darkMode } = props

  const homeStyles = getHomeStylesheet(darkMode)

  const badgeBackgroundColor =
    number > 0 ? Colors.blue1 : darkMode ? Colors.text3Dark : Colors.text3Light
  const badgeBackgroundStyle = {
    backgroundColor: badgeBackgroundColor,
  }

  let arrowIcon = Images.builderUnitArrowLight
  if (darkMode) {
    arrowIcon = Images.builderUnitArrowDark
  }

  const baseIconStyle = { height: 12, resizeMode: 'contain' }
  const iconTransformStyle = open
    ? { transform: [{ rotate: '180deg' }], ...baseIconStyle }
    : { ...baseIconStyle }
  return (
    <TouchableWithoutFeedback style={Helpers.fill} onPress={onClick}>
      <View style={homeStyles.bartenderSectionOutline}>
        <Text style={homeStyles.bartenderSectionText}>{title}</Text>
        <View style={Helpers.rowStartVerticalAlign}>
          <View style={[homeStyles.bartenderSectionNumber, badgeBackgroundStyle]}>
            <Text style={homeStyles.bartenderSectionNumberText}>{number}</Text>
          </View>
          <Image style={iconTransformStyle} source={arrowIcon} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

HomeBartenderSection.propTypes = {
  title: PropTypes.string,
  number: PropTypes.number,
  onClick: PropTypes.func,
  open: PropTypes.bool,
  darkMode: PropTypes.bool,
}

function HomeBartenderTab(props) {
  const {
    setSelectedIngredients,
    selectedIngredients,
    onBarCartClick,
    barCartIngredients,
    baseSpirit,
    onBaseSpiritClick,
  } = props
  const darkMode = useDarkMode()
  const styles = getStylesheet(darkMode)
  const homeStyles = getHomeStylesheet(darkMode)

  const [ingredientsOpen, setIngredientsOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [addFromBarCart, setAddFromBarCart] = useState(false)

  const removeIngredient = (idx) => {
    if (idx >= 0) {
      const array = [...selectedIngredients]
      array.splice(idx, 1)
      setSelectedIngredients(array)
    }
  }

  const subtextBottomMargin = { marginBottom: 24 }
  const ingredientsSectionPadding = { paddingBottom: 24, paddingLeft: 16, paddingRight: 16 }
  const selectedIngredientsMargin = { marginBottom: 16 }
  const marginLeftStyle = { marginLeft: 16, marginRight: 16 }

  const showBarCartCheckbox = Boolean(barCartIngredients.length > 0)
  const searchDisabled =
    !selectedIngredients.length &&
    (!barCartIngredients || !barCartIngredients.length || !addFromBarCart)
  let barCartCheckboxStyle
  if (!addFromBarCart) {
    barCartCheckboxStyle = {
      borderWidth: 1,
      borderColor: darkMode ? Colors.darkFill1Dark : Colors.darkFill1Light,
    }
  } else {
    barCartCheckboxStyle = {
      backgroundColor: Colors.blue1,
    }
  }

  return (
    <View style={styles.outerContainer}>
      <ScrollView
        style={homeStyles.scrollContainerNoHorizontalPadding}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[homeStyles.topHeader, marginLeftStyle]}>Bartender</Text>
        <Text style={[homeStyles.bartenderSubheader, marginLeftStyle]}>
          Bartender helps you discover which drinks you can create with the ingredients you already
          have on hand.
        </Text>
        <TouchableWithoutFeedback style={Helpers.fill} onPress={onBarCartClick}>
          <View style={homeStyles.bartenderBarCartOutline}>
            <Image style={homeStyles.bartenderBarCartIcon} source={Images.barCartIcon} />
            <Text style={homeStyles.bartenderBarCartText}>My Bar Cart</Text>
            <Text style={homeStyles.bartenderBarCartSubtext}>
              Keep a running list of your ingredients to quickly browse recipes you can make.
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <HomeBartenderSection
          title="Ingredients"
          number={selectedIngredients.length}
          onClick={() => {
            LayoutAnimation.configureNext(CustomLayoutEaseIn)
            setIngredientsOpen(!ingredientsOpen)
          }}
          open={ingredientsOpen}
          darkMode={darkMode}
        />
        {ingredientsOpen && (
          <View style={ingredientsSectionPadding}>
            {selectedIngredients.length === 0 ? (
              <Text style={[homeStyles.bartenderBarCartSubtext, subtextBottomMargin]}>
                You have no ingredients selected.
              </Text>
            ) : (
              <View style={[Helpers.rowStartWrap, selectedIngredientsMargin]}>
                {selectedIngredients.map((ingredient, idx) => (
                  <SelectedItem
                    key={ingredient.ingredientId}
                    title={ingredient.name}
                    darkMode={darkMode}
                    onClick={() => removeIngredient(idx)}
                  />
                ))}
              </View>
            )}
            <AddButton
              onPress={() => {
                NavigationService.navigate('IngredientsScreen', {
                  addIngredients: (ingredients) => setSelectedIngredients(ingredients),
                  selectedIngredients,
                })
              }}
            />
            {showBarCartCheckbox && (
              <TouchableWithoutFeedback onPress={() => setAddFromBarCart(!addFromBarCart)}>
                <View style={homeStyles.bartenderIncludeContainer}>
                  <View style={[homeStyles.bartenderCheckboxContainerStyle, barCartCheckboxStyle]}>
                    {addFromBarCart && (
                      <Image
                        style={homeStyles.bartenderCheckboxIcon}
                        source={Images.checkmarkBox}
                      ></Image>
                    )}
                  </View>
                  <Text
                    style={{
                      ...Fonts.body1,
                      color: darkMode ? Colors.text1Dark : Colors.text1Light,
                    }}
                  >
                    Include ingredients from my Bar Cart
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        )}
        <View style={styles.divider} />
        <HomeBartenderSection
          title="Filters"
          number={baseSpirit === NONE_SPIRIT ? 0 : 1}
          onClick={() => {
            LayoutAnimation.configureNext(CustomLayoutEaseIn)
            setFiltersOpen(!filtersOpen)
          }}
          open={filtersOpen}
          darkMode={darkMode}
        />
        {filtersOpen && (
          <ClickableTextbox
            modalText={baseSpirit === NONE_SPIRIT ? '' : baseSpirit}
            textPlaceholder={'Base Spirit'}
            onClick={onBaseSpiritClick}
            darkMode={darkMode}
          />
        )}
        <View style={styles.divider} />
        <View style={homeStyles.bufferView} />
      </ScrollView>
      <BottomBar
        buttonTitle={'Search Drinks'}
        onButtonClick={() => {
          const ingredientIds = [
            ...(addFromBarCart ? barCartIngredients.map((i) => i.ingredientId) : []),
            ...selectedIngredients.map((i) => i.ingredientId),
          ]
          NavigationService.navigate('ResultsScreen', {
            ingredientIds: ingredientIds,
            baseSpirit: baseSpirit === NONE_SPIRIT ? '' : baseSpirit,
          })
        }}
        darkMode={darkMode}
        disabled={searchDisabled}
      />
    </View>
  )
}

HomeBartenderTab.propTypes = {
  setSelectedIngredients: PropTypes.func,
  selectedIngredients: PropTypes.array,
  onBarCartClick: PropTypes.func,
  barCartIngredients: PropTypes.array,
  baseSpirit: PropTypes.string,
  onBaseSpiritClick: PropTypes.func,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(HomeBartenderTab)
