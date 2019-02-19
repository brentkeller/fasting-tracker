import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import timer from 'react-native-timer';
import { getDurationFromNow } from 'common/date';
import { StyleSheet } from 'react-native';
import { Button, Text, CardItem } from 'native-base';
import EditableDate from '../common/EditableDate';
import Styles from 'screens/common/styles';

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
    const {
      dateTimeFormat,
      fast,
      endFast,
      updateFast,
      use24HrClock,
    } = this.props;
    const { duration } = this.state;
    return (
      <Fragment>
        <CardItem>
          <Text style={styles.itemLabel}>Began:</Text>
          <EditableDate
            dateTimeFormat={dateTimeFormat}
            fast={fast}
            fieldName="start"
            textStyle={styles.timeLabel}
            use24HrClock={use24HrClock}
            updateFast={updateFast}
          />
        </CardItem>
        {duration && (
          <CardItem>
            <Text style={styles.itemLabel}>Duration:</Text>
            <Text>{duration}</Text>
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
  updateFast: PropTypes.func.isRequired,
  use24HrClock: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  itemLabel: { width: 74 },
  timeLabel: { ...Styles.touchableText, fontSize: 16 },
});
export default ActiveFastDetails;
