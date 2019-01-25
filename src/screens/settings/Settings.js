import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  dateFormats,
  getDateTimeFormat,
  getDisplayValue,
  getNow,
} from 'common/date';
import { setSetting } from 'common/state/settings/settings';
import { getSettings } from 'common/state/selectors';
import Styles from 'screens/common/styles';
import Colors from 'res/colors';
import SettingsHeader from 'screens/settings/SettingsHeader';
import CheckboxSetting from 'screens/settings/CheckboxSetting';
import { Switch, Text } from 'react-native';
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
  Form,
  Item,
  Label,
  Picker,
  H2,
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

  getDateFormats = () => {
    const now = getNow();
    let formats = [];
    dateFormats.forEach(f => {
      const format = getDateTimeFormat(f, this.props.settings.use24HrClock);
      const label = getDisplayValue(now, format);
      formats.push(<Picker.Item label={label} value={f} key={f} />);
    });
    return formats;
  };

  render() {
    const { settings } = this.props;
    const liveDateFormats = this.getDateFormats();

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
          <Right />
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
            <Item picker>
              <Label>Date display</Label>
              <Picker
                selectedValue={settings.dateFormat}
                onValueChange={this.onDateFormatChanged}
              >
                {liveDateFormats}
              </Picker>
            </Item>
          </Form>
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
