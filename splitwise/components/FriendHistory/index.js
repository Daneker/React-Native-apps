import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import {
  Colors,
  Subheading,
  Toolbar,
  ToolbarContent,
  ToolbarAction,
} from 'react-native-paper';
import FriendHistoryListItem from './FriendHistoryListItem';
const changeColor = myColor => {
  return {
    textAlign: 'right',
    color: myColor,
  };
};
const FriendHistory = ({ name, bills, onGoHome }) => (
  
  <View style={styles.container}>
    <Toolbar style={{backgroundColor: 'green'}}>
      <ToolbarContent title={name} />
      <ToolbarAction onPress={onGoHome} icon="close" />
    </Toolbar>
    <ScrollView>
      {bills.length === 0 ? (
        <View style={styles.wrapper}>
          <Text style={styles.noFrinedHistory}>
            {"No Bills"}
          </Text>
        </View>
      ) : (
        bills.map((bill, idx) => (
          <FriendHistoryListItem key={idx} bill={bill} />
        ))
      )}
    </ScrollView>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  noFrinedHistory: {
    fontSize: 20,
    textAlign: 'center',
  },
});
export default FriendHistory;
