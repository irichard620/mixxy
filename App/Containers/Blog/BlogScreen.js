import React from 'react'
import { Dimensions, ScrollView, StatusBar, Text, View } from 'react-native'
import NavigationService from '../../Services/NavigationService'
import getBlogStylesheet from './BlogScreenStyle'
import FastImage from 'react-native-fast-image'
import getStylesheet from '../../Theme/ApplicationStyles'
import LinearGradient from 'react-native-linear-gradient'
import ModalXButton from '../../Components/ModalXButton'
import { NavigationActions } from 'react-navigation'
import RecipeCard from '../../Components/RecipeCard'
import analytics from '@react-native-firebase/analytics'
import { PropTypes } from 'prop-types'
import Markdown, { MarkdownIt } from 'react-native-markdown-display'
import Colors from '../../Theme/Colors'
import Fonts from '../../Theme/Fonts'

const markdownItInstance = MarkdownIt({ typographer: true, html: true })

const getHtmlAttribute = (content, attributeName) => {
  const attributeIndex = content.indexOf(attributeName)
  if (attributeIndex === -1) return null
  let attribute = ''
  let didOpen = false
  for (let i = attributeIndex; i < content.length; i++) {
    if (content[i] === '"' && didOpen) {
      break
    } else if (content[i] === '"' && !didOpen) {
      didOpen = true
    } else if (didOpen) {
      attribute += content[i]
    }
  }
  return attribute
}

const rules = {
  // eslint-disable-next-line react/display-name
  html_inline: (node, _children, _parent, _styles) => {
    // we check that the parent array contans a td because <br> in paragraph setting will create a html_inlinde surrounded by a soft break, try removing the clause to see what happens (double spacing on the <br> between 'top one' and 'bottom one')
    if (node.content.trim() === '<br>') {
      return <Text key={node.key}>{'\n'}</Text>
    } else if (node.content.trim().includes('<img')) {
      // Get aspect ratio
      const content = node.content.trim()
      const src = getHtmlAttribute(content, 'src')
      const width = getHtmlAttribute(content, 'width')
      const height = getHtmlAttribute(content, 'height')
      if (!(width && height)) {
        return null
      }

      const aspectRatio = Number(height) / Number(width)
      const { width: fullWidth } = Dimensions.get('window')
      const borderStyle = { borderRadius: 10 }

      return (
        <FastImage
          key={src}
          style={[
            {
              width: fullWidth - 32,
              height: fullWidth - 32 * aspectRatio,
            },
            borderStyle,
          ]}
          source={{
            uri: src,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      )
    }

    return null
  },
}

class BlogScreen extends React.Component {
  componentDidMount() {
    const { navigation } = this.props
    const blog = navigation.getParam('blog', {})
    analytics().logEvent('blog_page_view', {
      blog_id: blog.blogId,
    })
  }

  onBackPress = () => {
    const { navigation } = this.props
    navigation.dispatch(NavigationActions.back())
  }

  onCardClick = (idx) => {
    const { navigation } = this.props
    const blog = navigation.getParam('blog', {})
    if (idx < blog.recipes.length) {
      NavigationService.navigate('TutorialScreen', {
        recipe: blog.recipes[idx],
      })
    }
  }

  render() {
    const { darkMode, navigation } = this.props
    const styles = getStylesheet(darkMode)
    const blogStyles = getBlogStylesheet(darkMode)

    const blog = navigation.getParam('blog', {})
    const { title, subtitle, body, heroImageLink, author, sponsorCard, createdAt, recipes } = blog

    const { width } = Dimensions.get('window')
    const cardWidth = {
      width: width,
    }

    // Profile image to use
    let profileImage = null
    if (author) {
      profileImage = author.profileImageLink
    } else if (sponsorCard) {
      profileImage = sponsorCard.logoLink
    }

    // Author name to use
    let authorName = null
    if (author) {
      authorName = author.name
    } else if (sponsorCard) {
      authorName = sponsorCard.sponsorName
    }

    // Get display date
    const createdAtDate = new Date(createdAt)
    let displayDate = createdAtDate.toLocaleString('default', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
    return (
      <View style={styles.outerContainer}>
        <ScrollView style={blogStyles.scrollContainer} showsVerticalScrollIndicator={false}>
          <StatusBar backgroundColor={'transparent'} translucent />
          <View style={blogStyles.topImageOutline}>
            {heroImageLink !== '' && (
              <FastImage
                style={[blogStyles.topImage, cardWidth]}
                source={{
                  uri: heroImageLink,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
            <View style={blogStyles.campaignBottomGradientContainer}>
              <LinearGradient
                colors={['#00000080', '#00000000']}
                style={blogStyles.linearGradient}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
              />
            </View>
          </View>
          <View style={blogStyles.bufferView} />
          <View style={blogStyles.contentContainer}>
            <Text style={blogStyles.title}>{title}</Text>
            <Text style={blogStyles.description}>{subtitle}</Text>
            <View
              style={{ flexDirection: 'row', height: 32, marginBottom: 16, alignItems: 'center' }}
            >
              <FastImage
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                }}
                source={{
                  uri: profileImage,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Text style={blogStyles.authorName}>{`${authorName} • `}</Text>
              <Text style={blogStyles.dateText}>{displayDate}</Text>
            </View>
            <View style={styles.divider} />
            <View style={blogStyles.bodyTextOutline}>
              <Markdown
                rules={rules}
                markdownit={markdownItInstance}
                style={{
                  body: {
                    ...Fonts.body1,
                    color: darkMode ? Colors.text1Dark : Colors.text1Light,
                  },
                  code_inline: {
                    ...Fonts.body1,
                    color: Colors.blue1,
                    backgroundColor: Colors.transparent,
                    fontFamily: null,
                  },
                }}
              >
                {body}
              </Markdown>
            </View>
            <View style={styles.divider} />
            {recipes && recipes.length > 0 && (
              <Text style={blogStyles.recipesMentionedText}>Recipes Mentioned</Text>
            )}
          </View>
          <View style={blogStyles.recipesContainer}>
            {recipes &&
              recipes.length > 0 &&
              recipes.map((recipe, idx) => (
                <RecipeCard
                  key={`recipe${idx}`}
                  recipeName={recipe.recipeName}
                  recipeType={recipe.recipeType}
                  servingGlass={recipe.servingGlass}
                  disabled={false}
                  onCardClick={() => this.onCardClick(idx)}
                  darkMode={darkMode}
                />
              ))}
          </View>
        </ScrollView>
        <View style={blogStyles.backContainer}>
          <ModalXButton onPress={this.onBackPress} />
        </View>
      </View>
    )
  }
}

BlogScreen.propTypes = {
  darkMode: PropTypes.bool,
  navigation: PropTypes.object,
}

export default NavigationService.screenWithDarkMode(BlogScreen)
