import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
// import { ReactComponent as CrownIcon } from '../../assets/crown.svg';

// react-stripe-checkout example shows a class component, we'll make a functional component
const StripeCheckoutButton = ({ price }) => {
  // stripe wants amounts in cents, we list in dollars
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_FdJ1oumibCWoHKL9Uh7O9cKw00niZ1zrhR';

  const onToken = (token) => {
    console.log({ token });
    alert('Payment Successful');
    // fetch('/save-stripe-token', {
    //   method: 'POST',
    //   body: JSON.stringify(token),
    // }).then(response => {
    //   response.json().then(data => {
    //     alert(`We are in business, ${data.email}`);
    //   });
    // });
  };

  // use test card numbers from https://stripe.com/docs/testing#cards for testing
  return (
    <StripeCheckout
      label='label Pay Now'
      panelLabel='panel Pay Now'
      name='Clown Clothing'
      billingAddress
      image='http://localhost:3000/410.svg'
      // image='https://svgshare.com/i/CUz.svg'
      // image='http://localhost:3000/crown.svg'
      shippingAddress
      amount={priceForStripe}
      description={`Your total is $${price}`}
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;