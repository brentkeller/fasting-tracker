import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFasts } from 'common/state/selectors';
import {
  Container,
  Header,
  Button,
  Content,
  Left,
  Body,
  Right,
  Title,
  Icon,
} from 'native-base';
import FastList from '../common/FastList';

class History extends React.Component {
  static navigationOptions = {
    drawerLabel: 'History',
    drawerIcon: ({ tintColor }) => (
      <Icon name="list" style={{ fontSize: 24, color: tintColor }} />
    ),
    headerTitle: 'Fasting History',
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
            <Title>History</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <FastList fasts={fasts} />
        </Content>
      </Container>
    );
  }
}

History.propTypes = {
  fasts: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    fasts: getFasts(state),
  };
}

export default connect(mapStateToProps)(History);
