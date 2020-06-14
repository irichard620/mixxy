import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { FlatList, Text, View, Alert } from 'react-native'
import React, { useState } from 'react'
import getStylesheet from '../../Theme/ApplicationStyles'
import { useDarkMode } from 'react-native-dark-mode'
import getHomeStylesheet from './HomeScreenStyle'
import RecipeCard from '../../Components/RecipeCard'
import NavigationService from '../../Services/NavigationService'
import HomeLibraryMenuButtons from './HomeLibraryMenuButtons'

function HomeLibraryTab(props) {
  const { recipes, user } = props
  const darkMode = useDarkMode()
  const styles = getStylesheet(darkMode)
  const homeStyles = getHomeStylesheet(darkMode)

  const [selected, setSelected] = useState(0)

  const onNewRecipeClick = () => {
    if (!user.premium) {
      Alert.alert(
        'Mixxy Pro Feature',
        'The ability to create custom recipes is a Mixxy Pro feature.',
        [
          {
            text: 'OK',
          },
        ]
      )
      return
    }
    NavigationService.navigate('BuilderScreen', {})
  }

  const listHeader = (
    <React.Fragment>
      <View style={homeStyles.libraryHeaderOutline}>
        <Text style={homeStyles.topHeaderLibrary}>Library</Text>
        <HomeLibraryMenuButtons
          darkMode={darkMode}
          onNewRecipeClick={onNewRecipeClick}
          onSectionClick={(idx) => setSelected(idx)}
          selected={selected}
        />
        <View style={styles.divider} />
      </View>
      <View style={styles.buffer24} />
    </React.Fragment>
  )

  const emptyTextToShow =
    selected === 0
      ? "You haven't added any recipes to your Favorites."
      : "You haven't added any recipes to your library. Visit the Discover page to find some!"
  const listEmpty = (
    <View style={homeStyles.emptyContainer}>
      <Text style={homeStyles.emptyText}>{emptyTextToShow}</Text>
    </View>
  )

  let options = []
  if (selected === 0) {
    options = recipes.filter((recipe) => recipe.favorited)
  } else {
    options = recipes
  }

  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1 }}
      data={options}
      keyExtractor={(recipe) => recipe.recipeId}
      renderItem={({ item }) => (
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
      )}
      style={{ width: '100%' }}
      ListHeaderComponent={listHeader}
      ListEmptyComponent={listEmpty}
      stickyHeaderIndices={[0]}
    />
  )
}

HomeLibraryTab.propTypes = {
  recipes: PropTypes.array,
  user: PropTypes.object,
}

const mapStateToProps = (state) => ({
  recipes: state.recipes.recipes,
  recipesIsLoading: state.recipes.recipesIsLoading,
  user: state.user.user,
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(HomeLibraryTab)
