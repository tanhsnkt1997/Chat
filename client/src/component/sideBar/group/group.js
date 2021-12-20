import React from "react";

import Header from "./header/header.jsx";
import Body from "./body/body.jsx";

const Group = ({ setOpenNavbar, openNavbar }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
      }}
    >
      <Header setOpenNavbar={setOpenNavbar} openNavbar={openNavbar} />
      <Body />
    </div>
  );
};

export default React.memo(Group);
