import React, {useMemo} from 'react';
import {View, Dimensions, StyleSheet, SafeAreaView} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {colors} from '../../utils/theme';
import UserPost from './UserPost';
import UserComment from './UserComment';

const SecondRoute = () => <View />;

const initialLayout = {width: Dimensions.get('window').width};

const ContentTabView = ({author}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'one', title: 'Post'},
    {key: 'two', title: 'Comment'},
    {key: 'three', title: 'Wallet'},
  ]);

  const renderScene = useMemo(
    () =>
      SceneMap({
        one: () => <UserPost author={author} />,
        two: () => <UserComment author={author} />,
        three: SecondRoute,
      }),
    [author],
  );

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.primary}}
      style={{backgroundColor: '#fff'}}
      labelStyle={{color: '#000'}}
    />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TabView
        navigationState={{index, routes}}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

export default React.memo(ContentTabView);
