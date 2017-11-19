// @flow
import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import reducers from './ducks';
import rootEpic from './epics';

const epicMiddleware = createEpicMiddleware(rootEpic);

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

const config = {
  key: 'root',
  storage,
  blacklist: [],
};

export default function configureStore() {
  const enhancer = compose(applyMiddleware(logger, epicMiddleware));

  const store = createStore(persistCombineReducers(config, reducers), enhancer);

  const persistor = persistStore(store);
  // persistor.purge();

  if (isDebuggingInChrome) {
    window.store = store;
  }

  return { persistor, store };
}
