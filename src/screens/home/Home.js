import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFasts } from 'common/state/selectors';
import {
  Container,
  Header,
  Content,
  Button,
  Left,
  Body,
  Right,
  Title,
  Icon,
} from 'native-base';
import ActiveFastCard from './ActiveFastCard';
import FastSummaryCard from './FastSummaryCard';
import StatsCard from 'screens/stats/StatsCard';

class Home extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Icon name="home" style={{ fontSize: 24, color: tintColor }} />
    ),
  };

  render() {
    const { navigation } = this.props;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Fasting Tracker</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <ActiveFastCard />
          <FastSummaryCard navigation={navigation} />
          <StatsCard showSummary={true} navigation={navigation} />
        </Content>
      </Container>
    );
  }
}

Home.propTypes = {
  fasts: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    fasts: getFasts(state),
  };
}

export default connect(mapStateToProps)(Home);
