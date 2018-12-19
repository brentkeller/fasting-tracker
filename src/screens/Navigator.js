import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import Main from './main/Main';
import Stats from './stats/Stats';

const routes = {
  Home: Main,
  Stats: Stats,
};
const AppNavigator = createStackNavigator(routes, {
  initialRouteName: 'Home',
});

const TabNavigator = createBottomTabNavigator(routes);

const TopNav = createMaterialTopTabNavigator(routes, {
  initialRouteName: 'Home',
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
