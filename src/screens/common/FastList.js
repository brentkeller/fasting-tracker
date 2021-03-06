import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteFast, updateFast } from 'common/state/fasts/fasts';
import { getSettings } from 'common/state/selectors';
import { Alert } from 'react-native';
import { Button, Icon, List } from 'native-base';
import FastListItem from 'screens/common/FastListItem';

class FastList extends React.Component {
  closeCurrentRow = ({ secId, rowId, rowMap }) => {
    if (secId && rowId && rowMap) rowMap[`${secId}${rowId}`].props.closeRow();
  };

  deleteRow = (data, secId, rowId, rowMap) => {
    Alert.alert('Delete fast?', 'Do you want to delete this fast entry?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Ok',
        onPress: () => {
          this.closeCurrentRow({ secId, rowId, rowMap });
          this.props.actions.deleteFast(data.id);
        },
        style: 'destructive',
      },
    ]);
  };

  render() {
    const { actions, fasts, settings } = this.props;

    return (
      <List
        keyExtractor={(item, _idx) => item.id.toString()}
        dataArray={fasts}
        rightOpenValue={-75}
        renderRow={data => (
          <FastListItem
            fast={data}
            dateTimeFormat={settings.dateTimeFormat}
            updateFast={actions.updateFast}
            use24HrClock={settings.use24HrClock}
          />
        )}
        renderRightHiddenRow={(data, secId, rowId, rowMap) => (
          <Button
            full
            danger
            onPress={() => this.deleteRow(data, secId, rowId, rowMap)}
          >
            <Icon active name="trash" />
          </Button>
        )}
      />
    );
  }
}

FastList.propTypes = {
  actions: PropTypes.object.isRequired,
  fasts: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    settings: getSettings(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ deleteFast, updateFast }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FastList);
