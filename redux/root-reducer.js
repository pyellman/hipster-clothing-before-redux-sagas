import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// storage is for local storage (could import for session storage)
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
  // key is just an identifier, whitelist defines what will part of the redux
  // store will be persisted - user persistence is handled by firebase auth
  key: 'root',
  storage,
  whitelist: ['cart']
};

// make a var for the root reducer
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

// now export our root reducer wrapped in persistReducer
export default persistReducer(persistConfig, rootReducer);

// old code before persistReducer
// export default combineReducers({
//   user: userReducer,
//   cart: cartReducer
// });