import React from 'react'
import { View } from 'react-native'
import BuilderDetail from './BuilderDetail'
import { PropTypes } from 'prop-types'

export default function BuilderDetailsList(props) {
  const { details, onDetailClick, darkMode } = props
  return (
    <View>
      {details.map((detail, idx) => (
        <BuilderDetail
          key={`detail${idx}`}
          value={detail.value}
          title={detail.title}
          disabled={detail.disabled}
          onDetailClick={onDetailClick}
          showArrow={detail.showArrow}
          showSeparator={idx < details.length - 1}
          darkMode={darkMode}
        />
      ))}
    </View>
  );
}

BuilderDetailsList.propTypes = {
  details: PropTypes.array,
  onDetailClick: PropTypes.func,
  darkMode: PropTypes.bool,
}
