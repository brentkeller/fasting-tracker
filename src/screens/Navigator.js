import Colors from 'res/colors';
import Home from './home/Home';
import History from './history/History';
import Settings from './settings/Settings';
import Stats from './stats/Stats';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      path: 'Home',
      screen: Home,
    },
    History: {
      path: 'History',
      screen: History,
    },
    // Stats: {
    //   path: 'Stats',
    //   screen: Stats,
    // },
    Settings: {
      path: 'Settings',
      screen: Settings,
    },
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: Colors.brand,
    },
  },
);

const AppContainer = createAppContainer(DrawerNavigator);

export default AppContainer;
