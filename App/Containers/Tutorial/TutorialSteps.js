import React, { Component } from 'react';
import {
  View, StyleSheet, Image, ScrollView, Text, Dimensions
} from 'react-native';
import Pagination from '../../Components/Pagination';
import Images from '../../Theme/Images'
import Step from './Step'
import getStylesheet from '../../Theme/ApplicationStyles'
import Colors from '../../Theme/Colors'
import * as constants from '../../Config/constants'

class TutorialSteps extends Component {
  getIcon = () => {
    const { recipe } = this.props
    if (recipe.servingGlass === constants.SERVING_GLASS_PITCHER) {
      return (<Image style={styles.icon} source={Images.glassPitcher} />)
    } if (recipe.servingGlass === constants.SERVING_GLASS_SHOT) {
      return (<Image style={styles.icon} source={Images.glassShot} />)
    } if (recipe.servingGlass === constants.SERVING_GLASS_MARGARITA) {
      return (<Image style={styles.icon} source={Images.glassMarg} />)
    } if (recipe.servingGlass === constants.SERVING_GLASS_FLUTE) {
      return (<Image style={styles.icon} source={Images.glassFlute} />)
    } if (recipe.servingGlass === constants.SERVING_GLASS_TALL) {
      return (<Image style={styles.icon} source={Images.glassTall} />)
    } if (recipe.servingGlass === constants.SERVING_GLASS_COCKTAIL) {
      return (<Image style={styles.icon} source={Images.glassMartini} />)
    }
    return (<Image style={styles.icon} source={Images.glassShort} />)
  };

  renderStep = (stepObj, idx) => {
    const { step, darkMode, drinkAmount } = this.props;

    return (
      <Step
        step={stepObj}
        activeStep={(step === idx)}
        key={idx}
        darkMode={darkMode}
        drinkAmount={drinkAmount}
      />
    );
  };

  renderSteps = () => {
    const { recipe, step } = this.props;
    const { steps } = recipe;

    const stepsToUse = steps.slice(step);

    return (
      <View style={styles.brewSteps}>
        {stepsToUse.map((stepObj, idx) => (
          this.renderStep(stepObj, idx + step)
        ))}
      </View>
    );
  };

  render() {
    const { recipe, step, darkMode } = this.props;
    const { steps } = recipe;

    const styles = getStylesheet(darkMode)

    const { height } = Dimensions.get('window');
    const iconHeight = {
      height: height * 0.32,
    };

    const marginTopStyle = {
      marginTop: 32,
    }

    return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        scrollEnabled={false}
      >
        <View style={[styles.iconView, iconHeight]}>
          {this.getIcon(recipe)}
        </View>
        <Pagination
          total={steps.length}
          index={step}
          activeColor={Colors.blue1}
          darkMode={darkMode}
        />
        <View style={[marginTopStyle, styles.divider]} />
        {steps && steps.length > 0 && this.renderSteps()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    padding: 16,
  },
  scrollViewContent: {
    alignItems: 'center'
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  icon: {
    height: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  brewSteps: {
    width: '100%'
  }
});

export default TutorialSteps;
