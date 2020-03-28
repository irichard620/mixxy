import React from 'react'
import { Dimensions, ScrollView, StatusBar, Text, View } from 'react-native'
import { connect } from 'react-redux'
import NavigationService from '../../Services/NavigationService'
import getCampaignStylesheet from './CampaignScreenStyle'
import FastImage from 'react-native-fast-image'
import getStylesheet from '../../Theme/ApplicationStyles'
import LinearGradient from 'react-native-linear-gradient'
import ModalXButton from '../../Components/ModalXButton'
import { NavigationActions } from 'react-navigation'
import RecipeActions from '../../Stores/Recipe/Actions'
import RecipeCard from '../../Components/RecipeCard'

class CampaignScreen extends React.Component {
  componentDidMount() {
    const { navigation } = this.props
    const campaign = navigation.getParam('campaign', {})
    if ('masterListId' in campaign) {
      this.props.fetchRemoteRecipes(null, campaign.masterListId)
    } else {
      this.props.fetchRemoteRecipes(campaign.campaignId, null)
    }
  }

  onBackPress = () => {
    const { navigation } = this.props
    navigation.dispatch(NavigationActions.back())
  }

  onCardClick = (idx) => {
    const { remoteRecipes } = this.props
    NavigationService.navigate('TutorialScreen', {
      recipe: remoteRecipes[idx]
    })
  }

  render() {
    const { darkMode, navigation, remoteRecipes } = this.props
    const styles = getStylesheet(darkMode)
    const campaignStyles = getCampaignStylesheet(darkMode)

    const campaign = navigation.getParam('campaign', {})
    const { name, longDescription, imageLink } = campaign

    const { width } = Dimensions.get('window')
    const cardWidth = {
      width: width,
    }
    return (
      <View style={styles.outerContainer}>
        <ScrollView style={campaignStyles.scrollContainer}>
          <StatusBar hidden={true} />
          <View style={campaignStyles.topImageOutline}>
            {imageLink !== '' && (
              <FastImage
                style={[campaignStyles.topImage, cardWidth]}
                source={{
                  uri: imageLink,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
            <Text style={campaignStyles.title}>{name}</Text>
            <View style={campaignStyles.campaignBottomGradientContainer}>
              <LinearGradient
                colors={['#00000080', '#00000000']}
                style={campaignStyles.linearGradient}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
              />
            </View>
          </View>
          <View style={campaignStyles.bufferView} />
          {longDescription !== '' && <View style={campaignStyles.contentContainer}>
            <Text style={campaignStyles.description}>{longDescription}</Text>
            <View style={styles.divider} />
          </View>}
          {remoteRecipes.length > 0 && remoteRecipes.map((recipe, idx) => (
            <RecipeCard
              recipeName={recipe.recipeName}
              recipeType={recipe.recipeType}
              disabled={false}
              onCardClick={() => this.onCardClick(idx)}
              darkMode={darkMode}
            />
          ))}
        </ScrollView>
        <View style={campaignStyles.backContainer}>
          <ModalXButton onPress={this.onBackPress}/>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  remoteRecipes: state.recipes.remoteRecipes,
  fetchRemoteRecipesIsLoading: state.recipes.fetchRemoteRecipesIsLoading,
  fetchRemoteRecipesErrorMessage: state.recipes.fetchRemoteRecipesErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchRemoteRecipes: (campaignId, masterListId) => dispatch(RecipeActions.fetchRemoteRecipes(null, campaignId, masterListId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(CampaignScreen))
