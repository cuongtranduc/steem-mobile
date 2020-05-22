import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Voter from './Voter';

import {colors} from '../../utils/theme';

const VoterList = ({voters}) => {
  const onEndReachedCalledDuringMomentum = React.useRef(true);
  const votersRef = React.useRef([...voters]);
  const [activeVotes, setActiveVotes] = useState(
    votersRef.current.splice(0, 20),
  );

  const _renderItem = ({item, index}) => {
    return <Voter voter={item} />;
  };

  const _onEndReached = useCallback(async () => {
    try {
      if (
        !onEndReachedCalledDuringMomentum.current &&
        votersRef.current.length > 0
      ) {
        const _newActiveVoters = votersRef.current.splice(0, 20);
        setActiveVotes(activeVotes.concat(_newActiveVoters));
        onEndReachedCalledDuringMomentum.current = true;
      }
    } catch (err) {}
  }, [activeVotes, setActiveVotes]);

  return (
    <View style={{flex: 1, backgroundColor: colors.exexlight_gray}}>
      <FlatList
        contentContainerStyle={{
          paddingVertical: 5,
          paddingHorizontal: 15,
          backgroundColor: colors.white,
        }}
        data={voters}
        renderItem={_renderItem}
        keyExtractor={(item) => item.voter}
        ItemSeparatorComponent={() => <View />}
        onEndReached={_onEndReached}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemSeperator: {
    height: 5,
    backgroundColor: colors.exexlight_gray,
  },
});

export default React.memo(VoterList);
