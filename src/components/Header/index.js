import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {Client} from 'dsteem'
 
const Account = () => {
  return (
    <View style={styles.container}>
        <Text>Steem</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    backgroundColor: '#000',
  }
})

export default Account;
