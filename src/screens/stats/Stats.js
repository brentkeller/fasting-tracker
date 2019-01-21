import React from 'react';
import Styles from 'screens/common/styles';
import StatsCard from './StatsCard';
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Title,
  Button,
  Icon,
} from 'native-base';

class Stats extends React.Component {
  render() {
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
        </Header>
        <Content padder style={Styles.pageContainer}>
          <StatsCard />
        </Content>
      </Container>
    );
  }
}

Stats.propTypes = {};

export default Stats;
