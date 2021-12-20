import React, { useEffect, useState } from "react";
import "./ModalAdd.css";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import ContactItem from "./contactItem.jsx";
import groupAction from "../../../redux/action/group";
import socketAction from "../../../redux/action/socket";
import { useSelector, useDispatch } from "react-redux";

const ModalAdd = ({ openModal, isOpenModal, roomId }) => {
  const dispatch = useDispatch();
  const [listContactId, setListContactId] = useState([]);

  const listContactOuterGroup = useSelector((state) => state.group.listMemberOuterGroup);

  console.log("listContactOuterGroup", listContactOuterGroup);
  const { _id } = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(groupAction.getListContactOuterRoom({ roomId }));
  }, [dispatch, roomId]);

  const handleAddMemberGroup = () => {
    dispatch(socketAction.addMemberToGroup({ groupId: roomId, members: listContactId }));
    setListContactId([]);
  };

  return (
    <Modal
      open={openModal}
      onClose={() => isOpenModal(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={"modal_add_group"}
    >
      <div className="modalAdd__container">
        <div className="modalAdd__header">
          <span className="modalAdd__header_title">Add Member To Group</span>
          <CloseIcon className="modalAdd__header_close_icon" onClick={() => isOpenModal(false)} />
        </div>

        <div className="modalAdd__body">
          {/* search */}
          <div className="sideBar__body_header_search_container">
            <SearchIcon className="sideBar__body_header_search_icon" />
            <input placeholder="Search..." type="text" className="sideBar__body_header_search_input" />
          </div>
          {/* contact */}
          <div className="modalAdd__body_group_add_member_container">
            <ul className="modalAdd__body_group_add_member_wraper">
              {listContactOuterGroup.map((item, index) => (
                <ContactItem
                  item={item}
                  listContactId={listContactId}
                  setListContactId={setListContactId}
                  userId={_id}
                  key={index}
                />
              ))}
            </ul>
          </div>
        </div>

        <div className="modalAdd__footer">
          <span onClick={() => isOpenModal(false)} className="modalAdd__footer_close">
            Cancel
          </span>
          <Button
            type="submit"
            variant="contained"
            className="modalAdd__footer_btn_add_user"
            onClick={handleAddMemberGroup}
          >
            Add members
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default React.memo(ModalAdd);
