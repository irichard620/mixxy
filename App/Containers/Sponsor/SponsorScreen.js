import React from 'react'
import { Dimensions, Image, ScrollView, StatusBar, Text, View } from 'react-native'
import { connect } from 'react-redux'
import NavigationService from '../../Services/NavigationService'
import getSponsorStylesheet from './SponsorScreenStyle'
import FastImage from 'react-native-fast-image'
import getStylesheet from '../../Theme/ApplicationStyles'
import LinearGradient from 'react-native-linear-gradient'
import ModalXButton from '../../Components/ModalXButton'
import { NavigationActions } from 'react-navigation'
import RecipeActions from '../../Stores/Recipe/Actions'
import RecipeCard from '../../Components/RecipeCard'
import Images from '../../Theme/Images'

class SponsorScreen extends React.Component {
  componentDidMount() {
    const { navigation } = this.props
    const sponsor = navigation.getParam('sponsor', {})
    this.props.fetchRemoteRecipes(sponsor.cardId)
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
    const sponsorStyles = getSponsorStylesheet(darkMode)

    const sponsor = navigation.getParam('sponsor', {})
    const { sponsorName, sponsorType, hqLocation, about, logoLink, cardImageLink } = sponsor

    const { width } = Dimensions.get('window')
    const cardWidth = {
      width: width,
    }
    const extraPadding = {
      marginRight: 12,
    }
    return (
      <View style={styles.outerContainer}>
        <ScrollView style={sponsorStyles.scrollContainer}>
          <StatusBar hidden={true} />
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
              style={[sponsorStyles.logoImage]}
              source={{
                uri: logoLink,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          {about !== '' && <View style={sponsorStyles.contentContainer}>
            <Text style={sponsorStyles.title}>{sponsorName}</Text>
            <View style={sponsorStyles.sponsorTypeOutline}>
              <Image source={Images.logo} style={sponsorStyles.sponsorTypeIcon} />
              <Text style={[sponsorStyles.sponsorTypeText, extraPadding]}>{hqLocation}</Text>
              <Image source={Images.logo} style={sponsorStyles.sponsorTypeIcon} />
              <Text style={sponsorStyles.sponsorTypeText}>{sponsorType}</Text>
            </View>
            <View style={styles.divider} />
            <Text style={sponsorStyles.description}>{about}</Text>
            <View style={styles.divider} />
          </View>}
          {remoteRecipes.length > 0 && remoteRecipes.map((recipe, idx) => (
            <RecipeCard
              recipeName={recipe.recipeName}
              recipeType={recipe.recipeType}
              servingGlass={recipe.servingGlass}
              disabled={false}
              onCardClick={() => this.onCardClick(idx)}
              darkMode={darkMode}
            />
          ))}
        </ScrollView>
        <View style={sponsorStyles.backContainer}>
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
  fetchRemoteRecipes: (sponsorCardId) => dispatch(RecipeActions.fetchRemoteRecipes(sponsorCardId, null, null)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(SponsorScreen))
