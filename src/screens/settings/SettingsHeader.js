import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Colors from 'res/colors';
import Styles from 'screens/common/styles';

export default (SettingsHeader = ({ text }) => {
  return (
    <View>
      <Text style={Styles.settingsHeader}>{text}</Text>
    </View>
  );
});

SettingsHeader.propTypes = {
  text: PropTypes.string.isRequired,
};
