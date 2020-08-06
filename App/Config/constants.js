import { LayoutAnimation } from 'react-native'

// Cocktail steps
export const STEP_ADD_INGREDIENTS = 'Add Ingredients'
export const STEP_REMOVE_INGREDIENTS = 'Remove Ingredients'
export const STEP_STIR = 'Stir'
export const STEP_MUDDLE = 'Muddle'
export const STEP_BLEND = 'Blend'
export const STEP_SHAKE = 'Shake'
export const STEP_STRAIN = 'Strain'
export const STEP_GARNISH = 'Garnish'
export const STEP_RIM_GLASS = 'Rim Glass'
export const steps = [
  STEP_ADD_INGREDIENTS,
  STEP_REMOVE_INGREDIENTS,
  STEP_STIR,
  STEP_MUDDLE,
  STEP_BLEND,
  STEP_SHAKE,
  STEP_STRAIN,
  STEP_GARNISH,
  STEP_RIM_GLASS,
]

// Cocktail serving glasses
export const SERVING_GLASS_COCKTAIL = 'Cocktail Glass'
export const SERVING_GLASS_TALL = 'Tall Glass'
export const SERVING_GLASS_SHORT = 'Short Glass'
export const SERVING_GLASS_FLUTE = 'Flute Glass'
export const SERVING_GLASS_MARGARITA = 'Margarita Glass'
export const SERVING_GLASS_SHOT = 'Shot Glass'
export const SERVING_GLASS_PITCHER = 'Pitcher'
export const SERVING_GLASS_PINT = 'Pint glass'
export const SERVING_GLASS_WINE = 'Wine glass'
export const SERVING_GLASS_COUPE = 'Coupe glass'
export const SERVING_GLASS_COPPER_MUG = 'Copper mug'
export const servingGlasses = [
  SERVING_GLASS_COCKTAIL,
  SERVING_GLASS_TALL,
  SERVING_GLASS_SHORT,
  SERVING_GLASS_FLUTE,
  SERVING_GLASS_MARGARITA,
  SERVING_GLASS_SHOT,
  SERVING_GLASS_PITCHER,
  SERVING_GLASS_PINT,
  SERVING_GLASS_WINE,
  SERVING_GLASS_COUPE,
  SERVING_GLASS_COPPER_MUG,
]
export const SERVING_GLASS_DISPLAY_COCKTAIL = 'Martini glass'
export const SERVING_GLASS_DISPLAY_TALL = 'Highball glass'
export const SERVING_GLASS_DISPLAY_SHORT = 'Rocks glass'
export const SERVING_GLASS_DISPLAY_FLUTE = 'Flute glass'
export const SERVING_GLASS_DISPLAY_MARGARITA = 'Margarita glass'
export const SERVING_GLASS_DISPLAY_SHOT = 'Shot glass'
export const servingGlassDisplay = {
  [SERVING_GLASS_COCKTAIL]: SERVING_GLASS_DISPLAY_COCKTAIL,
  [SERVING_GLASS_TALL]: SERVING_GLASS_DISPLAY_TALL,
  [SERVING_GLASS_SHORT]: SERVING_GLASS_DISPLAY_SHORT,
  [SERVING_GLASS_FLUTE]: SERVING_GLASS_DISPLAY_FLUTE,
  [SERVING_GLASS_MARGARITA]: SERVING_GLASS_DISPLAY_MARGARITA,
  [SERVING_GLASS_SHOT]: SERVING_GLASS_DISPLAY_SHOT,
  [SERVING_GLASS_PITCHER]: SERVING_GLASS_PITCHER,
  [SERVING_GLASS_PINT]: SERVING_GLASS_PINT,
  [SERVING_GLASS_WINE]: SERVING_GLASS_WINE,
  [SERVING_GLASS_COUPE]: SERVING_GLASS_COUPE,
  [SERVING_GLASS_COPPER_MUG]: SERVING_GLASS_COPPER_MUG,
}
export const servingGlassRaw = {
  [SERVING_GLASS_DISPLAY_COCKTAIL]: SERVING_GLASS_COCKTAIL,
  [SERVING_GLASS_DISPLAY_TALL]: SERVING_GLASS_TALL,
  [SERVING_GLASS_DISPLAY_SHORT]: SERVING_GLASS_SHORT,
  [SERVING_GLASS_DISPLAY_FLUTE]: SERVING_GLASS_FLUTE,
  [SERVING_GLASS_DISPLAY_MARGARITA]: SERVING_GLASS_MARGARITA,
  [SERVING_GLASS_DISPLAY_SHOT]: SERVING_GLASS_SHOT,
  [SERVING_GLASS_PITCHER]: SERVING_GLASS_PITCHER,
  [SERVING_GLASS_PINT]: SERVING_GLASS_PINT,
  [SERVING_GLASS_WINE]: SERVING_GLASS_WINE,
  [SERVING_GLASS_COUPE]: SERVING_GLASS_COUPE,
  [SERVING_GLASS_COPPER_MUG]: SERVING_GLASS_COPPER_MUG,
}

// Ingredient Vessels
export const INGREDIENTS_COCKTAIL_SHAKER = 'Cocktail Shaker'
export const INGREDIENTS_MIXING_GLASS = 'Mixing glass'
export const INGREDIENTS_SERVING_GLASS = 'Serving glass'
export const INGREDIENTS_BLENDER = 'Blender'
export const ingredientsVessels = [
  INGREDIENTS_COCKTAIL_SHAKER,
  INGREDIENTS_MIXING_GLASS,
  INGREDIENTS_SERVING_GLASS,
  INGREDIENTS_BLENDER,
]
export const ingredientsVesselDescriptions = {
  [INGREDIENTS_COCKTAIL_SHAKER]:
    'The essential tool for shaking cocktails and quickly chilling them with ice.',
  [INGREDIENTS_MIXING_GLASS]: 'A dedicated glass for stirring your ingredients together.',
  [INGREDIENTS_SERVING_GLASS]:
    "Add ingredients directly into the glass you're serving the final drink in.",
  [INGREDIENTS_BLENDER]: 'Perfect for crushing up ice and making a slushy frozen drink.',
}

// Fraction amounts
export const AMOUNT_ZERO = ''
export const AMOUNT_1EIGTH = '1/8'
export const AMOUNT_1QUARTER = '1/4'
export const AMOUNT_3EIGTHS = '3/8'
export const AMOUNT_HALF = '1/2'
export const AMOUNT_5EIGTHS = '5/8'
export const AMOUNT_3QUARTER = '3/4'
export const AMOUNT_7EIGTHS = '7/8'
export const fractionAmounts = [
  AMOUNT_ZERO,
  AMOUNT_1EIGTH,
  AMOUNT_1QUARTER,
  AMOUNT_3EIGTHS,
  AMOUNT_HALF,
  AMOUNT_5EIGTHS,
  AMOUNT_3QUARTER,
  AMOUNT_7EIGTHS,
]

// Amount types
export const AMOUNT_TYPE_OZ = 'Ounce'
export const AMOUNT_TYPE_ML = 'Milliliter'
export const AMOUNT_TYPE_CL = 'Centiliter'
export const AMOUNT_TYPE_TSP = 'Teaspoon'
export const AMOUNT_TYPE_TBSP = 'Tablespoon'
export const AMOUNT_TYPE_CUP = 'Cup'
export const AMOUNT_TYPE_DASH = 'Dash'
export const AMOUNT_TYPE_DROP = 'Drop'
export const AMOUNT_TYPE_PIECE = 'Piece'
export const AMOUNT_TYPE_PINCH = 'Pinch'
export const AMOUNT_TYPE_GARNISH = 'Garnish'
export const AMOUNT_TYPE_RIM = 'Rim'
export const allAmountTypes = [
  '',
  AMOUNT_TYPE_OZ,
  AMOUNT_TYPE_ML,
  AMOUNT_TYPE_CL,
  AMOUNT_TYPE_TSP,
  AMOUNT_TYPE_TBSP,
  AMOUNT_TYPE_CUP,
  AMOUNT_TYPE_DASH,
  AMOUNT_TYPE_DROP,
  AMOUNT_TYPE_PIECE,
  AMOUNT_TYPE_PINCH,
  AMOUNT_TYPE_GARNISH,
  AMOUNT_TYPE_RIM,
]

// Ingredient classifications
export const CLASSIFICATION_ALCOHOLIC = 'Alcoholic'
export const CLASSIFICATION_NON_ALCOHOLIC = 'Non-alcoholic'
export const CLASSIFICATION_CULINARY = 'Culinary'
export const CLASSIFICATION_ICE = 'Ice'

// Drink types
export const DRINK_TYPE_COCKTAIL = 'Cocktail'
export const DRINK_TYPE_WINE_COCKTAILS = 'Wine Cocktails'
export const DRINK_TYPE_BEER_COCKTAILS = 'Beer Cocktails'
export const DRINK_TYPE_NON_ALCOHOLIC = 'Non-Alcoholic Mixed Drink'
export const drinkTypes = [
  DRINK_TYPE_COCKTAIL,
  DRINK_TYPE_WINE_COCKTAILS,
  DRINK_TYPE_BEER_COCKTAILS,
  DRINK_TYPE_NON_ALCOHOLIC,
]
export const DRINK_TYPE_DISPLAY_WINE_COCKTAILS = 'Wine Cocktail'
export const DRINK_TYPE_DISPLAY_BEER_COCKTAILS = 'Beer Cocktail'
export const drinkTypeDisplay = {
  [DRINK_TYPE_COCKTAIL]: DRINK_TYPE_COCKTAIL,
  [DRINK_TYPE_WINE_COCKTAILS]: DRINK_TYPE_DISPLAY_WINE_COCKTAILS,
  [DRINK_TYPE_BEER_COCKTAILS]: DRINK_TYPE_DISPLAY_BEER_COCKTAILS,
  [DRINK_TYPE_NON_ALCOHOLIC]: DRINK_TYPE_NON_ALCOHOLIC,
}
export const drinkTypeRaw = {
  [DRINK_TYPE_COCKTAIL]: DRINK_TYPE_COCKTAIL,
  [DRINK_TYPE_DISPLAY_WINE_COCKTAILS]: DRINK_TYPE_WINE_COCKTAILS,
  [DRINK_TYPE_DISPLAY_BEER_COCKTAILS]: DRINK_TYPE_BEER_COCKTAILS,
  [DRINK_TYPE_NON_ALCOHOLIC]: DRINK_TYPE_NON_ALCOHOLIC,
}
export const drinkTypeDescriptions = {
  [DRINK_TYPE_COCKTAIL]:
    'An alcoholic mixed drink with a spirit or multiple spirits and any number of other ingredients such as fruit juices or syrups.',
  [DRINK_TYPE_WINE_COCKTAILS]:
    'Drinks made with wine as their base. Enjoy warm mulled wines in the winter and refreshing punches all summer long.',
  [DRINK_TYPE_BEER_COCKTAILS]:
    'Beer is delicious on its own, but using it as the base for your next shandy or punch can make it so much more.',
  [DRINK_TYPE_NON_ALCOHOLIC]:
    'Also known as “Mocktails,” these drinks mix non-alcoholic ingredients to create tasty, elaborate drinks for all ages.',
}

// Base spirits
export const BASE_SPIRIT_BEER = 'Beer'
export const BASE_SPIRIT_WINE = 'Wine'
export const BASE_SPIRIT_NON_ALCOHOLIC = 'Non-Alcoholic'
export const BASE_SPIRIT_VODKA = 'Vodka'
export const BASE_SPIRIT_TEQUILA = 'Tequila'
export const BASE_SPIRIT_MEZCAL = 'Mezcal'
export const BASE_SPIRIT_WHISKEY = 'Whiskey'
export const BASE_SPIRIT_GIN = 'Gin'
export const BASE_SPIRIT_RUM = 'Rum'
export const BASE_SPIRIT_BRANDY = 'Brandy'
export const BASE_SPIRIT_OTHER = 'Other'
export const baseSpirits = [
  BASE_SPIRIT_VODKA,
  BASE_SPIRIT_TEQUILA,
  BASE_SPIRIT_MEZCAL,
  BASE_SPIRIT_WHISKEY,
  BASE_SPIRIT_GIN,
  BASE_SPIRIT_RUM,
  BASE_SPIRIT_BRANDY,
  BASE_SPIRIT_OTHER,
]
export const drinkTypeBaseSpirits = {
  [DRINK_TYPE_BEER_COCKTAILS]: BASE_SPIRIT_BEER,
  [DRINK_TYPE_WINE_COCKTAILS]: BASE_SPIRIT_WINE,
  [DRINK_TYPE_NON_ALCOHOLIC]: BASE_SPIRIT_NON_ALCOHOLIC,
}

// Builder details
export const BUILDER_RECIPE_NAME_DETAIL = 'Recipe Name'
export const BUILDER_DRINK_TYPE_DETAIL = 'Drink Type'
export const BUILDER_BASE_SPIRIT_DETAIL = 'Base Spirit'
export const BUILDER_SERVING_GLASS_DETAIL = 'Serving Glass'
export const BUILDER_DESCRIPTION_DETAIL = 'Recipe Description'
export const details = [
  BUILDER_RECIPE_NAME_DETAIL,
  BUILDER_DRINK_TYPE_DETAIL,
  BUILDER_BASE_SPIRIT_DETAIL,
  BUILDER_SERVING_GLASS_DETAIL,
  BUILDER_DESCRIPTION_DETAIL,
]

// Modal types
export const MODAL_TYPE_BOTTOM = 'bottom'
export const MODAL_ADD_STEP = 'Add Step'
export const MODAL_INGREDIENT_UNIT = 'Set Ingredient Unit'
export const MODAL_BUILDER_NAV = 'Edit Recipe Info'
export const MODAL_SELECT_INGREDIENTS = 'Select Ingredients'
export const MODAL_SHARED_RECIPE = 'Shared Recipe'
export const MODAL_PAYWALL = 'Paywall'
export const MODAL_RECIPE_MENU = 'Recipe Settings'
export const MODAL_VOLUME_UNITS = 'Volume Units'

// Errors
export const MIXXY_PRO_LIBRARY_FULL =
  'For unlimited recipe storage, become a Mixxy Pro user from the Settings menu.'

// Volume unit options
export const VOLUME_UNIT_IMPERIAL = 'Imperial (oz)'
export const VOLUME_UNIT_METRIC = 'Metric (ml/cl)'

// recipe menu options
export const RECIPE_MENU_EDIT = 'Edit recipe'
export const RECIPE_MENU_SHARE = 'Share recipe'
export const RECIPE_MENU_DELETE = 'Delete'
export const RECIPE_MENU_CANCEL = 'Cancel'
export const RECIPE_MENU_VIEW = 'Open recipe'
export const RECIPE_MENU_FAVORITE = 'Favorite recipe'
export const RECIPE_MENU_UNFAVORITE = 'Unfavorite recipe'
export const BUILDER_MENU_BASIC_DETAILS = 'Basic Details'
export const BUILDER_MENU_INGREDIENTS = 'Ingredients'

// Settings sections
export const SETTINGS_SECTION_GENERAL = 'GENERAL'
export const SETTINGS_SECTION_CONTACT = 'CONTACT'
export const settingsSections = [SETTINGS_SECTION_GENERAL, SETTINGS_SECTION_CONTACT]

// Settings options
export const OPTION_VOLUME_UNITS = 'Volume Units'
export const OPTION_REPLAY_TUTORIAL = 'Replay Mixxy Intro'
export const OPTION_CONTACT_US = 'Contact Us'
export const OPTION_JOIN_BETA = 'Join Mixxy Beta'
export const OPTION_INSTAGRAM = 'Follow us on Instagram'
export const settingsOptions = {
  [SETTINGS_SECTION_GENERAL]: [OPTION_VOLUME_UNITS, OPTION_REPLAY_TUTORIAL],
  [SETTINGS_SECTION_CONTACT]: [OPTION_CONTACT_US, OPTION_JOIN_BETA, OPTION_INSTAGRAM],
}

// Add custom ingredient
export const ADD_CUSTOM_INGREDIENT = 'Add Custom Ingredient'

// Filters on library
export const FAVORITES_FILTER = 'Favorites'
export const ALL_RECIPES_FILTER = 'All Recipes'

export const CustomLayoutEaseIn = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
}
