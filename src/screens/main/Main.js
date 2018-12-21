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
import FastListItem from './FastListItem';
import ActiveFastCard from './ActiveFastCard';

class Main extends React.Component {
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

  beginFast = () => {
    this.props.actions.beginFast();
  };

  endFast = () => {
    this.props.actions.endFast();
  };

  goToStats = () => {
    this.props.navigation.navigate('Stats');
  };

  render() {
    const { activeFast, fasts } = this.props;
    const fabAction =
      activeFast && activeFast.start ? this.endFast : this.beginFast;
    const fabIcon = activeFast && activeFast.start ? 'stop' : 'add';
    const fabIconSet =
      activeFast && activeFast.start ? 'MaterialIcons' : 'MaterialIcons';

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Fasting Tracker</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ flex: 1 }} padder>
          <ActiveFastCard />
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
          <Button onPress={() => this.goToStats()}>
            <Text>Stats</Text>
          </Button>
          <Fab
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={fabAction}
          >
            <Icon name={fabIcon} type={fabIconSet} />
          </Fab>
        </View>
      </Container>
    );
  }
}

Main.propTypes = {
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
)(Main);
