import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { FlatList, Text, View } from 'react-native'
import React, { useState } from 'react'
import getStylesheet from '../../Theme/ApplicationStyles'
import { useDarkMode } from 'react-native-dark-mode'
import getHomeStylesheet from './HomeScreenStyle'
import RecipeCard from '../../Components/RecipeCard'
import NavigationService from '../../Services/NavigationService'
import HomeLibraryMenuButtons from './HomeLibraryMenuButtons'
import Helpers from '../../Theme/Helpers'
import { FAVORITES_FILTER, ALL_RECIPES_FILTER } from '../../Config/constants'

function HomeLibraryTab(props) {
  const { recipes, onNewRecipeClick } = props
  const darkMode = useDarkMode()
  const styles = getStylesheet(darkMode)
  const homeStyles = getHomeStylesheet(darkMode)

  const [selected, setSelected] = useState(FAVORITES_FILTER)

  const listHeader = <Text style={homeStyles.topHeaderLibrary}>Library</Text>

  // Generate filter options
  const filterDict = {}
  filterDict[FAVORITES_FILTER] = []
  let recipe
  for (recipe of recipes) {
    // Base spirit
    if (recipe.baseSpirit in filterDict) {
      filterDict[recipe.baseSpirit].push(recipe)
    } else {
      filterDict[recipe.baseSpirit] = [recipe]
    }

    // Favorited
    if (recipe.favorited) {
      filterDict[FAVORITES_FILTER].push(recipe)
    }
  }
  let options
  if (selected === ALL_RECIPES_FILTER) {
    options = recipes
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

  return (
    <FlatList
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
