import { ScrollView, Text, View, RefreshControl } from 'react-native'
import getStylesheet from '../../../Theme/ApplicationStyles'
import React, { useState, useEffect } from 'react'
import getHomeStylesheet from '../HomeScreenStyle'
import { useDarkMode } from 'react-native-dark-mode'
import { connect } from 'react-redux'
import HomeSponsorCard from '../HomeSponsorCard'
import { PropTypes } from 'prop-types'
import CampaignCarousel from './CampaignCarousel'
import NavigationService from '../../../Services/NavigationService'
import ListItem from '../../../Components/ListItem'
import SponsorActions from '../../../Stores/Sponsor/Actions'
import CampaignActions from '../../../Stores/Campaign/Actions'
import MasterListActions from '../../../Stores/MasterList/Actions'
import getDiscoverStylesheet from './DiscoverStyle'

function HomeDiscoverTab(props) {
  const {
    sponsorCards,
    campaigns,
    masterLists,
    fetchSponsorCards,
    fetchCampaigns,
    fetchMasterLists,
    sponsorCardsIsLoading,
    campaignsIsLoading,
    masterListsIsLoading,
  } = props
  const [refreshing, setRefreshing] = useState(false)
  const darkMode = useDarkMode()
  const styles = getStylesheet(darkMode)
  const homeStyles = getHomeStylesheet(darkMode)
  const discoverStyles = getDiscoverStylesheet(darkMode)

  useEffect(() => {
    if (refreshing && !sponsorCardsIsLoading && !campaignsIsLoading && !masterListsIsLoading) {
      setRefreshing(false)
    }
  })

  const onRefresh = () => {
    fetchSponsorCards()
    fetchCampaigns()
    fetchMasterLists()
    setRefreshing(true)
  }

  return (
    <ScrollView
      style={discoverStyles.scrollContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      showsVerticalScrollIndicator={false}
    >
      <Text style={homeStyles.topHeader}>Discover</Text>
      {sponsorCards.map((sponsorCard) => (
        <HomeSponsorCard
          onSponsorCardClick={(sponsorCard) => {
            NavigationService.navigate('SponsorScreen', {
              sponsor: sponsorCard,
            })
          }}
          key={sponsorCard.cardId}
          sponsorCard={sponsorCard}
          disabled={false}
          darkMode={darkMode}
        />
      ))}
      <View style={styles.divider} />
      <Text style={discoverStyles.sectionHeader}>Collections</Text>
      <CampaignCarousel campaigns={campaigns} darkMode={darkMode} />
      <View style={styles.divider} />
      <Text style={discoverStyles.sectionHeader}>Browse More</Text>
      {masterLists.map((masterList) => (
        <ListItem
          key={masterList.masterListId}
          title={masterList.name}
          onClick={() => {
            NavigationService.navigate('CampaignScreen', {
              campaign: masterList,
            })
          }}
          darkMode={darkMode}
          showArrow
          enlarged
        />
      ))}
      <ListItem
        key={'allRecipes'}
        title={'All Recipes'}
        onClick={() => {
          NavigationService.navigate('AllRecipesScreen')
        }}
        darkMode={darkMode}
        showArrow
        enlarged
      />
      <View style={homeStyles.bufferView} />
    </ScrollView>
  )
}

HomeDiscoverTab.propTypes = {
  sponsorCards: PropTypes.array,
  campaigns: PropTypes.array,
  masterLists: PropTypes.array,
  fetchSponsorCards: PropTypes.func,
  fetchCampaigns: PropTypes.func,
  fetchMasterLists: PropTypes.func,
  sponsorCardsIsLoading: PropTypes.bool,
  campaignsIsLoading: PropTypes.bool,
  masterListsIsLoading: PropTypes.bool,
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

const mapDispatchToProps = (dispatch) => ({
  fetchSponsorCards: () => dispatch(SponsorActions.fetchSponsorCards()),
  fetchCampaigns: () => dispatch(CampaignActions.fetchCampaigns()),
  fetchMasterLists: () => dispatch(MasterListActions.fetchMasterLists()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeDiscoverTab)
