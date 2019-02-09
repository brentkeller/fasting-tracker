import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { fromDate, getDisplayValue } from 'common/date';

class EditableDate extends React.Component {
  state = {
    isDatePickerVisible: false,
  };

  beginEdit = () => this.setState({ isDatePickerVisible: true });
  cancelEdit = () => this.setState({ isDatePickerVisible: false });
  saveDate = date => {
    this.setState({ isDatePickerVisible: false });
    this.props.updateFast(
      this.props.fast.id,
      this.props.fieldName,
      fromDate(date),
    );
  };

  render() {
    const {
      fast,
      fieldName,
      dateTimeFormat,
      textStyle,
      use24HrClock,
    } = this.props;
    if (!fast || !fast[fieldName]) return null;

    const date = new Date(fast[fieldName].toString());

    return (
      <Fragment>
        <Text onPress={this.beginEdit} style={textStyle}>
          {getDisplayValue(fast[fieldName], dateTimeFormat)}
        </Text>
        <DateTimePicker
          date={date}
          mode="datetime"
          isVisible={this.state.isDatePickerVisible}
          onConfirm={this.saveDate}
          onCancel={this.cancelEdit}
          is24Hour={use24HrClock}
        />
      </Fragment>
    );
  }
}

EditableDate.propTypes = {
  dateTimeFormat: PropTypes.string.isRequired,
  fast: PropTypes.object.isRequired,
  fieldName: PropTypes.string.isRequired,
  textStyle: PropTypes.object.isRequired,
  updateFast: PropTypes.func.isRequired,
  use24HrClock: PropTypes.bool.isRequired,
};

export default EditableDate;
