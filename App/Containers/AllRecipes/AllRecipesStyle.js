import { StyleSheet } from 'react-native'

export default function getAllRecipesStylesheet(useDarkMode) {
  return StyleSheet.create({
    bufferView: {
      height: 16,
    },
    recipeListContainer: {
      paddingBottom: 24,
    },
    recipeListOutline: {
      width: '100%',
    },
  })
}
