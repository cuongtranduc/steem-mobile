import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {View, Text, FlatList, StyleSheet} from 'react-native';

import Post from './Post';
import {getPosts} from '../../redux/postReducer/operations';

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer.posts);
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const _renderItem = ({item}) => {
    return <Post item={item} />;
  };

  return (
    <FlatList
      data={posts}
      renderItem={_renderItem}
      keyExtractor={(item) => item.post_id.toString()}
      ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
    />
  );
};

const styles = StyleSheet.create({
  itemSeperator: {
    height: 5,
    backgroundColor: '#e3e3e3',
  },
});

export default PostList;
