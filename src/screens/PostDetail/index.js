import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import PostBody from './PostBody';
import {fromNow} from '../../utils/time';

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
        <Text style={styles.title}>{post.title}</Text>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.avatar}
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRb3cKuVSY5yQSumCbZVZJf05ere11Tt1sOSRrNYc425RBOUjS0&usqp=CAU',
            }}
          />
          <View style={{justifyContent: 'center', marginLeft: 15}}>
            <Text>{post.author}</Text>
            <Text>{fromNow(post.created)}</Text>
          </View>
        </View>
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
  title: {
    fontSize: 28,
  },
  avatar: {
    marginTop: 15,
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});

export default PostDetail;
