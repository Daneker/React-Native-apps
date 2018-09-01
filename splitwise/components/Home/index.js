import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Colors,
  Toolbar,
  ToolbarContent,
  ToolbarAction,
} from 'react-native-paper';
import ActionButton from 'react-native-action-button';

import OweHeader from './OweHeader';
import FriendsList from './FriendsList';

const Home = ({
  billsMap,
  onNavigateToAddFriendScreen,
  onNavigateToAddBillScreen,
  onNavigateToFriendScreen,
}) => (
  <View style={styles.container}>
    <Toolbar style={{ backgroundColor: 'green' }}>
      <ToolbarContent title="SPLITWISE" />
    </Toolbar>
    <OweHeader billsMap={billsMap} />
    <FriendsList
      billsMap={billsMap}
      onNavigateToAddFriendScreen={onNavigateToAddFriendScreen}
      onNavigateToFriendScreen={onNavigateToFriendScreen}
    />
    <ActionButton
      buttonColor="rgba(231,76,60,1)"
      onPress={onNavigateToAddBillScreen}
    />
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
export default Home;
