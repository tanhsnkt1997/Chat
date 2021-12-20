import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./AddMember.css";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import ModalAddMember from "./modalAdd.jsx";
import Base from "../base/base.jsx";

const AddMember = ({ setOpen }) => {
  const [openModal, isOpenModal] = useState(false);
  const currenRoom = useSelector((state) => state.room.currentRoom);

  return (
    <Base setOpen={setOpen} title={"Member"} description={"Member in group"}>
      <div className="RightBar__LeftSide_btn_add_wraper">
        <GroupAddIcon className="RightBar__LeftSide_btn_add" onClick={() => isOpenModal(true)} />
      </div>

      <div className="RightBar__LeftSide_listMemder_wraper">
        <ul className="RightBar__LeftSide_listMemder">
          {currenRoom?.members.map((member, index) => (
            <li key={index} className="RightBar__LeftSide_listMemder_itemWraper">
              <img src={member.avatar} alt="avatar" className="RightBar__LeftSide_listMemder_img" />
              <span className="RightBar__LeftSide_listMemder_title">{member.displayName}</span>
            </li>
          ))}
        </ul>
      </div>
      {openModal && <ModalAddMember openModal={openModal} isOpenModal={isOpenModal} roomId={currenRoom._id} />}
    </Base>
  );
};

export default React.memo(AddMember);
