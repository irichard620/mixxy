import React from 'react'
import { SectionList, Text, View, Alert } from 'react-native'
import { connect } from 'react-redux'
import NavigationService from '../../Services/NavigationService'
import getStylesheet from '../../Theme/ApplicationStyles'
import getBartenderStylesheet from './BartenderStyle'
import TopHeader from '../../Components/TopHeader'
import { NavigationActions } from 'react-navigation'
import IngredientActions from '../../Stores/Ingredient/Actions'
import { PropTypes } from 'prop-types'
import RecipeCard from '../../Components/RecipeCard'

class ResultsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    this.props.fetchBartenderRecipes(this.props.ingredientIds)
  }

  componentDidUpdate(prevProps) {
    const {
      bartenderRecipes,
      fetchBartenderRecipesIsLoading,
      fetchBartenderRecipesErrorMessage,
    } = this.props
    if (prevProps.fetchBartenderRecipesIsLoading && !fetchBartenderRecipesIsLoading) {
      if (fetchBartenderRecipesErrorMessage) {
        // Show error and nav back on ack
        Alert.alert('Error', fetchBartenderRecipesErrorMessage, [
          {
            text: 'Ok',
            onPress: () => {
              this.onBackPress()
            },
          },
        ])
      } else {
        // Set recipe state to details
        const recipeDict = {}
        for (let recipe of bartenderRecipes) {
          if (recipe.missingCount in recipeDict) {
            recipeDict[recipe.missingCount] = [recipe]
          } else {
            recipeDict[recipe.missingCount].push(recipe)
          }
        }
        const data = []
        if (0 in recipeDict) {
          data.push({
            title: 'Available now',
            data: recipeDict[0],
          })
        }
        if (1 in recipeDict) {
          data.push({
            title: '1 ingredient needed',
            data: recipeDict[1],
          })
        }
        if (2 in recipeDict) {
          data.push({
            title: '2 ingredients needed',
            data: recipeDict[2],
          })
        }
        if (3 in recipeDict) {
          data.push({
            title: '3 ingredients needed',
            data: recipeDict[3],
          })
        }
        if (4 in recipeDict) {
          data.push({
            title: '4 ingredients needed',
            data: recipeDict[4],
          })
        }
        this.setState({ data: data })
      }
    }
  }

  onBackScreenClick = () => {
    const { navigation } = this.props
    navigation.dispatch(NavigationActions.back())
  }

  onListItemClick = (ingredient) => {
    const { selectedIngredients } = this.state
    let foundIndex = null
    for (let i = 0; i < selectedIngredients.length; i++) {
      if (selectedIngredients[i].ingredientId === ingredient.ingredientId) {
        foundIndex = i
        break
      }
    }
    if (foundIndex === null) {
      this.setState({
        selectedIngredients: [...selectedIngredients, ingredient],
      })
    } else {
      const splicedArray = [...selectedIngredients]
      splicedArray.splice(foundIndex, 1)
      this.setState({
        selectedIngredients: splicedArray,
      })
    }
  }

  render() {
    const { darkMode } = this.props
    const { data } = this.state
    const styles = getStylesheet(darkMode)
    const bartenderStyles = getBartenderStylesheet(darkMode)

    return (
      <View style={styles.outerContainer}>
        <TopHeader
          title={'Results'}
          onClose={this.onBackScreenClick}
          showSeparator={true}
          darkMode={darkMode}
        />
        <SectionList
          sections={data}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
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
          )}
          style={{ width: '100%' }}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={bartenderStyles.sectionHeader}>{title}</Text>
          )}
        />
      </View>
    )
  }
}

ResultsScreen.propTypes = {
  darkMode: PropTypes.bool,
  bartenderRecipes: PropTypes.array,
  fetchBartenderRecipes: PropTypes.func,
  fetchBartenderRecipesIsLoading: PropTypes.bool,
  fetchBartenderRecipesErrorMessage: PropTypes.string,
  ingredientIds: PropTypes.array,
  navigation: PropTypes.object,
}

const mapStateToProps = (state) => ({
  bartenderRecipes: state.recipes.ingredients,
  fetchBartenderRecipesIsLoading: state.recipes.fetchBartenderRecipesIsLoading,
  fetchBartenderRecipesErrorMessage: state.recipes.fetchBartenderRecipesErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchBartenderRecipes: (ingredientIds) =>
    dispatch(IngredientActions.fetchIngredients(ingredientIds)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(ResultsScreen))
