import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import Posts from '../../../components/PostList';

const FirstRoute = () => <Posts />;

const SecondRoute = () => <Posts />;

const initialLayout = {width: Dimensions.get('window').width};

const PostList = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'one', title: 'Blog'},
    {key: 'two', title: 'Posts'},
    {key: 'three', title: 'Replies'},
    {key: 'four', title: 'Wallet'},
  ]);

  const renderScene = SceneMap({
    one: FirstRoute,
    two: SecondRoute,
    three: SecondRoute,
    four: SecondRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#000'}}
      style={{backgroundColor: '#fff'}}
      labelStyle={{color: '#000'}}
    />
  );

  return (
    <TabView
      navigationState={{index, routes}}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

export default PostList;
