import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector, useDispatch } from "react-redux";
import Search from "./search.jsx";
import ForwardListSearch from "./ForwardListSearch.jsx";
import ForwardList from "./forwardList.jsx";
import "./Forward.css";

const ModalForward = ({ message, messageType, files, openModal, isOpenModal }) => {
  const [listContactId, setListContactId] = useState([]);
  const { _id } = useSelector((state) => state.auth.user);
  const [query, setQuery] = useState("");

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
          <span className="modalAdd__header_title">Forward</span>
          <CloseIcon className="modalAdd__header_close_icon" onClick={() => isOpenModal(false)} />
        </div>
        {/* body */}
        <div className="modalAdd__body">
          <Search setQuery={setQuery} />
        </div>

        <div className="modalAdd__body_group_add_member_container">
          {
            <div className="modalAdd__body_group_add_member_wraper" style={{ display: !isQuery() ? "block" : "none" }}>
              <ForwardList
                message={message}
                messageType={messageType}
                files={files}
                query={query}
                listContactId={listContactId}
                setListContactId={setListContactId}
                userId={_id}
              />
            </div>
          }

          {isQuery() && (
            <ul className="modalAdd__body_group_add_member_wraper" style={{ display: isQuery() ? "block" : "none" }}>
              <ForwardListSearch
                message={message}
                messageType={messageType}
                files={files}
                query={query}
                listContactId={listContactId}
                setListContactId={setListContactId}
                userId={_id}
              />
            </ul>
          )}
        </div>
      </div>
    </Modal>
  );
};
export default React.memo(ModalForward);
