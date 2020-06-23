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

function HomeLibraryTab(props) {
  const { recipes, onNewRecipeClick } = props
  const darkMode = useDarkMode()
  const styles = getStylesheet(darkMode)
  const homeStyles = getHomeStylesheet(darkMode)

  const [selected, setSelected] = useState(0)

  const listHeader = <Text style={homeStyles.topHeaderLibrary}>Library</Text>

  let options = []
  if (selected === 0) {
    options = recipes.filter((recipe) => recipe.favorited)
  } else {
    options = recipes
  }

  const emptyTextToShow =
    selected === 0
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
      contentContainerStyle={{ flexGrow: 1 }}
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
                onSectionClick={(idx) => setSelected(idx)}
                selected={selected}
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
            onCardClick={(campaign) => {
              NavigationService.navigate('TutorialScreen', {
                recipe: item,
              })
            }}
            darkMode={darkMode}
          />
        )
      }}
      style={{ width: '100%' }}
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

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(HomeLibraryTab)
