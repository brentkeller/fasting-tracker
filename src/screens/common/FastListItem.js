import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { Left, ListItem, Right, Button, Icon } from 'native-base';

import { getDisplayValue, getDurationString } from 'common/date';

class FastListItem extends React.Component {
  state = {
    expanded: false,
  };

  editEnd = () => {};

  editStart = () => {};

  toggleView = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { fast, dateTimeFormat } = this.props;
    const { expanded } = this.state;
    if (!fast || !fast.start) return null;

    const duration = getDurationString(fast.duration || 0);
    const listItem = { ...styles.listItem, height: expanded ? 180 : 50 };
    return (
      <ListItem style={listItem} onPress={this.toggleView}>
        <Left style={styles.left}>
          <Text>{getDisplayValue(fast.start, dateTimeFormat)}</Text>
        </Left>
        {expanded && (
          <View style={styles.details}>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Started</Text>
              <Text style={styles.detailsContent}>
                {getDisplayValue(fast.start, dateTimeFormat)}
              </Text>
              <Icon
                name="edit"
                type="MaterialIcons"
                onPress={this.editStart}
                style={styles.editIcon}
              />
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Ended</Text>
              <Text style={styles.detailsContent}>
                {getDisplayValue(fast.end, dateTimeFormat)}
              </Text>
              <Icon
                name="edit"
                type="MaterialIcons"
                onPress={this.editEnd}
                style={styles.editIcon}
              />
            </View>
          </View>
        )}
        <Right style={styles.right}>
          {duration.length > 0 && <Text>{duration}</Text>}
        </Right>
      </ListItem>
    );
  }
}

FastListItem.propTypes = {
  dateTimeFormat: PropTypes.string.isRequired,
  fast: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  editIcon: {
    alignSelf: 'flex-end',
  },
  listItem: {
    minHeight: 48,
  },
  left: {
    position: 'absolute',
    left: 18,
    top: 14,
  },
  right: {
    position: 'absolute',
    right: 18,
    top: 14,
  },
  details: {
    backgroundColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    flexDirection: 'column',
    paddingHorizontal: 18,
    bottom: 0,
    left: 0,
    right: 0,
    top: 50,
    position: 'absolute',
  },
  detailsRow: {
    paddingTop: 26,
    flexDirection: 'row',
  },
  detailsLabel: {
    fontWeight: 'bold',
    flex: 1,
  },
  detailsContent: {
    flex: 4,
  },
});

export default FastListItem;
