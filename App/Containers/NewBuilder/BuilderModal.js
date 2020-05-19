import React, { Component } from 'react'
import CustomModal from '../../Components/CustomModal'
import ModalContentBottom from '../../Components/ModalContentBottom'
import * as constants from '../../Config/constants';
import IngredientUnitModal from './IngredientUnitModal'

class BuilderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedModalItem: '',
    };
  }

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

  onModalPressItem = (item) => {
    this.setState({
      selectedModalItem: item
    });
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
      visibleModal, modalType, modalIdx, drinkType, baseSpirit, servingGlass, darkMode, wholeAmount, fractionAmount, amountType,
    } = this.props;
    const { selectedModalItem } = this.state;

    // Get content
    let options = [];
    let titleToDisplay = '';
    if (modalType === constants.BUILDER_DRINK_TYPE_DETAIL) {
      titleToDisplay = 'Drink Type Options';
      let existingItem = drinkType;
      if (selectedModalItem !== '') {
        existingItem = selectedModalItem;
      }
      options = this.drinkTypeOptions(existingItem);
    } else if (modalType === constants.BUILDER_BASE_SPIRIT_DETAIL) {
      titleToDisplay = 'Base Spirit Options';
      let existingItem = baseSpirit;
      if (selectedModalItem !== '') {
        existingItem = selectedModalItem;
      }
      options = this.baseSpiritOptions(existingItem);
    } else if (modalType === constants.BUILDER_SERVING_GLASS_DETAIL) {
      titleToDisplay = 'Serving Glass Options';
      let existingItem = servingGlass;
      if (selectedModalItem !== '') {
        existingItem = selectedModalItem;
      }
      options = this.servingGlassOptions(existingItem);
    }

    return (
      <CustomModal
        visibleModal={visibleModal}
        onCloseClick={this.onModalCloseClick}
        type={constants.MODAL_TYPE_BOTTOM}
        darkMode={darkMode}
      >
        {modalType !== constants.MODAL_INGREDIENT_UNIT && (
          <ModalContentBottom
            isListModal={true}
            options={options}
            title={titleToDisplay}
            onPressItem={this.onModalPressItem}
            onModalSave={this.onModalSavePressed}
            hasSave={true}
            darkMode={darkMode}
          />
        )}
        {modalType === constants.MODAL_INGREDIENT_UNIT && (
          <IngredientUnitModal
            darkMode={darkMode}
            wholeAmount={}
            fractionAmount={}
            amountType={}
            onModalSave={}
            onPickerUpdate={}
          />
        )}
      </CustomModal>
    );
  }
}

export default BuilderModal;
