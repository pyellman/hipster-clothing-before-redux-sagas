import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

// this action just switches the fetching state, no payload
export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
})

// for thunk: thunk middleware checks for/intercepts non-object action returns, e.g., functions
// thunk will call the function, passing in dispatch, then dispatch can
// be used (multiple times), in the function to update state
export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const collectionRef = firestore.collection('collections');
    // fetchCollectionsStart action switches isFetching to true in shop.reducer.js
    dispatch(fetchCollectionsStart());
    // now do the async request
    collectionRef.get()
      .then(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        // now that snapshot resolved dispatch fetchCollectionsSuccess
        dispatch(fetchCollectionsSuccess(collectionsMap))
      })
      // if failure dispatch fetchCollectionsFailure
      .catch(error => {
        dispatch(fetchCollectionsFailure(error.message));
      })
  }
};

// pre-thunk code
// export const updateCollections = (collectionsMap) => ({
//   type: ShopActionTypes.UPDATE_COLLECTIONS,
//   payload: collectionsMap
// });
