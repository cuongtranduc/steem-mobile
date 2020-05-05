import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {View, FlatList, StyleSheet} from 'react-native';

import Post from './Post';
import PostPlaceHolderList from '../PostPlaceHolderList';
import {getPosts} from '../../redux/postReducer/operations';

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer.posts);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const _renderItem = ({item}) => {
    return <Post item={item} />;
  };

  return (
    <FlatList
      ListEmptyComponent={PostPlaceHolderList}
      data={posts}
      renderItem={_renderItem}
      keyExtractor={(item) => item.post_id.toString()}
      ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
    />
  );
};

const styles = StyleSheet.create({
  itemSeperator: {
    height: 10,
    backgroundColor: '#EEEEEE',
  },
});

export default PostList;
