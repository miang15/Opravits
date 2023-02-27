import React, {useEffect} from 'react';
import Index from './src/navigation/Index';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {CustomToast} from './src/components/CustomToast/CustomToast';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  LogBox.ignoreLogs(['VirtualizedLists should never be nested inside']);

  return (
    <Provider store={store}>
      <Index />
      <FlashMessage position={'top'} />
    </Provider>
  );
};

export default App;
