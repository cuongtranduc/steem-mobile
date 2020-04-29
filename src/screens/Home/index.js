import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import PostList from '../../components/PostList';

const Home = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 80,
          flexDirection: 'row',
          paddingHorizontal: 15,
          paddingTop: 20,
          paddingBottom: 15,
          borderBottomColor: 'gray',
          borderBottomWidth: 0.5,
        }}>
        <View style={styles.box}>
          <Text style={{fontSize: 16, color: '#333'}}>All Content</Text>
          <Icon name="menu-down" size={24} />
        </View>
        <View style={{flex: 1}} />
        <View style={styles.box}>
          <Text style={{fontSize: 16, color: '#333'}}>Trending</Text>
          <Icon name="menu-down" size={24} />
        </View>
      </View>
      <PostList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  box: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    flex: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default Home;
