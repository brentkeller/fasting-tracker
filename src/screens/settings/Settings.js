import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dateFormats, getDisplayValue, getNow } from 'common/date';
import { setSetting } from 'common/state/settings/settings';
import { getSettings } from 'common/state/selectors';
import Styles from 'screens/common/styles';
import Colors from 'res/colors';
import SettingsHeader from 'screens/settings/SettingsHeader';
import CheckboxSetting from 'screens/settings/CheckboxSetting';
import ModalOptionSetting from 'screens/settings/ModalOptionSetting';
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Title,
  Button,
  Icon,
} from 'native-base';

class Settings extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Settings',
    drawerIcon: ({ tintColor }) => (
      <Icon name="settings" style={{ fontSize: 24, color: tintColor }} />
    ),
  };

  setSetting = (fieldName, e) => this.props.actions.setSetting(fieldName, e);

  onDateFormatChanged = e => this.props.actions.setSetting('dateFormat', e);
  onTimeFormatChanged = e => this.props.actions.setSetting('use24HrClock', e);

  getDateFormatOptions = () => {
    const now = getNow();
    let options = [];
    dateFormats.forEach(f => {
      options.push({
        label: getDisplayValue(now, f),
        value: f,
      });
    });
    return options;
  };

  render() {
    const { settings } = this.props;
    const dateFormatOptions = this.getDateFormatOptions();

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Settings</Title>
          </Body>
        </Header>
        <Content>
          <SettingsHeader text="Display" />
          <CheckboxSetting
            color={Colors.brand}
            label="Use 24 hour clock"
            fieldName="use24HrClock"
            onValueChange={this.setSetting}
            value={settings.use24HrClock}
          />
          <ModalOptionSetting
            color={Colors.brand}
            label="Date format"
            fieldName="dateFormat"
            onValueChange={this.setSetting}
            options={dateFormatOptions}
            value={settings.dateFormat}
          />
        </Content>
      </Container>
    );
  }
}

Settings.propTypes = {
  actions: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    settings: getSettings(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ setSetting }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
