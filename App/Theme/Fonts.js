import { StyleSheet } from 'react-native'

const size = {
  h1: 24,
  h2: 22,
  h3: 20,
  body1: 17,
  body2: 16,
  body3: 15,
}

const lineSpacing = {
  h1: 31,
  h2: 27,
  h3: 23,
  body1: 22,
  body2: 21,
  body3: 19,
}

const fontWeight = {
  bold: '700',
  semibold: '600',
  medium: '400',
}

export default {
  h1: {
    fontSize: size.h1,
    lineHeight: lineSpacing.h1,
    fontWeight: fontWeight.bold,
  },
  h2: {
    fontSize: size.h2,
    lineHeight: lineSpacing.h2,
    fontWeight: fontWeight.bold,
  },
  h3: {
    fontSize: size.h3,
    lineHeight: lineSpacing.h3,
    fontWeight: fontWeight.bold,
  },
  buttonText: {
    fontSize: size.body1,
    lineHeight: lineSpacing.body1,
    fontWeight: fontWeight.semibold,
  },
  body1: {
    fontSize: size.body1,
    lineHeight: lineSpacing.body1,
    fontWeight: fontWeight.medium,
  },
  body2: {
    fontSize: size.body2,
    lineHeight: lineSpacing.body2,
    fontWeight: fontWeight.medium,
  },
  body3: {
    fontSize: size.body3,
    lineHeight: lineSpacing.body3,
    fontWeight: fontWeight.medium,
  },
}
