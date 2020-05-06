import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import RootNavigator from './navigation';
import {store, persistor} from './redux';
import theme from './utils/theme';

const App = () => {
  useEffect(() => {
    EStyleSheet.build(theme);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
