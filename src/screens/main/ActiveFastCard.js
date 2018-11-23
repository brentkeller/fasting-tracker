import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getActiveFast } from 'common/state/selectors';
import { getDisplayValue, getDurationFromNow } from 'common/date';
import { Text, Card, CardItem } from 'native-base';

class ActiveFastCard extends React.Component {
  render() {
    const { activeFast } = this.props;
    const duration = activeFast ? getDurationFromNow(activeFast.start) : null;

    if (!activeFast || !activeFast.start) return null;

    return (
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

export default connect(mapStateToProps)(ActiveFastCard);
