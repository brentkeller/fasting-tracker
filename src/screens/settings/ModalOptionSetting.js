import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSetting } from 'common/state/settings/settings';
import { getSettings } from 'common/state/selectors';
import Styles, { Constants } from 'screens/common/styles';
import {
  Dimensions,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {
  ListItem,
  Label,
  Left,
  Right,
  Button,
  Text,
  View,
  Radio,
} from 'native-base';

class ModalOptionSetting extends React.Component {
  state = {
    modalVisible: false,
  };

  selectOption = opt => {
    this.toggleModal();
    this.props.onValueChange(this.props.fieldName, opt.value);
  };

  toggleModal = () => this.setState({ modalVisible: !this.state.modalVisible });

  render() {
    const {
      fieldName,
      label,
      options,
      value,
      isLast = false,
      color = '#000',
    } = this.props;
    const { modalVisible } = this.state;
    const { width, height } = Dimensions.get('window');
    let displayValue = '';

    const optionItems = options.map(o => {
      const selected = o.value === value;
      if (selected) displayValue = o.label;
      return (
        <TouchableOpacity
          key={o.value}
          onPress={() => this.selectOption(o)}
          style={Styles.radioListOption}
        >
          <View style={Styles.radioListButton}>
            <Radio selected={selected} selectedColor={color} />
          </View>
          <View style={Styles.radioListLabel}>
            <Text>{o.label}</Text>
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <TouchableOpacity style={{ flex: 1 }} onPress={this.toggleModal}>
        <View
          style={{
            ...Styles.settingsItem,
            borderBottomWidth: isLast ? 0 : Constants.settingsItemBorderBottom,
          }}
        >
          <View style={Styles.settingsItemLeft}>
            <Text style={Styles.settingsItemLabel}>{label}</Text>
            <Text style={Styles.settingsItemDescription}>{displayValue}</Text>
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={this.toggleModal}
          >
            <View style={Styles.modalBackground}>
              <View
                style={{
                  ...Styles.modalCard,
                  width: width * 0.85,
                }}
              >
                <Text style={Styles.modalTitle}>{label}</Text>
                <View>{optionItems}</View>
                <View style={Styles.modalFooter}>
                  <TouchableHighlight onPress={this.toggleModal}>
                    <Text style={Styles.modalButton}>CANCEL</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableOpacity>
    );
  }
}

ModalOptionSetting.propTypes = {
  color: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
};

export default ModalOptionSetting;
