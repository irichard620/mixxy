import Colors from '../../Theme/Colors'
import Fonts from '../../Theme/Fonts'
import { StyleSheet } from 'react-native'

export default function getHomeStylesheet(useDarkMode) {
  return StyleSheet.create({
    campaignBottomGradientContainer: {
      backgroundColor: 'transparent',
      bottom: 0,
      height: 144,
      left: 0,
      position: 'absolute',
      right: 0,
      zIndex: 1,
    },
    campaignDescription: {
      ...Fonts.body2,
      color: Colors.white,
    },
    campaignImage: {
      borderRadius: 10,
      height: 440,
      width: '100%',
    },
    campaignOutline: {
      alignSelf: 'center',
      backgroundColor: useDarkMode ? Colors.darkFill1Dark : Colors.darkFill1Light,
      borderRadius: 10,
      height: 440,
      marginBottom: 18,
    },
    campaignTitle: {
      ...Fonts.h3Semibold,
      color: Colors.white,
    },
    linearGradient: {
      borderRadius: 10,
      flex: 1,
    },
    scrollContainer: {
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      flex: 1,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
    },
    sectionHeader: {
      ...Fonts.h1Semibold,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginBottom: 18,
      marginTop: 24,
      textAlign: 'left',
    },
    sponsorBottomGradientContainer: {
      backgroundColor: 'transparent',
      bottom: 0,
      height: 88,
      left: 0,
      position: 'absolute',
      right: 0,
      zIndex: 1,
    },
    sponsorCardDescription: {
      ...Fonts.h2Semibold,
      color: Colors.white,
    },
    sponsorCardDescriptionContainer: {
      alignItems: 'flex-start',
      bottom: 0,
      left: 0,
      padding: 16,
      position: 'absolute',
      zIndex: 2,
    },
    sponsorCardImage: {
      borderRadius: 10,
      height: 216,
      width: '100%',
    },
    sponsorCardOutline: {
      alignSelf: 'center',
      backgroundColor: useDarkMode ? Colors.darkFill1Dark : Colors.darkFill1Light,
      borderRadius: 10,
      height: 216,
      marginBottom: 24,
    },
    tabBackground: {
      backgroundColor: useDarkMode
        ? Colors.backgroundColorDarkTransparent
        : Colors.backgroundColorLightTransparent,
      height: 49,
    },
    tabIcon: {
      height: 30,
      resizeMode: 'contain',
    },
    tabIndicator: {
      display: 'none',
      height: 0,
    },
    tabLabel: {
      display: 'none',
      height: 0,
    },
    tagContainer: {
      alignItems: 'center',
      backgroundColor: '#00000080',
      borderRadius: 6,
      justifyContent: 'center',
      marginRight: 8,
      paddingBottom: 4,
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 4,
    },
    tagText: {
      color: 'white',
      fontSize: 13,
      fontWeight: '600',
      textTransform: 'uppercase',
    },
    tagsContainer: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      left: 0,
      padding: 16,
      position: 'absolute',
      top: 0,
      zIndex: 2,
    },
    topHeader: {
      ...Fonts.top,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginBottom: 18,
      textAlign: 'left',
    },
  })
}
