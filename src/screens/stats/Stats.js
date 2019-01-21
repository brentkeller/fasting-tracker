import React from 'react';
import { connect } from 'react-redux';
import { getFasts } from 'common/state/selectors';
import Styles from 'screens/common/styles';
import StatsCard from './StatsCard';
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
} from 'native-base';

class Stats extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Stats',
    drawerIcon: ({ tintColor }) => (
      <Icon name="stats" style={{ fontSize: 24, color: tintColor }} />
    ),
  };

  render() {
    const { fasts } = this.props;
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
            <Title>Stats</Title>
          </Body>
          <Right />
        </Header>
        <Content padder style={Styles.pageContainer}>
          <StatsCard />
        </Content>
      </Container>
    );
  }
}

Stats.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    fasts: getFasts(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {};
  // return {
  //   actions: bindActionCreators({ beginFast, deleteFast, endFast }, dispatch),
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stats);
