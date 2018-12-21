import React from 'react';
import { connect } from 'react-redux';
import { getFasts } from 'common/state/selectors';
import StatsCard from './StatsCard';
import {
  Container,
  Header,
  View,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
} from 'native-base';

class Stats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { fasts } = this.props;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Stats</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ flex: 1 }} padder>
          <StatsCard />
        </View>
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
