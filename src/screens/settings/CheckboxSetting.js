import React from 'react';
import PropTypes from 'prop-types';
import Styles, { Constants } from 'screens/common/styles';
import { TouchableOpacity, View } from 'react-native';
import { Text, CheckBox } from 'native-base';

class CheckboxSetting extends React.Component {
  onValueChanged = () =>
    this.props.onValueChange(this.props.fieldName, !this.props.value);

  render() {
    const { label, color = '#000', value = false, isLast = false } = this.props;
    return (
      <TouchableOpacity onPress={this.onValueChanged} style={{ flex: 1 }}>
        <View
          style={{
            ...Styles.settingsItem,
            borderBottomWidth: isLast ? 0 : Constants.settingsItemBorderBottom,
          }}
        >
          <Text style={Styles.settingsItemLabel}>{label}</Text>
          <CheckBox
            checked={value}
            color={color}
            onPress={this.onValueChanged}
            style={Styles.settingsItemCheckbox}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

CheckboxSetting.propTypes = {
  color: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};

export default CheckboxSetting;
