import Colors from '../../Theme/Colors'
import Fonts from '../../Theme/Fonts'
import { StyleSheet } from 'react-native'

export default function getHomeStylesheet(useDarkMode) {
  return StyleSheet.create({
    bartenderBarCartIcon: {
      borderRadius: 24,
      height: 48,
      marginBottom: 12,
      width: 48,
    },
    bartenderBarCartOutline: {
      backgroundColor: useDarkMode ? Colors.darkFill4Dark : Colors.darkFill4Light,
      borderRadius: 10,
      marginBottom: 16,
      marginLeft: 16,
      marginRight: 16,
      padding: 16,
    },
    bartenderBarCartSubtext: {
      ...Fonts.body3,
      color: useDarkMode ? Colors.stepTextDark : Colors.stepTextLight,
    },
    bartenderBarCartText: {
      ...Fonts.h3Semibold,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginBottom: 6,
    },
    bartenderCheckboxContainerStyle: {
      borderRadius: 5,
      height: 18,
      marginRight: 8,
      width: 18,
    },
    bartenderCheckboxIcon: {
      height: 18,
      width: 18,
    },
    bartenderIncludeContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 24,
    },
    bartenderSectionNumber: {
      alignItems: 'center',
      borderRadius: 15,
      height: 30,
      justifyContent: 'center',
      marginRight: 16,
      width: 42,
    },
    bartenderSectionNumberText: {
      ...Fonts.body3Semibold,
      color: useDarkMode ? Colors.text1Light : Colors.text1Dark,
    },
    bartenderSectionOutline: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 16,
      marginLeft: 16,
      height: 50,
    },
    bartenderSectionText: {
      ...Fonts.h3Semibold,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
    },
    bartenderSubheader: {
      ...Fonts.body1,
      color: useDarkMode ? Colors.stepTextDark : Colors.stepTextLight,
      marginBottom: 32,
    },
    bufferView: {
      height: 24,
    },
    bufferViewLarge: {
      height: 80,
    },
    emptyContainer: {
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center',
      margin: 10,
      marginTop: '45%',
    },
    emptyText: {
      ...Fonts.body1,
      color: useDarkMode ? Colors.text2Dark : Colors.text2Light,
      textAlign: 'center',
    },
    libraryAddButton: {
      alignItems: 'center',
      borderColor: useDarkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
      borderRadius: 18,
      borderWidth: 0.5,
      height: 36,
      justifyContent: 'center',
      marginLeft: 16,
      marginRight: 16,
      width: 36,
    },
    libraryAddIcon: {
      height: 14,
      width: 14,
    },
    libraryHeaderOutline: {
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
    },
    libraryMenuItemOutline: {
      alignItems: 'center',
      borderRadius: 18,
      height: 36,
      justifyContent: 'center',
      marginRight: 8,
      paddingLeft: 16,
      paddingRight: 16,
    },
    libraryMenuItemTitle: {
      ...Fonts.body1,
      alignSelf: 'center',
      textAlign: 'center',
    },
    libraryMenuOutline: {
      alignItems: 'flex-start',
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      height: 68,
    },
    libraryMenuScrollOutline: {
      alignItems: 'center',
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      flexGrow: 1,
      height: 68,
      paddingLeft: 16,
    },
    scrollContainer: {
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      flex: 1,
      paddingLeft: 16,
      paddingRight: 16,
    },
    scrollContainerNoHorizontalPadding: {
      backgroundColor: useDarkMode ? Colors.backgroundColorDark : Colors.backgroundColorLight,
      flex: 1,
      paddingTop: 8,
    },
    settingsProButton1Text: {
      ...Fonts.body1,
      color: Colors.yellow,
    },
    settingsProButton2Text: {
      ...Fonts.body1,
      color: useDarkMode ? Colors.stepTextDark : Colors.stepTextLight,
    },
    settingsProButtonOutline: {
      alignItems: 'center',
      height: 48,
      justifyContent: 'center',
    },
    settingsProImage: {
      alignSelf: 'center',
      height: 72,
      marginBottom: 12,
      marginTop: 24,
      resizeMode: 'contain',
    },
    settingsProOutline: {
      borderColor: useDarkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
      borderRadius: 10,
      borderWidth: 0.5,
      marginBottom: 32,
      marginLeft: 16,
      marginRight: 16,
    },
    settingsProText: {
      ...Fonts.body1,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginBottom: 24,
      marginLeft: 16,
      marginRight: 16,
      textAlign: 'left',
    },
    settingsProTitle: {
      ...Fonts.h2Semibold,
      color: Colors.yellow,
      marginBottom: 8,
      textAlign: 'center',
    },
    settingsSectionContainer: {},
    settingsSectionHeader: {
      color: useDarkMode ? Colors.stepTextDark : Colors.stepTextLight,
      ...Fonts.uppercaseBold,
      marginBottom: 12,
      marginLeft: 16,
      marginTop: 24,
    },
    settingsUserImage: {
      borderRadius: 52,
      height: 104,
      width: 104,
    },
    settingsVersionText: {
      color: useDarkMode ? Colors.text2Dark : Colors.text2Light,
      fontSize: 12,
      marginTop: 24,
      textAlign: 'center',
    },
    tabBackground: {
      backgroundColor: useDarkMode
        ? Colors.backgroundColorDarkTransparent
        : Colors.backgroundColorLightTransparent,
      borderColor: Colors.transparent,
      borderTopColor: useDarkMode ? Colors.darkFill2Dark : Colors.darkFill2Light,
      borderWidth: 0.5,
      height: 48,
    },
    tabIcon: {
      height: 24,
      resizeMode: 'contain',
    },
    tabIndicator: {
      display: 'none',
      height: 0,
    },
    tabIndicatorColor: {
      backgroundColor: Colors.red1,
    },
    tabLabel: {
      display: 'none',
      height: 0,
    },
    topHeader: {
      ...Fonts.h1New,
      marginBottom: 18,
      textAlign: 'left',
    },
    topHeaderLibrary: {
      ...Fonts.top,
      color: useDarkMode ? Colors.text1Dark : Colors.text1Light,
      marginBottom: 8,
      marginTop: 8,
      paddingLeft: 16,
      textAlign: 'left',
    },
    topHeaderNoBottom: {
      ...Fonts.h1New,
      textAlign: 'left',
    },
  })
}
