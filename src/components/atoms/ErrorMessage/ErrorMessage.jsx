import React from 'react';
import styled from 'styled-components';

const StyledErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ theme }) => theme.colors.error};
  margin: 10px 0 0;
  font-weight: 700;
`;

export const ErrorMessage = ({ children }) => {
  return <StyledErrorMessage>{children}</StyledErrorMessage>;
};
