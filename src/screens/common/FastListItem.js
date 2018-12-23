import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { Left, ListItem, Right } from 'native-base';

import { getDisplayValue, getDurationString } from 'common/date';

const FastListItem = ({ fast }) => {
  if (!fast || !fast.start) return null;

  const duration = getDurationString(fast.duration || 0);
  return (
    <ListItem style={{ paddingLeft: 18, paddingRight: 18 }}>
      <Left>
        <Text>{getDisplayValue(fast.start)}</Text>
      </Left>
      <Right>{duration.length > 0 && <Text>{duration}</Text>}</Right>
    </ListItem>
  );
};

FastListItem.propTypes = {
  fast: PropTypes.object.isRequired,
};

export default FastListItem;
