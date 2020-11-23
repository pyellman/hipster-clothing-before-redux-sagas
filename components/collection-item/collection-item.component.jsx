import React from 'react';
import { connect } from 'react-redux';


import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss'

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;

  return (
    <div className="collection-item">
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }} />
      <div className='collection-item-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      {/* need to explicity add custom-button class modifier from collection-item.styles.scss
       now that CustomButton component doesn't deliver a 'custom-button' class */}
      <CustomButton className='custom-button' onClick={() => addItem(item)} inverted> Add to cart </CustomButton>
    </div>
  )
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);