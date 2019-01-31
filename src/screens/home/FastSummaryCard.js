import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCompletedFasts } from 'common/state/selectors';
import { Text, Card, CardItem, Icon, Right } from 'native-base';
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
        <CardItem
          header
          bordered
          button
          onPress={() => navigation.navigate('History')}
        >
          <Text>History</Text>
          <Right style={{ right: 18, position: 'absolute' }}>
            <Icon name="right" type="AntDesign" />
          </Right>
        </CardItem>
        <CardItem style={{ paddingLeft: 0, paddingRight: 0 }}>
          <FastList fasts={recentFasts} />
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
    fasts: getCompletedFasts(state),
  };
}

export default connect(mapStateToProps)(FastSummaryCard);
