import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';
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
      indicatorStyle={{backgroundColor: 'rgba(2, 184, 117, 1)'}}
      style={{
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 0,
        },
        elevation: 5,
      }}
      activeColor={colors.black}
      inactiveColor={colors.dark_gray}
    />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.exexlight_gray}}>
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

export default React.memo(ReadingList);
