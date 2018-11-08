import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { getDisplayValue, getDurationString } from 'common/date';

const styles = StyleSheet.create({
  container: {
    borderColor: '#999',
    borderWidth: 1,
    padding: 4,
  },
});

const FastListItem = ({ fast }) => {
  if (!fast || !fast.start) return null;

  const duration = getDurationString(fast.duration || 0);
  return (
    <View style={styles.container}>
      <Text>{getDisplayValue(fast.start)}</Text>
      {duration.length > 0 && <Text>({duration})</Text>}
    </View>
  );
};

FastListItem.propTypes = {
  fast: PropTypes.object.isRequired,
};

export default FastListItem;
