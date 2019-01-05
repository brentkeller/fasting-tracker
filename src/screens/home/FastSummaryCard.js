import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFasts } from 'common/state/selectors';
import { Text, Card, CardItem } from 'native-base';
import FastList from 'screens/common/FastList';

class FastSummaryCard extends React.Component {
  constructor(props) {
    super(props);
    this.itemCount = 3;
  }
  render() {
    const { fasts, navigation } = this.props;
    const recentFasts = fasts.slice(0, this.itemCount);

    return (
      <Card>
        <CardItem header bordered>
          <Text>Recent fasts</Text>
        </CardItem>
        <CardItem style={{ paddingLeft: 0, paddingRight: 0 }}>
          <FastList fasts={recentFasts} />
        </CardItem>
        <CardItem footer button onPress={() => navigation.navigate('History')}>
          <Text>See all fasts</Text>
        </CardItem>
      </Card>
    );
  }
}

FastSummaryCard.propTypes = {
  fasts: PropTypes.array,
  itemCount: PropTypes.number,
  navigation: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    fasts: getFasts(state),
  };
}

export default connect(mapStateToProps)(FastSummaryCard);
