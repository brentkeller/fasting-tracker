import React from 'react';
import Navigator from './Navigator';
import { Text } from 'react-native';
import { Drawer, View } from 'native-base';

class SideBar extends React.Component {
  render() {
    return (
      <View>
        <View>
          <Text>Home</Text>
        </View>
        <View>
          <Text>Stats</Text>
        </View>
      </View>
    );
  }
}

class AppShell extends React.Component {
  render() {
    closeDrawer = () => {
      //this.drawer._root.close();
    };
    openDrawer = () => {
      this.drawer._root.open();
    };

    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        panOpenMask={0.25}
        type="overlay"
        content={<SideBar navigator={this.navigator} />}
        onClose={() => closeDrawer()}
      >
        <Navigator />
      </Drawer>
    );
  }
}

export default AppShell;
