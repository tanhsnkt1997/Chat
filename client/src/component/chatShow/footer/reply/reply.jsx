import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import messageAction from "../../../../redux/action/message";

const Reply = ({ messageReply }) => {
  const dispatch = useDispatch();

  console.log("messageReply", messageReply);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 10px 0px 10px",
          color: "#575e64",
          fontSize: "1rem",
        }}
      >
        <div style={{ flex: 1 }}>Đang trả lời: {messageReply.user.displayName}</div>
        <div
          onClick={() => dispatch(messageAction.messageReply(null))}
          style={{
            width: "30px",
            height: "30px",
            background: "#fff",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <CloseIcon className="chatShow___footer_input_chat_remove_icon" style={{ color: "#575e64" }} />
        </div>
      </div>
    </>
  );
};

export default React.memo(Reply);
