import { createSelector } from 'reselect';

// map our collection ids to collection labels, e.g, 1 >> hats
// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5
// }

const selectShop = (state) => state.shop;

// 'collections' is the name we gave our shop data in shop.reducer.js
export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

// use COLLECTION_ID_MAP to select the collection by id (collectionUrlParam is /:collectionId
// part of url); this selector returns a function
// as is, a new selector function is created every time selectCollection is called,
// could memoize this function with lodash momoize, see
// https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/20796198#questions
// export const selectCollection = collectionUrlParam =>
//   createSelector(
//     [selectCollections],
//     collections => collections.find(
//       collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
//     )
//   );

// switched to an object for shop data to improve lookup performance vs array.find()
// get just the collection with the url param as its key
export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
  );

export const SelectCollectionsForPreview = createSelector(
  [selectCollections],
  // turn our collections object/map back into an array for the CollectionsOverview
  // component, where we use array.map() -- a lot like our original selectCollection
  /// when it was an array
  // Object.keys returns the keys in the collections/shop.data.js as an array e.g.,
  // [hats, jackets, sneakers mens, womens]
  // then map the keys to get the value(s) associated with that key, return as array
  // collections could be null, return an empty array if so to avoid errors
  collections => (collections ? Object.keys(collections).map(key => collections[key]) : [])
  // collections => Object.keys(collections).map(key => collections[key])
  // or, collections => Object.values(collections)
);

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

// !! is shorthand to convert any value to a bolean
export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections
);
