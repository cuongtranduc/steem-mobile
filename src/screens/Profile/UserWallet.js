import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors} from '../../utils/theme';

const UserWallet = ({user}) => {
  return (
    <ScrollView style={styles.container}>
      <Text
        style={{
          marginVertical: 30,
          marginHorizontal: 30,
          color: colors.dark_gray,
          fontSize: 16,
        }}>
        Wallet Details
      </Text>
      <View
        style={{
          borderRadius: 10,
          marginHorizontal: 15,
          backgroundColor: colors.white,
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 2,
          shadowOffset: {
            height: 1,
            width: 0,
          },
          elevation: 5,
        }}>
        <View style={[styles.row, {paddingHorizontal: 15}]}>
          <View style={styles.leftRow}>
            <Icon name="information-outline" size={20} />
            <Text style={styles.text}>Steem</Text>
          </View>
          <Text style={styles.value}>${user.balance}</Text>
        </View>
        <View
          style={[
            styles.row,
            {paddingHorizontal: 15, backgroundColor: '#EEE'},
          ]}>
          <View style={styles.leftRow}>
            <Icon name="information-outline" size={20} />
            <Text style={styles.text}>Steem Power</Text>
          </View>
          <Text style={styles.value}>10 STEEM</Text>
        </View>
        <View style={[styles.row, {paddingHorizontal: 15}]}>
          <View style={styles.leftRow}>
            <Icon name="information-outline" size={20} />
            <Text style={styles.text}>Steem Dollars</Text>
          </View>
          <Text style={styles.value}>${user.sbd_balance}</Text>
        </View>
        <View
          style={[
            styles.row,
            {paddingHorizontal: 15, backgroundColor: '#EEE'},
          ]}>
          <View style={styles.leftRow}>
            <Icon name="information-outline" size={20} />
            <Text style={styles.text}>Savings</Text>
          </View>
          <Text style={styles.value}>10 STEEM</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Icon name="information-outline" size={20} />
        <Text style={styles.countdown}>
          {`Next power down is in ${Math.round(
            (new Date(`${user.next_vesting_withdrawal}.000Z`) - new Date()) /
              (1000 * 3600),
          )} hours`}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    padding: 30,
    alignItems: 'center',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    marginLeft: 5,
    fontSize: 20,
    lineHeight: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 20,
    color: colors.primary,
    lineHeight: 20,
  },
  countdown: {
    marginLeft: 5,
    fontSize: 20,
    color: colors.primary,
    lineHeight: 20,
  },
});

export default React.memo(UserWallet);
