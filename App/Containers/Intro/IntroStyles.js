import { StyleSheet } from 'react-native'
import Colors from '../../Theme/Colors'
import Fonts from '../../Theme/Fonts'

const shadowStyle = {
  shadowColor: Colors.backgroundColorDark,
  shadowOpacity: 0.14,
  shadowRadius: 12,
}

export default StyleSheet.create({
  arrowIcon: {
    height: 12,
    resizeMode: 'contain',
  },
  buttonOutline: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.backgroundColorLight,
    borderRadius: 28,
    bottom: 32,
    height: 56,
    justifyContent: 'center',
    position: 'absolute',
    ...shadowStyle,
  },
  buttonText: {
    ...Fonts.body1,
    color: Colors.stepTextLight,
    textAlign: 'center',
  },
  description: {
    ...Fonts.body1,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  icon: {
    height: 48,
    marginBottom: 16,
    marginTop: 16,
    resizeMode: 'contain',
  },
  iconView: {
    ...shadowStyle,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.backgroundColorLight,
    borderRadius: 10,
    flexDirection: 'row',
    height: 80,
    paddingLeft: 20,
    paddingRight: 20,
  },
  iconViewBuffer: {
    height: '31%',
  },
  introItemOutline: {
    alignItems: 'center',
    backgroundColor: Colors.backgroundColorLight,
    borderRadius: 10,
    height: 80,
    justifyContent: 'center',
    marginBottom: 32,
    marginHorizontal: 16,
    marginTop: 20,
    shadowColor: Colors.backgroundColorDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    width: 80,
  },
  navIcon: {
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    ...Fonts.h1Semibold,
    textAlign: 'center',
  },
})
