import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { beginFast, endFast } from 'common/state/fasts/fasts';
import { getActiveFast } from 'common/state/selectors';
import { getDisplayValue, getDurationFromNow } from 'common/date';
import { Button, Text, Card, CardItem } from 'native-base';

const ActiveFast = ({ fast, endFast }) => (
  <Fragment>
    <CardItem>
      <Text>Began: {getDisplayValue(fast.start)}</Text>
    </CardItem>
    <CardItem>
      <Text>Duration: {getDurationFromNow(fast.start)}</Text>
    </CardItem>
    <CardItem>
      <Button
        onPress={() => endFast()}
        style={{ justifyContent: 'center', width: '100%' }}
      >
        <Text>End fast</Text>
      </Button>
    </CardItem>
  </Fragment>
);

const BeginFast = ({ beginFast }) => (
  <Fragment>
    <CardItem>
      <Button
        onPress={() => beginFast()}
        style={{ justifyContent: 'center', width: '100%' }}
      >
        <Text>Begin fast</Text>
      </Button>
    </CardItem>
  </Fragment>
);

class ActiveFastCard extends React.Component {
  render() {
    const { actions, activeFast } = this.props;

    const cardBody =
      !activeFast || !activeFast.start ? (
        <BeginFast beginFast={actions.beginFast} />
      ) : (
        <ActiveFast fast={activeFast} endFast={actions.endFast} />
      );

    return (
      <Card>
        <CardItem header bordered>
          <Text>Current fast</Text>
        </CardItem>
        {cardBody}
      </Card>
    );
  }
}

ActiveFastCard.propTypes = {
  activeFast: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    activeFast: getActiveFast(state),
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
)(ActiveFastCard);
