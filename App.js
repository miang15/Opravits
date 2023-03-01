import React, {useEffect} from 'react';
import Index from './src/navigation/Index';
import {LogBox, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {CustomToast} from './src/components/CustomToast/CustomToast';
import FlashMessage from 'react-native-flash-message';
import {theme} from './src/utils/theme';

const App = () => {
  LogBox.ignoreLogs(['VirtualizedLists should never be nested inside']);

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={theme.white} barStyle={'dark-content'} />
      <Index />
      <FlashMessage position={'top'} />
    </Provider>
  );
};

export default App;
