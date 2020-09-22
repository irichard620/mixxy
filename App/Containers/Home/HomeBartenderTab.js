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

  const iconTransformStyle = open ? { transform: [{ rotate: '180deg' }] } : {}
  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={onClick}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'nowrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: 16,
          height: 50,
        }}
      >
        <Text style={homeStyles.bartenderSectionText}>{title}</Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={[
              {
                width: 42,
                height: 30,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              },
              badgeBackgroundStyle,
            ]}
          >
            <Text>{number}</Text>
          </View>
          <Image
            style={[{ height: 12, resizeMode: 'contain' }, iconTransformStyle]}
            source={arrowIcon}
          />
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
  //   const {} = props
  const darkMode = useDarkMode()
  const styles = getStylesheet(darkMode)
  const homeStyles = getHomeStylesheet(darkMode)

  const [ingredientsOpen, setIngredientsOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedIngredients, setSelectedIngredients] = useState([])

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={homeStyles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={homeStyles.topHeader}>Bartender</Text>
        <Text style={homeStyles.bartenderSubheader}>
          Bartender helps you discover which drinks you can create with the ingredients you already
          have on hand.
        </Text>
        <View style={homeStyles.bartenderBarCartOutline}>
          <View style={homeStyles.bartenderBarCartIcon} />
          <Text style={homeStyles.bartenderBarCartText}>My Bar Cart</Text>
          <Text style={homeStyles.bartenderBarCartSubtext}>
            Keep a running list of your ingredients to quickly browse recipes you can make.
          </Text>
        </View>
        <HomeBartenderSection
          title="Ingredients"
          number={selectedIngredients.length}
          onClick={() => setIngredientsOpen(!ingredientsOpen)}
          open={ingredientsOpen}
          darkMode={darkMode}
        />
        {ingredientsOpen && (
          <View style={{ paddingBottom: 24 }}>
            {selectedIngredients.length === 0 ? (
              <Text style={[homeStyles.bartenderBarCartSubtext, { marginBottom: 24 }]}>
                You have no ingredients selected.
              </Text>
            ) : (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 }}>
                {selectedIngredients.map((ingredient) => (
                  <SelectedItem
                    key={ingredient.ingredientId}
                    title={ingredient.name}
                    darkMode={darkMode}
                    onClick={() => {}}
                  />
                ))}
              </View>
            )}
            <AddButton
              onPress={() => {
                NavigationService.navigate('IngredientsScreen', {
                  addIngredients: (ingredients) => setSelectedIngredients(ingredients),
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
      <BottomBar buttonTitle={'Search Drinks'} onButtonClick={() => {}} darkMode={darkMode} />
    </View>
  )
}

HomeBartenderTab.propTypes = {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(HomeBartenderTab)
