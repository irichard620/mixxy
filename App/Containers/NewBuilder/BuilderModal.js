import React, { Component } from 'react'
import CustomModal from '../../Components/CustomModal'
import ModalContentBottom from '../../Components/ModalContentBottom'
import * as constants from '../../Config/constants';
import IngredientUnitModal from './IngredientUnitModal'
import { Alert } from 'react-native'

class BuilderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedModalItem: '',
      amount: '0',
      fractionalAmount: '',
      amountType: '',
    };
  }

  componentDidMount() {
    const { amount, fractionalAmount, amountType } = this.props;
    this.setState({
      amount: amount,
      fractionalAmount: fractionalAmount,
      amountType: amountType,
    });
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
    const { onModalSave, modalType, modalIdx } = this.props;
    const { selectedModalItem, amount, fractionalAmount, amountType } = this.state;
    if (modalType === constants.MODAL_INGREDIENT_UNIT) {
      if (fractionalAmount === '' && amount === '0') {
        Alert.alert('No amount added', 'Must add non-zero amount for ingredient.', [
          {
            text: 'OK',
          },
        ])
        return
      } else if (amountType === '') {
        Alert.alert('No amount type', 'Must add amount type for ingredient.', [
          {
            text: 'OK',
          },
        ])
        return
      }
    } else {
      if (selectedModalItem === '') {
        Alert.alert('Must Select Option', 'Cannot save without selecting an option.', [
          {
            text: 'OK',
          },
        ])
        return
      }
    }
    onModalSave(selectedModalItem, modalIdx, amount, fractionalAmount, amountType);
    this.setState({
      selectedModalItem: '',
      amount: '0',
      fractionalAmount: '',
      amountType: '',
    });
  };

  onModalCloseClick = () => {
    const { onCloseClick } = this.props;
    onCloseClick();
    this.setState({
      selectedModalItem: ''
    });
  };

  onPickerUpdate = (item, type) => {
    if (type === 0) {
      this.setState({ amount: item })
    } else if (type === 1) {
      this.setState({ fractionalAmount: item })
    } else {
      this.setState({ amountType: item })
    }
  }

  render() {
    const {
      visibleModal, modalType, drinkType, baseSpirit, servingGlass, darkMode,
    } = this.props;
    const { selectedModalItem, amount, fractionalAmount, amountType } = this.state;

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
            amount={amount}
            fractionalAmount={fractionalAmount}
            amountType={amountType}
            onModalSave={this.onModalSavePressed}
            onPickerUpdate={this.onPickerUpdate}
          />
        )}
      </CustomModal>
    );
  }
}

export default BuilderModal;
