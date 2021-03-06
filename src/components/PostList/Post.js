import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import PostHeder from '../PostHeader';
import PostFooter from '../PostFooter';

import {colors} from '../../utils/theme';
import {getActiveVotes} from '../../providers/dsteem';

const screenHeight = Dimensions.get('window').height;

const Post = ({item}) => {
  const navigation = useNavigation();
  const {username} = useSelector((state) => state.storageReducer.account);
  const [activeVotes, setActiveVotes] = useState([]);
  const [isVoted, setIsVoted] = useState(false);
  useEffect(() => {
    _getActiveVotes();
  }, [_getActiveVotes]);

  const _getActiveVotes = useCallback(async () => {
    const _activeVotes = await getActiveVotes(item.author, item.permlink);
    setActiveVotes(_activeVotes);
    setIsVoted(_activeVotes.some((vote) => vote.voter === username));
    return _activeVotes;
  }, [item.author, item.permlink, username]);

  const metaData = JSON.parse(item.json_metadata);

  const navigateToDetail = () => {
    navigation.navigate('PostDetail', {
      data: [item.author, item.permlink],
      post: item,
      activeVotes,
      getActiveVotes: _getActiveVotes,
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
      <PostFooter activeVotes={activeVotes} isVoted={isVoted} item={item} />
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
  },
});

export default Post;
