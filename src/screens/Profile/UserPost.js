import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Post from '../../components/PostList/Post';
import PostPlaceHolderList from '../../components/PostPlaceHolderList';
import {getUserPosts} from '../../providers/dsteem';

const PostList = ({author}) => {
  const isCancelled = React.useRef(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    _getPost();

    return () => {
      isCancelled.current = true;
    };
  }, [_getPost]);

  const _renderItem = ({item}) => {
    return <Post item={item} />;
  };

  const _getPost = useCallback(async () => {
    if (!author) {
      return;
    }
    try {
      const _posts = await getUserPosts({author});
      if (!isCancelled.current) {
        setPosts(_posts);
      }
    } catch (err) {
      console.log('err', err);
    }
  }, [author]);

  const _onRefresh = () => {
    setIsRefresh(true);
    setTimeout(() => setIsRefresh(false), 1500);
    _getPost();
  };

  return (
    <FlatList
      ListEmptyComponent={PostPlaceHolderList}
      data={posts}
      renderItem={_renderItem}
      keyExtractor={(item) => item.post_id.toString()}
      ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
      onRefresh={_onRefresh}
      refreshing={isRefresh}
    />
  );
};

const styles = StyleSheet.create({
  itemSeperator: {
    height: 10,
    backgroundColor: '#EEEEEE',
  },
});

export default React.memo(PostList);
