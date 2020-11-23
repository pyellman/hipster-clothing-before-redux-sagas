import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.actions.js';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

// ShoppingIcon now a styled component in cart-icon.styles.jsx
// import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { CartIconContainer, ShoppingIcon, ItemCountContainer } from './cart-icon.styles.jsx'
import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <CartIconContainer onClick={toggleCartHidden}>
    <ShoppingIcon />
    <ItemCountContainer>{itemCount}</ItemCountContainer>
  </CartIconContainer>
);

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

// this mapStateToProps is known in Redux language as a 'selector' because it
// computes a new value (reduce()) based on elements in state; this form will cause the
// CartIcon component to re-render any time mapStateToProps is called ANYWHERE,
// such as in login/logout, as this would create a new state object and the computation
// of the value, even if it gives the same value, will trigger a re-render of CartIcon
// use reselect to achieve "memoization"

// const mapStateToProps = ({ cart: { cartItems } }) => ({
//   itemCount: cartItems.reduce(this)
//   itemCount: cartItems.reduce(
//     (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
//     0
//   )
// });

// reselect version of the above
// see https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/15163032#questions/12154690
// this is not actually needed to avoid re-render, as itemCount is a primitive, just to avoid the computation
// use reselect instead to 'memoize, reselect checks if the inputs to the computation
// have changed, if not, it just returns the old, unchanged itemCount
// const mapStateToProps = state => ({
//   itemCount: selectCartItemsCount(state)
// });
// go to using createStructuredSelector
const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

// or,  without even writing mapDispatchToProps in this case:
// export default connect(null, { toggleCartHidden })(CartIcon)