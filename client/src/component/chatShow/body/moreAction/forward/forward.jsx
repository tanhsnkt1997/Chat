import React, { useState } from "react";
import ModalForward from "./modalForward.jsx";
import "./Forward.css";

const Forward = ({ message, files, messageType }) => {
  const [openModal, isOpenModal] = useState(false);
  return (
    <>
      <div className="chatShow__messageItem_moreAction_title" onClick={() => isOpenModal(true)}>
        Chuyển tiếp
      </div>
      <ModalForward
        message={message}
        messageType={messageType}
        files={files}
        openModal={openModal}
        isOpenModal={isOpenModal}
      />
    </>
  );
};

export default React.memo(Forward);
