import { StyleSheet } from 'react-native'
import Colors from '../../../Theme/Colors'
import Fonts from '../../../Theme/Fonts'

export default function getDiscoverStylesheet(useDarkMode) {
  return StyleSheet.create({
    cardBottomContentContainer: {
      alignItems: 'flex-start',
      bottom: 0,
      left: 0,
      padding: 16,
      position: 'absolute',
      zIndex: 2,
    },
    cardBottomGradientContainer: {
      backgroundColor: Colors.transparent,
      bottom: 0,
      height: 144,
      left: 0,
      position: 'absolute',
      right: 0,
      zIndex: 1,
    },
    cardDescription: {
      ...Fonts.body1,
      color: Colors.white,
    },
    cardImage: {
      borderRadius: 10,
      width: '100%',
    },
    cardOutline: {
      alignSelf: 'center',
      backgroundColor: useDarkMode ? Colors.darkFill1Dark : Colors.darkFill1Light,
      borderRadius: 10,
      marginBottom: 16,
      marginRight: 16,
    },
    cardTitle: {
      ...Fonts.h2Semibold,
      color: Colors.white,
    },
    cardTopGradientContainer: {
      backgroundColor: Colors.transparent,
      height: 56,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1,
    },
    divider: {
      backgroundColor: useDarkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
      height: 0.5,
      marginLeft: 16,
      paddingRight: 16,
      width: '100%',
    },
    linearGradient: {
      borderRadius: 10,
      flex: 1,
    },
    scrollContainer: {
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      flex: 1,
      paddingTop: 8,
    },
    sectionHeader: {
      ...Fonts.h2New,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginBottom: 16,
      marginTop: 16,
      paddingLeft: 16,
      textAlign: 'left',
    },
    sponsorCardBottomGradientContainer: {
      backgroundColor: Colors.transparent,
      bottom: 0,
      height: 88,
      left: 0,
      position: 'absolute',
      right: 0,
      zIndex: 1,
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
    tagContainer: {
      alignItems: 'center',
      backgroundColor: Colors.stepTextLight,
      borderRadius: 6,
      justifyContent: 'center',
      marginRight: 8,
      paddingBottom: 4,
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 4,
    },
    tagText: {
      color: Colors.white,
      ...Fonts.uppercaseBold,
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
  })
}
