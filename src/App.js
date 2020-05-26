import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Text, Platform, StatusBar} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import RootNavigator from './navigation';
import {store, persistor} from './redux';
import theme from './utils/theme';

const App = () => {
  useEffect(() => {
    let oldRender = Text.render;
    Text.render = function (...args) {
      let origin = oldRender.call(this, ...args);
      return React.cloneElement(origin, {
        style: [{fontFamily: 'Iowan Old Style'}, origin.props.style],
      });
    };
    EStyleSheet.build(theme);
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MenuProvider>
            <RootNavigator />
          </MenuProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
