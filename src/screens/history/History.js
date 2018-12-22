import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFasts } from 'common/state/selectors';
import { deleteFast } from 'common/state/fasts/fasts';
import { ListView, Alert } from 'react-native';
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

class History extends React.Component {
  static navigationOptions = {
    drawerLabel: 'History',
    drawerIcon: ({ tintColor }) => (
      <Icon name="list" style={{ fontSize: 24, color: tintColor }} />
    ),
    headerTitle: 'Fasting History',
  };

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.deleteRow = this.deleteRow.bind(this);
    this.editRow = this.editRow.bind(this);
  }

  editRow(data) {
    console.log('edit', data);
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
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>History</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ flex: 1 }} padder>
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
        </View>
      </Container>
    );
  }
}

History.propTypes = {
  actions: PropTypes.object.isRequired,
  fasts: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    fasts: getFasts(state),
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
)(History);
