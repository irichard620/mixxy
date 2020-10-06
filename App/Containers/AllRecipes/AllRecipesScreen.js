import { PropTypes } from 'prop-types'
import SearchBar from 'react-native-search-bar'
import { Alert, FlatList, View } from 'react-native'
import React from 'react'
import RecipeActions from '../../Stores/Recipe/Actions'
import { connect } from 'react-redux'
import NavigationService from '../../Services/NavigationService'
import RecipeCard from '../../Components/RecipeCard'
import getAllRecipesStylesheet from './AllRecipesStyle'
import getStylesheet from '../../Theme/ApplicationStyles'
import TopHeader from '../../Components/TopHeader'
import { NavigationActions } from 'react-navigation'

class AllRecipesScreen extends React.Component {
  constructor(props) {
    super(props)
    this.searchBar = React.createRef()
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    const { fetchRemoteRecipes } = this.props
    fetchRemoteRecipes()
  }

  componentDidUpdate(prevProps) {
    const {
      remoteRecipes,
      fetchRemoteRecipesIsLoading,
      fetchRemoteRecipesErrorMessage,
    } = this.props
    if (prevProps.fetchRemoteRecipesIsLoading && !fetchRemoteRecipesIsLoading) {
      if (fetchRemoteRecipesErrorMessage) {
        // Show error and nav back on ack
        Alert.alert('Error', fetchRemoteRecipesErrorMessage, [
          {
            text: 'Ok',
            onPress: () => {
              this.onBackPress()
            },
          },
        ])
      } else {
        // Set sponsor state to details
        this.setState({ data: remoteRecipes })
      }
    }
  }

  onBackScreenClick = () => {
    const { navigation } = this.props
    navigation.dispatch(NavigationActions.back())
  }

  renderHeader = () => {
    const { darkMode } = this.props
    const styles = getStylesheet(darkMode)
    const allRecipesStyles = getAllRecipesStylesheet(darkMode)
    return (
      <View>
        <SearchBar
          ref={this.searchBar}
          placeholder="Search"
          lightTheme
          round
          onChangeText={(text) => this.searchFilterFunction(text)}
          autoCorrect={false}
          searchBarStyle={'minimal'}
          onSearchButtonPress={() => this.searchBar && this.searchBar.current.unFocus()}
        />
        <View style={styles.divider} />
        <View style={allRecipesStyles.bufferView} />
      </View>
    )
  }

  searchFilterFunction = (text) => {
    const { remoteRecipes } = this.props
    const newData = remoteRecipes.filter((item) => {
      const itemData = `${item.recipeName.toUpperCase()}`
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })

    this.setState({ data: newData })
  }

  render() {
    const { darkMode } = this.props
    const { data } = this.state
    const styles = getStylesheet(darkMode)
    const allRecipesStyles = getAllRecipesStylesheet(darkMode)
    return (
      <View style={styles.outerContainer}>
        <TopHeader
          title={'All Recipes'}
          onClose={this.onBackScreenClick}
          showSeparator={false}
          darkMode={darkMode}
        />
        <FlatList
          data={data}
          keyExtractor={(item) => item.recipeId}
          onScrollBeginDrag={() => this.searchBar && this.searchBar.current.unFocus()}
          renderItem={({ item }) => (
            <RecipeCard
              recipeName={item.recipeName}
              recipeType={item.recipeType}
              servingGlass={item.servingGlass}
              onCardClick={() => {
                this.searchBar && this.searchBar.current.unFocus()
                NavigationService.navigate('TutorialScreen', {
                  recipe: item,
                })
              }}
              darkMode={darkMode}
            />
          )}
          style={allRecipesStyles.recipeListOutline}
          contentContainerStyle={allRecipesStyles.recipeListContainer}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    )
  }
}

AllRecipesScreen.propTypes = {
  darkMode: PropTypes.bool,
  remoteRecipes: PropTypes.array,
  fetchRemoteRecipes: PropTypes.func,
  fetchRemoteRecipesIsLoading: PropTypes.bool,
  fetchRemoteRecipesErrorMessage: PropTypes.string,
  navigation: PropTypes.object,
}

const mapStateToProps = (state) => ({
  remoteRecipes: state.recipes.remoteRecipes,
  fetchRemoteRecipesIsLoading: state.recipes.fetchRemoteRecipesIsLoading,
  fetchRemoteRecipesErrorMessage: state.recipes.fetchRemoteRecipesErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchRemoteRecipes: () => dispatch(RecipeActions.fetchRemoteRecipes(null, null, null)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(AllRecipesScreen))
