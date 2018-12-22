import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getActiveFast, getFasts } from 'common/state/selectors';
import { beginFast, deleteFast, endFast } from 'common/state/fasts/fasts';
import { ListView, Alert, Text } from 'react-native';
import {
  Container,
  Header,
  Button,
  View,
  Left,
  Body,
  Right,
  Title,
  Icon,
  Fab,
  List,
} from 'native-base';
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
    const { fasts } = this.props;
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    return (
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
    );
  }
}

FastList.propTypes = {
  actions: PropTypes.object.isRequired,
  fasts: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    activeFast: getActiveFast(state),
    fasts: getFasts(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ beginFast, deleteFast, endFast }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FastList);
