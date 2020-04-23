import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import PostList from '../../components/PostList';

const Home = () => {
  return (
    <View style={styles.container}>
      <PostList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Home;
