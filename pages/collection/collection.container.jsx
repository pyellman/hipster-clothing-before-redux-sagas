// CollectionContainer is another HOC, gets wrapped in WithSpinner and connect
// containers don't render anything, they just pass down props
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner-hoc/with-spinner.component';
import CollectionPage from './collection.component';

const mapStateToProps = createStructuredSelector({
  // isLoading for CollectionPage needs to be converted to truthy, use a function
  // to isLoading, passing in state
  isLoading: (state) => !selectIsCollectionsLoaded(state)
});

// wrap mapStateToProps around WithSpinner around CollectionPage
// could do this but it's too verbose
// const CollectionContainer = connect(mapStateToProps)(WithSpinner(CollectionPage))
// so use compose library to do currying
const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);

export default CollectionPageContainer;