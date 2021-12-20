import React from "react";
import Header from "./header/header.jsx";
import Body from "./body/body";

const Chat = ({ setOpenNavbar, openNavbar }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
      <Header setOpenNavbar={setOpenNavbar} openNavbar={openNavbar} />
      <Body />
    </div>
  );
};

export default React.memo(Chat);
