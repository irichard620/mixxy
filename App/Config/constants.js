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
export const servingGlasses = [SERVING_GLASS_COCKTAIL, SERVING_GLASS_TALL, SERVING_GLASS_SHORT]
export const servingGlassDescriptions = {
  [SERVING_GLASS_COCKTAIL]:
    'Also known as the Martini glass, it’s an iconic piece of glassware perfect for aromas and balancing garnishes.',
  [SERVING_GLASS_TALL]:
    'A tall, narrow glass like a Collins or Highball (the slightly shorter variant). Great for fizzy, mixer-heavy drinks.',
  [SERVING_GLASS_SHORT]:
    'Also known as a rocks or lowball glass, this short glass is for classic cocktails or liquor served neat or on ice.',
}

// Other equipment
export const COCKTAIL_SHAKER = 'Cocktail Shaker'

// Amount types
export const AMOUNT_TYPE_OZ = 'Ounces'
export const AMOUNT_TYPE_TSP = 'Teaspoon'
export const AMOUNT_TYPE_TBSP = 'Tablespoon'
export const AMOUNT_TYPE_PIECE = 'Piece'
export const amountTypes = [AMOUNT_TYPE_OZ, AMOUNT_TYPE_TSP, AMOUNT_TYPE_TBSP, AMOUNT_TYPE_PIECE]

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
