import { ScrollView, Text, View } from 'react-native'
import getStylesheet from '../../Theme/ApplicationStyles'
import React from 'react'
import getHomeStylesheet from './HomeScreenStyle'
import { useDarkMode } from 'react-native-dark-mode'
import { connect } from 'react-redux'
import HomeSponsorCard from './HomeSponsorCard'
import { PropTypes } from 'prop-types'
import HomeCampaign from './HomeCampaign'
import NavigationService from '../../Services/NavigationService'
import HomeMasterList from './HomeMasterList'
import Helpers from '../../Theme/Helpers'

function HomeDiscoverTab(props) {
  const { sponsorCards, campaigns, masterLists } = props
  const darkMode = useDarkMode()
  const styles = getStylesheet(darkMode)
  const homeStyles = getHomeStylesheet(darkMode)
  return (
    <ScrollView style={homeStyles.scrollContainer}>
      <Text style={homeStyles.topHeader}>Discover</Text>
      {sponsorCards.map((sponsorCard) => (
        <HomeSponsorCard
          key={sponsorCard.cardId}
          sponsorCard={sponsorCard}
          disabled={false}
          darkMode={darkMode}
        />
      ))}
      <View style={styles.divider} />
      <Text style={homeStyles.sectionHeader}>Featured Recipes</Text>
      {campaigns.map((campaign) => (
        <HomeCampaign
          key={campaign.campaignId}
          campaign={campaign}
          disabled={false}
          darkMode={darkMode}
          onCampaignClick={(campaign) => {
            NavigationService.navigate('CampaignScreen', {
              campaign: campaign,
            })
          }}
        />
      ))}
      <View style={styles.divider} />
      <Text style={homeStyles.sectionHeader}>Browse More</Text>
      <View style={Helpers.rowStartWrap}>
        {masterLists.map((masterList, idx) => (
          <HomeMasterList
            key={masterList.masterListId}
            masterList={masterList}
            disabled={false}
            darkMode={darkMode}
            onMasterListClick={(masterList) => {
              NavigationService.navigate('CampaignScreen', {
                campaign: masterList,
              })
            }}
            addRightPadding={idx / 2.0 === 0}
          />
        ))}
      </View>
    </ScrollView>
  )
}

HomeDiscoverTab.propTypes = {
  sponsorCards: PropTypes.array,
  campaigns: PropTypes.array,
  masterLists: PropTypes.array,
}

const mapStateToProps = (state) => ({
  sponsorCards: state.sponsors.sponsorCards,
  sponsorCardsIsLoading: state.sponsors.sponsorCardsIsLoading,
  sponsorCardsErrorMessage: state.sponsors.sponsorCardsErrorMessage,
  campaigns: state.campaigns.campaigns,
  campaignsIsLoading: state.campaigns.campaignsIsLoading,
  campaignsErrorMessage: state.campaigns.campaignsErrorMessage,
  masterLists: state.masterLists.masterLists,
  masterListsIsLoading: state.masterLists.masterListsIsLoading,
  masterListsErrorMessage: state.masterLists.masterListsErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(HomeDiscoverTab)
