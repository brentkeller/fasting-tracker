import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFastStats } from 'common/state/selectors';
import { getDurationString } from 'common/date';
import { Text, Card, CardItem } from 'native-base';

class ActiveFastCard extends React.Component {
  render() {
    const { stats } = this.props;

    if (!stats) return null;

    return (
      <Card>
        <CardItem>
          <Text>Average fast: {getDurationString(stats.average)}</Text>
        </CardItem>
        <CardItem>
          <Text>Longest fast: {getDurationString(stats.longest)}</Text>
        </CardItem>
        <CardItem>
          <Text>Shortest fast: {getDurationString(stats.shortest)}</Text>
        </CardItem>
      </Card>
    );
  }
}

ActiveFastCard.propTypes = {
  stats: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    stats: getFastStats(state),
  };
}

export default connect(mapStateToProps)(ActiveFastCard);
