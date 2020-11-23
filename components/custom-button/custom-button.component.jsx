import React from 'react';

import { CustomButtonContainer } from './custom-button.styles';

const CustomButton = ({ children, ...props }) => (
  // console.log('other props on CustomButton are: ', props);
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;