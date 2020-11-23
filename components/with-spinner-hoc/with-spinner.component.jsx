import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

// WithSpinner HOC returns a new functional component
// if isLoading is true, show the spinner, else the WrappedComponent
// const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
//   return isLoading ? (
//     <SpinnerOverlay>
//       <SpinnerContainer />
//     </SpinnerOverlay>
//   ) : (
//       <WrappedComponent {...otherProps} />
//     )
// };

const WithSpinner = WrappedComponent => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
        <WrappedComponent {...otherProps} />
      )
  };
  return Spinner;
};
export default WithSpinner;