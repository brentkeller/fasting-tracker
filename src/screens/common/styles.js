import { StyleSheet } from 'react-native';
import Colors from 'res/colors';

export const Constants = {
  settingsItemBorderBottom: 1,
};

export default StyleSheet.create({
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
  //Settings
  settingsHeader: {
    color: Colors.brand,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
    paddingLeft: 18,
  },
  settingsItem: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomColor: Colors.grey95,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemLeft: {
    flexDirection: 'column',
  },
  settingsItemLabel: { flex: 1 },
  settingsItemDescription: {
    color: Colors.grey65,
  },
  settingsItemCheckbox: {
    alignSelf: 'flex-end',
    marginRight: 6,
  },
});
