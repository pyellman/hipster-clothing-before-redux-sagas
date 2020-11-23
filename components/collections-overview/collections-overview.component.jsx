import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../collection-preview/collection-preview.component';
import { SelectCollectionsForPreview } from '../../redux//shop/shop.selectors';

import './collections-overview.styles.scss';

const CollectionsOverview = ({ collections }) => {
  // console.log("collections prop from CollectionsOverview: ", collections);
  return (
    <div className='collections-overview'>
      {collections.map(({ id, ...otherCollectionProps }) => (
        // console.log(otherCollectionProps);
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  collections: SelectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);
