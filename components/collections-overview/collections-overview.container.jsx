// CollectionsOverviewContainer is another HOC, gets wrapped in WithSpinner and connect
// containers don't render anything, they just pass down props
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner-hoc/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching
});

// wrap mapStateToProps around WithSpinner around CollectionsOverview
// could do this but it's too verbose
// const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview))
// so use compose library to do currying, evaluates right to left
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;