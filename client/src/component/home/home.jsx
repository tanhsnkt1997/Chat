import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment-timezone";
import withWidth from "@material-ui/core/withWidth";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "../../i18n/i18n";

import socketAction from "../../redux/action/socket";
import SideBar from "../sideBar/sideBar";
import Navbar from "../navBar/navBar";
import Content from "../chatShow/chatShow.jsx";
import RightBar from "../rightBar/rightBar";
import { theme } from "../../helper/theme";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const themeData = useTheme();
  const matchesDownSm = useMediaQuery(themeData.breakpoints.down("sm"));
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");
  const [clickToolBox, setClickToolBox] = useState("message");
  const [openRightBar, setOpenRightBar] = useState(false);
  const [openNavbar, setOpenNavbar] = useState(true);

  useEffect(() => {
    //tmp set default timeZone
    moment.tz.setDefault("Asia/Ho_Chi_Minh");
    //
    dispatch(socketAction.connectSocket());
  }, [dispatch]);

  const clickToolBoxSideBar = useCallback((data) => {
    setClickToolBox(data);
  }, []);

  //use effect run only matchesDownSm change
  useEffect(() => {
    if (matchesDownSm && openNavbar) {
      setOpenNavbar(false);
    } else if (!matchesDownSm && !openNavbar) {
      setOpenNavbar(true);
    }
  }, [matchesDownSm]);

  return (
    <ThemeProvider theme={isDark ? theme.dark : theme.light}>
      <GlobalStyles />
      <div className="home__container">
        <Navbar
          clickToolBoxSideBar={clickToolBoxSideBar}
          setIsDark={setIsDark}
          openNavbar={openNavbar}
          matchesDownSm={matchesDownSm}
        />

        <SideBar
          clickToolBox={clickToolBox}
          setOpenNavbar={setOpenNavbar}
          openNavbar={openNavbar}
          matchesDownSm={matchesDownSm}
        />

        <Content setOpenRightBar={setOpenRightBar} matchesDownSm={matchesDownSm} />
        {/* 
        <Hidden smDown>
          <Content setOpenRightBar={setOpenRightBar} />
        </Hidden> */}

        {openRightBar && <RightBar setOpenRightBar={setOpenRightBar} />}
      </div>
    </ThemeProvider>
  );
};

export default withWidth()(React.memo(Home));

const GlobalStyles = createGlobalStyle`
  html, body {
    background: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};
    min-height: 100vh !important;
    height: 100vh;
    min-height: -webkit-fill-available;
  }
`;
// background: ${(props) => props.theme.backgroundColor};
