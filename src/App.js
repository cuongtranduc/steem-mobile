import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Provider} from 'react-redux';

import RootNavigator from './navigation';
import store from './redux';
import theme from './utils/theme';

const App = () => {
  useEffect(() => {
    EStyleSheet.build(theme);
  }, []);

  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
