import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';

import RootNavigator from './navigation';
import store from './redux';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
