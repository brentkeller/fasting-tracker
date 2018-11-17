import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getActiveFast, getFasts } from 'common/state/selectors';
import { beginFast, deleteFast, endFast } from 'common/state/ducks/fasts';
import { getDisplayValue, getDurationFromNow } from 'common/date';
import { ListView } from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  View,
  Left,
  Body,
  Right,
  Title,
  Icon,
  Fab,
  Text,
  Card,
  CardItem,
  List,
} from 'native-base';
import FastListItem from './FastListItem';

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
    this.props.actions.deleteFast(data.id);
  }

  beginFast = () => {
    this.props.actions.beginFast();
  };

  endFast = () => {
    this.props.actions.endFast();
  };

  render() {
    const { activeFast, fasts } = this.props;
    const items = fasts
      .filter(x => x.end)
      .map(x => <FastListItem key={x.id} fast={x} />);
    const fabAction =
      activeFast && activeFast.start ? this.endFast : this.beginFast;
    const fabIcon = activeFast && activeFast.start ? 'stop' : 'add';
    const fabIconSet =
      activeFast && activeFast.start ? 'MaterialIcons' : 'MaterialIcons';
    const duration = activeFast ? getDurationFromNow(activeFast.start) : null;

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
          {activeFast && activeFast.start && (
            <Card>
              <CardItem>
                <Text>Active Fast</Text>
              </CardItem>
              <CardItem>
                <Text>Began: {getDisplayValue(activeFast.start)}</Text>
              </CardItem>
              <CardItem>
                <Text>Duration: {duration}</Text>
              </CardItem>
            </Card>
          )}
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
          {/* {items} */}
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
