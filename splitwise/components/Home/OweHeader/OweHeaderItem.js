import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, Text } from 'react-native-paper';

const changeColor = myColor => {
  return {
    textAlign: 'right',
    color: myColor,
  };
};

const OweHeaderItem = ({ label, formattedAmount, amountColor }) => (
  <View style={styles.container}>
    <Text style={Colors.gray600}>{label}</Text>
    <Text style={changeColor(amountColor)}>{formattedAmount}</Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default OweHeaderItem;
