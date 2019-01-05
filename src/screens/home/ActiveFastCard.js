import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { beginFast, endFast } from 'common/state/fasts/fasts';
import { getActiveFast, getSettings } from 'common/state/selectors';
import { Button, Text, Card, CardItem } from 'native-base';
import ActiveFastDetails from './ActiveFastDetails';

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
    const { actions, activeFast, settings } = this.props;
    const cardBody =
      !activeFast || !activeFast.start ? (
        <BeginFast beginFast={actions.beginFast} />
      ) : (
        <ActiveFastDetails
          fast={activeFast}
          endFast={actions.endFast}
          dateTimeFormat={settings.dateTimeFormat}
        />
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
  actions: PropTypes.object.isRequired,
  activeFast: PropTypes.object,
  settings: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    activeFast: getActiveFast(state),
    settings: getSettings(state),
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
