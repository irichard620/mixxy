
import React, { Component } from 'react';
import {
  FlatList
} from 'react-native';
import ListItem from './ListItem';

class List extends Component {
  keyExtractor = item => item.title + item.subtitle;

  renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.title}
        subtitle={item.subtitle}
      />
    );
  };

  render() {
    const { options } = this.props;
    return (
      <FlatList
        data={options}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        style={{ width: '100%' }}
      />
    );
  }
}

export default List;
