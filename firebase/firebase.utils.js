import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA4sC490X5zmnFbqjH809L7klhcehlbkkQ",
  authDomain: "hipster-clothing-91f44.firebaseapp.com",
  databaseURL: "https://hipster-clothing-91f44.firebaseio.com",
  projectId: "hipster-clothing-91f44",
  storageBucket: "hipster-clothing-91f44.appspot.com",
  messagingSenderId: "571917405059",
  appId: "1:571917405059:web:5d12a6959db25e7df004b6",
  measurementId: "G-DL3W4G9ELP"
};

firebase.initializeApp(config);

// Create a user profile in our firestore DB:
// userAuth is either google user object we got back from google login in App.js
// component did mount or a user object from auth.createUserWithEmailAndPassword in sign-up
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // if null just return
  if (!userAuth) return;

  // collection queries just as examples, not live code
  // const collectionRef = firestore.collection('users');
  // const collectionSnapshot = await collectionRef.get();
  // console.log({ collectionSnapshot: collectionSnapshot.docs.map((doc) => doc.data()) });

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // const fakeUserRef = firestore.doc('users/12345678910');
  // console.log('the userRef Doc', userRef);
  const snapShot = await userRef.get();
  // console.log('snapShot data?: ', snapShot.data());
  // use the 'exists' prop on the snapShot object (true or false) to check if
  // if there is data at that path; if there is, the user already exists so just
  // return the userRef; if there isn't, create a new user then return the userRef
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

// convert the collections data (a snapshot) from firestore
// back to a map from array and add some properties back in
// use title to make routeName
export const convertCollectionsSnapshotToMap = (collections) => {
  // get the data from the firestore doc, select fields, massage return
  const transformedCollection = collections.docs.map(doc => {

    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });
  // convert transformed collection array to a map object, start with an empty object
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator
  }, {});
};


// code for batch adding SHOP_DATA
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  // collectionKey is the label we give our new collection when calling this function,
  // objectsToAdd is the array of data to be loaded as docs
  const collectionRef = firestore.collection(collectionKey);
  console.log('the collectionRef', collectionRef);

  // use firestore.batch() to make sure all succeed or none
  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    // make a new doc ref, firestore will assign an id, could pass obj.title to .doc()
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  // batch.commit is async, returns null if success, check for null in caller
  return await batch.commit();
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;