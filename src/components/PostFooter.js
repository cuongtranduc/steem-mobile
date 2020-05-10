import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Avatar from './Avatar';

import {sbdToDollar} from '../utils/money';
import {colors} from '../utils/theme';

const PostFooter = ({item, hideShare}) => {
  return (
    <View style={styles.footer}>
      <Text style={styles.payout}>
        {sbdToDollar(item.pending_payout_value)}
      </Text>
      <View
        style={{marginLeft: 15, flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="heart" size={18} color={'#f77'} />
        <Text style={styles.votes}>{item.active_votes.length}</Text>
      </View>
      <View
        style={{marginLeft: 15, flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="comment-multiple-outline" size={18} color={'#06D6A9'} />
        <Text style={styles.votes}>{item.children}</Text>
      </View>
      <View style={{flex: 1}} />
      {!hideShare && (
        <View
          style={{marginRight: 5, flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="share" size={18} color={colors.primary} />
          <Text style={styles.votes}>0</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    marginTop: 15,
    flexDirection: 'row',
  },
  payout: {
    fontSize: 18,
    lineHeight: 21,
  },
  votes: {
    marginLeft: 3,
    fontSize: 18,
    lineHeight: 21,
  },
});

export default React.memo(PostFooter);
