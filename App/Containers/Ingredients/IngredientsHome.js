import { PropTypes } from 'prop-types'
import SearchBar from 'react-native-search-bar'
import { FlatList, View } from 'react-native'
import React from 'react'
import getIngredientsStylesheet from './IngredientsScreenStyle'
import ListItem from '../../Components/ListItem'

class IngredientsHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.options
    }
  }

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search"
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
      />
    );
  };

  searchFilterFunction = text => {
    const { options } = this.props
    const newData = options.filter(item => {
      const itemData = `${item.title.toUpperCase()}`
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({ data: newData });
  };

  render() {
    const { darkMode, onClick } = this.props
    const { data } = this.state
    const ingredientStyles = getIngredientsStylesheet(darkMode)
    return (
      <View style={ingredientStyles.scrollView}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => item.title + index}
          renderItem={({ item, index }) => {
            return <ListItem title={item.title} onClick={() => onClick(item)} showArrow darkMode={darkMode} />
          }}
          style={ingredientStyles.ingredientListOutline}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    )
  }
}

IngredientsHome.propTypes = {
  darkMode: PropTypes.bool,
  options: PropTypes.array,
  onClick: PropTypes.func,
}

export default IngredientsHome
