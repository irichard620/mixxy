import React from 'react'
import { Dimensions, ScrollView, StatusBar, Text, View } from 'react-native'
import { connect } from 'react-redux'
import NavigationService from '../../Services/NavigationService'
import getCampaignStylesheet from './CampaignScreenStyle'
import FastImage from 'react-native-fast-image'
import getStylesheet from '../../Theme/ApplicationStyles'
import LinearGradient from "react-native-linear-gradient"

class CampaignScreen extends React.Component {
  render() {
    const { darkMode, navigation } = this.props
    const styles = getStylesheet(darkMode)
    const campaignStyles = getCampaignStylesheet(darkMode)

    const campaign = navigation.getParam('campaign', {})
    const { campaignName, campaignLongDescription, campaignImageLink } = campaign

    const { width } = Dimensions.get('window')
    const cardWidth = {
      width: width,
    }
    return (
      <ScrollView style={campaignStyles.scrollContainer}>
        <StatusBar hidden={true} />
        <View style={campaignStyles.topImageOutline}>
          {campaignImageLink !== '' && (
            <FastImage
              style={[campaignStyles.topImage, cardWidth]}
              source={{
                uri: campaignImageLink,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
          <Text style={campaignStyles.title}>{campaignName}</Text>
          <View style={campaignStyles.campaignBottomGradientContainer}>
            <LinearGradient
              colors={['#00000080', '#00000000']}
              style={campaignStyles.linearGradient}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
            />
          </View>
        </View>
        <View style={campaignStyles.bufferView} />
        <View style={campaignStyles.contentContainer}>
          <Text style={campaignStyles.description}>
            Whether you’re a budding home bartender or a seasoned vet, you should know how to make
            these essential cocktails anytime, anywhere. After all, they’re classics for a reason.
          </Text>
          <View style={styles.divider} />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationService.screenWithDarkMode(CampaignScreen))
