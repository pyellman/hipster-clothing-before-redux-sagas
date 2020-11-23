import styled, { css } from 'styled-components';

export const CheckoutItemContainer = styled('div').withConfig({ displayName: 'CheckoutItemContainer' })(
  css`
    width: 100%;
    display: flex;
    min-height: 100px;
    border-bottom: 1px solid darkgrey;
    padding: 15px 0;
    font-size: 20px;
    align-items: center;
  `
);

export const ImageContainer = styled('div').withConfig({ displayName: 'ImageContainer' })(
  css`
    width: 23%;
    padding-right: 15px;

    img {
      width: 100%;
      height: 100%;
    }
  `
);

export const TextContainer = styled.span`
  width: 23%;
`;

// alt: do export const QuantityContainer = styled(TextContainer)`, reuse width: 23%
export const QuantityContainer = styled.span`
  width: 23%;
  display: flex;

  span {
    margin 0 10px;
  }

  div {
    cursor:pointer;
  }
`;

export const RemoveButton = styled.div`
padding-left: 12px;
cursor: pointer;
`;

