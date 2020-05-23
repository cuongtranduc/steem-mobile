import React from 'react';
import {Dimensions, StyleSheet, SafeAreaView, View} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import BookmarkList from './BookmarkList';
import HistoryList from './HistoryList';

import {colors} from '../../utils/theme';

const initialLayout = {width: Dimensions.get('window').width};

const ReadingList = ({author, user}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'one', title: 'BookMark'},
    {key: 'two', title: 'History'},
  ]);

  const renderScene = SceneMap({
    one: BookmarkList,
    two: HistoryList,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.black}}
      style={{backgroundColor: '#fff'}}
      labelStyle={{color: '#000'}}
    />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.exexlight_gray}}>
      <TabView
        style={styles.scene}
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
