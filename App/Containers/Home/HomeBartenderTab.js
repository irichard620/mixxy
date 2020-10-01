import { ScrollView, Text, View, TouchableWithoutFeedback, Image } from 'react-native'
import getStylesheet from '../../Theme/ApplicationStyles'
import React, { useState } from 'react'
import getHomeStylesheet from './HomeScreenStyle'
import { useDarkMode } from 'react-native-dark-mode'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import NavigationService from '../../Services/NavigationService'
import BottomBar from '../../Components/BottomBar'
import AddButton from '../../Components/AddButton'
import SelectedItem from '../../Components/SelectedItem'
import Colors from '../../Theme/Colors'
import Images from '../../Theme/Images'
import Helpers from '../../Theme/Helpers'

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
            <Text>{number}</Text>
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
  const { setSelectedIngredients, selectedIngredients, onBarCartClick, barCartIngredients } = props
  const darkMode = useDarkMode()
  const styles = getStylesheet(darkMode)
  const homeStyles = getHomeStylesheet(darkMode)

  const [ingredientsOpen, setIngredientsOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const removeIngredient = (idx) => {
    if (idx >= 0) {
      const array = [...selectedIngredients]
      array.splice(idx, 1)
      setSelectedIngredients(array)
    }
  }

  const subtextBottomMargin = { marginBottom: 24 }
  const ingredientsSectionPadding = { paddingBottom: 24 }
  const selectedIngredientsMargin = { marginBottom: 16 }

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={homeStyles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={homeStyles.topHeader}>Bartender</Text>
        <Text style={homeStyles.bartenderSubheader}>
          Bartender helps you discover which drinks you can create with the ingredients you already
          have on hand.
        </Text>
        <TouchableWithoutFeedback style={Helpers.fill} onPress={onBarCartClick}>
          <View style={homeStyles.bartenderBarCartOutline}>
            <View style={homeStyles.bartenderBarCartIcon} />
            <Text style={homeStyles.bartenderBarCartText}>My Bar Cart</Text>
            <Text style={homeStyles.bartenderBarCartSubtext}>
              Keep a running list of your ingredients to quickly browse recipes you can make.
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <HomeBartenderSection
          title="Ingredients"
          number={selectedIngredients.length}
          onClick={() => setIngredientsOpen(!ingredientsOpen)}
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
          </View>
        )}
        <View style={styles.divider} />
        <HomeBartenderSection
          title="Filters"
          number={0}
          onClick={() => setFiltersOpen(!filtersOpen)}
          open={filtersOpen}
          darkMode={darkMode}
        />
        <View style={styles.divider} />
        <View style={homeStyles.bufferView} />
      </ScrollView>
      <BottomBar
        buttonTitle={'Search Drinks'}
        onButtonClick={() => {
          const ingredientIds = [
            ...barCartIngredients.map((i) => i.ingredientId),
            ...selectedIngredients.map((i) => i.ingredientId),
          ]
          NavigationService.navigate('ResultsScreen', {
            ingredientIds: ingredientIds,
          })
        }}
        darkMode={darkMode}
        disabled={!selectedIngredients.length && !barCartIngredients.length}
      />
    </View>
  )
}

HomeBartenderTab.propTypes = {
  setSelectedIngredients: PropTypes.func,
  selectedIngredients: PropTypes.array,
  onBarCartClick: PropTypes.func,
  barCartIngredients: PropTypes.array,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(HomeBartenderTab)