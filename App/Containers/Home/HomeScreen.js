import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { SafeAreaView } from "react-navigation"
import getStylesheet from '../../Theme/ApplicationStyles'
import getHomeStylesheet from './HomeScreenStyle'
import RecipeCard from '../../Components/RecipeCard'
import NavigationService from '../../Services/NavigationService'
import RecipeActions from '../../Stores/Recipe/Actions'


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteExpanded: false,
      allExpanded: false,
    };
  }

  componentDidMount() {
    this.props.fetchRecipes()
  }

  onFavoriteExpansion = () => {
    const { favoriteExpanded } = this.state
    this.setState({
      favoriteExpanded: !favoriteExpanded
    })
  }

  onAllExpansion = () => {
    const { allExpanded } = this.state
    this.setState({
      allExpanded: !allExpanded
    })
  }

  onCardClick = (idx, isFavorite) => {
    const { favoriteRecipes, allRecipes } = this.state;
    let recipesToUse = favoriteRecipes
    if (!isFavorite) {
      recipesToUse = allRecipes
    }
    NavigationService.navigate('TutorialScreen', {
      recipe: recipesToUse[idx]
    })
  }

  onBuilderClick = () => {
    NavigationService.navigate('BuilderScreen', {})
  }

  renderCard = (idx, item, isFavorite) => {
    return (
      <RecipeCard
        key={item.recipeId}
        recipeName={item.recipeName}
        recipeType={item.recipeType}
        disabled={false}
        onCardClick={() => this.onCardClick(idx, isFavorite)}
        darkMode={this.props.darkMode}
      />
    );
  }

  render() {
    const { darkMode, recipes } = this.props;
    const { favoriteExpanded, allExpanded } = this.state;
    const styles = getStylesheet(darkMode)
    const homeStyles = getHomeStylesheet(darkMode)

    // Get favorite recipes
    const favoriteRecipes = []
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].favorited) {
        favoriteRecipes.push(recipes[i])
      }
    }

    return (
      <SafeAreaView forceInset={{ bottom: 'never' }} style={styles.outerContainer}>
        <ScrollView style={homeStyles.scrollContainer}>
          <Text style={homeStyles.topHeader}>Good Morning!</Text>
          <TouchableOpacity style={homeStyles.sponsor} onPress={this.onBuilderClick} />
          <Text style={homeStyles.sectionHeader}>Favorites</Text>
          {favoriteRecipes.map((favorite, idx) => {
            if (idx < 5 || favoriteExpanded) {
              return this.renderCard(idx, favorite, true)
            }
            return null
          })}
          <Text style={homeStyles.sectionHeader}>All Recipes</Text>
          {recipes.map((recipe, idx) => {
            if (idx < 5 || allExpanded) {
              return this.renderCard(idx, recipe)
            }
            return null
          })}
        </ScrollView>
      </SafeAreaView>
    )
  }
}

HomeScreen.propTypes = {
  recipes: PropTypes.array,
  fetchRecipesIsLoading: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  recipes: state.recipes.recipes,
  fetchRecipesIsLoading: state.recipes.fetchRecipesIsLoading,
})

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: () => dispatch(RecipeActions.fetchRecipes()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(HomeScreen))
