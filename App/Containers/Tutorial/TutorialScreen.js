import React from 'react'
import { View, Dimensions, Alert } from 'react-native'
import { connect } from 'react-redux'
import Share from 'react-native-share';
import { NavigationActions, SafeAreaView, withNavigationFocus } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient';
import getStylesheet from '../../Theme/ApplicationStyles'
import TopHeader from '../../Components/TopHeader'
import getTutorialStylesheet from './TutorialScreenStyle'
import ButtonLarge from '../../Components/ButtonLarge'
import NavigationService from '../../Services/NavigationService'
import TutorialHome from './TutorialHome'
import Colors from '../../Theme/Colors'
import { PropTypes } from 'prop-types'
import RecipeActions from '../../Stores/Recipe/Actions'
import CustomModal from '../../Components/CustomModal'
import * as constants from '../../Config/constants'
import ModalContentBottom from '../../Components/ModalContentBottom'
import ModalContentCreateShare from '../../Components/ModalContentCreateShare'
import BottomBar from '../../Components/BottomBar'


class TutorialScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: -1,
      recipe: {},
      premium: false,
      drinkAmount: 1,
      visibleModal: false,
      modalType: '',
      isShareModal: false,
      isSharedPreviously: false,
      deleteModal: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const recipe = navigation.getParam('recipe', {});
    const premium = navigation.getParam('premium', false);
    this.setState({ recipe, premium });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.persistRecipeIsLoading && !this.props.persistRecipeIsLoading) {
      if (this.props.persistRecipeErrorMessage && this.props.isFocused) {
        Alert.alert(
          'Error saving recipe',
          `${this.props.persistRecipeErrorMessage}`,
          [
            {
              text: 'OK'
            },
          ],
        );
      } else {
        if (this.props.recipeIsExternal) {
          // Say recipe saved and close screen
          this.onBackScreenClick()
          Alert.alert(
            'Added to Library',
            `Recipe successfully added to library.`,
            [
              {
                text: 'OK'
              },
            ],
          );
        } else {
          // Update recipe if got updated
          this.updateRecipe(this.props.recipes)
        }
      }
    } if (prevProps.deleteRecipeIsLoading && !this.props.deleteRecipeIsLoading) {
      this.onBackScreenClick()
    } if (prevProps.createSharedRecipeIsLoading && !this.props.createSharedRecipeIsLoading) {
      if (this.props.createSharedRecipeErrorMessage && this.props.isFocused) {
        Alert.alert(
          'Error creating shared recipe',
          `${this.props.createSharedRecipeErrorMessage}`,
          [
            {
              text: 'OK'
            },
          ],
        );
      } else {
        // Open share sheet
        this.openShareSheet(this.props.shareLink)
      }
    } if (prevProps.fetchSharedRecipeIsLoading && !this.props.fetchSharedRecipeIsLoading) {
      if (this.props.sharedRecipe) {
        this.setState({
          visibleModal: true,
          isShareModal: true,
          isSharedPreviously: true,
        })
      } else {
        this.setState({
          visibleModal: true,
          isShareModal: true,
          isSharedPreviously: false,
        })
      }
    }
  }


  openShareSheet = (shareLink) => {
    const { recipe } = this.state;
    const options = {
      message: `Check out this recipe for ${recipe.recipeName} on Mixxy!`,
      url: shareLink,
      failOnCancel: false,
    }
    Share.open(options)
      .then((res) => { console.log(res) })
      .catch((err) => { err && console.log(err); });
  }

  updateRecipe = (nextRecipes) => {
    const { recipe } = this.state;
    for (let i = 0; i < nextRecipes.length; i += 1) {
      // Check IDs and
      if (nextRecipes[i].recipeId === recipe.recipeId) {
        this.setState({ recipe: nextRecipes[i] });
      }
    }
  };

  getModalOptions = () => {
    const { deleteModal } = this.state;

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

    return [{
      title: constants.RECIPE_MENU_EDIT,
    }, {
      title: constants.RECIPE_MENU_SHARE,
    }, {
      title: constants.RECIPE_MENU_DELETE,
    }]
  }

  onBackScreenClick = () => {
    const { navigation } = this.props;
    navigation.dispatch(NavigationActions.back());
  }

  onSaveClick = () => {
    // Call persist recipe
    const { recipe } = this.state
    this.props.persistRecipe(recipe, true)
  }

  onCloseModalClick = () => {
    // Close and clear modal
    this.setState({
      visibleModal: false,
      isShareModal: false,
    })
  }

  onPressItem = (item) => {
    const { deleteRecipe, fetchSharedRecipe, user, favoriteRecipe, unfavoriteRecipe } = this.props;
    const { recipe, deleteModal } = this.state;

    if (item === constants.RECIPE_MENU_EDIT) {
      if (!user.premium) {
        Alert.alert(
          'Mixxy Pro Feature',
          'The ability to edit recipes is a Mixxy Pro feature.',
          [
            {
              text: 'OK',
            },
          ]
        )
        return
      }
      // Go to edit page
      this.setState({
        visibleModal: false
      });
      NavigationService.navigate('BuilderScreen', {
        recipe: recipe
      })
    } else if (item === constants.RECIPE_MENU_SHARE) {
      // First, check if already shared
      fetchSharedRecipe(recipe.recipeId)
    } else if (item === constants.RECIPE_MENU_DELETE) {
      // Call delete recipe
      if (!deleteModal) {
        this.setState({
          deleteModal: true
        });
      } else {
        deleteRecipe(recipe.recipeId);
        // Hide modal
        this.setState({
          visibleModal: false
        });
      }
    } else if (item === constants.RECIPE_MENU_CANCEL) {
      // Call clear
      this.onCloseModalClick();
    }
  };

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
    const { recipe } = this.state;
    this.props.createSharedRecipe(recipe);
  }

  onDotsClick = () => {
    this.setState({
      visibleModal: true,
      modalType: constants.MODAL_TYPE_BOTTOM,
      isShareModal: false,
      deleteModal: false,
    })
  }

  render() {
    const { darkMode, recipes, createSharedRecipeIsLoading } = this.props;
    const { step, recipe, drinkAmount, visibleModal, modalType, deleteModal, isShareModal, isSharedPreviously } = this.state;

    const styles = getStylesheet(darkMode)
    const tutorialStyles = getTutorialStylesheet(darkMode)

    let headerTitle = '';
    if (step >= 0 && 'recipeName' in recipe) {
      headerTitle = recipe.recipeName
    }

    // Is it in our library?
    let recipeSaved = false
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].recipeId === recipe.recipeId) {
        recipeSaved = true
      }
    }
    const { width } = Dimensions.get('window');
    const fullButtonWidth = (width - 32)

    // Modal title
    let modalTitle = 'Recipe Settings';
    if (deleteModal) {
      modalTitle = 'Delete this recipe?';
    }
    return (
      <View style={styles.outerContainer}>
        <TopHeader
          title={headerTitle}
          onClose={this.onBackScreenClick}
          showSeparator={false}
          darkMode={darkMode}
          showDots={recipeSaved}
          isFavorited={recipe.favorited}
          onDotsClick={this.onDotsClick}
          onFavoriteClick={this.onFavoriteClick}
        />
        <TutorialHome
          recipe={recipe}
          darkMode={darkMode}
          drinkAmount={drinkAmount}
          reduceDrinkQuantity={this.reduceDrinkQuantity}
          increaseDrinkQuantity={this.increaseDrinkQuantity}
          recipeSaved={recipeSaved}
        />
        {!recipeSaved && <BottomBar buttonTitle={'Add to Library'} onButtonClick={this.onSaveClick} darkMode={darkMode} />}
        <CustomModal
          visibleModal={visibleModal}
          onCloseClick={this.onCloseModalClick}
          type={modalType}
          darkMode={darkMode}
        >
          {!isShareModal
          && (
            <ModalContentBottom
              onPressItem={this.onPressItem}
              title={modalTitle}
              isImageListModal
              isSelectInput={false}
              options={this.getModalOptions()}
              darkMode={darkMode}
            />
          )}
          {isShareModal
          && (
            <ModalContentCreateShare
              sharedRecipe={recipe}
              onShareRecipe={this.onCreateShareLink}
              onCancelClick={this.onCloseModalClick}
              createSharedRecipeIsLoading={createSharedRecipeIsLoading}
              darkMode={darkMode}
              isNew={!isSharedPreviously}
            />
          )}
        </CustomModal>
      </View>
    )
  }
}

TutorialScreen.propTypes = {
  recipes: PropTypes.array,
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
  persistRecipe: (recipeToSave, isExternal) => dispatch(RecipeActions.persistRecipe(recipeToSave, isExternal)),
  deleteRecipe: (recipeId) => dispatch(RecipeActions.deleteRecipe(recipeId)),
  favoriteRecipe: (recipeId) => dispatch(RecipeActions.favoriteRecipe(recipeId)),
  unfavoriteRecipe: (recipeId) => dispatch(RecipeActions.unfavoriteRecipe(recipeId)),
  createSharedRecipe: (recipe) => dispatch(RecipeActions.createSharedRecipe(recipe)),
  fetchSharedRecipe: (recipeId) => dispatch(RecipeActions.fetchSharedRecipe(recipeId)),
})

export default withNavigationFocus(connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(TutorialScreen)))
