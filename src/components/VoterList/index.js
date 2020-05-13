import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, ActivityIndicator} from 'react-native';
import Voter from './Voter';

import {colors} from '../../utils/theme';

const VoterList = ({voters}) => {
  const onEndReachedCalledDuringMomentum = React.useRef(true);
  const votersRef = React.useRef(voters);
  const [activeVotes, setActiveVotes] = useState(
    votersRef.current.splice(0, 20),
  );
  const [isLoading, setIsLoading] = useState(false);

  const _renderItem = ({item, index}) => {
    return (
      <>
        <Voter voter={item} />
        {index === activeVotes.length - 1 && isLoading && (
          <View style={{marginVertical: 10}}>
            <ActivityIndicator
              size="large"
              animating={true}
              color={colors.primary}
            />
          </View>
        )}
      </>
    );
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
    } finally {
      setIsLoading(false);
    }
  }, [activeVotes, setActiveVotes]);

  return (
    <View style={{flex: 1, backgroundColor: colors.exexlight_gray}}>
      <FlatList
        contentContainerStyle={{
          paddingVertical: 5,
          paddingHorizontal: 15,
          backgroundColor: colors.exexlight_gray,
        }}
        data={activeVotes}
        renderItem={_renderItem}
        keyExtractor={(item) => item.voter + item.time}
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
