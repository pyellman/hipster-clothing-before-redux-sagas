import ShopActionTypes from './shop.types'

const INITIAL_STATE = {
  collections: null,
  isFetching: false,
  errorMessage: undefined
};

// with thunk, START/SUCCESS/FAILURE is a common pattern
const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true
      }
    case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collections: action.payload
      };

    case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

// code before adding redux thunk to handle async stuff in redux,
// const shopReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case ShopActionTypes.UPDATE_COLLECTIONS:
//       return {
//         ...state,
//         collections: action.payload
//       };
//     default:
//       return state;
//   }
// };

export default shopReducer;