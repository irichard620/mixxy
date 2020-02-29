import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { SafeAreaView } from "react-navigation"
import getStylesheet from 'App/Theme/ApplicationStyles'
import getHomeStylesheet from './HomeScreenStyle'
import RecipeCard from '../../Components/RecipeCard'
import NavigationService from '../../Services/NavigationService'
import { Recipe } from '../../Storage/Recipe'


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteRecipes: [
        Recipe({
          recipeId: '54750894510870724860',
          recipeName: 'Manhattan',
          recipeType: 'Whiskey Cocktail',
          servingGlass: 'Cocktail Glass',
          recipeDescription: 'The Manhattan was the most famous cocktail in the world shortly after it was invented in New York City’s Manhattan Club, some time around 1880 (as the story goes). Over the years, the whiskey classic has dipped in and out of fashion before finding its footing as one of the cornerstones of the craft cocktail renaissance. Amazingly, the drink that socialites tipped to their lips in the 19th century looks and tastes pretty much the same as the one served today at any decent cocktail bar. The Manhattan’s mix of American whiskey and Italian vermouth, perked up with a few dashes of aromatic bitters, is timeless and tasty—the very definition of what a cocktail should be.',
          steps: [
            {
              title: 'Add Ingredients',
              properties: {
                ingredients: [{
                  title: "Silver Tequila",
                  amount: "2",
                  fractionalAmount: "",
                  amountType: "Ounces"
                }],
                vessel: 'Cocktail Shaker'
              }
            },
            {
              title: 'Shake',
              properties: {
                seconds: 20
              }
            }
          ]
        })
      ],
      favoriteExpanded: false,
      allRecipes: [
        {
          recipeId: '54750894510870724860',
          recipeName: 'Manhattan',
          recipeType: 'Whiskey Cocktail',
          steps: [
            {
              title: 'Heat water'
            }
          ]
        }
      ],
      allExpanded: false,
    };
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
    const { darkMode } = this.props;
    const { favoriteRecipes, favoriteExpanded, allRecipes, allExpanded } = this.state;
    const styles = getStylesheet(darkMode)
    const homeStyles = getHomeStylesheet(darkMode)

    return (
      <SafeAreaView forceInset={{ bottom: 'never' }} style={styles.outerContainer}>
        <ScrollView style={homeStyles.scrollContainer}>
          <Text style={homeStyles.topHeader}>Good Morning!</Text>
          <View style={homeStyles.sponsor} />
          <Text style={homeStyles.sectionHeader}>Favorites</Text>
          {favoriteRecipes.map((favorite, idx) => {
            if (idx < 5 || favoriteExpanded) {
              return this.renderCard(idx, favorite, true)
            }
            return null
          })}
          <Text style={homeStyles.sectionHeader}>All Recipes</Text>
          {allRecipes.map((recipe, idx) => {
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
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  userErrorMessage: state.example.userErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  // fetchUser: () => dispatch(UserActions.fetchUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(HomeScreen))
