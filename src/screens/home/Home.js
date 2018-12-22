import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getActiveFast, getFasts } from 'common/state/selectors';
import { beginFast, endFast } from 'common/state/fasts/fasts';
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
import ActiveFastCard from './ActiveFastCard';

class Home extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Icon name="home" style={{ fontSize: 24, color: tintColor }} />
    ),
  };

  constructor(props) {
    super(props);
  }

  beginFast = () => {
    this.props.actions.beginFast();
  };

  endFast = () => {
    this.props.actions.endFast();
  };

  render() {
    const { activeFast, fasts } = this.props;
    const fabAction =
      activeFast && activeFast.start ? this.endFast : this.beginFast;
    const fabIcon = activeFast && activeFast.start ? 'stop' : 'add';
    const fabIconSet =
      activeFast && activeFast.start ? 'MaterialIcons' : 'MaterialIcons';

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
            <Title>Fasting Tracker</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ flex: 1 }} padder>
          <ActiveFastCard />
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

Home.propTypes = {
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
    actions: bindActionCreators({ beginFast, endFast }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
