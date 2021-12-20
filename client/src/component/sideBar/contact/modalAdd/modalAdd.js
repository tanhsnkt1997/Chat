import React, { useRef } from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";

import socketAction, { REQ_ADDFRIEND_SOCKET } from "../../../../redux/action/socket";

import "./ModalAdd.css";

const ModalAdd = ({ openModal, isOpenModal }) => {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    const form = formRef.current;
    e.preventDefault();
    dispatch(socketAction.reqAddFriendSocket({ email: form["email"].value, message: form["message"].value }));
    console.log("formmm", form["email"].value);
  };
  return (
    <Modal open={openModal} onClose={() => isOpenModal(false)} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" className={"modal"}>
      <div className="modalAdd__container">
        <div className="modalAdd__header">
          <span className="modalAdd__header_title">Add Contacts</span>
          <CloseIcon className="modalAdd__header_close_icon" onClick={() => isOpenModal(false)} />
        </div>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="modalAdd__body">
            <div className="modalAdd__body_email_wraper">
              <label className="modalAdd__body_email_label">Email</label>
              <input placeholder="Enter Email." className="modalAdd__body_email_input" name="email" />
            </div>
            <div className="modalAdd__body_email_wraper">
              <label className="modalAdd__body_email_label">Invatation Message</label>
              <textarea placeholder="Enter Message." className="modalAdd__body_invite_input" name="message" />
            </div>
          </div>

          <div className="modalAdd__footer">
            <span onClick={() => isOpenModal(false)} className="modalAdd__footer_close">
              Close
            </span>
            <Button type="submit" variant="contained" className="modalAdd__footer_btn_add_user">
              Invite Contact
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default React.memo(ModalAdd);
