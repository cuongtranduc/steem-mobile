import React, {useMemo} from 'react';
import {Dimensions, StyleSheet, SafeAreaView} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {colors} from '../../utils/theme';
import UserPost from '../Profile/UserPost';

const initialLayout = {width: Dimensions.get('window').width};

const ReadingList = ({author, user}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'one', title: 'BookMark'},
    {key: 'two', title: 'History'},
  ]);

  const renderScene = useMemo(
    () =>
      SceneMap({
        one: () => <UserPost author={author} />,
        two: () => <UserPost author={author} />,
      }),
    [author],
  );

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.black}}
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

export default React.memo(ReadingList);
