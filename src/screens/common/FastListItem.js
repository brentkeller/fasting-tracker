import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { Left, ListItem, Right } from 'native-base';
import { getDisplayValue, getDurationString } from 'common/date';
import Colors from 'res/colors';
import EditableDate from './EditableDate';
import Styles from 'screens/common/styles';

class FastListItem extends React.Component {
  state = {
    expanded: false,
  };

  toggleView = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { fast, dateTimeFormat, use24HrClock, updateFast } = this.props;
    const { expanded } = this.state;
    if (!fast) return null;

    const duration = getDurationString(fast.duration || 0);
    const listItem = { ...styles.listItem, height: expanded ? 150 : 50 };
    return (
      <ListItem style={listItem} onPress={this.toggleView}>
        <Left style={styles.left}>
          <Text>{getDisplayValue(fast.start, dateTimeFormat)}</Text>
        </Left>
        {expanded && (
          <View style={styles.details}>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Started</Text>
              <EditableDate
                dateTimeFormat={dateTimeFormat}
                fast={fast}
                fieldName="start"
                textStyle={Styles.touchableText}
                use24HrClock={use24HrClock}
                updateFast={updateFast}
              />
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Ended</Text>
              <EditableDate
                dateTimeFormat={dateTimeFormat}
                fast={fast}
                fieldName="end"
                textStyle={Styles.touchableText}
                use24HrClock={use24HrClock}
                updateFast={updateFast}
              />
            </View>
          </View>
        )}
        <Right style={styles.right}>
          <Text>{duration}</Text>
        </Right>
      </ListItem>
    );
  }
}

FastListItem.propTypes = {
  dateTimeFormat: PropTypes.string.isRequired,
  fast: PropTypes.object.isRequired,
  updateFast: PropTypes.func.isRequired,
  use24HrClock: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
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
    backgroundColor: Colors.grey95,
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
    paddingTop: 20,
    flexDirection: 'row',
  },
  detailsLabel: {
    width: 65,
  },
});

export default FastListItem;
