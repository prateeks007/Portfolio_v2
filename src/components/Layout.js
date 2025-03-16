import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import PageTransition from "./PageTransition";

const Main = styled.main`
  min-height: 100vh;
  padding-top: ${(props) => (props.isHome ? "0" : "80px")};
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Layout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      {!isHome && <Header />}
      <Main isHome={isHome}>
        <PageTransition>{children}</PageTransition>
      </Main>
    </>
  );
};

export default Layout;
