import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteFast } from 'common/state/fasts/fasts';
import { getSettings } from 'common/state/selectors';
import { ListView, Alert } from 'react-native';
import { Button, Icon, List } from 'native-base';
import FastListItem from '../common/FastListItem';

class FastList extends React.Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.deleteRow = this.deleteRow.bind(this);
    this.editRow = this.editRow.bind(this);
  }

  editRow(data) {
    this.props.navigation.navigate({ routeName: 'edit', params: data.id });
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

  render() {
    const { fasts, settings } = this.props;
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    return (
      <List
        leftOpenValue={75}
        rightOpenValue={-75}
        dataSource={ds.cloneWithRows(fasts)}
        renderRow={data => (
          <FastListItem fast={data} dateTimeFormat={settings.dateTimeFormat} />
        )}
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
    actions: bindActionCreators({ deleteFast }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FastList);
