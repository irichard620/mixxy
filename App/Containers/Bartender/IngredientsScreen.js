import React from 'react'
import { Dimensions, FlatList, Text, View, Alert } from 'react-native'
import { connect } from 'react-redux'
import NavigationService from '../../Services/NavigationService'
import getStylesheet from '../../Theme/ApplicationStyles'
import LinearGradient from 'react-native-linear-gradient'
import TopHeader from '../../Components/TopHeader'
import BottomBar from '../../Components/BottomBar'
import { NavigationActions } from 'react-navigation'
import IngredientActions from '../../Stores/Ingredient/Actions'
import { PropTypes } from 'prop-types'
import ListItem from '../../Components/ListItem'

class IngredientsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.searchBar = React.createRef()
    this.state = {
      data: [],
      selectedIngredients: [],
    }
  }

  componentDidMount() {
    this.props.fetchIngredients()
  }

  componentDidUpdate(prevProps) {
    const { ingredients, ingredientsIsLoading, ingredientsErrorMessage } = this.props
    if (prevProps.ingredientsIsLoading && !ingredientsIsLoading) {
      if (ingredientsErrorMessage) {
        // Show error and nav back on ack
        Alert.alert('Error', ingredientsErrorMessage, [
          {
            text: 'Ok',
            onPress: () => {
              this.onBackPress()
            },
          },
        ])
      } else {
        // Set ingredient state to details
        this.setState({ data: ingredients })
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

  onAddIngredientsClick = () => {
    const { navigation } = this.props
    const { selectedIngredients } = this.state
    navigation.getParam('addIngredients')(selectedIngredients)
    navigation.dispatch(NavigationActions.back())
  }

  render() {
    const { darkMode } = this.props
    const { data, selectedIngredients } = this.state
    const styles = getStylesheet(darkMode)

    const selectedIngredientDict = {}
    for (let item of selectedIngredients) {
      selectedIngredientDict[item.ingredientId] = true
    }
    return (
      <View style={styles.outerContainer}>
        <TopHeader
          title={'Ingredients'}
          onClose={this.onBackScreenClick}
          showSeparator={true}
          darkMode={darkMode}
        />
        <FlatList
          data={data}
          keyExtractor={(item) => item.recipeId}
          // onScrollBeginDrag={() => this.searchBar && this.searchBar.current.unFocus()}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              onClick={() => this.onListItemClick(item)}
              darkMode={darkMode}
              selected={item.ingredientId in selectedIngredientDict}
            />
          )}
          style={{ width: '100%' }}
          ListHeaderComponent={this.renderHeader}
        />
        <BottomBar
          buttonTitle="Add Ingredients"
          disabled={selectedIngredients.length === 0}
          darkMode={darkMode}
          onButtonClick={this.onAddIngredientsClick}
        />
      </View>
    )
  }
}

IngredientsScreen.propTypes = {
  darkMode: PropTypes.bool,
  ingredients: PropTypes.array,
  fetchIngredients: PropTypes.func,
  ingredientsIsLoading: PropTypes.bool,
  ingredientsErrorMessage: PropTypes.string,
  addIngredients: PropTypes.func,
  navigation: PropTypes.object,
}

const mapStateToProps = (state) => ({
  ingredients: state.ingredients.ingredients,
  ingredientsIsLoading: state.ingredients.ingredientsIsLoading,
  ingredientsErrorMessage: state.ingredients.ingredientsErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchIngredients: () => dispatch(IngredientActions.fetchIngredients()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(IngredientsScreen))
