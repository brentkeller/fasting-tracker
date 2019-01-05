import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import timer from 'react-native-timer';
import { getDisplayValue, getDurationFromNow } from 'common/date';
import { Button, Text, CardItem } from 'native-base';

class ActiveFastDetails extends React.Component {
  constructor(props) {
    super(props);
    this.activeTimerTick = this.activeTimerTick.bind(this);
    this.state = {
      duration: this.getDuration(this.props.fast),
    };
  }

  componentWillUnmount() {
    timer.clearInterval('activeDuration');
  }

  activeTimerTick() {
    const { fast } = this.props;
    if (!fast || !fast.start) return;
    this.setState({
      duration: this.getDuration(fast),
    });
  }

  getDuration = fast => getDurationFromNow(fast.start) || '0m';

  componentDidMount() {
    timer.setInterval('activeDuration', this.activeTimerTick, 500);
  }

  render() {
    const { dateTimeFormat, fast, endFast } = this.props;
    const { duration } = this.state;
    return (
      <Fragment>
        <CardItem>
          <Text>Began: {getDisplayValue(fast.start, dateTimeFormat)}</Text>
        </CardItem>
        {duration && (
          <CardItem>
            <Text>Duration: {duration}</Text>
          </CardItem>
        )}
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
  }
}

ActiveFastDetails.propTypes = {
  dateTimeFormat: PropTypes.string.isRequired,
  endFast: PropTypes.func.isRequired,
  fast: PropTypes.object,
};

export default ActiveFastDetails;
