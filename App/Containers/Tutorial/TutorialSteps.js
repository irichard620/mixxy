import React, { Component } from 'react';
import {
  View, StyleSheet, Image, ScrollView, Text, Dimensions
} from 'react-native';
import * as constants from '../../Config/constants';
import Pagination from '../../Components/Pagination';
import * as stepModel from '../../Storage/Step';
import Images from '../../Theme/Images'
import Step from './Step'

class TutorialSteps extends Component {
  getIcon = () => {
    // End image
    return (<Image style={styles.icon} source={Images.logo} />);
  };

  renderStep = (stepObj, idx) => {
    const { recipe, step } = this.props;
    const { steps } = recipe;

    let description = '';
    if (idx < steps.length) {
      description = stepModel.getStepShortDescription(stepObj);
      if (('notes' in stepObj) && stepObj.notes !== '') {
        description = `${description} ${stepObj.notes}`;
      }
    } else {
      description = 'Enjoy your drink!';
    }

    return (
      <Step
        title={stepObj.title}
        description={description}
        activeStep={(step === idx)}
        key={idx}
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
    const { recipe, step } = this.props;
    const { steps } = recipe;

    const { height } = Dimensions.get('window');
    const iconHeight = {
      height: height * 0.32,
    };

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
          activeColor="#1D5E9E"
        />
        <View style={styles.topSeparator} />
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
    resizeMode: 'contain'
  },
  topSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: '#F1F3F6',
    marginTop: 32,
  },
  mainSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: '#F1F3F6',
  },
  brewSteps: {
    width: '100%'
  }
});

export default TutorialSteps;
