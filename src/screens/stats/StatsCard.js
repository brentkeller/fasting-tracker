import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFastStats } from 'common/state/selectors';
import { getDurationString } from 'common/date';
import { Text, Card, CardItem, View } from 'native-base';
import Styles from 'screens/common/styles';

class ActiveFastCard extends React.Component {
  render() {
    const { stats } = this.props;
    if (!stats) return null;

    return (
      <Card>
        <CardItem bordered header>
          <Text>Stats</Text>
        </CardItem>
        <CardItem style={{ justifyContent: 'space-between' }}>
          <View style={Styles.statCardItem}>
            <Text>{getDurationString(stats.average)}</Text>
            <Text style={Styles.statCardItemLabel}>Average</Text>
          </View>
          <View style={Styles.statCardItem}>
            <Text>{getDurationString(stats.longest)}</Text>
            <Text style={Styles.statCardItemLabel2}>Longest</Text>
          </View>
          <View style={Styles.statCardItem}>
            <Text>{getDurationString(stats.shortest)}</Text>
            <Text>Shortest</Text>
          </View>
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
