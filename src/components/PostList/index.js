import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';
import client from '../../providers/dsteem';

import Post from './Post';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client.database.getDiscussions('trending', {tag: '', limit: 5, truncate_body: 1 }).then(posts => {
      setPosts(posts);
    })
  }, []);

  const _renderItem = ({item}) => {
    return (
      <Post
        item={item}
      />
    )
  }

  return (
    <FlatList 
      data={posts}
      renderItem={_renderItem}
      keyExtractor={item => item.post_id.toString()}
      ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
    />
  )
}

const styles = StyleSheet.create({
  itemSeperator: {
    height: 5,
    backgroundColor: '#e3e3e3'
  }
})

export default PostList;