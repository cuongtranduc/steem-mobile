import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import PostHeder from '../PostHeader';
import PostFooter from '../PostFooter';

import {colors} from '../../utils/theme';
import * as Navigation from '../../navigation';
import {getActiveVotes} from '../../providers/dsteem';

const screenHeight = Dimensions.get('window').height;

const Post = ({item}) => {
  const [activeVotes, setActiveVotes] = useState([]);
  useEffect(() => {
    _getActiveVotes();
  }, [_getActiveVotes]);

  const _getActiveVotes = useCallback(async () => {
    const _activeVotes = await getActiveVotes(item.author, item.permlink);
    setActiveVotes(_activeVotes);
  }, [item.author, item.permlink]);

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
      <PostFooter activeVotes={activeVotes} item={item} />
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
});

export default Post;
