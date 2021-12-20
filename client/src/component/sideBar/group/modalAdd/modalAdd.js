import React, { useRef, useState } from "react";
import "./ModalAdd.css";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

import ContactItem from "./contactItem.jsx";
import { useSelector, useDispatch } from "react-redux";

import Search from "./search.jsx";
import ContactList from "./contactList.jsx";
import ContactListSearch from "./contactListSearch.jsx";
import socketAction from "../../../../redux/action/socket";
import roomAction from "../../../../redux/action/room";

const ModalAdd = ({ openModal, isOpenModal }) => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const inutTextRef = useRef(null);
  const [listContactId, setListContactId] = useState([]);
  const { _id } = useSelector((state) => state.auth.user);

  const handleCreatGroup = () => {
    //listContactId is array checked
    dispatch(socketAction.creatRomChat({ name: inutTextRef.current.value, chatType: "group", members: listContactId }));
    setListContactId([]);
    isOpenModal(false);
    // dispatch(roomAction.setCurrentRoom(item));
  };

  const keyWordSearch = (query) => {
    return setQuery(query);
  };

  const isQuery = () => {
    if (query) {
      return true;
    } else {
      return false;
    }
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
          <span className="modalAdd__header_title">Create New Group</span>
          <CloseIcon className="modalAdd__header_close_icon" onClick={() => isOpenModal(false)} />
        </div>

        <div className="modalAdd__body">
          <div className="modalAdd__body_group_input_wraper">
            <label className="modalAdd__body_group_input_title">Group name</label>
            <input
              ref={inutTextRef}
              type="text"
              className="modalAdd__body_group_input"
              placeholder="Enter Group Name"
            />
          </div>

          {/* search */}
          <Search keyWordSearch={keyWordSearch} />
          {/* contact */}
          <div className="modalAdd__body_group_add_member_container">
            {isQuery() && (
              <ul className="modalAdd__body_group_add_member_wraper" style={{ display: isQuery() ? "block" : "none" }}>
                <ContactListSearch
                  query={query}
                  listContactId={listContactId}
                  setListContactId={setListContactId}
                  userId={_id}
                />
              </ul>
            )}
            <ul className="modalAdd__body_group_add_member_wraper" style={{ display: !isQuery() ? "block" : "none" }}>
              <ContactList listContactId={listContactId} setListContactId={setListContactId} userId={_id} />
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
            onClick={handleCreatGroup}
          >
            Creat Group
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default React.memo(ModalAdd);
