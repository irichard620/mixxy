import React, { Component } from 'react'
import CustomModal from '../../Components/CustomModal'
import ModalContentBottom from '../../Components/ModalContentBottom'
import * as constants from '../../Config/constants';

class BuilderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedModalItem: '',
    };
  }

  newStepOptions = () => {
    const arrToUse = [];
    constants.steps.forEach((step) => {
      arrToUse.push({ title: step });
    });
    return arrToUse;
  };

  drinkTypeOptions = (existingDrinkType) => {
    const arrToUse = [];
    constants.drinkTypes.forEach((drinkType) => {
      arrToUse.push({ title: drinkType, selected: (existingDrinkType === drinkType) });
    });
    return arrToUse;
  };

  baseSpiritOptions = (existingBaseSpirit) => {
    const arrToUse = [];
    constants.baseSpirits.forEach((baseSpirit) => {
      arrToUse.push({ title: baseSpirit, selected: (existingBaseSpirit === baseSpirit) });
    });
    return arrToUse;
  };

  servingGlassOptions = (existingServingGlass) => {
    const arrToUse = [];
    constants.servingGlasses.forEach((servingGlass) => {
      arrToUse.push({ title: servingGlass, selected: (existingServingGlass === servingGlass) });
    });
    return arrToUse;
  };

  getTextPlaceholder = (modalType) => {
    if (modalType === constants.BUILDER_RECIPE_NAME_DETAIL) {
      return 'Recipe Name';
    } if (modalType === constants.BUILDER_DESCRIPTION_DETAIL) {
      return 'Recipe Description';
    }
    return '';
  };

  onModalPressItem = (item) => {
    const { onPressItem } = this.props;
    if (constants.steps.includes(item)) {
      // If step - we immediately trigger new step
      onPressItem(item);
    } else {
      // Other presses require a save
      // Also update options for this one
      this.setState({
        selectedModalItem: item
      });
    }
  };

  onModalSavePressed = () => {
    const { onModalSave } = this.props;
    const { selectedModalItem } = this.state;
    onModalSave(selectedModalItem);
    this.setState({
      selectedModalItem: ''
    });
  };

  onModalCloseClick = () => {
    const { onCloseClick } = this.props;
    onCloseClick();
    this.setState({
      selectedModalItem: ''
    });
  };

  render() {
    const {
      visibleModal, modalType, modalText,
      onChangeText, drinkType, baseSpirit, servingGlass, darkMode
    } = this.props;
    const { selectedModalItem } = this.state;

    // Get content
    let isListModal = false;
    let options = [];
    let titleToDisplay = '';
    let charLimit = 4;
    let hasSave = true;
    if (modalType === constants.MODAL_ADD_STEP) {
      titleToDisplay = 'Step Options';
      isListModal = true;
      options = this.newStepOptions();
      hasSave = false;
    } else if (modalType === constants.BUILDER_DRINK_TYPE_DETAIL) {
      titleToDisplay = 'Drink Type Options';
      isListModal = true;
      let existingItem = drinkType;
      if (selectedModalItem !== '') {
        existingItem = selectedModalItem;
      }
      options = this.drinkTypeOptions(existingItem);
    } else if (modalType === constants.BUILDER_BASE_SPIRIT_DETAIL) {
      titleToDisplay = 'Base Spirit Options';
      isListModal = true;
      let existingItem = baseSpirit;
      if (selectedModalItem !== '') {
        existingItem = selectedModalItem;
      }
      options = this.baseSpiritOptions(existingItem);
    } else if (modalType === constants.BUILDER_SERVING_GLASS_DETAIL) {
      titleToDisplay = 'Serving Glass Options';
      isListModal = true;
      let existingItem = servingGlass;
      if (selectedModalItem !== '') {
        existingItem = selectedModalItem;
      }
      options = this.servingGlassOptions(existingItem);
    } else if (modalType === constants.BUILDER_RECIPE_NAME_DETAIL) {
      titleToDisplay = 'Recipe Name';
      charLimit = 30;
    } else if (modalType === constants.BUILDER_DESCRIPTION_DETAIL) {
      titleToDisplay = 'Recipe Description';
      charLimit = 1000;
    } else {
      titleToDisplay = modalType;
    }

    return (
      <CustomModal
        visibleModal={visibleModal}
        onCloseClick={this.onModalCloseClick}
        type={constants.MODAL_TYPE_BOTTOM}
      >
        <ModalContentBottom
          modalText={modalText}
          textPlaceholder={this.getTextPlaceholder(modalType)}
          isListModal={isListModal}
          options={options}
          title={titleToDisplay}
          charLimit={charLimit}
          onPressItem={this.onModalPressItem}
          onChangeText={onChangeText}
          onModalSave={this.onModalSavePressed}
          hasSave={hasSave}
          darkMode={darkMode}
        />
      </CustomModal>
    );
  }
}

export default BuilderModal;
