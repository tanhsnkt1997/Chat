import React, { useState } from "react";
import ModalChangeName from "./modalChangeName.jsx";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import "./ChangeName.css";

const ChangeName = ({ currenRoomId }) => {
  const [openModal, isOpenModal] = useState(false);

  return (
    <div style={{ margin: "10px 0px" }}>
      <div onClick={() => isOpenModal(true)} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
        <PeopleAltIcon style={{ fontSize: 16 }} />
        <span style={{ marginLeft: 10 }}>Đổi tên phòng chat</span>
      </div>
      {openModal && <ModalChangeName openModal={openModal} isOpenModal={isOpenModal} roomId={currenRoomId} />}
    </div>
  );
};

export default React.memo(ChangeName);
