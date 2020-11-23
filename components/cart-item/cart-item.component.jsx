import React from 'react';

import './cart-item.styles.scss';

import { CartItemContainer, ItemDetailsContainer, CartItemImage, DetailsSpan } from './cart-item.styles.jsx';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <CartItemContainer>
    <CartItemImage src={imageUrl} alt='item' />
    <ItemDetailsContainer>
      <DetailsSpan>{name}</DetailsSpan>
      <DetailsSpan>{quantity} x ${price}</DetailsSpan>
    </ItemDetailsContainer>
  </CartItemContainer>
);


// const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
//   <div className='cart-item'>
//     <img src={imageUrl} alt='item' />
//     <div className='item-details'>
//       <span className='name'>{name}</span>
//       <span className='price'>{quantity} x ${price}</span>
//     </div>
//   </div>
// );

export default CartItem;