import React from 'react'
import { Dimensions, Image, Alert, SafeAreaView, Platform } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { withNavigationFocus } from 'react-navigation'
import { TabView, TabBar } from 'react-native-tab-view'
import RNIap, { purchaseErrorListener, purchaseUpdatedListener } from 'react-native-iap'
import getStylesheet from '../../Theme/ApplicationStyles'
import getHomeStylesheet from './HomeScreenStyle'
import RecipeCard from '../../Components/RecipeCard'
import NavigationService from '../../Services/NavigationService'
import RecipeActions from '../../Stores/Recipe/Actions'
import UserActions from '../../Stores/User/Actions'
import HomeDiscoverTab from './HomeDiscoverTab'
import Images from '../../Theme/Images'
import HomeLibraryTab from './HomeLibraryTab'
import HomeSettingsTab from './HomeSettingsTab'
import DynamicLinkListener from '../../Components/DynamicLinkListener'
import CustomModal from '../../Components/CustomModal'
import ModalContentSharedRecipe from '../../Components/ModalContentSharedRecipe'
import * as constants from '../../Config/constants'
import ModalContentMixxyPro from '../../Components/ModalContentMixxyPro'
import ModalContentBottom from '../../Components/ModalContentBottom'

const initialLayout = { width: Dimensions.get('window').width }
const routes = [
  { key: 'discover', title: 'Discover' },
  { key: 'library', title: 'Library' },
  { key: 'settings', title: 'Settings' },
]

class HomeScreen extends React.Component {
  purchaseUpdatePro = null

  purchaseErrorPro = null

  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      visibleModal: false,
      modalType: '',
      selectedVolumeUnit: false,
    }
  }

  componentDidMount() {
    const { upgradeMixxyPro } = this.props
    // Purchase success handler
    this.purchaseUpdatePro = purchaseUpdatedListener((purchase) => {
      const receipt = purchase.transactionReceipt
      if (receipt) {
        // Update in our system - wait for callback
        upgradeMixxyPro(purchase)
      }
    })

    // Purchase error handler
    this.purchaseErrorPro = purchaseErrorListener(() => {
      // Show alert
      Alert.alert(
        'Error purchasing Mixxy Pro',
        'An error occurred purchasing pro version of Mixxy.',
        [
          {
            text: 'OK',
          },
        ]
      )
    })

    this.props.fetchRecipes()
  }

  componentDidUpdate(prevProps) {
    const nextUser = this.props.user
    if (prevProps.upgradeIAPIsLoading && !this.props.upgradeIAPIsLoading && nextUser) {
      // Finish transaction
      if (Platform.OS === 'ios') {
        RNIap.finishTransactionIOS(nextUser.purchase.transactionId)
      } else if (Platform.OS === 'android') {
        RNIap.acknowledgePurchaseAndroid(nextUser.purchase.purchaseToken)
      }
      if (!prevProps.user.user.premium && nextUser.user.premium) {
        this.setState({
          visibleModal: false,
          modalType: '',
        })
      }
      return
    }
    if (nextUser && prevProps.restoreIAPIsLoading && !this.props.restoreIAPIsLoading) {
      // Update user
      if (!nextUser.user.premium) {
        Alert.alert(
          'Problem restoring Mixxy Pro',
          'There was an issue restoring your Mixxy Pro. ' +
            'It might be an issue with your connection, or no past purchase was found.',
          [
            {
              text: 'OK',
            },
          ]
        )
        return
      }
      Alert.alert('Mixxy Pro Restored', 'Thanks for your continued support as a Mixxy Pro user!', [
        {
          text: 'OK',
        },
      ])
    }
    if (nextUser && prevProps.updateVolumeUnitsLoading && !this.props.updateVolumeUnitsLoading) {
      this.onCloseModalClick()
    }
  }

  componentWillUnmount() {
    if (this.purchaseUpdatePro) {
      this.purchaseUpdatePro.remove()
      this.purchaseUpdatePro = null
    }
    if (this.purchaseErrorPro) {
      this.purchaseErrorPro.remove()
      this.purchaseErrorPro = null
    }
  }

  onPurchaseMixxyClicked = () => {
    const { requestPurchaseIAP } = this.props
    Alert.alert(
      'Buy Mixxy Pro',
      'Would you like to purchase the pro version of Mixxy? This will give you ' +
        'the ability to create and edit recipes, and will unlock unlimited recipe storage.',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Buy',
          onPress: () => {
            requestPurchaseIAP()
          },
        },
      ]
    )
  }

  onRestorePurchaseClicked = () => {
    const { restoreIAP } = this.props
    Alert.alert('Restore Mixxy Pro', 'Would you like to restore the pro version of Mixxy?', [
      {
        text: 'Cancel',
      },
      {
        text: 'Restore',
        onPress: () => {
          restoreIAP()
        },
      },
    ])
  }

  handleDynamicLink = (link) => {
    if (!link) {
      return
    }
    const linkPortions = link.url.split('/')
    if (linkPortions.length === 4) {
      // Recipe id
      NavigationService.goBackToRoute('HomeScreen')
      const recipeId = linkPortions[3]
      this.props.fetchSharedRecipe(recipeId)
      this.setState({
        visibleModal: true,
        modalType: constants.MODAL_SHARED_RECIPE,
      })
    } else if (linkPortions.length === 5) {
      // Sponsor
      NavigationService.goBackToRoute('HomeScreen')
      const sponsorCardId = linkPortions[4]
      NavigationService.navigate('SponsorScreen', {
        sponsorCardId: sponsorCardId,
      })
    }
  }

  onCardClick = (idx, isFavorite) => {
    const { favoriteRecipes, allRecipes } = this.state
    let recipesToUse = favoriteRecipes
    if (!isFavorite) {
      recipesToUse = allRecipes
    }
    NavigationService.navigate('TutorialScreen', {
      recipe: recipesToUse[idx],
    })
  }

  onNewRecipeClick = () => {
    const { user } = this.props
    if (!user.user.premium) {
      this.setState({
        visibleModal: true,
        modalType: constants.MODAL_PAYWALL,
      })
      return
    }
    NavigationService.navigate('BuilderScreen', {})
  }

  onCloseModalClick = () => {
    this.setState({
      visibleModal: false,
      modalType: '',
      selectedVolumeUnit: '',
    })
  }

  onSharedRecipeClick = () => {
    this.onCloseModalClick()
    NavigationService.navigate('TutorialScreen', {
      recipe: this.props.sharedRecipe,
    })
  }

  renderCard = (idx, item, isFavorite) => {
    return (
      <RecipeCard
        key={item.recipeId}
        recipeName={item.recipeName}
        recipeType={item.recipeType}
        servingGlass={item.servingGlass}
        disabled={false}
        onCardClick={() => this.onCardClick(idx, isFavorite)}
        darkMode={this.props.darkMode}
      />
    )
  }

  getTabBarIcon = (props) => {
    const { darkMode } = this.props
    const { index } = this.state
    const { route } = props
    const homeStyles = getHomeStylesheet(darkMode)
    if (route.key === 'discover') {
      let source = Images.navDiscoverSelected
      if (index !== 0) {
        source = darkMode ? Images.navDiscoverDark : Images.navDiscoverLight
      }
      return <Image source={source} style={homeStyles.tabIcon} />
    } else if (route.key === 'library') {
      let source = Images.navLibrarySelected
      if (index !== 1) {
        source = darkMode ? Images.navLibraryDark : Images.navLibraryLight
      }
      return <Image source={source} style={homeStyles.tabIcon} />
    } else {
      let source = Images.navSettingsSelected
      if (index !== 2) {
        source = darkMode ? Images.navSettingsDark : Images.navSettingsLight
      }
      return <Image source={source} style={homeStyles.tabIcon} />
    }
  }

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'discover':
        return <HomeDiscoverTab />
      case 'library':
        return <HomeLibraryTab onNewRecipeClick={this.onNewRecipeClick} />
      default:
        return (
          <HomeSettingsTab
            onMixxyProClick={this.onPurchaseMixxyClicked}
            onRestoreClick={this.onRestorePurchaseClicked}
            onVolumeUnitsClick={this.onVolumeUnitMenuClick}
          />
        )
    }
  }

  onVolumeUnitMenuClick = () => {
    this.setState({
      visibleModal: true,
      modalType: constants.MODAL_VOLUME_UNITS,
      selectedVolumeUnit: '',
    })
  }

  getVolumeUnitOptions = () => {
    const { selectedVolumeUnit } = this.state
    const { user } = this.props
    let useMetric
    if (selectedVolumeUnit !== '') {
      useMetric = selectedVolumeUnit === constants.VOLUME_UNIT_METRIC
    } else {
      useMetric = user.user.useMetric
    }
    return [
      {
        title: constants.VOLUME_UNIT_IMPERIAL,
        selected: !useMetric,
      },
      {
        title: constants.VOLUME_UNIT_METRIC,
        selected: useMetric,
      },
    ]
  }

  onVolumeUnitPress = (item) => {
    this.setState({
      selectedVolumeUnit: item,
    })
  }

  onVolumeUnitSavePressed = () => {
    const { updateVolumeUnits } = this.props
    const { selectedVolumeUnit } = this.state
    if (selectedVolumeUnit === '') {
      return
    }
    const useMetric = selectedVolumeUnit === constants.VOLUME_UNIT_METRIC
    updateVolumeUnits(useMetric)
  }

  render() {
    const { darkMode, fetchSharedRecipeIsLoading, sharedRecipe } = this.props
    const { index, visibleModal, modalType } = this.state
    const styles = getStylesheet(darkMode)
    const homeStyles = getHomeStylesheet(darkMode)

    return (
      <SafeAreaView style={styles.outerContainer}>
        <TabView
          swipeEnabled={false}
          navigationState={{ index, routes }}
          renderScene={this.renderScene}
          onIndexChange={(idx) => this.setState({ index: idx })}
          initialLayout={initialLayout}
          tabBarPosition={'bottom'}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={homeStyles.tabIndicatorColor}
              renderIcon={(props) => this.getTabBarIcon(props)}
              labelStyle={homeStyles.tabLabel}
              indicatorContainerStyle={homeStyles.tabIndicator}
              style={homeStyles.tabBackground}
            />
          )}
        />
        <CustomModal
          visibleModal={visibleModal}
          onCloseClick={this.onCloseModalClick}
          type={constants.MODAL_TYPE_BOTTOM}
          darkMode={darkMode}
        >
          {modalType === constants.MODAL_SHARED_RECIPE && (
            <ModalContentSharedRecipe
              onViewClick={this.onSharedRecipeClick}
              onCancelClick={this.onCloseModalClick}
              fetchSharedRecipeIsLoading={fetchSharedRecipeIsLoading}
              sharedRecipe={sharedRecipe}
              darkMode={darkMode}
            />
          )}
          {modalType === constants.MODAL_PAYWALL && (
            <ModalContentMixxyPro
              darkMode={darkMode}
              onMixxyProClick={this.onPurchaseMixxyClicked}
              onRestoreClick={this.onRestorePurchaseClicked}
            />
          )}
          {modalType === constants.MODAL_VOLUME_UNITS && (
            <ModalContentBottom
              isListModal={true}
              options={this.getVolumeUnitOptions()}
              title={constants.MODAL_VOLUME_UNITS}
              onPressItem={this.onVolumeUnitPress}
              onModalSave={this.onVolumeUnitSavePressed}
              hasSave={true}
              darkMode={darkMode}
            />
          )}
        </CustomModal>
        <DynamicLinkListener handleDynamicLink={this.handleDynamicLink} />
      </SafeAreaView>
    )
  }
}

HomeScreen.propTypes = {
  darkMode: PropTypes.bool,
  recipes: PropTypes.array,
  fetchRecipesIsLoading: PropTypes.bool,
  fetchSharedRecipeIsLoading: PropTypes.bool,
  sharedRecipe: PropTypes.object,
  upgradeIAPIsLoading: PropTypes.bool,
  restoreIAPIsLoading: PropTypes.bool,
  user: PropTypes.object,
  updateVolumeUnitsLoading: PropTypes.bool,
  upgradeMixxyPro: PropTypes.func,
  requestPurchaseIAP: PropTypes.func,
  restoreIAP: PropTypes.func,
  fetchRecipes: PropTypes.func,
  fetchSharedRecipe: PropTypes.func,
  updateVolumeUnits: PropTypes.func,
}

const mapStateToProps = (state) => ({
  recipes: state.recipes.recipes,
  fetchRecipesIsLoading: state.recipes.fetchRecipesIsLoading,
  fetchSharedRecipeIsLoading: state.recipes.fetchSharedRecipeIsLoading,
  sharedRecipe: state.recipes.sharedRecipe,
  upgradeIAPIsLoading: state.user.upgradeIAPIsLoading,
  restoreIAPIsLoading: state.user.restoreIAPIsLoading,
  user: state.user,
  updateVolumeUnitsLoading: state.user.updateVolumeUnitsLoading,
})

const mapDispatchToProps = (dispatch) => ({
  upgradeMixxyPro: (purchase) => dispatch(UserActions.upgradeIAP(purchase)),
  requestPurchaseIAP: () => dispatch(UserActions.requestPurchaseIAP()),
  restoreIAP: () => dispatch(UserActions.restoreIAP()),
  fetchRecipes: () => dispatch(RecipeActions.fetchRecipes()),
  fetchSharedRecipe: (recipeId) => dispatch(RecipeActions.fetchSharedRecipe(recipeId)),
  updateVolumeUnits: (useMetric) => dispatch(UserActions.updateVolumeUnits(useMetric)),
})

export default withNavigationFocus(
  connect(mapStateToProps, mapDispatchToProps)(NavigationService.screenWithDarkMode(HomeScreen))
)
