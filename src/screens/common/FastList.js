import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteFast, updateFast } from 'common/state/fasts/fasts';
import { getSettings } from 'common/state/selectors';
import { ListView, Alert } from 'react-native';
import { Button, Icon, List } from 'native-base';
import FastListItem from 'screens/common/FastListItem';
import EditFast from 'screens/common/EditFast';

class FastList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  editRow = (data, secId, rowId, rowMap) => {
    this.setState({
      editFast: { ...data },
      currentFastRow: {
        secId,
        rowId,
        rowMap,
      },
    });
  };

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

  cancelEdit = () => {
    this.closeCurrentRow(this.state.currentFastRow);
    this.setState({ editFast: null, currentFastRow: null });
  };

  saveEdit = () => {
    console.log('saving', this.state.editFast);
    this.closeCurrentRow(this.state.currentFastRow);
    this.setState({ editFast: null, currentFastRow: null });
  };

  render() {
    const { actions, fasts, settings } = this.props;
    const { editFast } = this.state;
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    return (
      <Fragment>
        <List
          leftOpenValue={75}
          rightOpenValue={-75}
          dataSource={ds.cloneWithRows(fasts)}
          renderRow={data => (
            <FastListItem
              fast={data}
              dateTimeFormat={settings.dateTimeFormat}
              updateFast={actions.updateFast}
              use24HrClock={settings.use24HrClock}
            />
          )}
          renderLeftHiddenRow={(data, secId, rowId, rowMap) => (
            <Button
              full
              onPress={() => this.editRow(data, secId, rowId, rowMap)}
            >
              <Icon active name="edit" type="MaterialIcons" />
            </Button>
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
        {editFast && (
          <EditFast
            fast={editFast}
            onCancel={this.cancelEdit}
            onSave={this.saveEdit}
          />
        )}
      </Fragment>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FastList);
