// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import createStore from './redux/configureStore';
import NavigatorWithState from './Navigator';

const { store, persistor } = createStore();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigatorWithState />
    </PersistGate>
  </Provider>
);

export default App;
