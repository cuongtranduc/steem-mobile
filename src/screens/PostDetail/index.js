import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import PostHeader from './PostHeader';
import PostBody from './PostBody';

import client from '../../providers/dsteem';

const PostDetail = ({route, navigation}) => {
  const [post, setPost] = useState({});
  useEffect(() => {
    const {data} = route.params;
    client.database.call('get_content', data).then((result) => {
      console.log(result);
      setPost(result);
    });
  }, [route.params]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={styles.container}>
        <PostHeader post={post} />
        {post.body && <PostBody html={post.body} />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
});

export default PostDetail;
