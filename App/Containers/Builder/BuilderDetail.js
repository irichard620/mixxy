import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import * as constants from '../../Config/constants'
import { PropTypes } from 'prop-types'
import Colors from '../../Theme/Colors'

export default function BuilderDetail(props) {
  const { onDetailClick, disabled, title, value, showArrow, showSeparator, darkMode } = props

  let descriptionValue = value
  if (
    (title === constants.BUILDER_DESCRIPTION_DETAIL ||
      title === constants.BUILDER_RECIPE_NAME_DETAIL) &&
    descriptionValue &&
    descriptionValue.length > 22
  ) {
    descriptionValue = `${value.slice(0, 22)}...`
  }

  return (
    <TouchableOpacity onPress={() => onDetailClick(title)} disabled={disabled}>
      <View style={styles.outline}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.rightView}>
          {descriptionValue !== '' && (
            <Text style={styles.description}>
              {descriptionValue}
            </Text>
          )}
          {showArrow && <Image style={styles.icon} source={} />}
        </View>
      </View>
      {showSeparator && (
        <View style={styles.separator} />
      )}
    </TouchableOpacity>
  );
}

BuilderDetail.propTypes = {
  disabled: PropTypes.bool,
  onDetailClick: PropTypes.func,
  darkMode: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.string,
  showArrow: PropTypes.bool,
  showSeparator: PropTypes.bool,
}

const styles = StyleSheet.create({
  outline: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    height: 48,
    backgroundColor: '#FFFFFF',
  },
  title: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    marginRight: 12,
    color: Colors.blue1,
  },
  rightView: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  icon: {
    height: 18,
    resizeMode: 'contain',
  },
  separator: {
    height: 1,
    backgroundColor: '#F1F3F6',
    marginLeft: 16
  }
});
