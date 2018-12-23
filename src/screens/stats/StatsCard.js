import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFastStats } from 'common/state/selectors';
import { getDurationString } from 'common/date';
import { Text, Card, CardItem } from 'native-base';

class ActiveFastCard extends React.Component {
  render() {
    const { showSummary, stats, navigation } = this.props;
    if (!stats) return null;

    return (
      <Card>
        <CardItem header bordered>
          <Text>Stats</Text>
        </CardItem>
        <CardItem>
          <Text>Average fast: {getDurationString(stats.average)}</Text>
        </CardItem>
        <CardItem>
          <Text>Longest fast: {getDurationString(stats.longest)}</Text>
        </CardItem>
        {!showSummary && (
          <CardItem>
            <Text>Shortest fast: {getDurationString(stats.shortest)}</Text>
          </CardItem>
        )}
        {showSummary && (
          <CardItem footer button onPress={() => navigation.navigate('Stats')}>
            <Text>See more stats</Text>
          </CardItem>
        )}
      </Card>
    );
  }
}

ActiveFastCard.propTypes = {
  navigation: PropTypes.object,
  showSummary: PropTypes.bool,
  stats: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    stats: getFastStats(state),
  };
}

export default connect(mapStateToProps)(ActiveFastCard);
