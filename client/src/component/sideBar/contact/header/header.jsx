import React, { useState } from "react";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import ButtonToggleNav from "../../base/buttonToggleNav.jsx";
import ModalAdd from "../modalAdd/modalAdd";
import Search from "./search/search";
import "./Header.css";

const Header = ({ type, setOpenNavbar, openNavbar }) => {
  const [openModal, isOpenModal] = useState(false);
  return (
    <div className="sideBar__body_header_container">
      <ButtonToggleNav setOpenNavbar={setOpenNavbar} openNavbar={openNavbar} />
      <div className="sideBar__body_header_wraper">
        <h2 className="sideBar__header_title">Contact</h2>
        <PersonAddOutlinedIcon onClick={() => isOpenModal((state) => !state)} className="sideBar__header_iconAdd" />
      </div>

      <Search type={type} />
      {/* only show if state open is true */}
      {openModal && <ModalAdd openModal={openModal} isOpenModal={isOpenModal} />}
    </div>
  );
};

export default React.memo(Header);
