import React from 'react'
import { Dimensions, Image, Alert } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { SafeAreaView, withNavigationFocus } from 'react-navigation'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import getStylesheet from '../../Theme/ApplicationStyles'
import getHomeStylesheet from './HomeScreenStyle'
import RecipeCard from '../../Components/RecipeCard'
import NavigationService from '../../Services/NavigationService'
import RecipeActions from '../../Stores/Recipe/Actions'
import HomeDiscoverTab from './HomeDiscoverTab'
import Images from '../../Theme/Images'
import HomeLibraryTab from './HomeLibraryTab'
import HomeSettingsTab from './HomeSettingsTab'
import DynamicLinkListener from '../../Components/DynamicLinkListener'
import CustomModal from '../../Components/CustomModal'
import ModalContentSharedRecipe from '../../Components/ModalContentSharedRecipe'
import * as constants from '../../Config/constants'


const initialLayout = { width: Dimensions.get('window').width };
const routes = [
  { key: 'discover', title: 'Discover' },
  { key: 'library', title: 'Library' },
  { key: 'settings', title: 'Settings' }
]
const renderScene = SceneMap({
  discover: HomeDiscoverTab,
  library: HomeLibraryTab,
  settings: HomeSettingsTab,
});

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      visibleModal: false,
      modalType: constants.MODAL_TYPE_BOTTOM,
    };
  }

  componentDidMount() {
    this.props.fetchRecipes()
  }

  handleDynamicLink = (link) => {
    if (link) {
      NavigationService.goBackToRoute('HomeScreen')
      const pathname = link.url.split('/')[3]
      this.props.fetchSharedRecipe(pathname)
      this.setState({
        visibleModal: true
      })
    }
  }

  onCardClick = (idx, isFavorite) => {
    const { favoriteRecipes, allRecipes } = this.state;
    let recipesToUse = favoriteRecipes
    if (!isFavorite) {
      recipesToUse = allRecipes
    }
    NavigationService.navigate('TutorialScreen', {
      recipe: recipesToUse[idx]
    })
  }

  onBuilderClick = () => {
    NavigationService.navigate('BuilderScreen', {})
  }

  onCloseModalClick = () => {
    this.setState({
      visibleModal: false
    })
  }

  onSharedRecipeClick = () => {
    this.onCloseModalClick()
    NavigationService.navigate('TutorialScreen', {
      recipe: this.props.sharedRecipe
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
    );
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

  render() {
    const { darkMode, fetchSharedRecipeIsLoading, sharedRecipe } = this.props;
    const { index, visibleModal, modalType } = this.state;
    const styles = getStylesheet(darkMode)
    const homeStyles = getHomeStylesheet(darkMode)

    return (
      <SafeAreaView style={styles.outerContainer}>
        <TabView
          swipeEnabled={false}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={(idx) => this.setState({ index: idx })}
          initialLayout={initialLayout}
          tabBarPosition={'bottom'}
          renderTabBar={props =>
            <TabBar
              {...props}
              indicatorStyle={{backgroundColor: 'red'}}
              renderIcon={
                props => this.getTabBarIcon(props)
              }
              labelStyle={homeStyles.tabLabel}
              indicatorContainerStyle={homeStyles.tabIndicator}
              style={homeStyles.tabBackground}
            />
          }
        />
        <CustomModal
          visibleModal={visibleModal}
          onCloseClick={this.onCloseModalClick}
          type={modalType}
          darkMode={darkMode}
        >
          <ModalContentSharedRecipe
            onCardClick={this.onSharedRecipeClick}
            fetchSharedRecipeIsLoading={fetchSharedRecipeIsLoading}
            sharedRecipe={sharedRecipe}
            darkMode={darkMode}
          />
        </CustomModal>
        <DynamicLinkListener handleDynamicLink={this.handleDynamicLink} />
      </SafeAreaView>
    )
  }
}

HomeScreen.propTypes = {
  recipes: PropTypes.array,
  fetchRecipesIsLoading: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  recipes: state.recipes.recipes,
  fetchRecipesIsLoading: state.recipes.fetchRecipesIsLoading,
  fetchSharedRecipeIsLoading: state.recipes.fetchSharedRecipeIsLoading,
  sharedRecipe: state.recipes.sharedRecipe,
})

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: () => dispatch(RecipeActions.fetchRecipes()),
  fetchSharedRecipe: (recipeId) => dispatch(RecipeActions.fetchSharedRecipe(recipeId)),
})

export default withNavigationFocus(connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(HomeScreen)))
