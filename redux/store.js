import { createStore, applyMiddleware } from 'redux';
// redux-persist stores state in browser local storage; could be selected parts of state
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
// composeWithDevTools is for the Chrome redux devtools extension
// there are other ways to include it
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import rootReducer from './root-reducer';

// const middlewares = [logger];
const middlewares = [thunk];
// this middleware will only be included in development mode
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);