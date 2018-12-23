import React from 'react';
import { connect } from 'react-redux';
import { getFasts } from 'common/state/selectors';
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

class EditFast extends React.Component {
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
            <Title>Edit</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>Edit form</Text>
        </Content>
      </Container>
    );
  }
}

Stats.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    //fast: getFast(state, ownProps.fastId),
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
)(EditFast);
