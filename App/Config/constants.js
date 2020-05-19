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
export const servingGlasses = [
  SERVING_GLASS_COCKTAIL,
  SERVING_GLASS_TALL,
  SERVING_GLASS_SHORT,
  SERVING_GLASS_FLUTE,
  SERVING_GLASS_MARGARITA,
  SERVING_GLASS_SHOT,
  SERVING_GLASS_PITCHER,
]
export const servingGlassDescriptions = {
  [SERVING_GLASS_COCKTAIL]:
    'Also known as the Martini glass, it’s an iconic piece of glassware perfect for aromas and balancing garnishes.',
  [SERVING_GLASS_TALL]:
    'A tall, narrow glass like a Collins or Highball (the slightly shorter variant). Great for fizzy, mixer-heavy drinks.',
  [SERVING_GLASS_SHORT]:
    'Also known as a rocks or lowball glass, this short glass is for classic cocktails or liquor served neat or on ice.',
  [SERVING_GLASS_FLUTE]:
    'The skinny flute glass is ideal for sparkling wine and carbonated drinks like mimosas and spritzers.',
  [SERVING_GLASS_MARGARITA]:
    'The margarita glass is a stepped variant of the cocktail glass with more room for ingredients and a wide rim for salt.',
  [SERVING_GLASS_SHOT]:
    'The essential shot glass isn’t just for straight liquor. Build miniature cocktail “shooters” perfect for parties.',
  [SERVING_GLASS_PITCHER]:
    'A pitcher is a great way to make batch drinks fit for a crowd without worrying about preparing individual drinks.',
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
export const AMOUNT_TYPE_TSP = 'Teaspoon'
export const AMOUNT_TYPE_TBSP = 'Tablespoon'
export const AMOUNT_TYPE_CUP = 'Cup'
export const AMOUNT_TYPE_DASH = 'Dash'
export const AMOUNT_TYPE_DROP = 'Drop'
export const amountTypesLiquid = [
  AMOUNT_TYPE_OZ,
  AMOUNT_TYPE_TSP,
  AMOUNT_TYPE_TBSP,
  AMOUNT_TYPE_CUP,
  AMOUNT_TYPE_DASH,
  AMOUNT_TYPE_DROP,
]
export const AMOUNT_TYPE_PIECE = 'Piece'
export const AMOUNT_TYPE_PINCH = 'Pinch'
export const AMOUNT_TYPE_SLICE = 'Slice'
export const AMOUNT_TYPE_SPRIG = 'Sprig'
export const AMOUNT_TYPE_LEAF = 'Leaf'
export const AMOUNT_TYPE_GRIND = 'Grind'
export const amountTypesNonLiquid = [
  AMOUNT_TYPE_PIECE,
  AMOUNT_TYPE_PINCH,
  AMOUNT_TYPE_SLICE,
  AMOUNT_TYPE_SPRIG,
  AMOUNT_TYPE_LEAF,
  AMOUNT_TYPE_GRIND,
]
export const allAmountTypes = [...amountTypesLiquid, ...amountTypesNonLiquid]

// Ingredient classifications
export const CLASSIFICATION_ALCOHOLIC = 'Alcoholic'
export const CLASSIFICATION_NON_ALCOHOLIC = 'Non-alcoholic'
export const CLASSIFICATION_CULINARY = 'Culinary'
export const CLASSIFICATION_ICE = 'Ice'
export const classificationToAmountTypes = {
  [CLASSIFICATION_ALCOHOLIC]: ['', ...amountTypesLiquid],
  [CLASSIFICATION_NON_ALCOHOLIC]: ['', ...amountTypesLiquid],
  [CLASSIFICATION_CULINARY]: ['', ...amountTypesNonLiquid],
  [CLASSIFICATION_ICE]: ['', AMOUNT_TYPE_PIECE],
  '': ['', ...allAmountTypes],
}

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
export const BASE_SPIRIT_WHISKEY = 'Whiskey'
export const BASE_SPIRIT_GIN = 'Gin'
export const BASE_SPIRIT_RUM = 'Rum'
export const BASE_SPIRIT_BRANDY = 'Brandy'
export const BASE_SPIRIT_OTHER = 'Other'
export const baseSpirits = [
  BASE_SPIRIT_VODKA,
  BASE_SPIRIT_TEQUILA,
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
export const MODAL_TYPE_CENTER = 'center'
export const MODAL_ADD_STEP = 'Add Step'
export const MODAL_DRINK_TYPE = 'Drink Type'
export const MODAL_BASE_SPIRIT = 'Base Spirit'
export const MODAL_SERVING_GLASS = 'Serving Glass'
export const MODAL_INGREDIENT_UNIT = 'Set Ingredient Unit'

// recipe menu options
export const RECIPE_MENU_EDIT = 'Edit recipe'
export const RECIPE_MENU_SHARE = 'Share recipe'
export const RECIPE_MENU_DELETE = 'Delete'
export const RECIPE_MENU_CANCEL = 'Cancel'
export const RECIPE_MENU_VIEW = 'Open recipe'

// Settings sections
export const SETTINGS_SECTION_GENERAL = 'GENERAL'
export const SETTINGS_SECTION_CONTACT = 'CONTACT'
export const settingsSections = [SETTINGS_SECTION_GENERAL, SETTINGS_SECTION_CONTACT]

// Settings options
export const OPTION_VOLUME_UNITS = 'Volume Units'
export const OPTION_CONTACT_US = 'Contact Us'
export const OPTION_JOIN_BETA = 'Join Mixxy Beta'
export const OPTION_INSTAGRAM = 'Follow us on Instagram'
export const settingsOptions = {
  [SETTINGS_SECTION_GENERAL]: [OPTION_VOLUME_UNITS],
  [SETTINGS_SECTION_CONTACT]: [OPTION_CONTACT_US, OPTION_JOIN_BETA, OPTION_INSTAGRAM],
}

// Add custom ingredient
export const ADD_CUSTOM_INGREDIENT = 'Add Custom Ingredient'
