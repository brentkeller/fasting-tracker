import React from 'react';
import Navigator from './Navigator';
import { Text } from 'react-native';
import { Container, Content, Drawer, View } from 'native-base';

// class SideBar extends React.Component {
//   render() {
//     const { navigator } = this.props;
//     return (
//       <Container>
//         <Content style={{ flex: 1, backgroundColor: '#fff', top: -1 }}>
//           <View>
//             <Text
//               style={{ fontSize: 40, marginBottom: 10 }}
//               onPress={() => navigator.navigate('Home')}
//             >
//               Home
//             </Text>
//           </View>
//           <View>
//             <Text
//               style={{ fontSize: 40, marginBottom: 10 }}
//               onPress={() => navigator.navigate('Stats')}
//             >
//               Stats
//             </Text>
//           </View>
//         </Content>
//       </Container>
//     );
//   }
// }

class AppShell extends React.Component {
  render() {
    return <Navigator />;
    // closeDrawer = () => {
    //   //this.drawer._root.close();
    // };
    // openDrawer = () => {
    //   this.drawer._root.open();
    // };

    // return (
    //   <Drawer
    //     ref={ref => {
    //       this.drawer = ref;
    //     }}
    //     panOpenMask={0.25}
    //     content={<SideBar navigator={this.navigator} />}
    //     onClose={() => closeDrawer()}
    //   >
    //     <Navigator />
    //   </Drawer>
    // );
  }
}

export default AppShell;
