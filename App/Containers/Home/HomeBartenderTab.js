import { ScrollView, Text, View } from 'react-native'
import getStylesheet from '../../Theme/ApplicationStyles'
import React from 'react'
import getHomeStylesheet from './HomeScreenStyle'
import { useDarkMode } from 'react-native-dark-mode'
import { connect } from 'react-redux'
// import { PropTypes } from 'prop-types'
// import NavigationService from '../../Services/NavigationService'
import BottomBar from '../../Components/BottomBar'

function HomeBartenderTab(props) {
  //   const {} = props
  const darkMode = useDarkMode()
  const styles = getStylesheet(darkMode)
  const homeStyles = getHomeStylesheet(darkMode)

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={homeStyles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={homeStyles.topHeader}>Bartender</Text>
        <Text style={homeStyles.bartenderSubheader}>
          Bartender helps you discover which drinks you can create with the ingredients you already
          have on hand.
        </Text>
        <View style={homeStyles.bartenderBarCartOutline}>
          <View style={homeStyles.bartenderBarCartIcon} />
          <Text style={homeStyles.bartenderBarCartText}>My Bar Cart</Text>
          <Text style={homeStyles.bartenderBarCartSubtext}>
            Keep a running list of your ingredients to quickly browse recipes you can make.
          </Text>
        </View>
        <View style={homeStyles.bufferView} />
      </ScrollView>
      <BottomBar buttonTitle={'Search Drinks'} onButtonClick={() => {}} darkMode={darkMode} />
    </View>
  )
}

HomeBartenderTab.propTypes = {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(HomeBartenderTab)
