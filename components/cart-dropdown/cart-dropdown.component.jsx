// exercise: containerize this component?
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

// import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

// import './cart-dropdown.styles.scss';

import { CartDropdownContainer, CartItemsContainer, EmptyMessageSpan, CartDropdownButton } from './cart-dropdown.styles';

// though there's only actually one prop on props, cartItems, destructure it anyway
// we get history prop by wrapping the component returned from connect with withRouter,
// and course dispatch from Redux
const CartDropdown = ({ cartItems, history, dispatch }) => (
  <CartDropdownContainer>
    <CartItemsContainer>
      {
        cartItems.length ?
          cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
          :
          <EmptyMessageSpan>Your cart is empty</EmptyMessageSpan>
      }
    </CartItemsContainer>
    <CartDropdownButton onClick={() => {
      history.push('/checkout');
      // dispatch shorthand: use dispatch() function passed in as a prop by connect()
      // to toggle cart to hidden when we click on GO TO CHECKOUT button
      // console.log(this.props);
      dispatch(toggleCartHidden());
    }}>
      GO TO CHECKOUT
    </CartDropdownButton>
  </CartDropdownContainer >
);

// switch this version of mapStateToProps to one that uses a selector selectCartItems
// selector (NOT selectCartItemsCount), avoid re-render
// https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/15163032#questions/12154690
// does not think it is necessary for this component
// const mapStateToProps = ({ cart: { cartItems } }) => ({
//   cartItems
// });

// const mapStateToProps = state => ({
//   cartItems: selectCartItems(state)
// });
// use createStructuredSelector instead of above, passes state
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

// now using use dispatch shorthand directly in Components above for
// dispatching toggleCartHidden when user clicks GO TO CHECKOUT; see below
// const mapDispatchToProps = dispatch => ({
//   toggleCartHidden: ()=> dispatch(toggleCartHidden())
// })

// dispatch shorthand: an alternative to writing out a mapDispatchToProps
// if we don't provide a mapDispatchToProps function as a second arg to connect,
// connect will pass dispatch() to our component as a prop,
// where we can use it for one-off action dispatches -- see above
export default withRouter(connect(mapStateToProps)(CartDropdown));