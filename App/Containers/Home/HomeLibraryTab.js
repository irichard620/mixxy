import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { Animated, Text, View } from 'react-native'
import React, { useState } from 'react'
import getStylesheet from '../../Theme/ApplicationStyles'
import { useDarkMode } from 'react-native-dark-mode'
import getHomeStylesheet from './HomeScreenStyle'
import RecipeCard from '../../Components/RecipeCard'
import BottomBarV2 from '../../Components/BottomBarV2'
import NavigationService from '../../Services/NavigationService'
import HomeLibraryMenuButtons from './HomeLibraryMenuButtons'
import AnimatedHeader from '../../Components/AnimatedHeader'
import Helpers from '../../Theme/Helpers'
import { FAVORITES_FILTER, ALL_RECIPES_FILTER, drinkTypeFilterNames } from '../../Config/constants'

function HomeLibraryTab(props) {
  const { recipes, onNewRecipeClick } = props
  // eslint-disable-next-line no-unused-vars
  const [scrollY, _setScrollY] = useState(new Animated.Value(0))
  const darkMode = useDarkMode()
  const styles = getStylesheet(darkMode)
  const homeStyles = getHomeStylesheet(darkMode)

  const [selected, setSelected] = useState(FAVORITES_FILTER)

  const _getHeaderTextColor = () => {
    const outputFinal = !darkMode ? 'rgba(0,0,0,1.0)' : 'rgba(255,255,255,1.0)'
    const outputStart = !darkMode ? 'rgba(0,0,0,0.0)' : 'rgba(255,255,255,0.0)'
    return scrollY.interpolate({
      inputRange: [0, 48],
      outputRange: [outputStart, outputFinal],
      extrapolate: 'clamp',
      useNativeDriver: true,
    })
  }

  const _getPageTitleTextColor = () => {
    const outputFinal = !darkMode ? 'rgba(0,0,0,0.0)' : 'rgba(255,255,255,0.0)'
    const outputStart = !darkMode ? 'rgba(0,0,0,1.0)' : 'rgba(255,255,255,1.0)'
    return scrollY.interpolate({
      inputRange: [0, 48],
      outputRange: [outputStart, outputFinal],
      extrapolate: 'clamp',
      useNativeDriver: true,
    })
  }

  const _getHeaderDividerBackgroundColor = () => {
    const outputFinal = darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
    const outputStart = darkMode ? 'rgba(255,255,255,0.0)' : 'rgba(0,0,0,0.0)'
    return scrollY.interpolate({
      inputRange: [0, 48],
      outputRange: [outputStart, outputFinal],
      extrapolate: 'clamp',
      useNativeDriver: true,
    })
  }

  // Generate filter options
  const filterDict = {}
  filterDict[FAVORITES_FILTER] = []
  let recipe
  for (recipe of recipes) {
    let filterNameToUse = recipe.baseSpirit
    if (!filterNameToUse || filterNameToUse === '') {
      filterNameToUse = drinkTypeFilterNames[recipe.recipeType]
    }

    if (filterNameToUse in filterDict) {
      filterDict[filterNameToUse].push(recipe)
    } else {
      filterDict[filterNameToUse] = [recipe]
    }

    // Favorited
    if (recipe.favorited) {
      filterDict[FAVORITES_FILTER].push(recipe)
    }
  }
  let options
  if (selected === ALL_RECIPES_FILTER) {
    options = recipes
  } else if (!(selected in filterDict)) {
    options = recipes
    setSelected(ALL_RECIPES_FILTER)
  } else {
    options = filterDict[selected]
  }

  // What menu items are visible
  const filterOptions = [FAVORITES_FILTER, ALL_RECIPES_FILTER]
  let key
  for (key in filterDict) {
    if (key !== FAVORITES_FILTER) {
      filterOptions.push(key)
    }
  }

  const emptyTextToShow =
    selected === FAVORITES_FILTER
      ? "You haven't added any recipes to your Favorites."
      : "You haven't added any recipes to your library. Visit the Discover page to find some!"
  const listEmpty =
    options.length === 0 ? (
      <View style={homeStyles.emptyContainer}>
        <Text style={homeStyles.emptyText}>{emptyTextToShow}</Text>
      </View>
    ) : null

  const titleColor = { color: _getPageTitleTextColor() }
  const paddingStyle = { paddingLeft: 16, paddingRight: 16, paddingTop: 8 }
  const listHeader = (
    <Animated.Text style={[homeStyles.topHeader, paddingStyle, titleColor]}>Library</Animated.Text>
  )

  return (
    <View style={styles.outerContainer}>
      <AnimatedHeader
        title="Library"
        darkMode={darkMode}
        dividerBackgroundColor={_getHeaderDividerBackgroundColor()}
        textColor={_getHeaderTextColor()}
      />
      <Animated.FlatList
        overScrollMode={'never'}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ])}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={Helpers.flexGrowStyle}
        data={[{ item: 'menu' }, { item: 'space' }, ...options]}
        keyExtractor={(item, index) => {
          if (index === 0) {
            return 'menu-buttons'
          } else if (index === 1) {
            return 'buffer'
          }
          return item.recipeId
        }}
        renderItem={({ item, index }) => {
          if (index === 0) {
            return (
              <View style={homeStyles.libraryHeaderOutline}>
                <HomeLibraryMenuButtons
                  darkMode={darkMode}
                  onNewRecipeClick={onNewRecipeClick}
                  onSectionClick={(option) => setSelected(option)}
                  selected={selected}
                  options={filterOptions}
                />
                <View style={styles.divider} />
              </View>
            )
          } else if (index === 1) {
            return <View style={styles.buffer24} />
          }
          return (
            <RecipeCard
              recipeName={item.recipeName}
              recipeType={item.recipeType}
              servingGlass={item.servingGlass}
              onCardClick={() => {
                NavigationService.navigate('TutorialScreen', {
                  recipe: item,
                })
              }}
              darkMode={darkMode}
            />
          )
        }}
        style={Helpers.fullWidth}
        ListHeaderComponent={listHeader}
        ListFooterComponent={listEmpty}
        stickyHeaderIndices={[1]}
      />
      <BottomBarV2
        buttonTitle={'Create'}
        onButtonClick={onNewRecipeClick}
        darkMode={darkMode}
        disabled={false}
      />
    </View>
  )
}

HomeLibraryTab.propTypes = {
  recipes: PropTypes.array,
  onNewRecipeClick: PropTypes.func,
}

const mapStateToProps = (state) => ({
  recipes: state.recipes.recipes,
  recipesIsLoading: state.recipes.recipesIsLoading,
  user: state.user.user,
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(HomeLibraryTab)
