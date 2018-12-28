import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteFast } from 'common/state/fasts/fasts';
import { ListView, Alert } from 'react-native';
import { Button, Icon, List } from 'native-base';
import FastListItem from './FastListItem';
import EditFast from './EditFast';

class FastList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.deleteRow = this.deleteRow.bind(this);
    this.editRow = this.editRow.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
  }

  editRow(data) {
    this.setState({ editFast: { ...data } });
    // this.props.navigation.navigate({ routeName: 'edit', params: data.id });
  }

  deleteRow(data) {
    Alert.alert('Delete fast?', 'Do you want to delete this fast entry?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Ok',
        onPress: () => this.props.actions.deleteFast(data.id),
        style: 'destructive',
      },
    ]);
  }

  cancelEdit() {
    this.setState({ editFast: null });
  }

  saveEdit() {
    console.log('saving', this.state.editFast);
  }

  render() {
    const { fasts } = this.props;
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
          renderRow={data => <FastListItem fast={data} />}
          renderLeftHiddenRow={data => (
            <Button full onPress={() => this.editRow(data)}>
              <Icon active name="edit" type="MaterialIcons" />
            </Button>
          )}
          renderRightHiddenRow={data => (
            <Button full danger onPress={() => this.deleteRow(data)}>
              <Icon active name="trash" />
            </Button>
          )}
        />
        {editFast && (
          <EditFast
            fast={editFast}
            onCancel={() => this.cancelEdit()}
            onSave={() => this.saveEdit()}
          />
        )}
      </Fragment>
    );
  }
}

FastList.propTypes = {
  actions: PropTypes.object.isRequired,
  fasts: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ deleteFast }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FastList);
