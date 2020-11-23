import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// special CRA syntax to import an svg directly, not as a file;
// could just do import logo from '../../assets/crown.svg';
// then do <img src = {logo} /> in the Link
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
// throw in a styled NavLink
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionNavLink } from './header.styles';

HeaderContainer.displayName = 'HeaderContainer';
const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo />
    </LogoContainer>
    <OptionsContainer>
      {/* make one NavLink that can be styled with :active */}
      <OptionNavLink to='/shop/'>SHOP</OptionNavLink>
      <OptionLink to='/shop/'>CONTACT</OptionLink>
      {currentUser ? (
        <OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
      ) : (
          <OptionLink to='/signin'>SIGN IN</OptionLink>
        )
      }
      <CartIcon />
    </OptionsContainer>
    {
      hidden ? null : < CartDropdown />
    }
  </HeaderContainer>
);

// state here is the top level or root-reducer
// const mapStateToProps = state => ({
//   currentUser: state.user.currentUser,
//   hidden: state.cart.hidden
// });

// To log state
// const mapStateToProps = state => {
//   console.log(state);
//   const {user: { currentUser }, cart: { hidden } } = state;
//   return (
//     currentUser,
//     hidden
//   )
// }

// destructuring version of the above
// const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
//   currentUser,
//   hidden
// });

// reselect version of the above; if applying multiple selectors, using
// createStructuredSelector which automatically passes state to the selector
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);