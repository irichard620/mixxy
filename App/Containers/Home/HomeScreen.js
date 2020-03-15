import React from 'react'
import { Dimensions, View, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { SafeAreaView } from "react-navigation"
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import getStylesheet from '../../Theme/ApplicationStyles'
import getHomeStylesheet from './HomeScreenStyle'
import RecipeCard from '../../Components/RecipeCard'
import NavigationService from '../../Services/NavigationService'
import RecipeActions from '../../Stores/Recipe/Actions'
import HomeDiscoverTab from './HomeDiscoverTab'
import Images from '../../Theme/Images'


const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);


const initialLayout = { width: Dimensions.get('window').width };
const routes = [
  { key: 'discover', title: 'Discover' },
  { key: 'library', title: 'Library' },
  { key: 'settings', title: 'Settings' }
]
const renderScene = SceneMap({
  discover: HomeDiscoverTab,
  library: SecondRoute,
  settings: ThirdRoute,
});

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  componentDidMount() {
    this.props.fetchRecipes()
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

  renderCard = (idx, item, isFavorite) => {
    return (
      <RecipeCard
        key={item.recipeId}
        recipeName={item.recipeName}
        recipeType={item.recipeType}
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
    const { darkMode } = this.props;
    const { index } = this.state;
    const styles = getStylesheet(darkMode)
    const homeStyles = getHomeStylesheet(darkMode)

    return (
      <SafeAreaView style={styles.outerContainer}>
        <TabView
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
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

HomeScreen.propTypes = {
  recipes: PropTypes.array,
  fetchRecipesIsLoading: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  recipes: state.recipes.recipes,
  fetchRecipesIsLoading: state.recipes.fetchRecipesIsLoading,
})

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: () => dispatch(RecipeActions.fetchRecipes()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(HomeScreen))
