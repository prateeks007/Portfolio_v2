import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const Main = styled.main`
  min-height: 100vh;
  padding-top: ${(props) => (props.isHome ? "0" : "80px")};
`;

const Layout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      {!isHome && <Header />}
      <Main isHome={isHome}>{children}</Main>
    </>
  );
};

export default Layout;
