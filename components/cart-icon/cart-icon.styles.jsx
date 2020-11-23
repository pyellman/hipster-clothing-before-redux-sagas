import styled, { css } from 'styled-components';

import { ReactComponent as ShoppingIconSVG } from '../../assets/shopping-bag.svg';

export const CartIconContainer = styled('div').withConfig({ displayName: 'CartIconContainer' })(
  css`
    width: 45px;
    height: 45px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `
);

export const ShoppingIcon = styled(ShoppingIconSVG).withConfig({ displayName: 'ShoppingIcon' })(
  css`
  width: 24px;
  height: 24px;
`);

export const ItemCountContainer = styled('span').withConfig({ displayName: 'ItemCountContainer' })(
  css`
    position: absolute;
    font-size: 10px;
    font-weight: bold;
    bottom: 10px;;
  `
);