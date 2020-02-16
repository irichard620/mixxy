import React from 'react'
import { ScrollView } from 'react-native'
import { useDynamicStyleSheet } from 'react-native-dark-mode'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { SafeAreaView } from "react-navigation"
import DynamicStyles from 'App/Theme/ApplicationStyles'
import HomeStyles from './HomeScreenStyle'
import RecipeCard from '../../Components/RecipeCard'


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteRecipes: [],
      allRecipes: [],
    };
  }

  componentDidMount() {
    this._fetchUser()
  }

  renderCard = (idx, item) => {
    return (
      <RecipeCard
        key={item.recipeId}
        index={idx}
        disabled={false}
        onCardClick={this.onCardClick}
      />
    );
  }

  render() {
    const { favoriteRecipes, allRecipes } = this.state;
    const styles = useDynamicStyleSheet(DynamicStyles)
    const homeStyles = useDynamicStyleSheet(HomeStyles)
    return (
      <SafeAreaView forceInset={{ bottom: 'never' }} style={styles.outerContainer}>
        <ScrollView style={homeStyles.scrollContainer}>
          <Text style={homeStyles.topHeader}>Good Morning, Ian.</Text>
          <Text style={homeStyles.sectionHeader}>Favorites</Text>
          {favoriteRecipes.map((favorite, idx) => (
            this.renderCard(idx, favorite)
          ))}
          <Text style={homeStyles.sectionHeader}>All Recipes</Text>
          {allRecipes.map((recipe, idx) => (
            this.renderCard(idx, recipe)
          ))}
        </ScrollView>
      </SafeAreaView>
    )
  }

  _fetchUser() {
    this.props.fetchUser()
  }
}

HomeScreen.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchUser: PropTypes.func,
  liveInEurope: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  userErrorMessage: state.example.userErrorMessage,
  liveInEurope: liveInEurope(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
