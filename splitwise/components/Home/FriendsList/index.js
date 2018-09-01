import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Button, Subheading, TouchableRipple } from 'react-native-paper';

import FriendsListItem from './FriendsListItem';

const FriendsList = ({
  billsMap,
  onNavigateToAddFriendScreen,
  onNavigateToFriendScreen,
}) => {
  const friendNames = Object.keys(billsMap);
  const noFriends = friendNames.length === 0;

  return (
    <ScrollView>
        <View>
          {friendNames.map(name => (
            <TouchableRipple
              key={name}
              onPress={() => onNavigateToFriendScreen({ name })}>
              <FriendsListItem name={name} bills={billsMap[name]} />
            </TouchableRipple>
          ))}
        </View>
      
      <View style={styles.btnView}>
        <Button style={{backgroundColor: 'green'}} raised onPress={onNavigateToAddFriendScreen}>
          {noFriends ? '+ADD FRIENDS ON SPLITWISE' : 'ADD MORE FRIENDS'}
        </Button>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  btnView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default FriendsList;
