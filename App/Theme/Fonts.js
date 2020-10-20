const size = {
  top: 28,
  h1: 24,
  h2: 22,
  h3: 20,
  h1New: 34,
  h2New: 28,
  h3New: 22,
  h4New: 20,
  body1: 17,
  body2: 16,
  body3: 15,
}

const lineSpacing = {
  top: 36,
  h1: 31,
  h2: 27,
  h3: 23,
  h1New: 41,
  h2New: 34,
  h3New: 28,
  h4New: 24,
  body1: 22,
  body2: 21,
  body3: 20,
}

const fontWeight = {
  bold: '700',
  semibold: '600',
  medium: '400',
  kindabold: '500',
}

export default {
  top: {
    fontSize: size.top,
    lineHeight: lineSpacing.top,
    fontWeight: fontWeight.semibold,
  },
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
  h1New: {
    fontSize: size.h1New,
    lineHeight: lineSpacing.h1New,
    fontWeight: fontWeight.bold,
  },
  h2New: {
    fontSize: size.h2New,
    lineHeight: lineSpacing.h2New,
    fontWeight: fontWeight.bold,
  },
  h3New: {
    fontSize: size.h3New,
    lineHeight: lineSpacing.h3New,
    fontWeight: fontWeight.bold,
  },
  h4New: {
    fontSize: size.h4New,
    lineHeight: lineSpacing.h4New,
    fontWeight: fontWeight.semibold,
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
  body3Semibold: {
    fontSize: size.body3,
    lineHeight: lineSpacing.body3,
    fontWeight: fontWeight.semibold,
  },
  cardHeader: {
    fontSize: size.body1,
    lineHeight: lineSpacing.body1,
    fontWeight: fontWeight.kindabold,
  },
  cardSelectionTitle: {
    fontSize: 18,
    fontWeight: fontWeight.semibold,
  },
  modalImageTitle: {
    fontSize: 18,
    fontWeight: fontWeight.medium,
    lineHeight: lineSpacing.h3,
  },
  navHeader: {
    fontSize: size.body1,
    lineHeight: lineSpacing.body1,
    fontWeight: fontWeight.semibold,
  },
  stepTitle: {
    fontSize: size.body2,
    lineHeight: lineSpacing.body2,
    fontWeight: fontWeight.semibold,
  },
  h2Semibold: {
    fontSize: size.h2,
    lineHeight: lineSpacing.h2,
    fontWeight: fontWeight.semibold,
  },
  h1Semibold: {
    fontSize: size.h1,
    lineHeight: lineSpacing.h3,
    fontWeight: fontWeight.semibold,
  },
  h3Semibold: {
    fontSize: size.h3,
    lineHeight: lineSpacing.h3,
    fontWeight: fontWeight.semibold,
  },
  uppercaseBold: {
    fontSize: 13,
    fontWeight: fontWeight.semibold,
    textTransform: 'uppercase',
  },
}
