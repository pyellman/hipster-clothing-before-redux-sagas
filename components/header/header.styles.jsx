import styled, { css } from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

// create a re-usable block of css
// go to inline use of as='element' in OptionDiv
// but leave this for NavLink
const OptionContainerStyles = css`
  padding: 10px 15px;
  cursor: pointer;
`;

// export const HeaderContainer = styled.div`
//   height: 70px;
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 25px;
// `;

// HeaderContainer.displayName = 'anotherheadername';

export const HeaderContainer = styled('div').withConfig({ displayName: 'HeaderContainer' })(
  css`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
  `
);

// extend a styled component into a component!
export const LogoContainer = styled(Link)`
height: 100%;
width: 70px;
padding: 25px;
`;

export const OptionsContainer = styled('div').withConfig({ displayName: 'OptionsContainer' })(
  css`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `
);

// export const OptionLink = styled(Link)`
//   ${OptionContainerStyles}
// `;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

// switch to using inline as='div' in header.component.jsx;
// let's us reuse OptionNavLink
// export const OptionDiv = styled.div`
//   ${OptionContainerStyles}
// `;

// show using NavLink alternative to Link for coloring
export const OptionNavLink = styled(NavLink)`
  ${OptionContainerStyles};
  &.active{
    color: pink;
  }
`;