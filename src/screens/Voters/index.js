import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, SafeAreaView} from 'react-native';
import VoterList from '../../components/VoterList';

import {colors} from '../../utils/theme';

const Voters = ({navigation, route}) => {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    setVoters(route.params.voters);
  }, [route.params.voters]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {voters.length > 0 && <VoterList voters={voters} />}
    </SafeAreaView>
  );
};

export default Voters;
