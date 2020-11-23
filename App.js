import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// styles in App.css are not selectors, they are site-wide
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';

import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
// this import is for the batch add of SHOP_DATA
// import { SelectCollectionsForPreview } from './redux/shop/shop.selectors';

class App extends React.Component {
  // a class field to hold the firebase.unsubscribe() method
  unsubscribeFromAuth = null;

  componentDidMount() {
    // get setCurrentUser redux action function from props set by mapDispatchToProps below
    // collectionsArray is just for the batch load of shop data
    const { setCurrentUser, collectionsArray } = this.props;
    // console.log('collectionsArray: is a ', typeof collectionsArray)
    // onAuthStateChanged() is a listener (observer) that returns a firebase.unsubscribe()
    // method -- assign this to unsubscribeFromAuth, may be needed
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // if userAuth isn't null ...
      if (userAuth) {
        // for either Google login or email login createUserProfileDocument (async) may create
        // a new user doc and return the userRef or return the existing user as a firestore document ref
        const userRef = await createUserProfileDocument(userAuth);
        // addCollectionAndDocuments('collections', collectionsArray)
        // onSnapshot is also a listener, the callback will run if/when
        // the data changes and do setCurrentUser redux action creator method
        userRef.onSnapshot(snapShot => {
          // console.log('setting currentUser in App.js componentDidMount if block');
          // redux action setCurrentUser function updates state
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        });
      } else {
        // if userAuth is null, e.g. on logout, setCurrentUser back to that (null)
        // console.log('setting currentUser in App.js componentDidMount else block');
        setCurrentUser(userAuth);
        // code for batch add of SHOP_DATA
        // get just the title and items from our collectionsArray
        // addCollectionAndDocuments('collections', collectionsArray
        //   .map(({ title, items }) => ({ title, items })))
      }
    })
  }

  componentWillUnmount() {
    // unsubscribeFromAuth holds firebase.unsubscribe(), execute it on unmount (does it ever)
    console.log(this.unsubscribeFromAuth);
    this.unsubscribeFromAuth();
    console.log("State from componentWillUnmount", this.state)
  }

  render() {
    return (
      <div>
        {/* Header goes outside Switch so will always render */}
        {/* removed passing currentUser to Header as prop from App state,
        // instead use redux/reselect in Header component to pass props */}
        {/* <Header currentUser={this.state.currentUser} /> */}
        <Header />
        <Switch>
          {/* <Route path='/shop/hats' component={HatsPage} /> */}
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          {/* <Route path='/signin' component={SignInAndSignUpPage} /> */}
          {/* don't let users access /signin if they are already signed in,
          redirect that component to '/' */}
          <Route exact render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
}

// a garden variety mapStateToProps
// const mapStateToProps = state => ({
//   currentUser: selectCurrentUser(state)
// });

// const mapStateToProps = (state) => {
//   console.log('WHAT IS SELECTCURRENTUSER?', selectCurrentUser);
//   return { currentUser: selectCurrentUser(state) };
// };

// mapStateToProps, destructing user first
// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// });

// const mapStateToProps = ({ user }) => {
//   console.log("CURRENT USER!!!", user.currentUser);
//   return { currentUser: user.currentUser };
// };

// mapStateToProps using a reselect selector -- use
// createStructuredSelector, in case we need more selectors in the future
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray was just for our batch add of SHOP_DATA, add it to props to make it work
  // collectionsArray: SelectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (App);
// this could also work, no need to call setCurrentUser?
// export default connect(null, { setCurrentUser })(App);

