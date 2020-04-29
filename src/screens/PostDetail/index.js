import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import HTMLView from 'react-native-htmlview';

import {fromNow} from '../../utils/time';

import client from '../../providers/dsteem';

const PostDetail = ({route, navigation}) => {
  const [post, setPost] = useState({});
  useEffect(() => {
    const {data} = route.params;
    client.database.call('get_content', data).then((result) => {
      console.log('result', result);
      console.log('result', result.body);
      setPost(result);
    });
  }, []);

  return (
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
      <HTMLView value={post.body} />
    </ScrollView>
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
    height: 60,
    width: 60,
    borderRadius: 30,
  },
});

export default PostDetail;
