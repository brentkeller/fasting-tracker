import React, { Component } from 'react';
//import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';
import { persistor, store } from './src/common/state/store';
import AppShell from './src/screens/AppShell';

// // Debug storage on app load
// AsyncStorage.getAllKeys((err, keys) => {
//   AsyncStorage.multiGet(keys, (err, stores) => {
//     stores.map((result, i, store) => {
//       // get at each store's key/value so you can work with it
//       let key = store[i][0];
//       let value = store[i][1];
//       console.log('storage', key, value);
//     });
//   });
// });

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) return <AppLoading />;

    return (
      <StoreProvider store={store}>
        <PersistGate persistor={persistor}>
          <StyleProvider style={getTheme(commonColor)}>
            <AppShell />
          </StyleProvider>
        </PersistGate>
      </StoreProvider>
    );
  }
}
