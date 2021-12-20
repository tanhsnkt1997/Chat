import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import socketAction from "../../../../redux/action/socket";
import { useSelector, useDispatch } from "react-redux";
import "./modalChangeName.css";

const ModalChangeName = ({ openModal, isOpenModal, roomId }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChangeName = () => {
    dispatch(socketAction.changeNameGroup({ name, roomId }));
    isOpenModal(false);
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
          <span className="modalAdd__header_title">Change name room chat</span>
          <CloseIcon className="modalAdd__header_close_icon" onClick={() => isOpenModal(false)} />
        </div>

        <div className="modalAdd__body">
          <input type="text" className="modalChangeName_input" onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="modalAdd__footer">
          <span onClick={() => isOpenModal(false)} className="modalAdd__footer_close">
            Cancel
          </span>
          <Button
            type="submit"
            variant="contained"
            className="modalAdd__footer_btn_add_user"
            onClick={handleChangeName}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default React.memo(ModalChangeName);
