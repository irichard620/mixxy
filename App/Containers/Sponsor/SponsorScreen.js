import React from 'react'
import { Dimensions, Image, ScrollView, StatusBar, Text, View, Linking, Alert } from 'react-native'
import { connect } from 'react-redux'
import NavigationService from '../../Services/NavigationService'
import getSponsorStylesheet from './SponsorScreenStyle'
import FastImage from 'react-native-fast-image'
import getStylesheet from '../../Theme/ApplicationStyles'
import LinearGradient from 'react-native-linear-gradient'
import ModalXButton from '../../Components/ModalXButton'
import { NavigationActions } from 'react-navigation'
import RecipeActions from '../../Stores/Recipe/Actions'
import SponsorActions from '../../Stores/Sponsor/Actions'
import RecipeCard from '../../Components/RecipeCard'
import Images from '../../Theme/Images'
import Button from '../../Components/Button'
import analytics from '@react-native-firebase/analytics'
import { PropTypes } from 'prop-types'

class SponsorScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sponsor: {},
    }
  }

  componentDidMount() {
    const { navigation, fetchSponsorCardDetails, fetchRemoteRecipes } = this.props
    const sponsor = navigation.getParam('sponsor', {})
    if (Object.keys(sponsor).length) {
      // Already have sponsor passed
      fetchRemoteRecipes(sponsor.cardId)
      this.setState({ sponsor: sponsor })
      analytics().logEvent('sponsor_page_view', {
        sponsor_id: sponsor.cardId,
      })
    } else {
      const sponsorCardId = navigation.getParam('sponsorCardId', 'none')
      fetchSponsorCardDetails(sponsorCardId)
      fetchRemoteRecipes(sponsorCardId)
      analytics().logEvent('sponsor_page_view', {
        sponsor_id: sponsorCardId,
      })
    }
  }

  componentDidUpdate(prevProps) {
    const {
      sponsorCardDetailsIsLoading,
      sponsorCardDetailsErrorMessage,
      sponsorCardDetails,
    } = this.props
    if (prevProps.sponsorCardDetailsIsLoading && !sponsorCardDetailsIsLoading) {
      if (sponsorCardDetailsErrorMessage) {
        // Show error and nav back on ack
        Alert.alert('Error', sponsorCardDetailsErrorMessage, [
          {
            text: 'Ok',
            onPress: () => {
              this.onBackPress()
            },
          },
        ])
      } else {
        // Set sponsor state to details
        this.setState({ sponsor: sponsorCardDetails })
      }
    }
  }

  onBackPress = () => {
    const { navigation } = this.props
    navigation.dispatch(NavigationActions.back())
  }

  onCardClick = (idx) => {
    const { remoteRecipes } = this.props
    NavigationService.navigate('TutorialScreen', {
      recipe: remoteRecipes[idx],
    })
  }

  onVisitWebsiteClicked = (website) => {
    Linking.canOpenURL(website).then((supported) => {
      if (supported) {
        Linking.openURL(website)
      } else {
        Alert.alert('Cannot Open URL', 'Not able to open this website link.', [
          {
            text: 'OK',
          },
        ])
      }
    })
  }

  render() {
    const { darkMode, remoteRecipes } = this.props
    const { sponsor } = this.state
    const styles = getStylesheet(darkMode)
    const sponsorStyles = getSponsorStylesheet(darkMode)

    const {
      sponsorName,
      sponsorType,
      hqLocation,
      about,
      logoLink,
      cardImageLink,
      website,
      websiteLabel,
    } = sponsor
    const { width } = Dimensions.get('window')
    const cardWidth = {
      width: width,
    }
    const extraPadding = {
      marginRight: 12,
    }
    return (
      <View style={styles.outerContainer}>
        <ScrollView style={sponsorStyles.scrollContainer} showsVerticalScrollIndicator={false}>
          <StatusBar backgroundColor={'transparent'} translucent />
          <View style={sponsorStyles.topImageOutline}>
            {cardImageLink !== '' && (
              <FastImage
                style={[sponsorStyles.topImage, cardWidth]}
                source={{
                  uri: cardImageLink,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
            <View style={sponsorStyles.sponsorBottomGradientContainer}>
              <LinearGradient
                colors={['#00000080', '#00000000']}
                style={sponsorStyles.linearGradient}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
              />
            </View>
          </View>
          <View style={sponsorStyles.bufferView} />
          <View style={sponsorStyles.logoOutline}>
            <FastImage
              style={sponsorStyles.logoImage}
              source={{
                uri: logoLink,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          {about !== '' && (
            <View style={sponsorStyles.contentContainer}>
              <Text style={sponsorStyles.title}>{sponsorName}</Text>
              <View style={sponsorStyles.sponsorTypeOutline}>
                <Image source={Images.spotlightLocation} style={sponsorStyles.sponsorTypeIcon} />
                <Text style={[sponsorStyles.sponsorTypeText, extraPadding]}>{hqLocation}</Text>
                <Image source={Images.spotlightType} style={sponsorStyles.sponsorTypeIcon} />
                <Text style={sponsorStyles.sponsorTypeText}>{sponsorType}</Text>
              </View>
              {website !== '' && (
                <Button
                  darkMode={darkMode}
                  title={websiteLabel || 'Visit Website'}
                  onButtonClick={() => this.onVisitWebsiteClicked(website)}
                  margin={[0, 0, 24, 0]}
                />
              )}
              <View style={styles.divider} />
              <Text style={sponsorStyles.description}>{about}</Text>
              <View style={styles.divider} />
            </View>
          )}
          <View style={sponsorStyles.recipesContainer}>
            {remoteRecipes.length > 0 &&
              remoteRecipes.map((recipe, idx) => (
                <RecipeCard
                  key={`recipe${idx}`}
                  recipeName={recipe.recipeName}
                  recipeType={recipe.recipeType}
                  servingGlass={recipe.servingGlass}
                  disabled={false}
                  onCardClick={() => this.onCardClick(idx)}
                  darkMode={darkMode}
                />
              ))}
          </View>
        </ScrollView>
        <View style={sponsorStyles.backContainer}>
          <ModalXButton onPress={this.onBackPress} />
        </View>
      </View>
    )
  }
}

SponsorScreen.propTypes = {
  darkMode: PropTypes.bool,
  navigation: PropTypes.object,
  remoteRecipes: PropTypes.array,
  sponsorCardDetails: PropTypes.object,
  sponsorCardDetailsIsLoading: PropTypes.bool,
  sponsorCardDetailsErrorMessage: PropTypes.string,
  fetchRemoteRecipes: PropTypes.func,
  fetchSponsorCardDetails: PropTypes.func,
}

const mapStateToProps = (state) => ({
  remoteRecipes: state.recipes.remoteRecipes,
  sponsorCardDetails: state.sponsors.sponsorCardDetails,
  sponsorCardDetailsIsLoading: state.sponsors.sponsorCardDetailsIsLoading,
  sponsorCardDetailsErrorMessage: state.sponsors.sponsorCardDetailsErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchRemoteRecipes: (sponsorCardId) =>
    dispatch(RecipeActions.fetchRemoteRecipes(sponsorCardId, null, null)),
  fetchSponsorCardDetails: (sponsorCardId) =>
    dispatch(SponsorActions.fetchSponsorCardDetails(sponsorCardId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(SponsorScreen))
