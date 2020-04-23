import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';
import { Client } from 'dsteem';

import Post from './Post';

const client = new Client('https://api.steemit.com');

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client.database.getDiscussions('trending', {limit: 5}).then(posts => {
      console.log(posts);
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