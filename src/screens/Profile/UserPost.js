import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, ActivityIndicator} from 'react-native';
import Post from '../../components/PostList/Post';
import PostPlaceHolderList from '../../components/PostPlaceHolderList';
import {getUserPosts} from '../../providers/dsteem';
import {colors} from '../../utils/theme';

const UserPost = ({author}) => {
  const isCancelled = React.useRef(false);
  const onEndReachedCalledDuringMomentum = React.useRef(true);
  const [isRefresh, setIsRefresh] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    _getPost();

    return () => {
      isCancelled.current = true;
    };
  }, [_getPost]);

  const _renderItem = ({item, index}) => {
    return (
      <>
        <Post item={item} />
        {index === posts.length - 1 && isLoading && (
          <View style={{marginVertical: 10}}>
            <ActivityIndicator
              size="large"
              animating={true}
              color={colors.primary}
            />
          </View>
        )}
      </>
    );
  };

  const _getPost = useCallback(async () => {
    if (!author) {
      return;
    }
    try {
      const _posts = await getUserPosts({tag: author});
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

  const _onEndReached = useCallback(async () => {
    try {
      if (!onEndReachedCalledDuringMomentum.current) {
        setIsLoading(true);
        const lastPost = posts[posts.length - 1];
        const newPosts = await getUserPosts({
          limit: 6,
          tag: author,
          start_author: lastPost.author,
          start_permlink: lastPost.permlink,
        });
        newPosts.shift();
        if (!isCancelled.current) {
          setPosts(posts.concat(newPosts));
        }
        onEndReachedCalledDuringMomentum.current = true;
      }
    } catch (err) {
      console.log('err', err);
    } finally {
      setIsLoading(false);
    }
  }, [author, posts]);

  return (
    <View style={{flex: 1, backgroundColor: '#EEE'}}>
      <FlatList
        contentContainerStyle={{
          paddingVertical: 5,
          paddingHorizontal: 15,
          backgroundColor: '#EEE',
        }}
        ListEmptyComponent={PostPlaceHolderList}
        data={posts}
        renderItem={_renderItem}
        keyExtractor={(item) => item.post_id.toString()}
        ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
        onRefresh={_onRefresh}
        refreshing={isRefresh}
        onEndReached={_onEndReached}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemSeperator: {
    height: 5,
    backgroundColor: '#EEEEEE',
  },
});

export default React.memo(UserPost);
