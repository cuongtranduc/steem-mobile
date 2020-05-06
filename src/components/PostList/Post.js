import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';

import PostHeder from '../PostHeader';

import {colors} from '../../utils/theme';
import {sbdToDollar} from '../../utils/money';
import * as Navigation from '../../navigation';

const screenHeight = Dimensions.get('window').height;

const Post = ({item}) => {
  const metaData = JSON.parse(item.json_metadata);

  const navigateToDetail = () => {
    Navigation.navigate('PostDetail', {
      data: [item.author, item.permlink],
      post: item,
    });
  };

  return ( 
    <View style={styles.container}>
      <PostHeder item={item} />
      <View>
        <TouchableOpacity onPress={navigateToDetail}>
          <Text numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
      {metaData.image && metaData.image[0] && (
        <TouchableOpacity onPress={navigateToDetail}>
          <Image
            style={styles.thumbnail}
            source={{uri: metaData.image[0]}}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
      )}
      <View style={styles.footer}>
        <Text style={styles.payout}>
          {sbdToDollar(item.pending_payout_value)}
        </Text>
        <View
          style={{marginLeft: 15, flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="heart-outline" size={18} color={colors.dark_gray} />
          <Text style={styles.votes}>{item.active_votes.length}</Text>
        </View>
        <View
          style={{marginLeft: 15, flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name="comment-multiple-outline"
            size={18}
            color={colors.dark_gray}
          />
          <Text style={styles.votes}>{item.children}</Text>
        </View>
        <View style={{flex: 1}} />
        <View
          style={{marginRight: 5, flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="share" size={18} color={colors.dark_gray} />
          <Text style={styles.votes}>0</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: colors.light_gray,
    borderWidth: 1,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  fromNow: {
    fontSize: 14,
    color: colors.dark_gray,
  },
  thumbnail: {
    marginTop: 15,
    height: screenHeight / 5,
    width: '100%',
    backgroundColor: colors.exexlight_gray,
  },
  postMetadata: {
    paddingLeft: 15,
    justifyContent: 'center',
  },
  title: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  footer: {
    marginTop: 15,
    flexDirection: 'row',
  },
  payout: {
    fontSize: 18,
    lineHeight: 18,
    color: colors.dark_gray,
  },
  votes: {
    fontSize: 18,
    color: colors.dark_gray,
    lineHeight: 18,
  },
});

export default Post;
