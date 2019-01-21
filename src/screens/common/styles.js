import { StyleSheet } from 'react-native';
import Colors from 'res/colors';

export default (Styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Colors.grey95,
  },
  header: {
    backgroundColor: Colors.brand,
  },
  statCardItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  statCardItemLabel: { color: Colors.grey65 },
  statCardItemLabel2: { color: Colors.brandLight },
  switch: {
    alignSelf: 'flex-end',
  },
}));
