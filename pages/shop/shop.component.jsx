import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

// CollectionPageContainer and CollectionsOverviewContainer are 'container pattern' doubly
//  wrapped HOCs, wrapped in connect(mapStateToProps) and WithSpinner, to pass down props as needed
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../../pages/collection/collection.container';
// import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';

// ShopPage is a Route in App.js, so we have access to history/match/location props
// Nested Routing: We put these Routes here instead of App.js and use match.path to 
// avoid hardcoding urls -- url just begins wherever we currently are (/shop here)

class ShopPage extends React.Component {

  // componentDidMount runs a thunk async redux function that does everything we used
  // to do in componentDidMount, but in now in it's own separate function
  // thunk dispatches the fetchCollectionsStartAsync function to ShopPage component
  // would be useful if we want to get also the collections somewhere other than ShopPage
  // if only in ShopPage, collections is null if we go anywhere but /shop
  // alternatively could put in top level app.js, but this might slow down initial load
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  // componentDidMount using onSnapShot listener/observer
  // by using onSnapShot our collections will update dynamically, whenever firestore changes!
  // componentDidMount() {
  //   const { updateCollections } = this.props;
  //   const collectionRef = firestore.collection('collections');
  //   collectionRef.onSnapshot(snapshot => {
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //     // console.log('collectionsMap: ', collectionsMap);
  //     updateCollections(collectionsMap);
  //     this.setState({ loading: false });
  //   })
  // }

  // componentDidMount using Promises instead of onSnapShot listener/observer
  // collections would only load when the component mounts, the first time
  // componentDidMount() {
  //   const { updateCollections } = this.props;
  //   const collectionRef = firestore.collection('collections');

  //   collectionRef.get()
  //     .then(snapshot => {
  //       const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //       updateCollections(collectionsMap);
  //       this.setState({ loading: false });
  //     })
  // }

  // as a fetch to the firestore api; data is returned deeply nested, PITA, so not going to code out
  // format: /projects/YOUR_PROJECT_ID/databases/(default)/documents/your/path
  // fetch('https://firestore.googleapis.com/v1/projects/hipster-clothing-91f44/databases/(default)/documents/collections')
  //   .then(response => response.json())
  //   .then(collections => console.log('fetched collection', collections));
  // }

  render() {
    // console.log('props from shop page', this.props);
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    )
  }
};

// Pre-containerized mapStateToProps (needs selectIsCollectionFetching and createStructuredSelector imports above)
// const mapStateToProps = createStructuredSelector({
//   isFetchingCollections: selectIsCollectionFetching,
//   isCollectionsLoaded: selectIsCollectionsLoaded
// });

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

// don't need to connect mapStateToProps to ShopPage, now handled by container components
// export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
export default connect(null, mapDispatchToProps)(ShopPage);

// ShopPage as a functional component
// const ShopPage = ({ match }) => (
//   <div className='shop-page'>
//     <Route exact path={`${match.path}`} component={CollectionsOverview} />
//     <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//   </div>
// );

