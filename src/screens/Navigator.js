import Home from './home/Home';
import History from './history/History';
import Stats from './stats/Stats';

import { Platform, ScrollView, StatusBar, Text } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator,
  SafeAreaView,
} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const MyNavScreen = ({ navigation, banner }) => (
//   <ScrollView>
//     <SafeAreaView forceInset={{ top: 'always' }}>
//       <Text>{banner}</Text>
//       <Button onPress={() => navigation.openDrawer()} title="Open drawer" />
//       <Button
//         onPress={() => navigation.navigate('Home')}
//         title="Open other screen"
//       />
//       <Button onPress={() => navigation.navigate('Index')} title="Go back" />
//     </SafeAreaView>
//     <StatusBar barStyle="default" />
//   </ScrollView>
// );

// const InboxScreen = ({ navigation }) => (
//   <MyNavScreen banner={'Inbox Screen'} navigation={navigation} />
// );
// InboxScreen.navigationOptions = {
//   headerTitle: 'Inbox',
// };

// const InboxStack = createStackNavigator(
//   {
//     Inbox: { screen: InboxScreen },
//     Email: { screen: EmailScreen },
//   },
//   {
//     navigationOptions: {
//       drawerLabel: 'Inbox',
//       drawerIcon: ({ tintColor }) => (
//         <MaterialIcons
//           name="move-to-inbox"
//           size={24}
//           style={{ color: tintColor }}
//         />
//       ),
//     },
//   },
// );

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
    Stats: {
      path: 'Stats',
      screen: Stats,
    },
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: '#339900',
    },
  },
);

const AppContainer = createAppContainer(DrawerNavigator);

export default AppContainer;
