import React from "react";
import "./Setting.css";
import Header from "./header/header.jsx";
import Body from "./body/body.jsx";

const Setting = ({ setOpenNavbar, openNavbar }) => {
  return (
    <>
      <Header setOpenNavbar={setOpenNavbar} openNavbar={openNavbar} />
      <Body />
    </>
  );
};

export default React.memo(Setting);
