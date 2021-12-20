import React, { useState } from "react";
import GroupIcon from "@material-ui/icons/Group";

import GroupModal from "../modalAdd/modalAdd";
import Search from "./search/search.jsx";
import ButtonToggleNav from "../../base/buttonToggleNav.jsx";
import "./Header.css";

const Header = ({ setOpenNavbar, openNavbar }) => {
  const [openModal, isOpenModal] = useState(false);
  return (
    <div className="sideBar__body_header_container">
      <ButtonToggleNav setOpenNavbar={setOpenNavbar} openNavbar={openNavbar} />
      <div className="sideBar__body_header_wraper">
        <h2 className="sideBar__header_title">Groups</h2>
        <GroupIcon onClick={() => isOpenModal((state) => !state)} className="sideBar__header_iconAdd" />
      </div>

      <Search />
      {/* only show if state open is true */}
      {openModal && <GroupModal openModal={openModal} isOpenModal={isOpenModal} />}
    </div>
  );
};

export default React.memo(Header);
