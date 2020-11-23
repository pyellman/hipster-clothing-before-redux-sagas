const ShopActionTypes = {
  FETCH_COLLECTIONS_START: 'FETCH_COLLECTIONS_START',
  FETCH_COLLECTIONS_SUCCESS: 'FETCH_COLLECTIONS_SUCCESS',
  FETCH_COLLECTIONS_FAILURE: 'FETCH_COLLECTIONS_FAILURE'
};

// code before adding redux thunk to handle async stuff in redux,
// async stuff was in our code / firestore listeners
// const ShopActionTypes = {
//   UPDATE_COLLECTIONS: 'UPDATE_COLLECTIONS'
// };

export default ShopActionTypes;