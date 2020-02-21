import React from 'react'
import { ScrollView, Text } from 'react-native'
import { useDynamicStyleSheet, useDarkMode } from 'react-native-dark-mode'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { SafeAreaView } from "react-navigation"
import DynamicStyles from 'App/Theme/ApplicationStyles'
import HomeStyles from './HomeScreenStyle'
import RecipeCard from '../../Components/RecipeCard'
import UserActions from 'App/Stores/User/Actions'


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteRecipes: [
        {
          recipeId: '54750894510870724860',
          recipeName: 'Manhattan',
          recipeType: 'Whiskey Cocktail'
        }
      ],
      favoriteExpanded: false,
      allRecipes: [
        {
          recipeId: '54750894510870724860',
          recipeName: 'Manhattan',
          recipeType: 'Whiskey Cocktail'
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

  renderCard = (idx, item) => {
    return (
      <RecipeCard
        key={item.recipeId}
        index={idx}
        recipeName={''}
        recipeType={''}
        disabled={false}
        onCardClick={this.onCardClick}
      />
    );
  }

  render() {
    const { user } = this.props;
    const { favoriteRecipes, favoriteExpanded, allRecipes, allExpanded } = this.state;
    const isDarkMode = useDarkMode()
    console.log(isDarkMode)
    const styles = useDynamicStyleSheet(DynamicStyles)
    const homeStyles = useDynamicStyleSheet(HomeStyles)

    return (
      <SafeAreaView forceInset={{ bottom: 'never' }} style={styles.outerContainer}>
        <ScrollView style={homeStyles.scrollContainer}>
          <Text style={homeStyles.topHeader}>Good Morning!</Text>
          <Text style={homeStyles.sectionHeader}>Favorites</Text>
          {favoriteRecipes.map((favorite, idx) => {
            if (idx < 5 || favoriteExpanded) {
              return this.renderCard(idx, favorite)
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
)(HomeScreen)
