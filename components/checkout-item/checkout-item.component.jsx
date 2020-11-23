import React from 'react';
import { connect } from 'react-redux';

import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

import {
  CheckoutItemContainer,
  ImageContainer,
  TextContainer,
  QuantityContainer,
  RemoveButton
} from './checkout-item.styles';

// need both entire cartItem for dispatched functions as well as specific 
// item properties, so destructure only the cartItem from props, do an
// explicit return and extract the other values we need inside the function
const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt='item' />
      </ImageContainer>
      <TextContainer>{name}</TextContainer>
      <QuantityContainer>
        <div className='arrow' onClick={() => removeItem(cartItem)}>&#10094;</div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={() => addItem(cartItem)}>&#10095;</div>
      </QuantityContainer>
      <TextContainer>{price}</TextContainer>
      <RemoveButton onClick={() => clearItem(cartItem)}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
};

// const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
//   const { name, imageUrl, price, quantity } = cartItem;
//   return (
//     <div className='checkout-item'>
//       <div className='image-container'>
//         <img src={imageUrl} alt='item' />
//       </div>
//       <span className='name'>{name}</span>
//       <span className='quantity'>
//         <div className='arrow' onClick={() => removeItem(cartItem)}>&#10094;</div>
//         <span className='value'>{quantity}</span>
//         <div className='arrow' onClick={() => addItem(cartItem)}>&#10095;</div>
//       </span>
//       <span className='price'>{price}</span>
//       <div className='remove-button' onClick={() => clearItem(cartItem)}>&#10005;</div>
//     </div>
//   )
// };

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem);
