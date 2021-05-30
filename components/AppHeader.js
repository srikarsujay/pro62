import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class AppHeader extends React.Component {
  render() {
    return (
      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>Attendence App</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: 'chocolate',
    alignItems: 'center',
    marginBottom: 30,
  },
  textStyle: {
    fontSize:23,
    fontWeight:'bold',
  },
});


