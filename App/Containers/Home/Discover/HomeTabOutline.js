import { Animated, View, RefreshControl } from 'react-native'
import React from 'react'
import getHomeStylesheet from '../HomeScreenStyle'
import { PropTypes } from 'prop-types'
import AnimatedHeader from '../../../Components/AnimatedHeader'
import getDiscoverStylesheet from './DiscoverStyle'
import getStylesheet from '../../../Theme/ApplicationStyles'

class HomeTabOutline extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollY: new Animated.Value(0),
    }
  }

  _getHeaderTextColor = () => {
    const { darkMode } = this.props
    const { scrollY } = this.state

    const outputFinal = !darkMode ? 'rgba(0,0,0,1.0)' : 'rgba(255,255,255,1.0)'
    const outputStart = !darkMode ? 'rgba(0,0,0,0.0)' : 'rgba(255,255,255,0.0)'
    return scrollY.interpolate({
      inputRange: [0, 48],
      outputRange: [outputStart, outputFinal],
      extrapolate: 'clamp',
      useNativeDriver: true,
    })
  }

  _getPageTitleTextColor = () => {
    const { darkMode } = this.props
    const { scrollY } = this.state

    const outputFinal = !darkMode ? 'rgba(0,0,0,0.0)' : 'rgba(255,255,255,0.0)'
    const outputStart = !darkMode ? 'rgba(0,0,0,1.0)' : 'rgba(255,255,255,1.0)'
    return scrollY.interpolate({
      inputRange: [0, 48],
      outputRange: [outputStart, outputFinal],
      extrapolate: 'clamp',
      useNativeDriver: true,
    })
  }

  _getHeaderDividerBackgroundColor = () => {
    const { darkMode } = this.props
    const { scrollY } = this.state

    const outputFinal = darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
    const outputStart = darkMode ? 'rgba(255,255,255,0.0)' : 'rgba(0,0,0,0.0)'
    return scrollY.interpolate({
      inputRange: [0, 48],
      outputRange: [outputStart, outputFinal],
      extrapolate: 'clamp',
      useNativeDriver: true,
    })
  }

  render() {
    const {
      darkMode,
      pageTitle,
      children,
      showRefreshControl,
      isRefreshing,
      onRefresh,
      addSearch,
    } = this.props

    const styles = getStylesheet(darkMode)
    const homeStyles = getHomeStylesheet(darkMode)
    const discoverStyles = getDiscoverStylesheet(darkMode)

    const paddingStyle = { paddingLeft: 16, paddingRight: 16 }
    const titleColor = { color: this._getPageTitleTextColor() }

    return (
      <View style={styles.outerContainer}>
        <AnimatedHeader
          title={pageTitle}
          darkMode={darkMode}
          dividerBackgroundColor={this._getHeaderDividerBackgroundColor()}
          textColor={this._getHeaderTextColor()}
          addSearch={addSearch}
        />
        <Animated.ScrollView
          style={discoverStyles.scrollContainer}
          refreshControl={
            showRefreshControl ? (
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            ) : null
          }
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: this.state.scrollY } },
            },
          ])}
        >
          <Animated.Text style={[homeStyles.topHeader, paddingStyle, titleColor]}>
            {pageTitle}
          </Animated.Text>
          {children}
        </Animated.ScrollView>
      </View>
    )
  }
}

HomeTabOutline.propTypes = {
  darkMode: PropTypes.bool,
  pageTitle: PropTypes.string,
  children: PropTypes.array,
  showRefreshControl: PropTypes.bool,
  isRefreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
  addSearch: PropTypes.bool,
}

export default HomeTabOutline
