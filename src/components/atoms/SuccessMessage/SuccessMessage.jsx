import React from 'react';
import styled from 'styled-components';

const StyledSuccessMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ theme }) => theme.colors.success};
  margin: 10px 0 0;
  font-weight: 700;
`;

export const SuccessMessage = ({ children }) => {
  return <StyledSuccessMessage>{children}</StyledSuccessMessage>;
};
