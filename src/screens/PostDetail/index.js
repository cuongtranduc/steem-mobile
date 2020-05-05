import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';

import PostDetailPlaceHolder from './PostDetailPlaceHolder';
import PostHeader from './PostHeader';
import PostBody from './PostBody';

import client from '../../providers/dsteem';

const PostDetail = ({route, navigation}) => {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const {data} = route.params;
    client.database.call('get_content', data).then((result) => {
      setPost(result);
      setIsLoading(false);
    });
  }, [route.params]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={styles.container}>
        <PostHeader post={route.params.post} />
        {isLoading ? (
          <PostDetailPlaceHolder />
        ) : (
          post.body && <PostBody html={post.body} />
        )}
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
