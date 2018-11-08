import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  beginFast,
  endFast,
  getActiveFast,
  getFasts,
} from 'common/state/ducks/fasts';
import { getDisplayValue, getDurationFromNow } from 'common/date';
import {
  Container,
  Header,
  Content,
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
} from 'native-base';
import FastListItem from './FastListItem';

class Main extends React.Component {
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
    const items = fasts
      .filter(x => x.end)
      .map(x => <FastListItem key={x.id} fast={x} />);
    const fabAction =
      activeFast && activeFast.start ? this.endFast : this.beginFast;
    const fabIcon = activeFast && activeFast.start ? 'stop' : 'add';
    const fabIconSet =
      activeFast && activeFast.start ? 'MaterialIcons' : 'MaterialIcons';
    const duration = activeFast ? getDurationFromNow(activeFast.start) : null;

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
          {items}
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
    actions: bindActionCreators({ beginFast, endFast }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
