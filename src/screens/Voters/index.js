import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import VoterList from '../../components/VoterList';

import {colors} from '../../utils/theme';

const Voters = ({navigation, route}) => {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    setVoters(route.params.voters);
    console.log(route.params.voters);
  }, [route.params.voters]);

  return (
    <View style={{flex: 1}}>
      {voters.length > 0 && <VoterList voters={voters} />}
    </View>
  );
};

export default Voters;
