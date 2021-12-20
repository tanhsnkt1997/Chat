import React from "react";
import styled from "styled-components";
import "./NavBar.css";
import Logo from "./logo/logo";
import ToolBox from "./toolBox/toolBox";
import Footer from "./footer/footer";

const NavBar = ({ clickToolBoxSideBar, setIsDark, openNavbar, matchesDownSm }) => {
  return (
    <NavBarStyle openNavbar={openNavbar} matchesDownSm={matchesDownSm}>
      <Logo />
      <ToolBox clickToolBoxSideBar={clickToolBoxSideBar} />
      <Footer setIsDark={setIsDark} />
    </NavBarStyle>
  );
};

export default React.memo(NavBar);

const NavBarStyle = styled.div`
  position: ${(props) => (props.matchesDownSm ? "absolute" : "initial")};
  display: ${(props) => (props.openNavbar ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-between;
  width: 80px;
  height: 100vh;
  padding: 15px 0;
  border-right: ${(props) => props.theme.borderBase};
  z-index: 1;
`;
