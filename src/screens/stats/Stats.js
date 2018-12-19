import React from 'react';
import { connect } from 'react-redux';
import { getFasts } from 'common/state/selectors';
import { Text } from 'react-native';
import { Container, Header, View, Left, Body, Right, Title } from 'native-base';

class Stats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { fasts } = this.props;
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Stats</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ flex: 1 }} padder>
          <Text>Stats page</Text>
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
