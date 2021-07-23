import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Main = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fitur sedang dalam pengembangan :)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#252525',
  },
  text: {
    fontSize: 20,
    color: '#fff'
  }
})

export default Main;