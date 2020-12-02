import { Text, View } from 'react-native'
import React from 'react'
import getHomeStylesheet from '../HomeScreenStyle'
import { connect } from 'react-redux'
import HomeSponsorCard from './SponsorCard'
import { PropTypes } from 'prop-types'
import Carousel from './Carousel'
import NavigationService from '../../../Services/NavigationService'
import ListItem from '../../../Components/ListItem'
import SponsorActions from '../../../Stores/Sponsor/Actions'
import CampaignActions from '../../../Stores/Campaign/Actions'
import MasterListActions from '../../../Stores/MasterList/Actions'
import BlogActions from '../../../Stores/Blog/Actions'
import getDiscoverStylesheet from './DiscoverStyle'
import HomeTabOutline from './HomeTabOutline'

class HomeDiscoverTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
    }
  }

  componentDidUpdate() {
    const {
      sponsorCardsIsLoading,
      campaignsIsLoading,
      masterListsIsLoading,
      blogsIsLoading,
    } = this.props
    if (
      this.state.refreshing &&
      !sponsorCardsIsLoading &&
      !campaignsIsLoading &&
      !masterListsIsLoading &&
      !blogsIsLoading
    ) {
      this.setState({
        refreshing: false,
      })
    }
  }

  onRefresh = () => {
    const { fetchSponsorCards, fetchCampaigns, fetchMasterLists, fetchBlogs } = this.props
    fetchSponsorCards()
    fetchCampaigns()
    fetchMasterLists()
    fetchBlogs()
    this.setState({
      refreshing: true,
    })
  }

  render() {
    const { darkMode, sponsorCards, campaigns, masterLists, blogs } = this.props

    const homeStyles = getHomeStylesheet(darkMode)
    const discoverStyles = getDiscoverStylesheet(darkMode)

    const paddingStyle = { paddingLeft: 16, paddingRight: 16 }

    return (
      <HomeTabOutline
        darkMode={darkMode}
        pageTitle="Discover"
        showRefreshControl={true}
        isRefreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
        addSearch
      >
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
        <View style={discoverStyles.divider} />
        <Text style={discoverStyles.sectionHeader}>Collections</Text>
        <Carousel items={campaigns} darkMode={darkMode} isCampaigns />
        <View style={discoverStyles.divider} />
        <Text style={discoverStyles.sectionHeader}>Learn with Mixxy</Text>
        <Carousel items={blogs} darkMode={darkMode} isCampaigns={false} />
        <View style={discoverStyles.divider} />
        <Text style={discoverStyles.sectionHeader}>Browse More</Text>
        <View style={paddingStyle}>
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
        </View>
        <View style={homeStyles.bufferView} />
      </HomeTabOutline>
    )
  }
}

HomeDiscoverTab.propTypes = {
  darkMode: PropTypes.bool,
  sponsorCards: PropTypes.array,
  campaigns: PropTypes.array,
  masterLists: PropTypes.array,
  blogs: PropTypes.array,
  fetchSponsorCards: PropTypes.func,
  fetchCampaigns: PropTypes.func,
  fetchMasterLists: PropTypes.func,
  fetchBlogs: PropTypes.func,
  sponsorCardsIsLoading: PropTypes.bool,
  campaignsIsLoading: PropTypes.bool,
  masterListsIsLoading: PropTypes.bool,
  blogsIsLoading: PropTypes.bool,
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
  blogs: state.blogs.blogs,
  blogsIsLoading: state.blogs.blogsIsLoading,
  blogsErrorMessage: state.blogs.blogsErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchSponsorCards: () => dispatch(SponsorActions.fetchSponsorCards()),
  fetchCampaigns: () => dispatch(CampaignActions.fetchCampaigns()),
  fetchMasterLists: () => dispatch(MasterListActions.fetchMasterLists()),
  fetchBlogs: () => dispatch(BlogActions.fetchBlogs()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(HomeDiscoverTab))
