import React from 'react'
import {
  View,
  Alert,
  Animated,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native'
import { connect } from 'react-redux'
import Share from 'react-native-share'
import { NavigationActions, withNavigationFocus } from 'react-navigation'
import FastImage from 'react-native-fast-image'
import analytics from '@react-native-firebase/analytics'
import getStylesheet from '../../Theme/ApplicationStyles'
import Images from '../../Theme/Images'
import Colors from '../../Theme/Colors'
import getTutorialStylesheet from './TutorialScreenStyle'
import TutorialHeader from './TutorialHeader'
import NavigationService from '../../Services/NavigationService'
import { PropTypes } from 'prop-types'
import RecipeActions from '../../Stores/Recipe/Actions'
import CustomModal from '../../Components/CustomModal'
import * as constants from '../../Config/constants'
import ModalContentBottom from '../../Components/ModalContentBottom'
import ModalContentCreateShare from '../../Components/ModalContentCreateShare'
import BottomBar from '../../Components/BottomBar'
import ModalContentMixxyPro from '../../Components/ModalContentMixxyPro'
import ListItem from '../../Components/ListItem'
import Step from './Step'
import TutorialDrinkQuantity from './TutorialDrinkQuantity'
import UserActions from '../../Stores/User/Actions'
import * as ingredientModel from '../../Storage/Ingredient'

const NUM_OF_LINES = 3

class TutorialScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: {},
      premium: false,
      drinkAmount: 1,
      visibleModal: false,
      modalType: '',
      isSharedPreviously: false,
      deleteModal: false,
      clickedReadMore: false,
      showAllText: true,
      scrollY: new Animated.Value(0),
      recipeImageHeight: 0,
    }
  }

  componentDidMount() {
    const { navigation } = this.props
    const recipe = navigation.getParam('recipe', {})
    const premium = navigation.getParam('premium', false)

    // Recipe image state
    const { width } = Dimensions.get('window')
    this.setState({
      recipe,
      premium,
      recipeImageHeight: recipe.imageLink && recipe.imageLink !== '' ? width * (3 / 4) : 0,
    })
  }

  componentDidUpdate(prevProps) {
    const { isSharedPreviously } = this.state
    const {
      user,
      persistRecipeIsLoading,
      isFocused,
      persistRecipeErrorMessage,
      recipeIsExternal,
      deleteRecipeIsLoading,
      createSharedRecipeIsLoading,
      createSharedRecipeErrorMessage,
      shareLink,
      fetchSharedRecipeIsLoading,
      sharedRecipe,
    } = this.props
    if (!prevProps.user.premium && user.premium) {
      this.onCloseModalClick()
      return
    }
    if (prevProps.persistRecipeIsLoading && !persistRecipeIsLoading) {
      if (persistRecipeErrorMessage && isFocused) {
        if (persistRecipeErrorMessage === constants.MIXXY_PRO_LIBRARY_FULL) {
          this.setState({
            visibleModal: true,
            modalType: constants.MODAL_PAYWALL,
          })
        } else {
          Alert.alert('Error saving recipe', `${persistRecipeErrorMessage}`, [
            {
              text: 'OK',
            },
          ])
        }
      } else {
        if (recipeIsExternal) {
          // Say recipe saved and close screen
          this.onBackScreenClick()
          Alert.alert('Added to Library', `Recipe successfully added to library.`, [
            {
              text: 'OK',
            },
          ])
        } else {
          // Update recipe if got updated
          this.updateRecipe(this.props.recipes)
        }
      }
    }
    if (prevProps.deleteRecipeIsLoading && !deleteRecipeIsLoading) {
      this.onBackScreenClick()
    }
    if (prevProps.createSharedRecipeIsLoading && !createSharedRecipeIsLoading) {
      if (createSharedRecipeErrorMessage && isFocused) {
        Alert.alert('Error creating shared recipe', `${createSharedRecipeErrorMessage}`, [
          {
            text: 'OK',
          },
        ])
      } else {
        // Open share sheet
        if (!isSharedPreviously) {
          analytics().logEvent('share_link_created', {})
        }
        this.openShareSheet(shareLink)
      }
    }
    if (prevProps.fetchSharedRecipeIsLoading && !fetchSharedRecipeIsLoading) {
      if (sharedRecipe) {
        this.setState({
          visibleModal: true,
          modalType: constants.MODAL_SHARED_RECIPE,
          isSharedPreviously: true,
        })
      } else {
        this.setState({
          visibleModal: true,
          modalType: constants.MODAL_SHARED_RECIPE,
          isSharedPreviously: false,
        })
      }
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

  openShareSheet = (shareLink) => {
    const { recipe } = this.state
    const options = {
      message: `Check out this recipe for ${recipe.recipeName} on Mixxy!`,
      url: shareLink,
      failOnCancel: false,
    }
    Share.open(options)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        err && console.log(err)
      })
  }

  updateRecipe = (nextRecipes) => {
    const { recipe } = this.state
    for (let i = 0; i < nextRecipes.length; i += 1) {
      // Check IDs and
      if (nextRecipes[i].recipeId === recipe.recipeId) {
        this.setState({ recipe: nextRecipes[i] })
      }
    }
  }

  getModalOptions = () => {
    const { deleteModal } = this.state

    if (deleteModal) {
      return [
        {
          title: constants.RECIPE_MENU_CANCEL,
        },
        {
          title: constants.RECIPE_MENU_DELETE,
        },
      ]
    }

    return [
      {
        title: constants.RECIPE_MENU_EDIT,
      },
      {
        title: constants.RECIPE_MENU_DELETE,
      },
    ]
  }

  onBackScreenClick = () => {
    const { navigation } = this.props
    navigation.dispatch(NavigationActions.back())
  }

  onSaveClick = () => {
    // Call persist recipe
    const { recipe } = this.state
    const { user, persistRecipe } = this.props
    persistRecipe(recipe, true, user.premium)
  }

  onCloseModalClick = () => {
    // Close and clear modal
    this.setState({
      visibleModal: false,
      modalType: '',
    })
  }

  onPressItem = (item) => {
    const { deleteRecipe, user } = this.props
    const { recipe, deleteModal } = this.state

    if (item === constants.RECIPE_MENU_EDIT) {
      if (!user.premium) {
        this.setState({
          visibleModal: true,
          modalType: constants.MODAL_PAYWALL,
        })
        return
      }
      // Go to edit page
      this.setState({
        visibleModal: false,
      })
      NavigationService.navigate('BuilderScreen', {
        recipe: recipe,
      })
    } else if (item === constants.RECIPE_MENU_DELETE) {
      // Call delete recipe
      if (!deleteModal) {
        this.setState({
          deleteModal: true,
        })
      } else {
        deleteRecipe(recipe.recipeId)
        // Hide modal
        this.setState({
          visibleModal: false,
        })
      }
    } else if (item === constants.RECIPE_MENU_CANCEL) {
      // Call clear
      this.onCloseModalClick()
    }
  }

  onFavoriteClick = () => {
    const { favoriteRecipe, unfavoriteRecipe } = this.props
    const { recipe } = this.state
    if (recipe.favorited) {
      unfavoriteRecipe(recipe.recipeId)
    } else {
      favoriteRecipe(recipe.recipeId)
    }
  }

  reduceDrinkQuantity = () => {
    const { drinkAmount } = this.state
    if (drinkAmount <= 1) {
      return
    }
    this.setState({ drinkAmount: drinkAmount - 1 })
  }

  increaseDrinkQuantity = () => {
    const { drinkAmount } = this.state
    if (drinkAmount >= 10) {
      return
    }
    this.setState({ drinkAmount: drinkAmount + 1 })
  }

  onCreateShareLink = () => {
    const { recipe } = this.state
    this.props.createSharedRecipe(recipe)
  }

  onDotsClick = () => {
    this.setState({
      visibleModal: true,
      modalType: constants.MODAL_RECIPE_MENU,
      deleteModal: false,
    })
  }

  onShareClick = () => {
    const { fetchSharedRecipe } = this.props
    const { recipe } = this.state
    // First, check if already shared
    fetchSharedRecipe(recipe.recipeId)
  }

  _getHeaderBackgroundColor = () => {
    const { darkMode } = this.props
    const { scrollY, recipeImageHeight } = this.state

    if (recipeImageHeight === 0) {
      return darkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight
    }

    const outputFinal = darkMode ? 'rgba(0,0,0,1.0)' : 'rgba(255,255,255,1.0)'
    const outputStart = darkMode ? 'rgba(0,0,0,0.0)' : 'rgba(255,255,255,0.0)'
    return scrollY.interpolate({
      inputRange: [0, recipeImageHeight],
      outputRange: [outputStart, outputFinal],
      extrapolate: 'clamp',
      useNativeDriver: true,
    })
  }

  _getHeaderDividerBackgroundColor = () => {
    const { darkMode } = this.props
    const { scrollY, recipeImageHeight } = this.state

    if (recipeImageHeight === 0) {
      return darkMode ? Colors.darkFill2Dark : Colors.darkFill2Light
    }

    const outputFinal = darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
    const outputStart = darkMode ? 'rgba(255,255,255,0.0)' : 'rgba(0,0,0,0.0)'
    return scrollY.interpolate({
      inputRange: [0, recipeImageHeight],
      outputRange: [outputStart, outputFinal],
      extrapolate: 'clamp',
      useNativeDriver: true,
    })
  }

  onReadMorePress = () => {
    this.setState({
      clickedReadMore: true,
      showAllText: true,
    })
  }

  onTextLayout = (e) => {
    const { clickedReadMore } = this.state
    if (e.nativeEvent.lines.length > NUM_OF_LINES && !clickedReadMore) {
      this.setState({
        showAllText: false,
      })
    }
  }

  getDrinkIcon = (iconStyle) => {
    const { recipe } = this.state
    if (recipe.servingGlass === constants.SERVING_GLASS_PITCHER) {
      return <Image style={iconStyle} source={Images.glassPitcher} />
    }
    if (recipe.servingGlass === constants.SERVING_GLASS_SHOT) {
      return <Image style={iconStyle} source={Images.glassShot} />
    }
    if (recipe.servingGlass === constants.SERVING_GLASS_MARGARITA) {
      return <Image style={iconStyle} source={Images.glassMarg} />
    }
    if (recipe.servingGlass === constants.SERVING_GLASS_FLUTE) {
      return <Image style={iconStyle} source={Images.glassFlute} />
    }
    if (recipe.servingGlass === constants.SERVING_GLASS_TALL) {
      return <Image style={iconStyle} source={Images.glassTall} />
    }
    if (recipe.servingGlass === constants.SERVING_GLASS_COCKTAIL) {
      return <Image style={iconStyle} source={Images.glassMartini} />
    }
    if (recipe.servingGlass === constants.SERVING_GLASS_PINT) {
      return <Image style={iconStyle} source={Images.glassPint} />
    }
    if (recipe.servingGlass === constants.SERVING_GLASS_WINE) {
      return <Image style={iconStyle} source={Images.glassWine} />
    }
    if (recipe.servingGlass === constants.SERVING_GLASS_COUPE) {
      return <Image style={iconStyle} source={Images.glassCoupe} />
    }
    if (recipe.servingGlass === constants.SERVING_GLASS_COPPER_MUG) {
      return <Image style={iconStyle} source={Images.glassCopperMug} />
    }
    return <Image style={iconStyle} source={Images.glassShort} />
  }

  render() {
    const { darkMode, recipes, createSharedRecipeIsLoading, user } = this.props
    const {
      recipe,
      drinkAmount,
      visibleModal,
      modalType,
      deleteModal,
      isSharedPreviously,
      showAllText,
      recipeImageHeight,
    } = this.state

    const styles = getStylesheet(darkMode)
    const tutorialStyles = getTutorialStylesheet(darkMode)

    // Is it in our library?
    let recipeSaved = false
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].recipeId === recipe.recipeId) {
        recipeSaved = true
      }
    }
    // Modal title
    let modalTitle = 'Recipe Settings'
    if (deleteModal) {
      modalTitle = 'Delete this recipe?'
    }

    const isDescription = 'recipeDescription' in recipe && recipe.recipeDescription !== ''

    const recipeImageExists = !!(recipe.imageLink && recipe.imageLink !== '')
    const recipeImageStyle = {
      height: recipeImageHeight,
      marginBottom: 24,
    }
    const scrollViewStyle = {
      zIndex: -1,
      position: 'relative',
      flex: 1,
    }

    return (
      <View style={styles.outerContainer}>
        <StatusBar backgroundColor={'transparent'} translucent />
        <TutorialHeader
          onClose={this.onBackScreenClick}
          darkMode={darkMode}
          isFavorited={recipe.favorited}
          onDotsClick={this.onDotsClick}
          onFavoriteClick={this.onFavoriteClick}
          onShareClick={this.onShareClick}
          backgroundColor={this._getHeaderBackgroundColor()}
          dividerBackgroundColor={this._getHeaderDividerBackgroundColor()}
          showDots={recipeSaved}
          useAbsolutePosition={recipeImageExists}
        />
        <Animated.ScrollView
          style={[tutorialStyles.scrollView, scrollViewStyle]}
          overScrollMode={'never'}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: this.state.scrollY } },
            },
          ])}
        >
          {recipeImageExists && (
            <FastImage
              style={recipeImageStyle}
              source={{
                uri: recipe.imageLink,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
          {!recipeImageExists && (
            <View style={tutorialStyles.iconView}>{this.getDrinkIcon(tutorialStyles.icon)}</View>
          )}
          <Text style={tutorialStyles.recipeTitle}>{recipe.recipeName}</Text>
          {isDescription && (
            <Text
              style={tutorialStyles.descriptionText}
              numberOfLines={showAllText ? null : NUM_OF_LINES}
              onTextLayout={this.onTextLayout}
            >
              {recipe.recipeDescription}
            </Text>
          )}
          {!showAllText && (
            <View style={tutorialStyles.readMoreOutline}>
              <TouchableWithoutFeedback onPress={this.onReadMorePress}>
                <Text style={tutorialStyles.readMoreText}>Read more</Text>
              </TouchableWithoutFeedback>
            </View>
          )}
          <View style={tutorialStyles.menuButtonSeparator} />
          <View style={styles.divider} />
          <TutorialDrinkQuantity
            darkMode={darkMode}
            drinkAmount={drinkAmount}
            reduceDrinkQuantity={this.reduceDrinkQuantity}
            increaseDrinkQuantity={this.increaseDrinkQuantity}
          />
          <View style={styles.thickDivider} />
          <View>
            <View style={tutorialStyles.sectionHeaderContainer}>
              <Text style={tutorialStyles.sectionHeader}>Ingredients</Text>
            </View>
            <View style={styles.divider} />
          </View>
          {Object.keys(recipe).length !== 0 &&
            recipe.ingredients.map((ingredient) => (
              <ListItem
                key={ingredient.ingredientId}
                title={ingredientModel.getIngredientShortDescription(
                  ingredient,
                  drinkAmount,
                  false,
                  user.useMetric
                )}
                darkMode={darkMode}
                disabled
              />
            ))}
          <View style={styles.thickDivider} />
          <View>
            <View style={tutorialStyles.sectionHeaderContainer}>
              <Text style={tutorialStyles.sectionHeader}>Steps</Text>
            </View>
            <View style={styles.divider} />
          </View>
          <View style={tutorialStyles.stepsContainer}>
            {Object.keys(recipe).length !== 0 &&
              recipe.steps.map((step, idx) => (
                <Step
                  key={`step${idx}`}
                  step={step}
                  isFirst={idx === 0}
                  isLast={idx === recipe.steps.length - 1}
                  darkMode={darkMode}
                />
              ))}
          </View>
          <View style={tutorialStyles.bufferView} />
        </Animated.ScrollView>
        {!recipeSaved && (
          <BottomBar
            buttonTitle={'Add to Library'}
            onButtonClick={this.onSaveClick}
            darkMode={darkMode}
          />
        )}
        <CustomModal
          visibleModal={visibleModal}
          onCloseClick={this.onCloseModalClick}
          type={constants.MODAL_TYPE_BOTTOM}
          darkMode={darkMode}
        >
          {modalType === constants.MODAL_RECIPE_MENU && (
            <ModalContentBottom
              onPressItem={this.onPressItem}
              title={modalTitle}
              isImageListModal
              isSelectInput={false}
              options={this.getModalOptions()}
              darkMode={darkMode}
            />
          )}
          {modalType === constants.MODAL_SHARED_RECIPE && (
            <ModalContentCreateShare
              sharedRecipe={recipe}
              onShareRecipe={this.onCreateShareLink}
              onCancelClick={this.onCloseModalClick}
              createSharedRecipeIsLoading={createSharedRecipeIsLoading}
              darkMode={darkMode}
              isNew={!isSharedPreviously}
            />
          )}
          {modalType === constants.MODAL_PAYWALL && (
            <ModalContentMixxyPro
              darkMode={darkMode}
              onMixxyProClick={this.onPurchaseMixxyClicked}
              onRestoreClick={this.onRestorePurchaseClicked}
            />
          )}
        </CustomModal>
      </View>
    )
  }
}

TutorialScreen.propTypes = {
  darkMode: PropTypes.bool,
  isFocused: PropTypes.bool,
  navigation: PropTypes.object,
  recipes: PropTypes.array,
  user: PropTypes.object,
  persistRecipeIsLoading: PropTypes.bool,
  persistRecipeErrorMessage: PropTypes.string,
  recipeIsExternal: PropTypes.bool,
  deleteRecipeIsLoading: PropTypes.bool,
  shareLink: PropTypes.string,
  createSharedRecipeIsLoading: PropTypes.bool,
  createSharedRecipeErrorMessage: PropTypes.string,
  sharedRecipe: PropTypes.object,
  fetchSharedRecipeIsLoading: PropTypes.bool,
  persistRecipe: PropTypes.func,
  deleteRecipe: PropTypes.func,
  favoriteRecipe: PropTypes.func,
  unfavoriteRecipe: PropTypes.func,
  createSharedRecipe: PropTypes.func,
  fetchSharedRecipe: PropTypes.func,
  requestPurchaseIAP: PropTypes.func,
  restoreIAP: PropTypes.func,
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  recipes: state.recipes.recipes,
  persistRecipeIsLoading: state.recipes.persistRecipeIsLoading,
  persistRecipeErrorMessage: state.recipes.persistRecipeErrorMessage,
  recipeIsExternal: state.recipes.recipeIsExternal,
  deleteRecipeIsLoading: state.recipes.deleteRecipeIsLoading,
  shareLink: state.recipes.shareLink,
  createSharedRecipeIsLoading: state.recipes.createSharedRecipeIsLoading,
  createSharedRecipeErrorMessage: state.recipes.createSharedRecipeErrorMessage,
  sharedRecipe: state.recipes.sharedRecipe,
  fetchSharedRecipeIsLoading: state.recipes.fetchSharedRecipeIsLoading,
})

const mapDispatchToProps = (dispatch) => ({
  persistRecipe: (recipeToSave, isExternal, isPremium) =>
    dispatch(RecipeActions.persistRecipe(recipeToSave, isExternal, isPremium)),
  deleteRecipe: (recipeId) => dispatch(RecipeActions.deleteRecipe(recipeId)),
  favoriteRecipe: (recipeId) => dispatch(RecipeActions.favoriteRecipe(recipeId)),
  unfavoriteRecipe: (recipeId) => dispatch(RecipeActions.unfavoriteRecipe(recipeId)),
  createSharedRecipe: (recipe) => dispatch(RecipeActions.createSharedRecipe(recipe)),
  fetchSharedRecipe: (recipeId) => dispatch(RecipeActions.fetchSharedRecipe(recipeId)),
  requestPurchaseIAP: () => dispatch(UserActions.requestPurchaseIAP()),
  restoreIAP: () => dispatch(UserActions.restoreIAP()),
})

export default withNavigationFocus(
  connect(mapStateToProps, mapDispatchToProps)(NavigationService.screenWithDarkMode(TutorialScreen))
)
