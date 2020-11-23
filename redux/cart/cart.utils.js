export const addItemToCart = (cartItems, cartItemToAdd) => {
  // find stops at the first matching item
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  // if there is at least one existing such item, up the quantity for that item
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  // if this item isn't in the cart, return all the original cartItems along
  // with the new one (with a new quantity property set to 1), to cartReducer
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
};

// removeItem will both decrement the item by one, or remove
// it from the cart completely if the quantity is only one
// export const removeItemFromCart = (cartItems, cartItemToRemove) => {
//   // if there's just one, remove it from cartItems completely
//   if (cartItemToRemove.quantity === 1) {
//     return cartItems.filter(
//       cartItem => cartItem.id !== cartItemToRemove.id
//     )
//   }
//   // else do decrement; if the cartItem being looked at is the one
//   // to decrement, decrement it, otherwise leave it unchanged
//   return cartItems.map(
//     cartItem =>
//       cartItem.id === cartItemToRemove.id ?
//         { ...cartItem, quantity: cartItem.quantity - 1 }
//         : cartItem
//   );
// };

// alt removeItem implementation using Array.prototype.flatMap() and nested ternary
export const removeItemFromCart = (cartItems, itemToRemoveId) =>
  cartItems.flatMap((item) => {
    return item.id !== itemToRemoveId
      ? item
      : item.quantity === 1
        ? []
        : { ...item, quantity: item.quantity - 1 };
  });