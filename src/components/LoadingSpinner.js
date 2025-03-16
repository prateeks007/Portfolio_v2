import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${(props) => (props.fullScreen ? "100vh" : "200px")};
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid ${(props) => props.theme.border};
  border-top: 3px solid ${(props) => props.theme.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingSpinner = ({ fullScreen }) => {
  return (
    <SpinnerContainer fullScreen={fullScreen}>
      <Spinner />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
