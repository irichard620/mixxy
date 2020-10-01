import React from 'react'
import { FlatList, View, Alert } from 'react-native'
import SearchBar from 'react-native-search-bar'
import { connect } from 'react-redux'
import NavigationService from '../../Services/NavigationService'
import getStylesheet from '../../Theme/ApplicationStyles'
import getBartenderStylesheet from './BartenderStyle'
import TopHeader from '../../Components/TopHeader'
import BottomBar from '../../Components/BottomBar'
import { NavigationActions } from 'react-navigation'
import IngredientActions from '../../Stores/Ingredient/Actions'
import { PropTypes } from 'prop-types'
import ListItem from '../../Components/ListItem'
import Helpers from '../../Theme/Helpers'

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
    const { navigation } = this.props
    this.props.fetchIngredients()

    this.setState({
      selectedIngredients: navigation.getParam('selectedIngredients'),
    })
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
    const onClose = navigation.getParam('onClose')
    if (onClose) {
      onClose()
    }
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
    const onClose = navigation.getParam('onClose')
    if (onClose) {
      onClose()
    }
    navigation.dispatch(NavigationActions.back())
  }

  renderHeader = () => {
    const { darkMode } = this.props
    const styles = getStylesheet(darkMode)
    const bartenderStyles = getBartenderStylesheet(darkMode)
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
        <View style={bartenderStyles.bufferView} />
      </View>
    )
  }

  searchFilterFunction = (text) => {
    const { ingredients } = this.props
    const newData = ingredients.filter((item) => {
      const itemData = `${item.name.toUpperCase()}`
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })

    this.setState({ data: newData })
  }

  render() {
    const { darkMode } = this.props
    const { data, selectedIngredients } = this.state
    const styles = getStylesheet(darkMode)

    const selectedIngredientDict = {}
    for (let i = 0; i < selectedIngredients.length; i++) {
      selectedIngredientDict[selectedIngredients[i].ingredientId] = true
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
          keyExtractor={(item) => item.ingredientId}
          onScrollBeginDrag={() => this.searchBar && this.searchBar.current.unFocus()}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              onClick={() => this.onListItemClick(item)}
              darkMode={darkMode}
              selected={item.ingredientId in selectedIngredientDict}
            />
          )}
          style={Helpers.fullWidth}
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
